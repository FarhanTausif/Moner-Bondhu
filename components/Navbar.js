'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Switch } from '@/components/ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h1 className={`text-xl font-bold bg-gradient-to-r from-soothing-blue-600 to-soothing-green-600 bg-clip-text text-transparent ${language === 'bn' ? 'bangla-text' : ''}`}>
              {t('title')}
            </h1>
            <p className={`text-sm text-muted-foreground hidden sm:block ${language === 'bn' ? 'bangla-text' : ''}`}>
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="focus-ring">
                <span className="mr-2">🌐</span>
                <span className={language === 'bn' ? 'bangla-text' : ''}>
                  {language === 'en' ? 'English' : 'বাংলা'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-accent' : ''}
              >
                <span className="mr-2">🇺🇸</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('bn')}
                className={language === 'bn' ? 'bg-accent' : ''}
              >
                <span className="mr-2">🇧🇩</span>
                <span className="bangla-text">বাংলা</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="focus-ring"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
