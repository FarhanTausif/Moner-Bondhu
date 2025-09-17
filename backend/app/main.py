from fastapi import FastAPI, Request, HTTPException
from app.schemas import ChatRequest, ChatResponse, ErrorResponse
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os 

app = FastAPI()

# Load model once at startup
EMOTION_MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "bert_model_corrected.pt")
INTENT_MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "intent_model.pt")    
model = None
tokenizer = None
intent_model = None
intent_tokenizer = None

@app.on_event("startup")
async def load_model():
	global model, tokenizer, intent_model, intent_tokenizer
	if os.path.exists(EMOTION_MODEL_PATH):
		
		try:
			# Load the saved model
			saved_data = torch.load(EMOTION_MODEL_PATH, map_location=torch.device("cpu"), weights_only=False)
			
			# Initialize tokenizer
			tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

			intent_tokenizer = AutoTokenizer.from_pretrained(os.path.join(os.path.dirname(__file__), "intent_model"))
			intent_model = torch.load(INTENT_MODEL_PATH, map_location=torch.device("cpu"), weights_only=False)
			intent_model.eval()
			print("Intent model loaded successfully")
			
			# Check if it's a state dict or full model
			if isinstance(saved_data, dict) and 'state_dict' in saved_data:
				# If it's a checkpoint with state_dict
				model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=6)
				model.load_state_dict(saved_data['state_dict'])
			elif isinstance(saved_data, dict) and any(key.startswith('bert.') for key in saved_data.keys()):
				# If it's a direct state dict, check classifier size to determine num_labels
				classifier_weight_shape = saved_data.get('classifier.weight', torch.tensor([[]])).shape
				num_labels = classifier_weight_shape[0] if len(classifier_weight_shape) > 0 else 6
				
				model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=num_labels)
				model.load_state_dict(saved_data)
			else:
				# If it's a full model object
				model = saved_data
			
			model.eval()  # Set to evaluation mode
			print("Emotion model loaded successfully")
		except Exception as e:
			print(f"Error loading model: {e}")
			model = None
			tokenizer = None
			intent_model = None
			intent_tokenizer = None
				
	else:
		print(f"Model file not found: {EMOTION_MODEL_PATH}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    if model is None or tokenizer is None or intent_model is None or intent_tokenizer is None:
        raise HTTPException(status_code=503, detail="Models not loaded properly")
    
    return {
        "status": "healthy",
        "models_loaded": {
            "emotion_model": model is not None,
            "emotion_tokenizer": tokenizer is not None,
            "intent_model": intent_model is not None,
            "intent_tokenizer": intent_tokenizer is not None
        }
    }

def predict_intent(text: str, threshold: float = 0.7):
    inputs = intent_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = intent_model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1).squeeze()
        confidence, pred_idx = torch.max(probs, dim=0)
        confidence = confidence.item()
        pred_idx = pred_idx.item()

    label = intent_model.config.id2label[pred_idx]

    if confidence < threshold:
        return "uncertain", confidence
    return label, confidence

def predict_emotion(text: str, threshold: float = 0.7):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1).squeeze()
        confidence, pred_idx = torch.max(probs, dim=0)
        confidence = confidence.item()
        pred_idx = pred_idx.item()

    class_responses = {
        0: "I hear that you might be feeling sad or down. It's okay to feel this way, and I'm here to listen.",
        1: "It sounds like you might be experiencing some anxiety. Take a deep breath - you're not alone in this.",
        2: "I can sense some anger in your words. It's natural to feel frustrated sometimes. Would you like to talk about what's bothering you?",
        3: "You seem to be feeling positive! That's wonderful. What's bringing you joy today?",
        4: "I detect that you might be feeling fearful or worried. Remember that it's okay to feel scared, and talking about it can help.",
        5: "It sounds like you might be feeling surprised or uncertain. Change can be overwhelming, but I'm here to support you."
    }

    if confidence < threshold:
        return "uncertain", confidence
    return class_responses.get(pred_idx, "I'm here to listen."), confidence

@app.post("/api/v/chat", 
         response_model=ChatResponse,
         responses={
             400: {"model": ErrorResponse, "description": "Bad Request"},
             500: {"model": ErrorResponse, "description": "Internal Server Error"}
         })
async def chat(request: ChatRequest) -> ChatResponse:
	if not request.prompt:
		raise HTTPException(status_code=400, detail="Prompt is required.")
	if model is None or tokenizer is None:
		raise HTTPException(status_code=500, detail="Model not loaded.")

	try:
		# Step 1: Emotion detection
		emotion, emo_conf = predict_emotion(request.prompt, threshold=0.7)
		if emotion == "uncertain":
			return ChatResponse(response=f"I'm not sure about your feelings yet. Can you tell me more? (Confidence: {emo_conf:.2f})")

		# Step 2: Intent detection
		intent, intent_conf = predict_intent(request.prompt, threshold=0.7)
		if intent == "uncertain":
			return ChatResponse(response=f"I understand how you feel. Could you explain more about what you'd like me to do? (Confidence: {intent_conf:.2f})")

		response = f"{emotion} (Confidence: {emo_conf:.2f}) I also understood your intent as: {intent} (Confidence: {intent_conf:.2f})"
		return ChatResponse(response=response)

	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")
	
	# try:
	# 	# Tokenize the input
	# 	inputs = tokenizer(
	# 		request.prompt,
	# 		return_tensors="pt",
	# 		truncation=True,
	# 		padding=True,
	# 		max_length=512
	# 	)
		
	# 	# Get model prediction
	# 	with torch.no_grad():
	# 		outputs = model(**inputs)
			
	# 		# If it's a classification model
	# 		if hasattr(outputs, 'logits'):
	# 			predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
	# 			predicted_class = torch.argmax(predictions, dim=-1).item()
	# 			confidence = torch.max(predictions).item()
				
	# 			# Define responses for 6 mental health classes
	# 			class_responses = {
	# 				0: "I hear that you might be feeling sad or down. It's okay to feel this way, and I'm here to listen.",
	# 				1: "It sounds like you might be experiencing some anxiety. Take a deep breath - you're not alone in this.",
	# 				2: "I can sense some anger in your words. It's natural to feel frustrated sometimes. Would you like to talk about what's bothering you?",
	# 				3: "You seem to be feeling positive! That's wonderful. What's bringing you joy today?",
	# 				4: "I detect that you might be feeling fearful or worried. Remember that it's okay to feel scared, and talking about it can help.",
	# 				5: "It sounds like you might be feeling surprised or uncertain. Change can be overwhelming, but I'm here to support you."
	# 			}
				
	# 			response = class_responses.get(predicted_class, "I'm here to listen and support you. Can you tell me more about how you're feeling?")
	# 			response += f" (Confidence: {confidence:.2f})"
	# 		else:
	# 			# Fallback response
	# 			response = "I'm here to help. Can you tell me more about how you're feeling?"
		
	# 	return ChatResponse(response=response)
	# except Exception as e:
	# 	raise HTTPException(status_code=500, detail=f"Model inference error: {str(e)}")
    