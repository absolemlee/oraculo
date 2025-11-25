"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
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
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Palette,
  Globe,
  BookOpen,
  Zap,
  Shield,
  Database,
  Download,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Check,
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [autoSaveReadings, setAutoSaveReadings] = useState(true)
  const [showInterpretations, setShowInterpretations] = useState(true)
  const [language, setLanguage] = useState("en")
  const [defaultOracleSystem, setDefaultOracleSystem] = useState("traditional")

  const settingsSections = [
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize the visual appearance of the oracle",
      badge: null,
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage alerts and reading reminders",
      badge: "3 active",
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      badge: null,
    },
    {
      icon: BookOpen,
      title: "Oracle Preferences",
      description: "Configure default oracle systems and behaviors",
      badge: null,
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimize animations and rendering",
      badge: null,
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Control your data and reading history",
      badge: null,
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Export, import, and manage your readings",
      badge: null,
    },
  ]

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    // TODO: Implement actual theme switching logic
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Oracle Settings</h1>
                <p className="text-muted-foreground">
                  Configure your oracle experience and preferences
                </p>
              </div>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          <Separator />

          {/* Settings Overview */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {settingsSections.map((section) => (
                <Card key={section.title} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <section.icon className="h-5 w-5 text-muted-foreground" />
                      {section.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Appearance Settings */}
          <div className="mx-auto w-full max-w-6xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <CardTitle>Appearance</CardTitle>
                </div>
                <CardDescription>
                  Customize how the oracle looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun className="h-5 w-5" />
                      <span>Light</span>
                      {theme === "light" && <Check className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon className="h-5 w-5" />
                      <span>Dark</span>
                      {theme === "dark" && <Check className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                      onClick={() => handleThemeChange("system")}
                    >
                      <Monitor className="h-5 w-5" />
                      <span>System</span>
                      {theme === "system" && <Check className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Sound Effects</label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds during oracle casting
                    </p>
                  </div>
                  <Button
                    variant={soundEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>

                <Separator />

                {/* Animations */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Animations</label>
                    <p className="text-sm text-muted-foreground">
                      Enable animated transitions and effects
                    </p>
                  </div>
                  <Button
                    variant={animationsEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAnimationsEnabled(!animationsEnabled)}
                  >
                    {animationsEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Oracle Preferences */}
          <div className="mx-auto w-full max-w-6xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <CardTitle>Oracle Preferences</CardTitle>
                </div>
                <CardDescription>
                  Configure default oracle behaviors and systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default Oracle System */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Default Oracle System</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "traditional", label: "Traditional I-Ching" },
                      { id: "ifa", label: "Ifá Correspondence" },
                      { id: "runes", label: "Elder Futhark Runes" },
                      { id: "tarot", label: "Tarot Reading" },
                      { id: "unified", label: "Unified Oracle" },
                    ].map((oracle) => (
                      <Button
                        key={oracle.id}
                        variant={defaultOracleSystem === oracle.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setDefaultOracleSystem(oracle.id)}
                      >
                        {oracle.label}
                        {defaultOracleSystem === oracle.id && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Auto-save Readings */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto-save Readings</label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save all oracle consultations to history
                    </p>
                  </div>
                  <Button
                    variant={autoSaveReadings ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoSaveReadings(!autoSaveReadings)}
                  >
                    {autoSaveReadings ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <Separator />

                {/* Show Interpretations */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Show Interpretations</label>
                    <p className="text-sm text-muted-foreground">
                      Display detailed interpretations with each reading
                    </p>
                  </div>
                  <Button
                    variant={showInterpretations ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowInterpretations(!showInterpretations)}
                  >
                    {showInterpretations ? "Visible" : "Hidden"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Management */}
          <div className="mx-auto w-full max-w-6xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Data Management</CardTitle>
                </div>
                <CardDescription>
                  Manage your oracle readings and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Reading History
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Import Readings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                  <Button variant="destructive" className="justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Clear All History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Settings */}
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <Button onClick={() => {
                // TODO: Implement save logic
                alert("Settings saved successfully!")
              }}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
