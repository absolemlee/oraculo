"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowLeft, Clock, Target, Route, Zap } from "lucide-react"

interface UnifiedOracleReading {
  question: string;
  timestamp: string;
  generalOutlook: {
    type: 'norns_spread';
    past: {
      rune: any;
      reversed: boolean;
      interpretation: string;
    };
    present: {
      rune: any;
      reversed: boolean;
      interpretation: string;
    };
    future: {
      rune: any;
      reversed: boolean;
      interpretation: string;
    };
    overallGuidance: string;
  };
  currentPath: {
    type: 'tarot_card';
    card: any;
    reversed: boolean;
    interpretation: string;
    guidance: string;
  };
  pathOfResolution: {
    type: 'hexagram_with_ifa';
    hexagram: {
      number: number;
      name: string;
      symbol: string;
      glyph: string;
      english: string;
      interpretation: string;
      trigrams?: string;
    };
    ifa: {
      primary: string;
      primaryGlyph: string;
      composition: {
        upper: string;
        lower: string;
      };
    };
    changingLines: Array<{
      line: number;
      text: string;
      comments: string;
    }> | null;
    transformed?: {
      hexagram: {
        number: number;
        name: string;
        symbol: string;
        english: string;
      };
      ifa: {
        secondary: string;
        secondaryGlyph: string;
      };
    } | null;
    guidance: string;
  };
  synthesis: {
    keyThemes: string[];
    overallMessage: string;
    actionSteps: string[];
    timing: string;
  };
}

