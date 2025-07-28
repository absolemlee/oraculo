"use client"

import { useState, useEffect } from "react"
import { Activity, BookOpen, Bot, SquareTerminal, TrendingUp, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const [stats, setStats] = useState({
    totalReadings: 0,
    activeUsers: 0,
    weeklyGrowth: 0,
    accuracy: 0,
  })

  useEffect(() => {
    // Simulate loading stats
    const loadStats = () => {
      setStats({
        totalReadings: 1234,
        activeUsers: 89,
        weeklyGrowth: 12.5,
        accuracy: 94.2,
      })
    }

    const timer = setTimeout(loadStats, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Readings
          </CardTitle>
          <SquareTerminal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReadings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            All divination consultations
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Users
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            Current consultation sessions
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="text-blue-600">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Weekly Growth
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.weeklyGrowth}%</div>
          <p className="text-xs text-muted-foreground">
            Increase from last week
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              Growing
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Oracle Accuracy
          </CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.accuracy}%</div>
          <p className="text-xs text-muted-foreground">
            Prediction accuracy rate
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="text-purple-600">
              <BookOpen className="w-3 h-3 mr-1" />
              Optimal
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
