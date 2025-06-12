"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Send,
  Sparkles,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileText,
  Mic,
  User,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIAssistantProps {
  domain: string
  selectedConversation?: any
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "analysis" | "suggestion" | "insight" | "general"
}

interface AIInsight {
  id: string
  type: "trend" | "alert" | "opportunity" | "recommendation"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  actionable: boolean
}

const mockInsights: AIInsight[] = [
  {
    id: "1",
    type: "trend",
    title: "Rising Technical Support Requests",
    description: "GPS navigation issues have increased 34% this week, particularly with MarineNav Pro models.",
    confidence: 92,
    impact: "high",
    actionable: true,
  },
  {
    id: "2",
    type: "opportunity",
    title: "Upselling Opportunity Detected",
    description: "Customers asking about basic models show 67% interest in premium features when mentioned.",
    confidence: 85,
    impact: "medium",
    actionable: true,
  },
  {
    id: "3",
    type: "alert",
    title: "Customer Satisfaction Dip",
    description: "Satisfaction scores for return requests dropped to 3.8/5.0, below the 4.2 target.",
    confidence: 88,
    impact: "high",
    actionable: true,
  },
  {
    id: "4",
    type: "recommendation",
    title: "Agent Training Suggestion",
    description: "Agents handling technical calls could benefit from updated GPS troubleshooting protocols.",
    confidence: 79,
    impact: "medium",
    actionable: true,
  },
]

export function AIAssistant({ domain, selectedConversation }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for conversation intelligence. I can help you analyze conversations, identify patterns, and provide actionable insights. What would you like to explore?",
      timestamp: new Date(),
      type: "general",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response (in real implementation, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, domain, selectedConversation)
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (query: string, domain: string, conversation?: any): ChatMessage => {
    const lowerQuery = query.toLowerCase()

    let response = ""
    let type: ChatMessage["type"] = "general"

    if (lowerQuery.includes("analyze") || lowerQuery.includes("analysis")) {
      response = `Based on the ${domain} conversation data, I've identified several key patterns:

• **Emotion Trends**: 45% of customers start calm but 25% become frustrated during technical discussions
• **Resolution Patterns**: Technical issues have a 67% first-call resolution rate, below the 85% target
• **Peak Issues**: GPS navigation problems account for 34% of technical support calls

**Recommendations**:
1. Implement proactive GPS troubleshooting scripts
2. Provide agents with updated technical documentation
3. Consider escalation protocols for complex technical issues`
      type = "analysis"
    } else if (lowerQuery.includes("improve") || lowerQuery.includes("optimization")) {
      response = `Here are AI-powered optimization suggestions for your ${domain} operations:

**Immediate Actions**:
• Deploy auto-resolution templates for common GPS issues (potential 23% reduction in handle time)
• Update agent scripts with empathy phrases for frustrated customers
• Implement proactive callbacks for escalated technical issues

**Strategic Improvements**:
• Cross-train agents on yacht technical specifications
• Develop predictive models for customer satisfaction
• Create domain-specific knowledge base articles

**Expected Impact**: 15-20% improvement in resolution rates, 0.8-point increase in satisfaction scores`
      type = "suggestion"
    } else if (lowerQuery.includes("trend") || lowerQuery.includes("pattern")) {
      response = `I've detected several important trends in your conversation data:

**📈 Rising Trends**:
• Technical support requests (+34% this week)
• Premium product inquiries (+18% month-over-month)
• Scheduling requests for yacht viewings (+25%)

**⚠️ Concerning Patterns**:
• Increased escalation rate for GPS-related issues
• Longer handle times for return requests
• Customer confusion about product specifications

**🎯 Opportunities**:
• High conversion potential for luxury yacht inquiries
• Strong satisfaction scores for resolved order issues
• Effective cross-selling during product inquiries`
      type = "insight"
    } else {
      response = `I can help you with various conversation intelligence tasks:

**Analysis Capabilities**:
• Conversation sentiment and emotion analysis
• Intent classification and pattern recognition
• Performance metrics and trend identification
• Cross-domain intelligence insights

**Optimization Features**:
• Auto-resolution template suggestions
• Agent coaching recommendations
• Customer satisfaction improvement strategies
• Predictive analytics for escalation prevention

Try asking me to "analyze recent trends" or "suggest improvements for technical support calls"`
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      type,
    }
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "opportunity":
        return <Lightbulb className="h-4 w-4" />
      case "recommendation":
        return <FileText className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "trend":
        return "border-blue-200 bg-blue-50"
      case "alert":
        return "border-red-200 bg-red-50"
      case "opportunity":
        return "border-green-200 bg-green-50"
      case "recommendation":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Assistant
          <Badge variant="outline" className="ml-auto">
            GPT-4o-mini
          </Badge>
        </CardTitle>
        <CardDescription>Powered by OpenAI for intelligent conversation analysis and insights</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="analysis">Quick Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                placeholder="Ask me about conversation patterns, trends, or optimization suggestions..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="flex-1">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {mockInsights.map((insight) => (
                  <Card key={insight.id} className={`border ${getInsightColor(insight.type)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getInsightIcon(insight.type)}
                          <h4 className="font-medium">{insight.title}</h4>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                          <Badge variant="outline">{insight.confidence}% confidence</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                      {insight.actionable && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="analysis" className="flex-1">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">Analyze Current Conversation</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">Identify Trends</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Lightbulb className="h-5 w-5" />
                  <span className="text-sm">Optimization Suggestions</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">Risk Assessment</span>
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste conversation transcript here for instant AI analysis..."
                    className="min-h-[120px] mb-4"
                  />
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Voice Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Upload audio files for real-time emotion and sentiment analysis
                    </p>
                    <Button variant="outline">Upload Audio File</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}