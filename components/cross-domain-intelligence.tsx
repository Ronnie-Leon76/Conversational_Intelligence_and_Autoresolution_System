"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Globe, ArrowRight } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface CrossDomainIntelligenceProps {
  selectedDomain: string
  onDomainChange: (domain: string) => void
}

const domainData = {
  "yacht-brokerage": {
    name: "Yacht Brokerage",
    conversations: 342,
    resolutionRate: 87,
    avgDuration: 4.2,
    satisfaction: 4.6,
    commonIntents: ["Product Inquiry", "Scheduling", "Technical Support", "Returns", "Pricing"],
    emotionDistribution: { calm: 45, excited: 30, frustrated: 15, confused: 10 },
    peakHours: "12:00-14:00",
    specialties: ["Luxury sales", "Technical specifications", "Scheduling viewings"],
  },
  "e-commerce": {
    name: "E-Commerce",
    conversations: 1247,
    resolutionRate: 91,
    avgDuration: 3.1,
    satisfaction: 4.4,
    commonIntents: ["Order Status", "Returns", "Shipping", "Product Info", "Billing"],
    emotionDistribution: { calm: 55, frustrated: 25, excited: 12, confused: 8 },
    peakHours: "16:00-18:00",
    specialties: ["Order management", "Return processing", "Payment issues"],
  },
  healthcare: {
    name: "Healthcare",
    conversations: 892,
    resolutionRate: 78,
    avgDuration: 6.8,
    satisfaction: 4.2,
    commonIntents: ["Appointment", "Insurance", "Prescription", "Billing", "Emergency"],
    emotionDistribution: { calm: 35, frustrated: 35, confused: 20, excited: 10 },
    peakHours: "08:00-10:00",
    specialties: ["Appointment scheduling", "Insurance verification", "Medical inquiries"],
  },
  financial: {
    name: "Financial Services",
    conversations: 654,
    resolutionRate: 82,
    avgDuration: 5.5,
    satisfaction: 4.1,
    commonIntents: ["Account Balance", "Transactions", "Loans", "Cards", "Fraud"],
    emotionDistribution: { calm: 40, frustrated: 30, confused: 25, excited: 5 },
    peakHours: "09:00-11:00",
    specialties: ["Account management", "Fraud detection", "Loan processing"],
  },
  saas: {
    name: "SaaS/Tech",
    conversations: 1156,
    resolutionRate: 85,
    avgDuration: 4.8,
    satisfaction: 4.3,
    commonIntents: ["Technical Support", "Billing", "Feature Request", "Bug Report", "Training"],
    emotionDistribution: { calm: 50, frustrated: 28, confused: 15, excited: 7 },
    peakHours: "14:00-16:00",
    specialties: ["Technical troubleshooting", "Feature explanations", "Integration support"],
  },
}

const universalPatterns = [
  {
    pattern: "Frustration Triggers",
    description: "Long wait times, repeated explanations, system errors",
    frequency: 78,
    domains: ["All domains"],
  },
  {
    pattern: "Resolution Accelerators",
    description: "Immediate acknowledgment, clear next steps, proactive updates",
    frequency: 85,
    domains: ["All domains"],
  },
  {
    pattern: "Peak Time Patterns",
    description: "Higher volume during business hours, emotion intensity varies",
    frequency: 92,
    domains: ["E-commerce", "SaaS", "Financial"],
  },
  {
    pattern: "Escalation Predictors",
    description: "Multiple failed attempts, high emotion, complex issues",
    frequency: 67,
    domains: ["Healthcare", "Financial", "Technical"],
  },
]

const adaptationMetrics = [
  { domain: "Yacht Brokerage", adaptationTime: 2.3, accuracy: 89, confidence: 85 },
  { domain: "E-Commerce", adaptationTime: 1.8, accuracy: 92, confidence: 88 },
  { domain: "Healthcare", adaptationTime: 3.1, accuracy: 78, confidence: 75 },
  { domain: "Financial", adaptationTime: 2.7, accuracy: 82, confidence: 79 },
  { domain: "SaaS/Tech", adaptationTime: 2.1, accuracy: 85, confidence: 82 },
]

const crossDomainInsights = [
  {
    insight: "Emotional Intelligence Transfer",
    description: "Frustration detection patterns learned in e-commerce improve healthcare interactions by 23%",
    impact: "High",
    domains: ["E-Commerce → Healthcare"],
  },
  {
    insight: "Technical Language Adaptation",
    description: "SaaS technical support vocabulary enhances yacht brokerage technical discussions",
    impact: "Medium",
    domains: ["SaaS → Yacht Brokerage"],
  },
  {
    insight: "Urgency Classification",
    description: "Financial fraud detection urgency patterns improve medical emergency classification",
    impact: "High",
    domains: ["Financial → Healthcare"],
  },
  {
    insight: "Resolution Template Reuse",
    description: "Return/refund templates from e-commerce adapt well to service cancellations across domains",
    impact: "Medium",
    domains: ["E-Commerce → All"],
  },
]

