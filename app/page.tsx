"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ConversationAnalytics } from "@/components/conversation-analytics"
import { RealTimeMonitor } from "@/components/real-time-monitor"
import { VconExplorer } from "@/components/vcon-explorer"
import { AutoResolutionEngine } from "@/components/auto-resolution-engine"
import { CrossDomainIntelligence } from "@/components/cross-domain-intelligence"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [selectedDomain, setSelectedDomain] = useState("yacht-brokerage")

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <ConversationAnalytics domain={selectedDomain} />
      case "real-time":
        return <RealTimeMonitor domain={selectedDomain} />
      case "vcon-explorer":
        return <VconExplorer domain={selectedDomain} />
      case "auto-resolution":
        return <AutoResolutionEngine domain={selectedDomain} />
      case "cross-domain":
        return <CrossDomainIntelligence selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} />
      default:
        return <ConversationAnalytics domain={selectedDomain} />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader selectedDomain={selectedDomain} onDomainChange={setSelectedDomain} activeTab={activeTab} />
          <main className="flex-1 p-6">{renderContent()}</main>
          <footer className="border-t bg-white px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>System Status: Online</span>
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  )
}
