'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ResourcesSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, t } = useLanguage()

  const helplines = [
    {
      name: t('bracHelpline'),
      number: '01704121000, 01704121111',
      description: language === 'en' 
        ? 'Free mental health support 24/7'
        : 'বিনামূল্যে ২৪/৭ মানসিক স্বাস্থ্য সেবা'
    },
    {
      name: t('kaanPeteRoi'),
      number: '+880 9612-119911',
      description: language === 'en'
        ? 'Suicide prevention and emotional support'
        : 'আত্মহত্যা প্রতিরোধ ও মানসিক সহায়তা'
    }
  ]

  const resources = [
    {
      title: language === 'en' ? 'Breathing Exercise' : 'শ্বাসের ব্যায়াম',
      description: language === 'en' 
        ? 'Try the 4-7-8 breathing technique for instant calm'
        : '৪-৭-৮ শ্বাসের কৌশল চেষ্টা করুন তাৎক্ষণিক শান্তির জন্য'
    },
    {
      title: language === 'en' ? 'Grounding Technique' : 'গ্রাউন্ডিং কৌশল',
      description: language === 'en'
        ? 'Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste'
        : '৫টি জিনিস দেখুন, ৪টি শুনুন, ৩টি স্পর্শ করুন, ২টি গন্ধ নিন, ১টি স্বাদ নিন'
    }
  ]

  return (
    <>
      {/* Mobile/Desktop Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="fixed top-20 right-4 z-40 shadow-lg backdrop-blur-sm bg-background/80"
        title={isOpen ? 'Close Resources' : 'Open Resources'}
      >
        <div className="flex flex-col space-y-1 mr-2">
          <div className="w-4 h-0.5 bg-current"></div>
          <div className="w-4 h-0.5 bg-current"></div>
          <div className="w-4 h-0.5 bg-current"></div>
        </div>
        <span className="hidden sm:inline">{t('resources')}</span>
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-background border-l
        transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold text-lg ${language === 'bn' ? 'bangla-text' : ''}`}>
                {t('resources')}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-accent/50"
              >
                ✕
              </Button>
            </div>

            {/* Crisis Helplines */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base text-red-600 dark:text-red-400 ${language === 'bn' ? 'bangla-text' : ''}`}>
                  🚨 {t('helplines')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {helplines.map((helpline, index) => (
                  <div key={index} className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <div className={`font-medium text-sm ${language === 'bn' ? 'bangla-text' : ''}`}>
                      {helpline.name}
                    </div>
                    <div className="font-mono text-lg font-bold text-red-600 dark:text-red-400">
                      {helpline.number}
                    </div>
                    <div className={`text-xs text-muted-foreground ${language === 'bn' ? 'bangla-text' : ''}`}>
                      {helpline.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base ${language === 'bn' ? 'bangla-text' : ''}`}>
                  🧘‍♀️ Quick Relief
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="p-3 rounded-lg bg-soothing-blue-50 dark:bg-soothing-blue-950/20 border border-soothing-blue-200 dark:border-soothing-blue-800">
                    <div className={`font-medium text-sm text-soothing-blue-700 dark:text-soothing-blue-300 ${language === 'bn' ? 'bangla-text' : ''}`}>
                      {resource.title}
                    </div>
                    <div className={`text-xs text-muted-foreground mt-1 ${language === 'bn' ? 'bangla-text' : ''}`}>
                      {resource.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mood History Placeholder */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className={`text-base ${language === 'bn' ? 'bangla-text' : ''}`}>
                  📊 {t('moodHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-muted-foreground">
                  <div className="text-3xl mb-2">📈</div>
                  <div className={`text-sm ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {language === 'en' 
                      ? 'Mood tracking coming soon'
                      : 'মুড ট্র্যাকিং শীঘ্রই আসছে'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
