"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Phone, TrendingUp, Clock, CheckCircle, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { vconDataService } from "@/lib/vcon-data-service"

interface ConversationAnalyticsProps {
  domain: string
}

const volumeData = [
  { time: "00:00", calls: 12, resolved: 10 },
  { time: "04:00", calls: 8, resolved: 7 },
  { time: "08:00", calls: 45, resolved: 38 },
  { time: "12:00", calls: 67, resolved: 58 },
  { time: "16:00", calls: 52, resolved: 47 },
  { time: "20:00", calls: 23, resolved: 21 },
]

const emotionData = [
  { emotion: "Calm", value: 45, color: "#10B981" },
  { emotion: "Frustrated", value: 25, color: "#EF4444" },
  { emotion: "Excited", value: 20, color: "#F59E0B" },
  { emotion: "Confused", value: 10, color: "#6B7280" },
]

const resolutionData = [
  { category: "Returns", auto: 85, manual: 15 },
  { category: "Shipping", auto: 92, manual: 8 },
  { category: "Technical", auto: 45, manual: 55 },
  { category: "Billing", auto: 78, manual: 22 },
  { category: "General", auto: 88, manual: 12 },
]

export function ConversationAnalytics({ domain }: ConversationAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        const data = await vconDataService.getAnalytics()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error loading analytics:", error)
      } finally {
        setLoading(false)
      }
    }
    loadAnalytics()
  }, [domain])

  const getDomainMetrics = () => {
    if (!analyticsData) {
      return {
        totalCalls: 0,
        todayCalls: 0,
        resolutionRate: 0,
        avgResolutionTime: "0 min",
        customerSat: 0,
        agentPerformance: 0,
      }
    }

    return {
      totalCalls: analyticsData.totalConversations,
      todayCalls: Math.floor(analyticsData.totalConversations * 0.1), // Simulate today's calls
      resolutionRate: analyticsData.resolutionRate,
      avgResolutionTime: `${Math.floor(analyticsData.avgDuration / 60)}.${analyticsData.avgDuration % 60} min`,
      customerSat: analyticsData.avgSatisfaction,
      agentPerformance: Math.min(95, analyticsData.resolutionRate + 5),
    }
  }

  const metrics = getDomainMetrics()

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{metrics.todayCalls} today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">-0.3 min from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.customerSat}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversation Volume</CardTitle>
            <CardDescription>Calls and resolutions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="calls" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stackId="2"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Emotions</CardTitle>
            <CardDescription>Distribution of detected emotions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {emotionData.map((item) => (
                <Badge key={item.emotion} variant="outline" className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.emotion}: {item.value}%
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resolution Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Resolution Performance</CardTitle>
          <CardDescription>Automated vs manual resolution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="auto" stackId="a" fill="#10B981" name="Auto-Resolved" />
              <Bar dataKey="manual" stackId="a" fill="#EF4444" name="Manual" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">12:00 - 14:00</span>
                <Badge>67 calls</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">16:00 - 18:00</span>
                <Badge variant="secondary">52 calls</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">08:00 - 10:00</span>
                <Badge variant="secondary">45 calls</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Order Status</span>
                <Badge>32%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Returns</span>
                <Badge variant="secondary">28%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Technical Support</span>
                <Badge variant="secondary">21%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Avg Handle Time</span>
                <Badge>{metrics.avgResolutionTime}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">First Call Resolution</span>
                <Badge variant="secondary">{metrics.resolutionRate}%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Quality Score</span>
                <Badge variant="secondary">{metrics.agentPerformance}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}