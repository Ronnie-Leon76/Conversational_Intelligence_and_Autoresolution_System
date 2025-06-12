"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bot, TrendingUp, Brain, MessageSquare, Clock, Target, Zap, Settings } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AutoResolutionEngineProps {
  domain: string
}

const resolutionData = [
  { category: "Order Status", auto: 95, manual: 5, total: 234 },
  { category: "Returns", auto: 78, manual: 22, total: 189 },
  { category: "Shipping Info", auto: 92, manual: 8, total: 156 },
  { category: "Product Info", auto: 88, manual: 12, total: 143 },
  { category: "Technical Support", auto: 45, manual: 55, total: 98 },
  { category: "Billing", auto: 82, manual: 18, total: 87 },
]

const learningData = [
  { week: "Week 1", accuracy: 72, confidence: 68 },
  { week: "Week 2", accuracy: 76, confidence: 71 },
  { week: "Week 3", accuracy: 81, confidence: 75 },
  { week: "Week 4", accuracy: 85, confidence: 79 },
  { week: "Week 5", accuracy: 87, confidence: 82 },
  { week: "Week 6", accuracy: 89, confidence: 85 },
]

const templateData = [
  { name: "Order Status", usage: 45, success: 94 },
  { name: "Return Policy", usage: 32, success: 89 },
  { name: "Shipping Info", usage: 28, success: 96 },
  { name: "Product Specs", usage: 24, success: 87 },
  { name: "Refund Process", usage: 19, success: 91 },
]

const costSavingsData = [
  { name: "Agent Time Saved", value: 1240, color: "#10B981" },
  { name: "Faster Resolution", value: 890, color: "#3B82F6" },
  { name: "Reduced Escalations", value: 560, color: "#8B5CF6" },
  { name: "24/7 Availability", value: 340, color: "#F59E0B" },
]

export function AutoResolutionEngine({ domain }: AutoResolutionEngineProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const totalAutoResolved = resolutionData.reduce((acc, item) => acc + (item.total * item.auto) / 100, 0)
  const totalConversations = resolutionData.reduce((acc, item) => acc + item.total, 0)
  const overallAutoRate = Math.round((totalAutoResolved / totalConversations) * 100)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Resolution Rate</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallAutoRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations Handled</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{Math.round(totalAutoResolved)}</div>
            <p className="text-xs text-muted-foreground">Out of {totalConversations} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">1.2s</div>
            <p className="text-xs text-muted-foreground">Instant automated responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4.3/5.0</div>
            <p className="text-xs text-muted-foreground">Auto-resolved conversations</p>
          </CardContent>
        </Card>
      </div>

      {/* Resolution Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resolution by Category</CardTitle>
            <CardDescription>Auto vs manual resolution rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="auto" stackId="a" fill="#10B981" name="Auto-Resolved" />
                <Bar dataKey="manual" stackId="a" fill="#EF4444" name="Manual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>AI accuracy improvement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={learningData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} name="Accuracy %" />
                <Line type="monotone" dataKey="confidence" stroke="#8B5CF6" strokeWidth={2} name="Confidence %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resolution Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Resolution Templates
          </CardTitle>
          <CardDescription>Pre-built responses for common scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateData.map((template) => (
              <Card
                key={template.name}
                className={`cursor-pointer transition-colors ${
                  selectedTemplate === template.name ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTemplate(template.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Badge variant="outline">{template.success}% success</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage</span>
                      <span>{template.usage} times</span>
                    </div>
                    <Progress value={template.success} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Template: {selectedTemplate}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Template Response:</strong>
                  </p>
                  <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                    {selectedTemplate === "Order Status" && (
                      <p className="text-sm">
                        "Thank you for contacting us about your order. I can see that your order #{"{"}order_number{"}"}{" "}
                        was placed on {"{"}order_date{"}"} and is currently {"{"}status{"}"}.{"{"}if_shipped{"}"}Your
                        tracking number is {"{"}tracking_number{"}"} and you can expect delivery by {"{"}delivery_date
                        {"}"}. {"{"}endif{"}"}
                        Is there anything else I can help you with regarding your order?"
                      </p>
                    )}
                    {selectedTemplate === "Return Policy" && (
                      <p className="text-sm">
                        "I understand you'd like to return an item. Our return policy allows returns within 30 days of
                        purchase for a full refund. The item should be in original condition with all packaging. I can
                        help you start the return process right now. Would you like me to generate a return label for
                        you?"
                      </p>
                    )}
                    {selectedTemplate === "Shipping Info" && (
                      <p className="text-sm">
                        "For shipping information, we offer several options: Standard shipping (5-7 business days),
                        Express shipping (2-3 business days), and Overnight shipping. Shipping costs vary by location
                        and item weight. Would you like me to calculate shipping costs for your specific order?"
                      </p>
                    )}
                    {selectedTemplate === "Product Specs" && (
                      <p className="text-sm">
                        "I'd be happy to provide detailed specifications for {"{"}product_name{"}"}.{"{"}product_specs
                        {"}"} You can find the complete technical documentation in our product manual. Would you like me
                        to send you the detailed specification sheet?"
                      </p>
                    )}
                    {selectedTemplate === "Refund Process" && (
                      <p className="text-sm">
                        "I can help you with the refund process. Once we receive your returned item and it passes our
                        quality check, your refund will be processed within 3-5 business days to your original payment
                        method. You'll receive an email confirmation once the refund is initiated."
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Template
                  </Button>
                  <Button size="sm" variant="outline">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Savings Analysis</CardTitle>
            <CardDescription>Monthly savings from automation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={costSavingsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costSavingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Savings"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {costSavingsData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Resolution Accuracy</span>
                  <span className="text-sm text-gray-600">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm text-gray-600">86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Cost Reduction</span>
                  <span className="text-sm text-gray-600">73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Response Speed</span>
                  <span className="text-sm text-gray-600">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$3,030</div>
                  <p className="text-sm text-gray-600">Total Monthly Savings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Learning Dashboard
          </CardTitle>
          <CardDescription>How the system improves over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
              <p className="text-sm text-gray-600">Training Conversations</p>
              <p className="text-xs text-gray-500 mt-1">Updated daily</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <p className="text-sm text-gray-600">Intent Categories</p>
              <p className="text-xs text-gray-500 mt-1">Automatically detected</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
              <p className="text-sm text-gray-600">Model Confidence</p>
              <p className="text-xs text-gray-500 mt-1">Current accuracy</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Recent Improvements</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Enhanced yacht terminology recognition (+12% accuracy)</li>
              <li>• Improved emotion detection for frustrated customers (+8% accuracy)</li>
              <li>• New template for technical support queries (89% success rate)</li>
              <li>• Better handling of complex return scenarios (+15% resolution rate)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
