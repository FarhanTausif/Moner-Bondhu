from transformers import BertTokenizer, BertForSequenceClassification
import torch
import json

# Load model and tokenizer
model = BertForSequenceClassification.from_pretrained("saved_model")
tokenizer = BertTokenizer.from_pretrained("saved_model")

# Load label map
with open("saved_model/label_map.json", "r") as f:
    label_map = json.load(f)

def predict_emotion(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = torch.argmax(logits).item()
    return label_map[str(predicted_class)]

# Try
print(predict_emotion("I'm feeling scared and helpless"))
