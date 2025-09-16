from fastapi import FastAPI, Request, HTTPException
from app.schemas import ChatRequest, ChatResponse, ErrorResponse
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os 

app = FastAPI()

# Load model once at startup
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "bert_model_corrected.pt")
model = None
tokenizer = None

@app.on_event("startup")
async def load_model():
	global model, tokenizer
	if os.path.exists(MODEL_PATH):
		try:
			# Load the saved model
			saved_data = torch.load(MODEL_PATH, map_location=torch.device("cpu"))
			
			# Initialize tokenizer
			tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
			
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
			print("Model loaded successfully")
		except Exception as e:
			print(f"Error loading model: {e}")
			model = None
	else:
		print(f"Model file not found: {MODEL_PATH}")

# @app.get("/health")
# async def health_check():
# 	if model is not None:
# 		return {"status": "ok", "model_loaded": True}
# 	else:
# 		return {"status": "ok", "model_loaded": False}

@app.post("/api/v/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
	if not request.prompt:
		raise HTTPException(status_code=400, detail="Prompt is required.")
	if model is None or tokenizer is None:
		raise HTTPException(status_code=500, detail="Model not loaded.")
	
	try:
		# Tokenize the input
		inputs = tokenizer(
			request.prompt,
			return_tensors="pt",
			truncation=True,
			padding=True,
			max_length=512
		)
		
		# Get model prediction
		with torch.no_grad():
			outputs = model(**inputs)
			
			# If it's a classification model
			if hasattr(outputs, 'logits'):
				predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
				predicted_class = torch.argmax(predictions, dim=-1).item()
				confidence = torch.max(predictions).item()
				
				# Define responses for 6 mental health classes
				class_responses = {
					0: "I hear that you might be feeling sad or down. It's okay to feel this way, and I'm here to listen.",
					1: "It sounds like you might be experiencing some anxiety. Take a deep breath - you're not alone in this.",
					2: "I can sense some anger in your words. It's natural to feel frustrated sometimes. Would you like to talk about what's bothering you?",
					3: "You seem to be feeling positive! That's wonderful. What's bringing you joy today?",
					4: "I detect that you might be feeling fearful or worried. Remember that it's okay to feel scared, and talking about it can help.",
					5: "It sounds like you might be feeling surprised or uncertain. Change can be overwhelming, but I'm here to support you."
				}
				
				response = class_responses.get(predicted_class, "I'm here to listen and support you. Can you tell me more about how you're feeling?")
				response += f" (Confidence: {confidence:.2f})"
			else:
				# Fallback response
				response = "I'm here to help. Can you tell me more about how you're feeling?"
		
		return ChatResponse(response=response)
	except Exception as e:
		raise HTTPException(status_code=500, detail=f"Model inference error: {str(e)}")
    