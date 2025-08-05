'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: () => {},
})

const translations = {
  en: {
    title: 'Moner Bondhu',
    subtitle: 'Your Mental Health Companion',
    placeholder: 'Type your thoughts here...',
    send: 'Send',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    english: 'English',
    bangla: 'বাংলা',
    typing: 'Typing...',
    resources: 'Resources',
    moodHistory: 'Mood History',
    helplines: 'Crisis Helplines',
    bracHelpline: 'BRAC Mental Health Helpline',
    kaanPeteRoi: 'Kaan Pete Roi',
    welcomeMessage: "Hello! I'm here to listen and support you. How are you feeling today?",
  },
  bn: {
    title: 'মনের বন্ধু',
    subtitle: 'আপনার মানসিক স্বাস্থ্য সহায়ক',
    placeholder: 'আপনার মনের কথা লিখুন...',
    send: 'পাঠান',
    darkMode: 'অন্ধকার মোড',
    lightMode: 'আলো মোড',
    language: 'ভাষা',
    english: 'English',
    bangla: 'বাংলা',
    typing: 'লিখছি...',
    resources: 'সহায়ক তথ্য',
    moodHistory: 'মুড ইতিহাস',
    helplines: 'জরুরি হেল্পলাইন',
    bracHelpline: 'ব্র্যাক মানসিক স্বাস্থ্য হেল্পলাইন',
    kaanPeteRoi: 'কান পেতে রই',
    welcomeMessage: "হ্যালো! আমি এখানে আপনার কথা শুনতে এবং সাহায্য করতে আছি। আজ আপনার মন কেমন?",
  }
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}
