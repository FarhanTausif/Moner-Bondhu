# Moner-Bondhu Backend API

A FastAPI-based backend service for the Moner-Bondhu mental health chatbot application. This service provides emotion classification and mental health responses using a fine-tuned BERT model.

## Features

- **Emotion Classification**: Uses a pre-trained BERT model to classify text into 6 emotion categories
- **Mental Health Responses**: Provides contextual and empathetic responses based on detected emotions
- **RESTful API**: Clean FastAPI implementation with proper request/response schemas
- **Model Integration**: Seamlessly loads and serves a custom BERT model (`bert_model_corrected.pt`)

## Emotion Categories

The model classifies text into 6 emotional states:
1. **Sadness** - Detects feelings of sadness or being down
2. **Anxiety** - Identifies anxious or worried states
3. **Anger** - Recognizes anger and frustration
4. **Joy** - Detects positive and happy emotions
5. **Fear** - Identifies fearful or scared feelings
6. **Surprise** - Recognizes surprise or uncertainty

## API Endpoints

### POST `/api/v/chat`

Main chat endpoint that processes user prompts and returns AI responses.

**Request Body:**
```json
{
  "prompt": "Hello, how are you feeling today?"
}
```

**Response:**
```json
{
  "response": "I hear that you might be feeling sad or down. It's okay to feel this way, and I'm here to listen. (Confidence: 0.85)"
}
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   └── schemas.py       # Pydantic request/response models
├── bert_model_corrected.pt  # Pre-trained BERT model
├── requirements.txt     # Python dependencies
├── run.py              # Server startup script
├── test_api.py         # API testing script
└── README.md           # This file
```

## Installation & Setup

### Prerequisites
- Python 3.8+
- Virtual environment (recommended)

### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd backend
```

### Step 2: Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Start the Server
```bash
uvicorn app.main:app --reload --port 8000
```

Or use the provided run script:
```bash
chmod +x start.sh
./start.sh
```

The API will be available at `http://localhost:8000`

## Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for FastAPI
- **PyTorch**: Deep learning framework for model inference
- **Transformers**: Hugging Face library for BERT model handling
- **Pydantic**: Data validation and serialization

## Model Information

- **Model Type**: BERT for Sequence Classification
- **Classes**: 6 emotion categories
- **Architecture**: BERT-base-uncased with custom classification head
- **Input**: Text prompts (max 512 tokens)
- **Output**: Emotion classification with confidence scores

## API Documentation

Once the server is running, visit:
- **Interactive API Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

## Testing

Use the provided test script to verify API functionality:
```bash
python test_api.py
```

Or test manually with curl:
```bash
curl -X POST "http://localhost:8000/api/v/chat" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "I am feeling very anxious today"}'
```

## Development

### Running in Development Mode
```bash
uvicorn app.main:app --reload --port 8000
```

The `--reload` flag enables auto-reloading when code changes are detected.

### Adding New Features
1. Update `app/main.py` for new endpoints
2. Add corresponding schemas in `app/schemas.py`
3. Test using `test_api.py` or manual testing

## Production Deployment

For production deployment, consider:
- Using a production ASGI server (e.g., Gunicorn with Uvicorn workers)
- Adding environment-based configuration
- Implementing proper logging and monitoring
- Setting up CORS policies appropriately
- Using HTTPS/SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]

## Support

For issues and questions, please create an issue in the repository or contact the development team.