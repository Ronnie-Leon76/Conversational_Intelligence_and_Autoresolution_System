"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Download, Play, Pause, Volume2, User, MessageSquare, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { vconDataService } from "@/lib/vcon-data-service"
import type { VConConversation } from "@/lib/vcon-data-service" // Import VConConversation type

interface VconExplorerProps {
  domain: string
}

const mockConversations: VConConversation[] = [
  {
    id: "1",
    uuid: "019713bd-3268-86cd-9dd8-dd37220d739c",
    customerName: "Julie Kelly",
    agentName: "David Rogers",
    date: "2025-05-18T15:20:08-04:00",
    duration: 43,
    intent: "Order Issue",
    emotion: "frustrated",
    resolution: "resolved",
    satisfaction: 4.2,
    day: "18",
    parties: [],
    dialog: [],
    analysis: [],
    transcript: `Agent: Hello, this is David Rogers, how can I help you today?

Customer: Hi David, my name is Julie Kelly. I received the wrong item in my order, and I wanted to get this sorted out.

Agent: I'm sorry to hear that, Julie. Let's get this resolved for you. Could you provide me with the order number, please?

Customer: Sure, the order number is 2345.

Agent: Thank you. Could you also let me know the item you received and the item you were expecting?

Customer: I received a yacht anchor, but I was expecting a navigation system.

Agent: I apologize for the mix-up, Julie. I will ensure we get the correct navigation system sent to you right away.

Customer: Thank you very much for bringing this to our attention, Julie. We appreciate your patience and trust in us. Have a great day!`,
    summary:
      "Customer received wrong item (yacht anchor instead of navigation system). Agent processed replacement order and resolved issue satisfactorily.",
  },
  {
    id: "2",
    uuid: "019713bd-3268-86cd-9dd8-dd37220d740c",
    customerName: "Michael Thompson",
    agentName: "Sarah Wilson",
    date: "2025-05-18T14:15:22-04:00",
    duration: 127,
    intent: "Technical Support",
    emotion: "confused",
    resolution: "escalated",
    satisfaction: 3.8,
    day: "19",
    parties: [],
    dialog: [],
    analysis: [],
    transcript: `Agent: Hi, this is Sarah from technical support. How can I assist you today?

Customer: Hi Sarah, I'm having trouble with my GPS navigation system. It keeps losing signal.

Agent: I understand your frustration. Let me help you troubleshoot this issue. Can you tell me the model of your GPS system?

Customer: It's the MarineNav Pro 2000.

Agent: Great, that's a popular model. Let's try a few troubleshooting steps. First, have you updated the software recently?

Customer: I'm not sure how to do that. This is all very confusing to me.

Agent: No worries, I'll walk you through it step by step. However, given the complexity of this issue, I think it would be best to connect you with our Level 2 technical support team who can provide more detailed assistance.

Customer: Okay, that sounds good. Thank you for your help.`,
    summary:
      "Customer experiencing GPS signal issues with MarineNav Pro 2000. Basic troubleshooting attempted, escalated to Level 2 support for advanced technical assistance.",
  },
  {
    id: "3",
    uuid: "019713bd-3268-86cd-9dd8-dd37220d741c",
    customerName: "Lisa Chen",
    agentName: "Robert Martinez",
    date: "2025-05-18T13:45:15-04:00",
    duration: 89,
    intent: "Product Inquiry",
    emotion: "excited",
    resolution: "resolved",
    satisfaction: 4.8,
    day: "20",
    parties: [],
    dialog: [],
    analysis: [],
    transcript: `Agent: Good afternoon, this is Robert. How can I help you today?

Customer: Hi Robert! I'm looking for information about your new yacht models. I'm particularly interested in the luxury sailing yachts.

Agent: Excellent! I'd be happy to help you with that. Are you looking for a specific size range or particular features?

Customer: I'm interested in something around 40-50 feet, with modern amenities and good sailing performance.

Agent: Perfect! We have several models in that range that would be ideal. The Ocean Master 45 and the WindStar 48 are both very popular choices. Would you like me to send you detailed specifications and pricing information?

Customer: Yes, that would be wonderful! Also, would it be possible to schedule a viewing?

Agent: I can arrange a viewing at our marina. Let me get your contact information and we'll set that up for you.

Customer: This is so exciting! Thank you so much for your help.`,
    summary:
      "Customer inquiry about luxury sailing yachts in 40-50 foot range. Agent provided information on Ocean Master 45 and WindStar 48 models, scheduled viewing appointment.",
  },
]

