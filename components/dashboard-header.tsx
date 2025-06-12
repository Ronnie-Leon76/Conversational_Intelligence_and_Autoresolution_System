"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  selectedDomain: string
  onDomainChange: (domain: string) => void
  activeTab: string
}

const domains = [
  { value: "yacht-brokerage", label: "Yacht Brokerage" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "healthcare", label: "Healthcare" },
  { value: "financial", label: "Financial Services" },
  { value: "saas", label: "SaaS/Tech" },
]

const tabTitles = {
  analytics: "Analytics Overview",
  "real-time": "Real-Time Monitor",
  "vcon-explorer": "vCon Explorer",
  "auto-resolution": "Auto-Resolution Engine",
  "cross-domain": "Cross-Domain Intelligence",
}

export function DashboardHeader({ selectedDomain, onDomainChange, activeTab }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{tabTitles[activeTab as keyof typeof tabTitles]}</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            System Online
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search conversations..." className="pl-10 w-64" />
          </div>

          <Select value={selectedDomain} onValueChange={onDomainChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain.value} value={domain.value}>
                  {domain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
