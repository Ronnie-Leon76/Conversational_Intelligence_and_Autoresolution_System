/**
 * Local vCon Data Service for CIARP Platform
 * Handles loading and processing vCon data from local Data folder
 */

export interface VConConversation {
  id: string
  uuid: string
  customerName: string
  agentName: string
  date: string
  duration: number
  intent: string
  emotion: string
  resolution: "resolved" | "escalated" | "pending"
  satisfaction: number
  transcript: string
  summary: string
  day: string
  parties: any[]
  dialog: any[]
  analysis: any[]
}

export interface ProcessedVConData {
  totalConversations: number
  conversationsByDay: Record<string, number>
  emotionDistribution: Record<string, number>
  intentDistribution: Record<string, number>
  resolutionStats: Record<string, number>
  conversations: VConConversation[]
}

class VConDataService {
  private static instance: VConDataService
  private cachedData: ProcessedVConData | null = null

  static getInstance(): VConDataService {
    if (!VConDataService.instance) {
      VConDataService.instance = new VConDataService()
    }
    return VConDataService.instance
  }

  /**
   * Load and process all vCon data from the Data folder
   */
  async loadVConData(): Promise<ProcessedVConData> {
    if (this.cachedData) {
      return this.cachedData
    }

    // Since we can't directly read files in the browser, we'll use mock data
    // In a real implementation, this would be loaded via an API endpoint
    const mockData = this.generateMockVConData()
    this.cachedData = mockData
    return mockData
  }