export function CrossDomainIntelligence({ selectedDomain, onDomainChange }: CrossDomainIntelligenceProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const currentDomain = domainData[selectedDomain as keyof typeof domainData]

  const comparisonData = Object.entries(domainData).map(([key, data]) => ({
    domain: data.name,
    conversations: data.conversations,
    resolutionRate: data.resolutionRate,
    satisfaction: data.satisfaction,
    avgDuration: data.avgDuration,
  }))

  const emotionComparisonData = Object.entries(domainData).map(([key, data]) => ({
    domain: data.name.split(" ")[0],
    calm: data.emotionDistribution.calm,
    frustrated: data.emotionDistribution.frustrated,
    excited: data.emotionDistribution.excited,
    confused: data.emotionDistribution.confused,
  }))

  return (
    <div className="space-y-6">
      {/* Domain Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Cross-Domain Intelligence Platform
          </CardTitle>
          <CardDescription>Analyze conversation patterns across different industries and domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(domainData).map(([key, data]) => (
              <Button
                key={key}
                variant={selectedDomain === key ? "default" : "outline"}
                onClick={() => onDomainChange(key)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <div className="text-lg font-bold">{data.conversations}</div>
                <div className="text-xs text-center">{data.name}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Domain Overview</TabsTrigger>
          <TabsTrigger value="comparison">Cross-Domain Comparison</TabsTrigger>
          <TabsTrigger value="patterns">Universal Patterns</TabsTrigger>
          <TabsTrigger value="adaptation">Adaptation Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Domain Details */}
          <Card>
            <CardHeader>
              <CardTitle>{currentDomain.name} - Domain Analysis</CardTitle>
              <CardDescription>Detailed insights for the selected domain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentDomain.conversations}</div>
                  <p className="text-sm text-gray-600">Total Conversations</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentDomain.resolutionRate}%</div>
                  <p className="text-sm text-gray-600">Resolution Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentDomain.avgDuration} min</div>
                  <p className="text-sm text-gray-600">Avg Duration</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{currentDomain.satisfaction}/5.0</div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Common Intents</h4>
                  <div className="space-y-2">
                    {currentDomain.commonIntents.map((intent, index) => (
                      <div key={intent} className="flex items-center justify-between">
                        <span className="text-sm">{intent}</span>
                        <Badge variant="outline">{Math.max(30 - index * 5, 10)}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Domain Specialties</h4>
                  <div className="space-y-2">
                    {currentDomain.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="mr-2 mb-2">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <strong>Peak Hours:</strong> {currentDomain.peakHours}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emotion Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Emotion Distribution - {currentDomain.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(currentDomain.emotionDistribution).map(([emotion, value]) => ({
                      name: emotion,
                      value,
                      color:
                        emotion === "calm"
                          ? "#10B981"
                          : emotion === "frustrated"
                            ? "#EF4444"
                            : emotion === "excited"
                              ? "#F59E0B"
                              : "#6B7280",
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {Object.entries(currentDomain.emotionDistribution).map(([emotion, value], index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          emotion === "calm"
                            ? "#10B981"
                            : emotion === "frustrated"
                              ? "#EF4444"
                              : emotion === "excited"
                                ? "#F59E0B"
                                : "#6B7280"
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Domain Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolution Rate Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="resolutionRate" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversation Volume vs Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="conversations" fill="#10B981" />
                    <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Emotion Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Emotion Patterns Across Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={emotionComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="domain" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calm" stackId="a" fill="#10B981" name="Calm" />
                  <Bar dataKey="frustrated" stackId="a" fill="#EF4444" name="Frustrated" />
                  <Bar dataKey="excited" stackId="a" fill="#F59E0B" name="Excited" />
                  <Bar dataKey="confused" stackId="a" fill="#6B7280" name="Confused" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          {/* Universal Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Universal Conversation Patterns
              </CardTitle>
              <CardDescription>Common patterns that apply across all domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {universalPatterns.map((pattern, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{pattern.pattern}</h4>
                        <Badge variant="outline">{pattern.frequency}% frequency</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {pattern.domains.map((domain) => (
                          <Badge key={domain} variant="secondary" className="text-xs">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cross-Domain Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Cross-Domain Learning Insights</CardTitle>
              <CardDescription>How knowledge transfers between different domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossDomainInsights.map((insight, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{insight.insight}</h4>
                        <Badge variant={insight.impact === "High" ? "destructive" : "secondary"}>
                          {insight.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <ArrowRight className="h-4 w-4" />
                        {insight.domains.join(", ")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adaptation" className="space-y-6">
          {/* Adaptation Speed */}
          <Card>
            <CardHeader>
              <CardTitle>Domain Adaptation Metrics</CardTitle>
              <CardDescription>How quickly the AI adapts to new domains</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adaptationMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="domain" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="adaptationTime" fill="#8B5CF6" name="Adaptation Time (days)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Adaptation Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accuracy by Domain</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={adaptationMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="domain" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Accuracy" dataKey="accuracy" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adaptation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fastest Adaptation</span>
                    <Badge variant="outline">E-Commerce (1.8 days)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Highest Accuracy</span>
                    <Badge variant="outline">E-Commerce (92%)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Most Complex Domain</span>
                    <Badge variant="outline">Healthcare (3.1 days)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Adaptation</span>
                    <Badge variant="outline">2.4 days</Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Key Success Factors</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Transfer learning from similar domains</li>
                    <li>• Domain-specific vocabulary training</li>
                    <li>• Emotion pattern recognition</li>
                    <li>• Continuous feedback integration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
