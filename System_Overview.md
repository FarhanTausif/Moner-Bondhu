A\[🧍 User Input\<br\>("I feel hopeless")\] \--\> B\[🌐 Frontend (Next.js)\<br\> Sends input to API\]

B \--\> C\[🔍 Emotion Detection API\<br\>(BERT Inference)\]

C \--\>|Text| D\[BERT Model (saved\_model/)\]  
D \--\>|Predicted label: Sadness| E\[🔁 Pass to Retrieval System\]

E \--\> F\[📚 Vector Store (Qdrant)\]  
F \--\>|Top-k relevant context| G\[📄 RAG Context Builder\]

G \--\> H\[🤖 Gemini API\<br\>Input \= user text \+ context \+ emotion\]

H \--\> I\[🧠 AI-Generated Supportive Response\<br\>("You're not alone. Try talking to a friend.")\]

I \--\> J\[🌐 Frontend displays response\]

**🧩 System Workflow Description**

When a user interacts with *Moner Bondhu 2.0*, the system processes their message through the following intelligent pipeline to provide personalized, emotionally aware support:

1. **🧍 User Input**  
    The user initiates a conversation by submitting a message (e.g., "I feel hopeless") via the chatbot interface.

2. **🌐 Frontend (Next.js)**  
    The input is sent to the backend through a secure API call. The frontend ensures real-time communication and a smooth user experience in both Bangla and English.

3. **🔍 Emotion Detection API**  
    The input text is forwarded to a backend emotion detection service that leverages a fine-tuned **BERT-based model** to analyze the user's emotional state.

4. **🧠 BERT Model Inference**  
    The model predicts the user's emotional label (e.g., *Sadness*, *Fear*, *Joy*) based on sentiment and tone analysis.

## Enhanced Data Flow Architecture

### Primary Classification Pipeline

**BERT Emotion Classifier**
```
User Input → BERT Model → {(emotion)(confidence), (emotion)(confidence)}
```
- Processes user text and returns emotion classifications with confidence scores
- Example: "I feel anxious" → {(anxiety)(0.87), (fear)(0.23)}

**Intent Classifier**
```
User Input → Intent Classifier → {(Intention)(Confidence)}
```
- Analyzes user intent to understand the purpose behind their message
- Example: "I need help" → {(seeking_support)(0.92)}

### Enhanced Prompt Construction

**New Prompt Generation**
```
New Prompt = User Input + {(emotion)(confidence)} + {(Intention)(Confidence)} + Context
```

This enriched prompt contains:
- Original user message
- Detected emotions with confidence scores
- Identified intentions with confidence levels
- Additional contextual information

### Threshold-Based Response Strategy

**Confidence Threshold Logic**
```
IF (emotion_confidence > threshold AND intent_confidence > threshold):
    → Direct Gemini Processing with full context
ELSE:
    → Return "Tell me more."
```

**Enhanced Gemini Processing**
```
Gemini(User Input + Intent + Emotion + Confidence + Predefined Prompts OR RAG) → Response
```

When confidence thresholds are met, the system provides:
- Emotion-aware responses
- Intent-specific guidance
- RAG-enhanced contextual support
- Pre-defined therapeutic prompts

### Confidence Threshold Benefits

1. **Quality Control**: Ensures responses are only generated when the system is confident about user state
2. **Active Listening**: Prompts users to share more when clarity is needed
3. **Precision**: Reduces hallucination by requiring sufficient confidence before complex processing
4. **User Engagement**: Encourages deeper conversation when initial input lacks context

5. **🔁 Retrieval System Integration**  
    The predicted emotion and raw input are passed to a **retrieval system**, which prepares relevant context and coping strategies.

6. **📚 Vector Store (Qdrant)**  
    Using Qdrant, the system performs **semantic search** over a vectorized store of curated mental health content and supportive phrases, retrieving the most relevant context snippets.

7. **📄 RAG Context Builder**  
    Retrieved results are compiled alongside the user input and emotion tag to construct a context-rich prompt.

8. **🤖 Gemini API (RAG-enabled Response Generation)**  
    The constructed prompt is sent to the **Gemini API**, which uses **Retrieval-Augmented Generation** to craft an emotionally appropriate and empathetic response.

9. **🧠 AI-Generated Supportive Response**  
    An encouraging, context-aware message is generated (e.g., *"You're not alone. Try talking to a friend."*), tailored to the user's mental state and expressed concern.

10. **🌐 Response Display on Frontend**  
     Finally, the response is displayed to the user through the chatbot UI, optionally using **Text-to-Speech** for accessibility and warmth.

| Stage | Input | Output |
| ----- | ----- | ----- |
| **User Input** | Free-form text (e.g., `"I feel hopeless."`) | Passed to frontend |
| **Emotion Detection** | Text | Emotion label (e.g., `"sadness"`) |
| **Retriever (RAG)** | User text | Top-k mental health passages |
| **Gemini Prompting** | Text \+ Emotion \+ Context | Compassionate, context-aware reply |
| **Frontend Display** | AI response | Rendered in chat UI |

**🧠 Gemini Prompt Template (Example)**

User said: "I feel hopeless."  
Detected emotion: sadness  
Related advice: \[passage 1\], \[passage 2\]

Respond with kindness, empathy, and helpful advice.