export function VconExplorer({ domain }: VconExplorerProps) {
  const [conversations, setConversations] = useState<VConConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<VConConversation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await vconDataService.getConversations()
        setConversations(data)
      } catch (error) {
        console.error("Error loading conversations:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredConversations = loading
    ? []
    : conversations.filter(
        (conv) =>
          conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.intent.toLowerCase().includes(searchTerm.toLowerCase()),
      )

  const getResolutionColor = (resolution: string) => {
    switch (resolution) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "frustrated":
        return "bg-red-100 text-red-800"
      case "excited":
        return "bg-blue-100 text-blue-800"
      case "confused":
        return "bg-yellow-100 text-yellow-800"
      case "calm":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>vCon Conversation Explorer</CardTitle>
          <CardDescription>Browse and analyze conversation data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{conversations.length}</div>
                <p className="text-sm text-gray-600">Total Conversations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (conversations.filter((c) => c.resolution === "resolved").length / conversations.length) * 100,
                  )}
                  %
                </div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((conversations.reduce((acc, c) => acc + c.satisfaction, 0) / conversations.length) * 10) /
                    10}
                </div>
                <p className="text-sm text-gray-600">Avg Satisfaction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(conversations.reduce((acc, c) => acc + c.duration, 0) / conversations.length)}s
                </div>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Conversations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conversations ({filteredConversations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading conversations...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Emotion</TableHead>
                  <TableHead>Resolution</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConversations.map((conversation) => (
                  <TableRow key={conversation.id}>
                    <TableCell className="font-medium">{conversation.customerName}</TableCell>
                    <TableCell>{conversation.agentName}</TableCell>
                    <TableCell>{formatDate(conversation.date)}</TableCell>
                    <TableCell>{formatDuration(conversation.duration)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{conversation.intent}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEmotionColor(conversation.emotion)}>{conversation.emotion}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getResolutionColor(conversation.resolution)}>{conversation.resolution}</Badge>
                    </TableCell>
                    <TableCell>{conversation.satisfaction}/5.0</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedConversation(conversation)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Conversation Details</DialogTitle>
                            <DialogDescription>
                              {conversation.customerName} - {formatDate(conversation.date)}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedConversation && (
                            <div className="space-y-6">
                              {/* Metadata */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <span className="text-sm text-gray-600">UUID</span>
                                  <p className="font-mono text-sm">{selectedConversation.uuid.slice(0, 8)}...</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-600">Duration</span>
                                  <p className="font-medium">{formatDuration(selectedConversation.duration)}</p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-600">Intent</span>
                                  <Badge variant="outline">{selectedConversation.intent}</Badge>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-600">Emotion</span>
                                  <Badge className={getEmotionColor(selectedConversation.emotion)}>
                                    {selectedConversation.emotion}
                                  </Badge>
                                </div>
                              </div>

                              {/* Audio Player Simulation */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Volume2 className="h-5 w-5" />
                                    Audio Playback
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                    <div className="flex-1">
                                      <Progress value={playbackProgress} className="h-2" />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {formatDuration(
                                        Math.floor((playbackProgress * selectedConversation.duration) / 100),
                                      )}{" "}
                                      / {formatDuration(selectedConversation.duration)}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Transcript */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Transcript
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap text-sm">{selectedConversation.transcript}</pre>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* AI Summary */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    AI Summary
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-700">{selectedConversation.summary}</p>
                                </CardContent>
                              </Card>

                              {/* Participants */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Participants
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                      <span className="font-medium">Customer: {selectedConversation.customerName}</span>
                                      <Badge variant="outline">Customer</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                                      <span className="font-medium">Agent: {selectedConversation.agentName}</span>
                                      <Badge variant="outline">Agent</Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}