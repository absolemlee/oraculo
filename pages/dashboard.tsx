"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SectionCards } from "@/components/dashboard/section-cards"
import { OracleActions } from "@/components/dashboard/oracle-actions"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleOracleAction = async (action: string) => {
    setLoading(true)
    try {
      switch (action) {
        case "traditional":
          router.push("/console/traditional")
          break
        case "ifa":
          router.push("/console/ifa")
          break
        case "runes":
          router.push("/console/runes")
          break
        case "tarot":
          router.push("/console/tarot")
          break
        case "hexagram":
          router.push("/console/lookup")
          break
        case "unified":
          router.push("/console/unified")
          break
        case "history":
          // TODO: Implement history page
          console.log("Navigate to history")
          break
        default:
          console.log("Unknown action:", action)
      }
    } catch (error) {
      console.error("Error handling oracle action:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Welcome Section */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Oracle Dashboard</h1>
                <p className="text-muted-foreground">
                  Access ancient wisdom through I-Ching, Ifá, Runes, and Tarot divination systems
                </p>
              </div>
              <Button onClick={() => router.push("/")}>
                Return to Oracle
              </Button>
            </div>
          </div>

          <Separator />

          {/* Stats Cards */}
          <div className="mx-auto w-full max-w-6xl">
            <SectionCards />
          </div>

          <Separator />

          {/* Oracle Actions */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Oracle Consultation Center</CardTitle>
                    <CardDescription>
                      Choose your preferred divination method to receive guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OracleActions onActionClick={handleOracleAction} />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest oracle consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-blue-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Traditional I-Ching
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Hexagram 27: Nourishment
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-amber-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Ifá Correspondence
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Ogbe + Otura reading
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-purple-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Elder Futhark Runes
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Norns cast: Uruz, Kenaz, Fehu
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-rose-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Tarot Reading
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Three-card spread: Past, Present, Future
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-emerald-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Hexagram Lookup
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Studied Hexagram 1: The Creative
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Unified Oracle
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Complete guidance: Runes, Tarot, I-Ching convergence
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <Button variant="outline" size="sm" className="w-full">
                      View All History
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* API Access Information */}
          <div className="mx-auto w-full max-w-6xl">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Integrate oracle functionality into your applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Traditional I-Ching API</h4>
                    <p className="text-sm text-muted-foreground">
                      POST /api/reading - Get complete I-Ching readings with changing lines
                    </p>
                    <code className="text-xs bg-muted p-1 rounded">
                      {`curl -X POST /api/reading -d '{"question":"..."}'`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Ifá Correspondence API</h4>
                    <p className="text-sm text-muted-foreground">
                      POST /api/ifa-reading - Access Yoruba wisdom traditions
                    </p>
                    <code className="text-xs bg-muted p-1 rounded">
                      {`curl -X POST /api/ifa-reading -d '{"question":"..."}'`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Runes API</h4>
                    <p className="text-sm text-muted-foreground">
                      POST /api/rune-reading - Elder Futhark rune casting
                    </p>
                    <code className="text-xs bg-muted p-1 rounded">
                      {`curl -X POST /api/rune-reading -d '{"question":"..."}'`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Tarot API</h4>
                    <p className="text-sm text-muted-foreground">
                      POST /api/tarot-reading - Complete 78-card Tarot readings
                    </p>
                    <code className="text-xs bg-muted p-1 rounded">
                      {`curl -X POST /api/tarot-reading -d '{"readingType":"single"}'`}
                    </code>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Unified Oracle API</h4>
                    <p className="text-sm text-muted-foreground">
                      POST /api/unified-oracle - Comprehensive readings combining all systems
                    </p>
                    <code className="text-xs bg-muted p-1 rounded">
                      {`curl -X POST /api/unified-oracle -d '{"question":"..."}'`}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