export default function UnifiedOraclePage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [reading, setReading] = useState<UnifiedOracleReading | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/unified-oracle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to get unified oracle reading")
      }

      const data = await response.json()
      setReading(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleNewReading = () => {
    setReading(null)
    setQuestion("")
    setError("")
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-gradient-to-r from-purple-500 to-pink-500" />
            Unified Oracle Console
          </h1>
          <p className="text-muted-foreground">
            Comprehensive divination combining Runes, Tarot, and I-Ching wisdom
          </p>
        </div>
      </div>

      {!reading ? (
        /* Input Form */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Seek Comprehensive Guidance
            </CardTitle>
            <CardDescription>
              Ask your question to receive insights from three ancient wisdom traditions: 
              Runic Norns spread for general outlook, Tarot for your current path, 
              and I-Ching with Ifá correspondence for resolution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What guidance do you seek across all traditions? (e.g., 'How can I find clarity in my career transition?')"
                  className="min-h-[100px]"
                  maxLength={500}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {question.length}/500 characters
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading || !question.trim()} className="w-full">
                {loading ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Consulting the Ancient Wisdom...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Receive Unified Oracle Reading
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* Reading Results */
        <div className="space-y-6">
          {/* Question Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Question
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                "{reading.question}"
              </CardDescription>
              <p className="text-sm text-muted-foreground">
                Reading performed on {new Date(reading.timestamp).toLocaleString()}
              </p>
            </CardHeader>
          </Card>

          {/* General Outlook - Norns Spread */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                General Outlook - The Norns Speak
              </CardTitle>
              <CardDescription>
                Past, Present, and Future revealed through Elder Futhark Runes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Past */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-600">Past - Urd</h3>
                    <div className="text-4xl font-mono my-2">{reading.generalOutlook.past.rune.symbol}</div>
                    <p className="font-medium">
                      {reading.generalOutlook.past.rune.name}
                      {reading.generalOutlook.past.reversed && (
                        <Badge variant="secondary" className="ml-2 text-xs">Reversed</Badge>
                      )}
                    </p>
                    <Badge variant="outline">{reading.generalOutlook.past.rune.aett}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reading.generalOutlook.past.interpretation}
                  </p>
                </div>

                {/* Present */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="font-semibold text-green-600">Present - Verdandi</h3>
                    <div className="text-4xl font-mono my-2">{reading.generalOutlook.present.rune.symbol}</div>
                    <p className="font-medium">
                      {reading.generalOutlook.present.rune.name}
                      {reading.generalOutlook.present.reversed && (
                        <Badge variant="secondary" className="ml-2 text-xs">Reversed</Badge>
                      )}
                    </p>
                    <Badge variant="outline">{reading.generalOutlook.present.rune.aett}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reading.generalOutlook.present.interpretation}
                  </p>
                </div>

                {/* Future */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="font-semibold text-amber-600">Future - Skuld</h3>
                    <div className="text-4xl font-mono my-2">{reading.generalOutlook.future.rune.symbol}</div>
                    <p className="font-medium">
                      {reading.generalOutlook.future.rune.name}
                      {reading.generalOutlook.future.reversed && (
                        <Badge variant="secondary" className="ml-2 text-xs">Reversed</Badge>
                      )}
                    </p>
                    <Badge variant="outline">{reading.generalOutlook.future.rune.aett}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reading.generalOutlook.future.interpretation}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Overall Guidance from the Norns</h4>
                <p className="text-purple-800">{reading.generalOutlook.overallGuidance}</p>
              </div>
            </CardContent>
          </Card>

          {/* Current Path - Tarot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-rose-600" />
                Current Path - Tarot Guidance
              </CardTitle>
              <CardDescription>
                The card that illuminates your present journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="text-center space-y-3">
                    <div className="text-6xl">🃏</div>
                    <h3 className="text-xl font-semibold">
                      {reading.currentPath.card.name}
                      {reading.currentPath.reversed && (
                        <Badge variant="secondary" className="ml-2">Reversed</Badge>
                      )}
                    </h3>
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline">
                        {reading.currentPath.card.arcana === 'major' ? 'Major Arcana' : `${reading.currentPath.card.suit} - Minor Arcana`}
                      </Badge>
                      {reading.currentPath.card.element && (
                        <Badge variant="outline">{reading.currentPath.card.element}</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {reading.currentPath.card.keywords.slice(0, 4).map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Path Interpretation</h4>
                    <p className="text-muted-foreground">{reading.currentPath.interpretation}</p>
                  </div>
                  
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-900 mb-2">Path Guidance</h4>
                    <p className="text-rose-800">{reading.currentPath.guidance}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Path of Resolution - I-Ching with Ifá */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-600" />
                Path of Resolution - I-Ching & Ifá Wisdom
              </CardTitle>
              <CardDescription>
                Ancient Chinese and Yoruba traditions reveal the path forward
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* I-Ching Hexagram */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">I-Ching Hexagram</h3>
                    <div className="text-6xl font-mono mb-2">{reading.pathOfResolution.hexagram.glyph}</div>
                    <h4 className="text-lg font-semibold">
                      {reading.pathOfResolution.hexagram.number}. {reading.pathOfResolution.hexagram.english}
                    </h4>
                    <p className="text-muted-foreground">{reading.pathOfResolution.hexagram.name}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-emerald-900 mb-2">Hexagram Interpretation</h5>
                    <p className="text-emerald-800 text-sm">{reading.pathOfResolution.hexagram.interpretation}</p>
                  </div>

                  {reading.pathOfResolution.changingLines && (
                    <div className="space-y-2">
                      <h5 className="font-semibold">Changing Lines</h5>
                      {reading.pathOfResolution.changingLines.map((line, index) => (
                        <div key={index} className="border-l-4 border-amber-500 pl-3 py-1">
                          <p className="font-medium text-sm">Line {line.line}</p>
                          <p className="text-xs text-muted-foreground">{line.text}</p>
                          <p className="text-xs text-muted-foreground italic">{line.comments}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ifá Correspondence */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Ifá Correspondence</h3>
                    <div className="text-6xl font-mono mb-2">{reading.pathOfResolution.ifa.primaryGlyph}</div>
                    <h4 className="text-lg font-semibold">{reading.pathOfResolution.ifa.primary}</h4>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant="outline">Upper: {reading.pathOfResolution.ifa.composition.upper}</Badge>
                      <Badge variant="outline">Lower: {reading.pathOfResolution.ifa.composition.lower}</Badge>
                    </div>
                  </div>

                  {reading.pathOfResolution.transformed && (
                    <div className="border-t pt-4">
                      <h5 className="font-semibold mb-2">Transformation</h5>
                      <div className="text-center space-y-1">
                        <p className="text-sm">
                          → Hexagram {reading.pathOfResolution.transformed.hexagram.number}: {reading.pathOfResolution.transformed.hexagram.english}
                        </p>
                        {reading.pathOfResolution.transformed.ifa.secondary && (
                          <p className="text-sm">→ {reading.pathOfResolution.transformed.ifa.secondary}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">Resolution Guidance</h4>
                <p className="text-emerald-800">{reading.pathOfResolution.guidance}</p>
              </div>
            </CardContent>
          </Card>

          {/* Synthesis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gradient-to-r from-purple-500 to-pink-500" />
                Universal Synthesis
              </CardTitle>
              <CardDescription>
                The convergence of all wisdom traditions for your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Themes */}
              <div>
                <h4 className="font-semibold mb-3">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {reading.synthesis.keyThemes.map((theme, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Overall Message */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Universal Message</h4>
                <p className="text-purple-800">{reading.synthesis.overallMessage}</p>
              </div>

              {/* Action Steps */}
              <div>
                <h4 className="font-semibold mb-3">Recommended Actions</h4>
                <div className="space-y-2">
                  {reading.synthesis.actionSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Cosmic Timing</h4>
                <p className="text-amber-800">{reading.synthesis.timing}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleNewReading} className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              New Unified Reading
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
