'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

const emotionEmojis = {
  happy: '😊',
  sad: '😔',
  anxious: '😰',
  calm: '😌',
  angry: '😤',
  confused: '😕',
  hopeful: '🌟',
  neutral: '😐',
}

export function MessageBubble({ message, isUser, emotion, timestamp }) {
  const { language } = useLanguage()
  
  return (
    <div className={cn(
      "flex w-full mb-4 message-enter",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-gradient-to-r from-soothing-blue-500 to-soothing-green-500 text-white ml-4" 
          : "bg-card border border-border mr-4"
      )}>
        {/* Emotion indicator for AI messages */}
        {!isUser && emotion && (
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <span className="mr-2">{emotionEmojis[emotion] || '😐'}</span>
            <span className="text-xs opacity-75">Detected: {emotion}</span>
          </div>
        )}
        
        {/* Message content */}
        <div className={cn(
          "text-sm sm:text-base leading-relaxed",
          language === 'bn' && "bangla-text",
          !isUser && "text-foreground"
        )}>
          {message}
        </div>
        
        {/* Timestamp */}
        {timestamp && (
          <div className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-white/80" : "text-muted-foreground"
          )}>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  const { t } = useLanguage()
  
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-card border border-border rounded-2xl px-4 py-3 mr-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {t('typing')}
          </span>
        </div>
      </div>
    </div>
  )
}
