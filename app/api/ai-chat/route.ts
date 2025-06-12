import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, domain, conversationData } = await req.json()

    const systemPrompt = `You are an AI assistant specialized in conversation intelligence and customer service analytics. You help analyze customer service conversations, identify patterns, and provide actionable insights.

Context:
- Domain: ${domain}
- You have access to conversation data including transcripts, emotions, intents, and resolution outcomes
- Focus on providing practical, data-driven insights and recommendations

Capabilities:
- Conversation sentiment and emotion analysis
- Intent classification and pattern recognition
- Performance metrics and trend identification
- Agent coaching recommendations
- Customer satisfaction improvement strategies
- Predictive analytics for escalation prevention

Respond in a helpful, professional manner with specific, actionable insights when possible.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: `User message: ${message}

${conversationData ? `Conversation context: ${JSON.stringify(conversationData, null, 2)}` : ""}

Please provide a helpful response with specific insights and recommendations.`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI Chat API Error:", error)
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
  }
}