  /**
   * Generate realistic mock vCon data based on the yacht brokerage dataset
   */
  private generateMockVConData(): ProcessedVConData {
    const conversations: VConConversation[] = [
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
        parties: [
          {
            tel: "+15065738249",
            mailto: "julie.kelly@gmail.com",
            name: "Julie Kelly",
            role: "customer",
          },
          {
            tel: "+15004171355",
            mailto: "david.rogers@brokeragecompany.com",
            name: "David Rogers",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-18T15:19:53-04:00",
            duration: 43.056,
          },
        ],
        analysis: [],
      },
      {
        id: "2",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d740c",
        customerName: "Michael Thompson",
        agentName: "Sarah Wilson",
        date: "2025-05-19T14:15:22-04:00",
        duration: 127,
        intent: "Technical Support",
        emotion: "confused",
        resolution: "escalated",
        satisfaction: 3.8,
        day: "19",
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
        parties: [
          {
            name: "Michael Thompson",
            role: "customer",
          },
          {
            name: "Sarah Wilson",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-19T14:15:22-04:00",
            duration: 127,
          },
        ],
        analysis: [],
      },
      {
        id: "3",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d741c",
        customerName: "Lisa Chen",
        agentName: "Robert Martinez",
        date: "2025-05-20T13:45:15-04:00",
        duration: 89,
        intent: "Product Inquiry",
        emotion: "excited",
        resolution: "resolved",
        satisfaction: 4.8,
        day: "20",
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
        parties: [
          {
            name: "Lisa Chen",
            role: "customer",
          },
          {
            name: "Robert Martinez",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-20T13:45:15-04:00",
            duration: 89,
          },
        ],
        analysis: [],
      },
      {
        id: "4",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d742c",
        customerName: "James Wilson",
        agentName: "Emily Davis",
        date: "2025-05-21T10:30:45-04:00",
        duration: 156,
        intent: "Scheduling",
        emotion: "calm",
        resolution: "resolved",
        satisfaction: 4.5,
        day: "21",
        transcript: `Agent: Good morning, this is Emily from Aquidneck Yacht Brokers. How may I assist you?

Customer: Hi Emily, I'd like to schedule a viewing for the Catalina 42 that's listed on your website.

Agent: The Catalina 42 is a beautiful yacht. When would be convenient for you to view it?

Customer: I'm flexible this week. What times do you have available?

Agent: We have openings on Wednesday at 2 PM, Thursday at 10 AM, or Friday at 3 PM. Which works best for you?

Customer: Thursday at 10 AM would be perfect.

Agent: Excellent! I'll schedule you for Thursday at 10 AM. The yacht is located at our Newport marina. I'll send you the exact location and my contact information.

Customer: That sounds great. Should I bring anything specific?

Agent: Just bring a valid ID and comfortable shoes for walking on the deck. I'll have all the specifications and documentation ready for you.

Customer: Perfect, thank you so much for your help!`,
        summary:
          "Customer scheduled viewing appointment for Catalina 42 yacht. Appointment set for Thursday 10 AM at Newport marina with all necessary details provided.",
        parties: [
          {
            name: "James Wilson",
            role: "customer",
          },
          {
            name: "Emily Davis",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-21T10:30:45-04:00",
            duration: 156,
          },
        ],
        analysis: [],
      },
      {
        id: "5",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d743c",
        customerName: "Patricia Brown",
        agentName: "Mark Johnson",
        date: "2025-05-22T16:20:30-04:00",
        duration: 203,
        intent: "Returns",
        emotion: "frustrated",
        resolution: "resolved",
        satisfaction: 4.0,
        day: "22",
        transcript: `Agent: Hello, this is Mark from customer service. How can I help you today?

Customer: Hi Mark, I need to return some equipment I purchased last week. The marine radio isn't working properly.

Agent: I'm sorry to hear you're having issues with the marine radio. Can you tell me what specific problems you're experiencing?

Customer: The radio keeps cutting out and the reception is very poor, even in clear weather conditions.

Agent: That definitely sounds like a defective unit. Do you have your order number and receipt?

Customer: Yes, the order number is MR-7845 and I have the receipt right here.

Agent: Perfect. Since this appears to be a manufacturing defect, we can process a full refund or exchange. Which would you prefer?

Customer: I'd like an exchange for the same model, if possible.

Agent: Absolutely. I'll arrange for a replacement to be sent out today, and we'll include a prepaid return label for the defective unit.

Customer: That's great service. Thank you for making this so easy.

Agent: You're very welcome! You should receive the replacement within 2-3 business days.`,
        summary:
          "Customer returned defective marine radio with poor reception. Agent processed exchange for same model with expedited shipping and prepaid return label.",
        parties: [
          {
            name: "Patricia Brown",
            role: "customer",
          },
          {
            name: "Mark Johnson",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-22T16:20:30-04:00",
            duration: 203,
          },
        ],
        analysis: [],
      },
      {
        id: "6",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d744c",
        customerName: "Robert Garcia",
        agentName: "Jennifer Lee",
        date: "2025-05-23T11:15:18-04:00",
        duration: 98,
        intent: "Pricing",
        emotion: "calm",
        resolution: "resolved",
        satisfaction: 4.6,
        day: "23",
        transcript: `Agent: Good morning, this is Jennifer from Aquidneck Yacht Brokers. How may I help you?

Customer: Hi Jennifer, I'm interested in getting a quote for yacht insurance. I have a 38-foot sailboat.

Agent: I'd be happy to help you with that. Can you tell me the make, model, and year of your sailboat?

Customer: It's a 2018 Jeanneau Sun Odyssey 389.

Agent: Excellent choice! For a comprehensive quote, I'll need some additional information. What's the current market value of the yacht?

Customer: I believe it's valued around $180,000.

Agent: Perfect. And where will the yacht be primarily moored?

Customer: At the Newport Harbor marina.

Agent: Great! Based on that information, I can provide you with several insurance options. Our premium coverage starts at around $1,800 annually. Would you like me to email you detailed quotes from our partner insurance companies?

Customer: Yes, that would be very helpful. Thank you!

Agent: I'll send those over within the hour. Is there anything else I can help you with today?`,
        summary:
          "Customer requested yacht insurance quote for 2018 Jeanneau Sun Odyssey 389 valued at $180,000. Agent collected details and arranged to send comprehensive quotes from partner companies.",
        parties: [
          {
            name: "Robert Garcia",
            role: "customer",
          },
          {
            name: "Jennifer Lee",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-23T11:15:18-04:00",
            duration: 98,
          },
        ],
        analysis: [],
      },
      {
        id: "7",
        uuid: "019713bd-3268-86cd-9dd8-dd37220d745c",
        customerName: "Amanda Foster",
        agentName: "Kevin Chen",
        date: "2025-05-24T14:45:22-04:00",
        duration: 134,
        intent: "Technical Support",
        emotion: "confused",
        resolution: "resolved",
        satisfaction: 4.3,
        day: "24",
        transcript: `Agent: Hello, this is Kevin from technical support. How can I assist you today?

Customer: Hi Kevin, I'm having trouble with my chartplotter. The screen keeps freezing when I try to zoom in on certain areas.

Agent: I understand that must be frustrating. Can you tell me the make and model of your chartplotter?

Customer: It's a Garmin GPSMAP 8612xsv.

Agent: That's a great unit. This sounds like it might be a software issue. When did you last update the charts and software?

Customer: I'm not sure. I bought the boat six months ago and haven't updated anything since then.

Agent: That's likely the issue. The software updates often include bug fixes for freezing problems. I can walk you through the update process right now if you'd like.

Customer: Yes, please! I have my laptop here.

Agent: Perfect. First, you'll need to go to the Garmin website and download the Garmin Express software...

Customer: Okay, I'm following along. This is very helpful.

Agent: Great! Once the update is complete, the freezing issue should be resolved. The whole process takes about 20 minutes.

Customer: Thank you so much for your patience and help!`,
        summary:
          "Customer experiencing chartplotter screen freezing issues with Garmin GPSMAP 8612xsv. Agent identified outdated software as cause and guided customer through update process to resolve the problem.",
        parties: [
          {
            name: "Amanda Foster",
            role: "customer",
          },
          {
            name: "Kevin Chen",
            role: "agent",
          },
        ],
        dialog: [
          {
            type: "recording",
            start: "2025-05-24T14:45:22-04:00",
            duration: 134,
          },
        ],
        analysis: [],
      },
    ]

