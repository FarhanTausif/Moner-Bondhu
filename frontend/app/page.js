'use client'

import { Navbar } from '@/components/Navbar'
import { ChatInterface } from '@/components/ChatInterface'
import { ResourcesSidebar } from '@/components/ResourcesSidebar'

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-soothing-blue-50/30 to-soothing-green-50/30 dark:from-background dark:to-background">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area - Full Width */}
        <div className="flex-1 flex flex-col">
          <ChatInterface />
        </div>
      </div>
      
      {/* Resources Sidebar - Toggle Overlay */}
      <ResourcesSidebar />
    </main>
  )
}
