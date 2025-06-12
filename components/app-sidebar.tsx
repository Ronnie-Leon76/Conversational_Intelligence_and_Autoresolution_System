"use client"

import { BarChart3, Activity, Database, Bot, Network, Phone, Settings, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  {
    id: "analytics",
    title: "Analytics Overview",
    icon: BarChart3,
    description: "Conversation metrics & insights",
  },
  {
    id: "real-time",
    title: "Real-Time Monitor",
    icon: Activity,
    description: "Live conversation analysis",
  },
  {
    id: "vcon-explorer",
    title: "vCon Explorer",
    icon: Database,
    description: "Browse conversation data",
  },
  {
    id: "auto-resolution",
    title: "Auto-Resolution",
    icon: Bot,
    description: "Automated response engine",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    icon: Sparkles,
    description: "GPT-4o-mini powered insights",
  },
  {
    id: "cross-domain",
    title: "Cross-Domain Intel",
    icon: Network,
    description: "Multi-industry insights",
  },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">CIARP</h1>
            <p className="text-sm text-gray-500">Conversation Intelligence</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-gray-500">{item.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-2">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Calls</span>
                    <span className="text-lg font-bold text-green-600">12</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resolution Rate</span>
                    <span className="text-lg font-bold text-blue-600">87%</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Response</span>
                    <span className="text-lg font-bold text-purple-600">2.3s</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}