    // Calculate aggregated statistics
    const processedData: ProcessedVConData = {
      totalConversations: conversations.length,
      conversationsByDay: {},
      emotionDistribution: { calm: 0, frustrated: 0, excited: 0, confused: 0 },
      intentDistribution: {},
      resolutionStats: { resolved: 0, escalated: 0, pending: 0 },
      conversations,
    }

    // Process statistics
    conversations.forEach((conv) => {
      // Count by day
      processedData.conversationsByDay[conv.day] = (processedData.conversationsByDay[conv.day] || 0) + 1

      // Count emotions
      processedData.emotionDistribution[conv.emotion]++

      // Count intents
      processedData.intentDistribution[conv.intent] = (processedData.intentDistribution[conv.intent] || 0) + 1

      // Count resolutions
      processedData.resolutionStats[conv.resolution]++
    })

    return processedData
  }

  /**
   * Get conversations filtered by various criteria
   */
  async getConversations(filters?: {
    day?: string
    emotion?: string
    intent?: string
    resolution?: string
    searchTerm?: string
  }): Promise<VConConversation[]> {
    const data = await this.loadVConData()
    let filtered = data.conversations

    if (filters) {
      if (filters.day) {
        filtered = filtered.filter((conv) => conv.day === filters.day)
      }
      if (filters.emotion) {
        filtered = filtered.filter((conv) => conv.emotion === filters.emotion)
      }
      if (filters.intent) {
        filtered = filtered.filter((conv) => conv.intent === filters.intent)
      }
      if (filters.resolution) {
        filtered = filtered.filter((conv) => conv.resolution === filters.resolution)
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (conv) =>
            conv.customerName.toLowerCase().includes(term) ||
            conv.agentName.toLowerCase().includes(term) ||
            conv.transcript.toLowerCase().includes(term) ||
            conv.intent.toLowerCase().includes(term),
        )
      }
    }

    return filtered
  }

  /**
   * Get analytics data for the dashboard
   */
  async getAnalytics(): Promise<{
    totalConversations: number
    resolutionRate: number
    avgDuration: number
    avgSatisfaction: number
    emotionDistribution: Record<string, number>
    intentDistribution: Record<string, number>
    conversationsByDay: Record<string, number>
  }> {
    const data = await this.loadVConData()

    const totalResolved = data.resolutionStats.resolved || 0
    const resolutionRate = Math.round((totalResolved / data.totalConversations) * 100)

    const avgDuration = Math.round(
      data.conversations.reduce((sum, conv) => sum + conv.duration, 0) / data.conversations.length,
    )

    const avgSatisfaction =
      Math.round(
        (data.conversations.reduce((sum, conv) => sum + conv.satisfaction, 0) / data.conversations.length) * 10,
      ) / 10

    return {
      totalConversations: data.totalConversations,
      resolutionRate,
      avgDuration,
      avgSatisfaction,
      emotionDistribution: data.emotionDistribution,
      intentDistribution: data.intentDistribution,
      conversationsByDay: data.conversationsByDay,
    }
  }

  /**
   * Get a specific conversation by ID
   */
  async getConversationById(id: string): Promise<VConConversation | null> {
    const data = await this.loadVConData()
    return data.conversations.find((conv) => conv.id === id) || null
  }
}

export const vconDataService = VConDataService.getInstance()