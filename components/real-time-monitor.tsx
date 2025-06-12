"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Phone,
  PhoneCall,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  User,
  MessageSquare,
  Heart,
  Brain,
  Zap,
} from "lucide-react"

interface RealTimeMonitorProps {
  domain: string
}

interface ActiveCall {
  id: string
  customerName: string
  agentName: string
  duration: number
  emotion: "calm" | "frustrated" | "excited" | "confused"
  intent: string
  urgency: "low" | "medium" | "high"
  status: "active" | "on-hold" | "escalated"
  confidence: number
}

const generateMockCalls = (): ActiveCall[] => [
  {
    id: "1",
    customerName: "Sarah Johnson",
    agentName: "Mike Chen",
    duration: 245,
    emotion: "frustrated",
    intent: "Return Request",
    urgency: "high",
    status: "active",
    confidence: 0.89,
  },
  {
    id: "2",
    customerName: "Robert Davis",
    agentName: "Lisa Park",
    duration: 120,
    emotion: "calm",
    intent: "Order Status",
    urgency: "low",
    status: "active",
    confidence: 0.95,
  },
  {
    id: "3",
    customerName: "Emily Wilson",
    agentName: "John Smith",
    duration: 67,
    emotion: "excited",
    intent: "Product Inquiry",
    urgency: "medium",
    status: "active",
    confidence: 0.92,
  },
  {
    id: "4",
    customerName: "David Brown",
    agentName: "Anna Lee",
    duration: 189,
    emotion: "confused",
    intent: "Technical Support",
    urgency: "medium",
    status: "on-hold",
    confidence: 0.78,
  },
]

const agentSuggestions = [
  "Customer seems frustrated about delivery delay. Offer expedited shipping at no cost.",
  "Mention our 30-day return policy to reassure the customer.",
  "Customer is interested in premium features. Consider upselling.",
  "Technical issue detected. Transfer to Level 2 support if needed.",
]

export function RealTimeMonitor({ domain }: RealTimeMonitorProps) {
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>(generateMockCalls())
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(activeCalls[0])
  const [liveMetrics, setLiveMetrics] = useState({
    totalActive: 12,
    avgWaitTime: 23,
    resolutionRate: 87,
    escalationRate: 8,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCalls((prev) =>
        prev.map((call) => ({
          ...call,
          duration: call.duration + Math.floor(Math.random() * 5) + 1,
        })),
      )

      setLiveMetrics((prev) => ({
        ...prev,
        totalActive: prev.totalActive + Math.floor(Math.random() * 3) - 1,
        avgWaitTime: Math.max(0, prev.avgWaitTime + Math.floor(Math.random() * 6) - 3),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "frustrated":
        return "text-red-600 bg-red-50 border-red-200"
      case "calm":
        return "text-green-600 bg-green-50 border-green-200"
      case "excited":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "confused":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{liveMetrics.totalActive}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{liveMetrics.avgWaitTime}s</div>
            <p className="text-xs text-muted-foreground">Target: {"<"}30s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{liveMetrics.resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2% today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{liveMetrics.escalationRate}%</div>
            <p className="text-xs text-muted-foreground">Target: {"<"}10%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Conversations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Active Conversations
            </CardTitle>
            <CardDescription>Real-time conversation monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCalls.map((call) => (
                <div
                  key={call.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCall?.id === call.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCall(call)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{call.customerName}</span>
                      <Badge variant="outline" className={getEmotionColor(call.emotion)}>
                        {call.emotion}
                      </Badge>
                    </div>
                    <Badge className={getUrgencyColor(call.urgency)}>{call.urgency}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Agent: {call.agentName}</span>
                    <span>{formatDuration(call.duration)}</span>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Intent: {call.intent}</span>
                      <span>Confidence: {Math.round(call.confidence * 100)}%</span>
                    </div>
                    <Progress value={call.confidence * 100} className="mt-1 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Live Analysis
            </CardTitle>
            <CardDescription>
              {selectedCall ? `Analyzing: ${selectedCall.customerName}` : "Select a conversation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCall ? (
              <div className="space-y-6">
                {/* Emotion & Intent */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Emotion
                    </h4>
                    <Badge className={getEmotionColor(selectedCall.emotion)}>{selectedCall.emotion}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Intent
                    </h4>
                    <Badge variant="outline">{selectedCall.intent}</Badge>
                  </div>
                </div>

                {/* Agent Coaching */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Agent Coaching
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      {agentSuggestions[Math.floor(Math.random() * agentSuggestions.length)]}
                    </p>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div>
                  <h4 className="font-medium mb-2">Suggested Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Send Knowledge Base Article
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Escalate to Supervisor
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Offer Compensation
                    </Button>
                  </div>
                </div>

                {/* Call Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-gray-600">Duration</span>
                    <div className="font-medium">{formatDuration(selectedCall.duration)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="font-medium capitalize">{selectedCall.status}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">Select an active conversation to view live analysis</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Escalation Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Escalation Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <span className="font-medium text-red-800">High frustration detected</span>
                <p className="text-sm text-red-600">Sarah Johnson - Return Request</p>
              </div>
              <Button size="sm" variant="destructive">
                Escalate Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <span className="font-medium text-yellow-800">Long wait time</span>
                <p className="text-sm text-yellow-600">Queue position #3 - 4:23 wait</p>
              </div>
              <Button size="sm" variant="outline">
                Priority Queue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
