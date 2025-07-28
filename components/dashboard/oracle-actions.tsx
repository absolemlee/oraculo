"use client"

import { Bot, BookOpen, SquareTerminal, History, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface OracleActionsProps {
  onActionClick: (action: string) => void
}

export function OracleActions({ onActionClick }: OracleActionsProps) {
  const actions = [
    {
      id: "traditional",
      title: "Traditional I-Ching",
      description: "Ancient Chinese divination system with 64 hexagrams",
      icon: SquareTerminal,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "ifa",
      title: "Ifá Correspondence", 
      description: "Yoruba wisdom tradition mapped to I-Ching hexagrams",
      icon: Bot,
      color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      id: "runes",
      title: "Elder Futhark Runes",
      description: "Ancient Nordic runic divination system",
      icon: Zap,
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      id: "tarot",
      title: "Tarot Cards",
      description: "Complete 78-card deck with traditional imagery",
      icon: Sparkles,
      color: "bg-rose-50 hover:bg-rose-100 border-rose-200",
      iconColor: "text-rose-600",
    },
    {
      id: "hexagram",
      title: "Hexagram Lookup",
      description: "Study any of the 64 hexagrams and their meanings",
      icon: BookOpen,
      color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      id: "unified",
      title: "Unified Oracle",
      description: "Comprehensive reading combining Runes, Tarot, and I-Ching/Ifá",
      icon: Sparkles,
      color: "bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200",
      iconColor: "text-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      id: "history",
      title: "Reading History",
      description: "Review your past consultations and insights",
      icon: History,
      color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
      iconColor: "text-slate-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {actions.map((action) => (
        <Card 
          key={action.id} 
          className={`cursor-pointer transition-colors ${action.color}`}
          onClick={() => onActionClick(action.id)}
        >
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className={`p-2 rounded-lg ${action.iconColor} bg-white/60`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <CardTitle className="text-base">{action.title}</CardTitle>
              <CardDescription className="text-sm">
                {action.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onActionClick(action.id)
              }}
            >
              Start Consultation
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
