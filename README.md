# Moner Bondhu🧠💙

*Your Mental Health Companion*

A modern, minimalistic, and emotionally soothing one-page chatbot UI for mental health support, designed specifically for users in Bangladesh. The app provides anonymous mental health support in both Bangla and English.

## ✨ Features

### 🎯 Core Features
- **Full-screen single-page chat interface** with clean, modern design
- **Bilingual support** - English and বাংলা with proper font rendering
- **Dark/Light mode toggle** with system preference detection
- **Emotion detection** - AI detects user emotions and responds empathetically
- **Real-time chat** with typing indicators and smooth animations
- **Anonymous support** - No login required for safe, approachable experience

### 🎨 UI/UX Features
- **Soothing color palette** with soft gradients and rounded corners
- **Responsive design** - Fully mobile and desktop optimized
- **Smooth animations** - Fade-in effects and typing indicators
- **Accessibility focused** - Proper focus states and keyboard navigation
- **Custom scroll-bars** for enhanced visual experience

### 📱 Layout Components
- **Top Navbar** with app title, subtitle, theme toggle, and language switcher
- **Main Chat Area** with scrollable message history and smooth transitions
- **Message Bubbles** with user/AI distinction and emotion indicators
- **Input Section** with text input and send button (Enter key support)
- **Resources Sidebar** with crisis helplines and quick relief techniques

### 🧠 Mental Health Features
- **Emotion-aware responses** - AI detects sadness, anxiety, anger, happiness, etc.
- **Crisis helplines** - BRAC and Kaan Pete Roi contact information
- **Quick relief techniques** - Breathing exercises and grounding methods
- **Mood history placeholder** - Ready for future mood tracking features

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (JavaScript)
- **Styling**: Tailwind CSS with custom soothing color palette
- **UI Components**: ShadCN/UI (Radix primitives)
- **Fonts**: Inter + Noto Sans Bengali for multilingual support
- **State Management**: React Context (Theme & Language)
- **Animations**: Custom CSS animations with Tailwind

## 📦 Project Structure

```
Moner-Bondhu/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.js           # Root layout with providers
│   └── page.js             # Main page component
├── components/
│   ├── ui/                 # ShadCN UI components
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── switch.js
│   │   ├── dropdown-menu.js
│   │   ├── scroll-area.js
│   │   └── card.js
│   ├── Navbar.js           # Top navigation bar
│   ├── ChatInterface.js    # Main chat component
│   ├── MessageBubble.js    # Individual message components
│   └── ResourcesSidebar.js # Resources and helplines
├── contexts/
│   ├── ThemeContext.js     # Dark/light mode management
│   └── LanguageContext.js  # Bilingual support
├── lib/
│   └── utils.js           # Utility functions
└── package.json
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

### Color Palette
- **Soothing Blue**: Calm and trustworthy communication
- **Gentle Green**: Growth and healing
- **Soft Purple**: Creativity and mindfulness
- **Theme-aware**: Adapts to light/dark preferences

### Typography
- **Inter**: Clean, modern font for English text
- **Noto Sans Bengali**: Optimized Bengali font with proper rendering
- **Responsive sizing**: Scales appropriately across devices

### Animations
- **Fade-in effects** for new messages
- **Typing indicators** with pulsing dots
- **Smooth transitions** for all interactive elements
- **Scroll animations** for better user experience

## 🔧 Backend Integration Ready

The UI is designed to easily integrate with backend APIs:

- **Message handling**: Ready for API calls in `ChatInterface.js`
- **Emotion detection**: Placeholder functions ready for ML model integration
- **User state**: Context providers can be extended for user management
- **Analytics**: Component structure supports usage tracking

### API Integration Points

```javascript
// In ChatInterface.js
const handleSend = async () => {
  // Current: Mock emotion detection and response generation
  // TODO: Replace with actual API calls
  
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: inputValue,
      language: language,
      sessionId: sessionId
    })
  })
}
```

## 📱 Mobile Optimization

- **Touch-friendly** interface with appropriate button sizes
- **Swipe gestures** ready for sidebar interactions
- **Responsive breakpoints** for all screen sizes
- **PWA ready** - Can be extended to installable app

## 🌐 Internationalization

- **Dynamic language switching** without page reload
- **Proper font loading** for Bengali characters
- **RTL support ready** for future language additions
- **Contextual translations** for all UI elements

## 🚨 Crisis Support

Integrated mental health resources:
- **BRAC Mental Health Helpline**: 09666 788 788
- **Kaan Pete Roi**: 09612 677 777
- **Quick relief techniques** for immediate support
- **Breathing exercises** and grounding methods

## 🔐 Privacy & Security

- **No data collection** - Anonymous by design
- **Local storage only** for theme and language preferences
- **No cookies** - Respects user privacy
- **Ready for HTTPS** deployment

## 🎯 Future Enhancements

- **Mood tracking** with visual charts
- **Voice message support** for accessibility
- **Offline mode** with service workers
- **Push notifications** for check-ins
- **Multi-language expansion** (Hindi, Urdu, etc.)
- **Professional counselor booking** integration

## 📄 License

This project is created for mental health support and is available for educational and non-commercial use.

## 🤝 Contributing

This is a mental health support tool. Contributions should focus on:
- Accessibility improvements
- Performance optimizations
- Security enhancements
- Cultural sensitivity
- Mental health best practices

---

**Made with 💙 for mental health awareness in Bangladesh**

*If you or someone you know is in crisis, please contact:*
- **BRAC**: 09666 788 788
- **Kaan Pete Roi**: 09612 677 777
- **Emergency**: 999
