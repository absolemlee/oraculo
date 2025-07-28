import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TarotCasting from '@/components/tarot-casting';

export default function TarotConsole() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tarot Console</h1>
            <p className="text-gray-600 mt-1">Complete 78-card Tarot deck with traditional Rider-Waite-Smith imagery</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              ← Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Main Oracle
            </Button>
          </div>
        </div>

        {/* Enhanced Tarot Interface */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border shadow-lg p-6">
          <TarotCasting />
        </div>

        {/* Additional Console Features */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Deck Information */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deck Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Cards:</span>
                    <span className="font-medium">78</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Major Arcana:</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minor Arcana:</span>
                    <span className="font-medium">56</span>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Wands (Fire):</span>
                      <span className="font-medium">14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cups (Water):</span>
                      <span className="font-medium">14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Swords (Air):</span>
                      <span className="font-medium">14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pentacles (Earth):</span>
                      <span className="font-medium">14</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🔍 Card Meanings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📚 Spread Guide
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🎴 Random Card
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📊 Reading History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tarot Wisdom</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p className="italic">
                    "The Tarot is a symbolic map of consciousness that encompasses 
                    our journey through life, both spiritually and practically."
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    - Rachel Pollack
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Tarot Interface */}
          <div className="lg:col-span-3">
            {/* This space is reserved for enhanced features */}
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Features Coming Soon</CardTitle>
                <CardDescription>
                  Advanced Tarot tools and study materials will be added here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔮 Card Study Mode</h4>
                    <p className="text-sm text-gray-600">
                      Detailed exploration of individual cards with symbolism, 
                      astrology, and kabbalah correspondences.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📖 Spread Builder</h4>
                    <p className="text-sm text-gray-600">
                      Create custom spreads and save your favorite 
                      layouts for future readings.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📊 Reading Journal</h4>
                    <p className="text-sm text-gray-600">
                      Track your readings over time and discover 
                      patterns in your spiritual journey.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🎯 Learning Path</h4>
                    <p className="text-sm text-gray-600">
                      Structured lessons for mastering Tarot reading 
                      from beginner to advanced levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import required components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
