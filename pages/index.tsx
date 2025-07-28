import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { RuneCasting } from '@/components/rune-casting';
import TarotCasting from '@/components/tarot-casting';

interface TraditionalReading {
  question: string;
  number: number;
  details: any;
  hasChanging: boolean;
  transformedNumber: number | null;
  transformedDetails: any;
  changingLineDetails: Array<{
    line: number;
    text: string;
    comments: string;
  }>;
}

interface IfaReading {
  question: string;
  hexagram: {
    number: number;
    symbol: string;
    english: string;
  };
  ifa: {
    primary: string;
    primaryGlyph: string;
  };
  changingLines: Array<{
    line: number;
    text: string;
  }> | null;
  transformed: {
    hexagram: {
      number: number;
      symbol: string;
      english: string;
    };
    ifa: {
      secondary: string;
      secondaryGlyph: string;
    };
  } | null;
}

interface HexagramDetails {
  hex: number;
  hex_font: string;
  trad_chinese: string;
  pinyin: string;
  english: string;
  binary: number;
  od: string;
  wilhelm_above: any;
  wilhelm_below: any;
  wilhelm_symbolic: string;
  wilhelm_judgment: {
    text: string;
    comments: string;
  };
  wilhelm_image: {
    text: string;
    comments: string;
  };
  wilhelm_lines: any;
}

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'traditional' | 'ifa' | 'runes' | 'tarot' | 'lookup'>('traditional');
  const [loading, setLoading] = useState(false);

  // Handle URL tab parameter
  useEffect(() => {
    if (router.query.tab) {
      const tab = router.query.tab as string;
      if (['traditional', 'ifa', 'runes', 'lookup'].includes(tab)) {
        setActiveTab(tab as 'traditional' | 'ifa' | 'runes' | 'tarot' | 'lookup');
      }
    }
  }, [router.query.tab]);
  
  // Traditional reading state
  const [traditionalQuestion, setTraditionalQuestion] = useState('What guidance do you have for me?');
  const [traditionalReading, setTraditionalReading] = useState<TraditionalReading | null>(null);
  
  // Ifá reading state
  const [ifaQuestion, setIfaQuestion] = useState('What wisdom does Ifá have for me?');
  const [ifaReading, setIfaReading] = useState<IfaReading | null>(null);
  
  // Hexagram lookup state
  const [hexagramId, setHexagramId] = useState('1');
  const [hexagramDetails, setHexagramDetails] = useState<HexagramDetails | null>(null);

  // Helper function to parse Ifá names
  const parseIfaNames = (combinedName: string) => {
    const parts = combinedName.split(' + ');
    return {
      lower: parts[0] || parts[1], // First part is lower trigram (cast first)
      upper: parts[1] || parts[0]  // Second part is upper trigram
    };
  };

  // Helper function to split Ifá glyph into lower and upper parts
  const parseIfaGlyph = (glyph: string) => {
    const parts = glyph.split('\n---\n');
    return {
      lower: parts[0] || parts[1], // First part is lower trigram (cast first)
      upper: parts[1] || parts[0]  // Second part is upper trigram
    };
  };

  // Helper function to render glyph with larger ◯ symbols
  const renderGlyphWithLargerCircles = (glyph: string) => {
    return glyph.split('').map((char, index) => (
      <span 
        key={index} 
        style={{ 
          fontSize: char === '◯' ? '2.1rem' : '1.2rem',
          fontWeight: char === '◯' ? 'bold' : 'normal'
        }}
      >
        {char}
      </span>
    ));
  };

  const getTraditionalReading = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: traditionalQuestion })
      });
      const data = await response.json();
      setTraditionalReading(data);
    } catch (error) {
      console.error('Error getting traditional reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIfaReading = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ifa-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: ifaQuestion })
      });
      const data = await response.json();
      setIfaReading(data);
    } catch (error) {
      console.error('Error getting Ifá reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHexagramDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/hexagram/${hexagramId}`);
      const data = await response.json();
      setHexagramDetails(data);
    } catch (error) {
      console.error('Error getting hexagram details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">Oráculo</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">Ancient Wisdom Through I-Ching and Ifá Divination</p>
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard'}
              className="mr-4"
            >
              📊 Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard'}
            >
              🔮 Oracle Console
            </Button>
          </div>
        </div>

        {/* Main Card Container */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl sm:text-3xl text-slate-800">Choose Your Divination</CardTitle>
            <CardDescription className="text-base sm:text-lg">Select a method to receive guidance from ancient wisdom traditions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100 rounded-xl p-2 shadow-inner">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant={activeTab === 'traditional' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('traditional')}
                    className="text-sm sm:text-base px-6 py-3 rounded-lg transition-all"
                  >
                    Traditional I-Ching
                  </Button>
                  <Button
                    variant={activeTab === 'ifa' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('ifa')}
                    className="text-sm sm:text-base px-6 py-3 rounded-lg transition-all"
                  >
                    Ifá Correspondence
                  </Button>
                  <Button
                    variant={activeTab === 'runes' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('runes')}
                    className="text-sm sm:text-base px-6 py-3 rounded-lg transition-all"
                  >
                    Runes
                  </Button>
                  <Button
                    variant={activeTab === 'tarot' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('tarot')}
                    className="text-sm sm:text-base px-6 py-3 rounded-lg transition-all"
                  >
                    Tarot
                  </Button>
                  <Button
                    variant={activeTab === 'lookup' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('lookup')}
                    className="text-sm sm:text-base px-6 py-3 rounded-lg transition-all"
                  >
                    Hexagram Lookup
                  </Button>
                </div>
              </div>
            </div>

            {/* Traditional I-Ching Tab */}
            {activeTab === 'traditional' && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Traditional I-Ching Reading</h3>
                <p className="text-blue-700 mb-4">
                  Get a complete I-Ching reading with Wilhelm translation, changing lines, and transformations
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-900">Your Question</label>
                    <Textarea
                      value={traditionalQuestion}
                      onChange={(e) => setTraditionalQuestion(e.target.value)}
                      placeholder="Enter your question..."
                      rows={3}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <Button onClick={getTraditionalReading} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {loading ? 'Consulting the Oracle...' : 'Get Traditional Reading'}
                  </Button>
                </div>
              </div>
            )}

            {/* Ifá Correspondence Tab */}
            {activeTab === 'ifa' && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Ifá Correspondence Reading</h3>
                <p className="text-amber-700 mb-4">
                  Discover the Ifá odù corresponding to I-Ching hexagrams with traditional Yoruba wisdom
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-amber-900">Your Question</label>
                    <Textarea
                      value={ifaQuestion}
                      onChange={(e) => setIfaQuestion(e.target.value)}
                      placeholder="Enter your question for the Ifá oracle..."
                      rows={3}
                      className="border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <Button onClick={getIfaReading} disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700">
                    {loading ? 'Consulting Ifá...' : 'Get Ifá Reading'}
                  </Button>
                </div>
              </div>
            )}

            {/* Runes Tab */}
            {activeTab === 'runes' && (
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Elder Futhark Runes</h3>
                <p className="text-purple-700 mb-4">
                  Cast runes from the ancient Nordic Elder Futhark for guidance and wisdom
                </p>
                <RuneCasting />
              </div>
            )}

            {/* Tarot Tab */}
            {activeTab === 'tarot' && (
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-100">
                <h3 className="text-xl font-semibold text-rose-900 mb-3">Tarot Cards</h3>
                <p className="text-rose-700 mb-4">
                  Discover insights through the ancient wisdom of the 78-card Tarot deck
                </p>
                <TarotCasting />
              </div>
            )}

            {/* Hexagram Lookup Tab */}
            {activeTab === 'lookup' && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">Hexagram Lookup</h3>
                <p className="text-emerald-700 mb-4">
                  Look up any of the 64 hexagrams by number to study their meaning
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-emerald-900">Hexagram Number (1-64)</label>
                    <Input
                      type="number"
                      min="1"
                      max="64"
                      value={hexagramId}
                      onChange={(e) => setHexagramId(e.target.value)}
                      placeholder="Enter hexagram number..."
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>
                  <Button onClick={getHexagramDetails} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {loading ? 'Looking up hexagram...' : 'Get Hexagram Details'}
                  </Button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Traditional I-Ching Dialog */}
      {traditionalReading && !loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-lg sm:text-xl font-semibold">Traditional I-Ching Reading</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setTraditionalReading(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>
            <div className="p-4 sm:p-6">
              <Card className="border-0 shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-center">
                    <span className="text-3xl sm:text-4xl font-mono">{traditionalReading.details.hex_font}</span>
                    <span className="text-base sm:text-lg">Hexagram {traditionalReading.number}: {traditionalReading.details.english}</span>
                  </CardTitle>
                  <CardDescription className="text-center">{traditionalReading.details.trad_chinese} ({traditionalReading.details.pinyin})</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div>
                    <h3 className="font-semibold mb-2">The Judgement</h3>
                    <p className="text-slate-700 mb-2">{traditionalReading.details.wilhelm_judgment.text}</p>
                    <p className="text-sm text-slate-600">{traditionalReading.details.wilhelm_judgment.comments}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">The Image</h3>
                    <p className="text-slate-700 mb-2">{traditionalReading.details.wilhelm_image.text}</p>
                    <p className="text-sm text-slate-600">{traditionalReading.details.wilhelm_image.comments}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">Symbolic Meaning</h3>
                    <p className="text-slate-700">{traditionalReading.details.wilhelm_symbolic}</p>
                  </div>

                  {traditionalReading.changingLineDetails.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">Changing Lines</h3>
                        <div className="space-y-3">
                          {traditionalReading.changingLineDetails.map((line, index) => (
                            <div key={index} className="bg-slate-50 p-3 rounded">
                              <p className="font-semibold">Line {line.line}:</p>
                              <p className="text-slate-700 mb-1">{line.text}</p>
                              <p className="text-sm text-slate-600">{line.comments}</p>
                            </div>
                          ))}
                        </div>
                        {traditionalReading.transformedDetails && (
                          <div className="mt-4 p-3 bg-blue-50 rounded">
                            <p className="font-semibold">Transforms to:</p>
                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                              <span className="text-lg font-mono">{traditionalReading.transformedDetails.hex_font}</span>
                              <span className="text-center sm:text-left">Hexagram {traditionalReading.transformedNumber}: {traditionalReading.transformedDetails.english}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-center rounded-b-xl">
              <Button 
                onClick={() => setTraditionalReading(null)}
                className="px-8 w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ifá Correspondence Dialog */}
      {ifaReading && !loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-lg sm:text-xl font-semibold">Ifá Correspondence Reading</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIfaReading(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <Card className="border-0 shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex flex-col items-center gap-4">
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '2px solid #cbd5e1', textAlign: 'center', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '5rem', fontFamily: 'monospace', lineHeight: '1' }}>{ifaReading.hexagram.symbol}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-base sm:text-lg">Hexagram {ifaReading.hexagram.number}: {ifaReading.hexagram.english}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-4 text-center">Primary Ifá Correspondence</h3>
                      {(() => {
                        const names = parseIfaNames(ifaReading.ifa.primary);
                        const glyphs = parseIfaGlyph(ifaReading.ifa.primaryGlyph);
                        return (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '50%', border: '2px solid #cbd5e1', textAlign: 'center', width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '1.5rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                  <pre style={{ fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'pre', margin: '0' }}>
                                    {renderGlyphWithLargerCircles(glyphs.lower)}
                                  </pre>
                                  <p style={{ fontWeight: 'bold', marginTop: '0.5rem', fontSize: '0.75rem', textAlign: 'center', margin: '0.5rem 0 0 0' }}>{names.lower}</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                  <pre style={{ fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'pre', margin: '0' }}>
                                    {renderGlyphWithLargerCircles(glyphs.upper)}
                                  </pre>
                                  <p style={{ fontWeight: 'bold', marginTop: '0.5rem', fontSize: '0.75rem', textAlign: 'center', margin: '0.5rem 0 0 0' }}>{names.upper}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {ifaReading.changingLines && ifaReading.changingLines.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2">Changing Lines</h3>
                          <div className="space-y-2">
                            {ifaReading.changingLines.map((line, index) => (
                              <div key={index} className="bg-slate-50 p-3 rounded">
                                <p className="font-semibold">Line {line.line}:</p>
                                <p className="text-slate-700">{line.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {ifaReading.transformed && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2">Transformed Hexagram</h3>
                          <div className="flex flex-col items-center gap-3 mb-4">
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '2px solid #cbd5e1', textAlign: 'center', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: '5rem', fontFamily: 'monospace', lineHeight: '1' }}>{ifaReading.transformed.hexagram.symbol}</span>
                            </div>
                            <div className="text-center">
                              <span className="text-base sm:text-lg">Hexagram {ifaReading.transformed.hexagram.number}: {ifaReading.transformed.hexagram.english}</span>
                            </div>
                          </div>
                          <h4 className="font-medium mb-4 text-center">Secondary Ifá Correspondence</h4>
                          {(() => {
                            const names = parseIfaNames(ifaReading.transformed.ifa.secondary);
                            const glyphs = parseIfaGlyph(ifaReading.transformed.ifa.secondaryGlyph);
                            return (
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '50%', border: '2px solid #cbd5e1', textAlign: 'center', width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '1.5rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                      <pre style={{ fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'pre', margin: '0' }}>
                                        {renderGlyphWithLargerCircles(glyphs.lower)}
                                      </pre>
                                      <p style={{ fontWeight: 'bold', marginTop: '0.5rem', fontSize: '0.75rem', textAlign: 'center', margin: '0.5rem 0 0 0' }}>{names.lower}</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                      <pre style={{ fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'pre', margin: '0' }}>
                                        {renderGlyphWithLargerCircles(glyphs.upper)}
                                      </pre>
                                      <p style={{ fontWeight: 'bold', marginTop: '0.5rem', fontSize: '0.75rem', textAlign: 'center', margin: '0.5rem 0 0 0' }}>{names.upper}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-center rounded-b-xl">
              <Button 
                onClick={() => setIfaReading(null)}
                className="px-8 w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hexagram Lookup Dialog */}
      {hexagramDetails && !loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-lg sm:text-xl font-semibold">Hexagram Details</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setHexagramDetails(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>
            <div className="p-4 sm:p-6">
              <Card className="border-0 shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex flex-col sm:flex-row items-center gap-3 text-center">
                    <span className="text-3xl sm:text-4xl font-mono">{hexagramDetails.hex_font}</span>
                    <span className="text-base sm:text-lg">Hexagram {hexagramDetails.hex}: {hexagramDetails.english}</span>
                  </CardTitle>
                  <CardDescription className="text-center">{hexagramDetails.trad_chinese} ({hexagramDetails.pinyin})</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div>
                    <h3 className="font-semibold mb-2">Symbolic Meaning</h3>
                    <p className="text-slate-700 mb-4">{hexagramDetails.wilhelm_symbolic}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">The Judgement</h3>
                    <p className="text-slate-700 mb-2">{hexagramDetails.wilhelm_judgment.text}</p>
                    <p className="text-sm text-slate-600">{hexagramDetails.wilhelm_judgment.comments}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">The Image</h3>
                    <p className="text-slate-700 mb-2">{hexagramDetails.wilhelm_image.text}</p>
                    <p className="text-sm text-slate-600">{hexagramDetails.wilhelm_image.comments}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">Trigrams</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Above: {hexagramDetails.wilhelm_above.chinese}</p>
                        <p className="text-sm text-slate-600">{hexagramDetails.wilhelm_above.symbolic} {hexagramDetails.wilhelm_above.alchemical}</p>
                      </div>
                      <div>
                        <p className="font-medium">Below: {hexagramDetails.wilhelm_below.chinese}</p>
                        <p className="text-sm text-slate-600">{hexagramDetails.wilhelm_below.symbolic} {hexagramDetails.wilhelm_below.alchemical}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-2">Individual Lines</h3>
                    <div className="space-y-3">
                      {Object.entries(hexagramDetails.wilhelm_lines).map(([lineNum, lineData]: [string, any]) => (
                        <div key={lineNum} className="bg-slate-50 p-3 rounded">
                          <p className="font-semibold">Line {lineNum}:</p>
                          <p className="text-slate-700 mb-1">{lineData.text}</p>
                          <p className="text-sm text-slate-600">{lineData.comments}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-center rounded-b-xl">
              <Button 
                onClick={() => setHexagramDetails(null)}
                className="px-8 w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
