"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export function ExtractionGuide() {
  return (
    <Card className="shadow-2xl border-4 border-white bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Clock className="w-7 h-7" />
          Coffee Extraction Science
        </CardTitle>
        <CardDescription className="text-indigo-100 text-lg">
          Understanding extraction time and how it affects your coffee
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-2 rounded-2xl mb-6">
            <TabsTrigger
              value="basics"
              className="rounded-xl data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Extraction Basics
            </TabsTrigger>
            <TabsTrigger
              value="espresso"
              className="rounded-xl data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Espresso Timing
            </TabsTrigger>
            <TabsTrigger
              value="filter"
              className="rounded-xl data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
            >
              Filter Timing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                What is Coffee Extraction?
              </h3>
              <p className="text-lg text-indigo-800 leading-relaxed mb-4">
                Coffee extraction is the process of dissolving soluble compounds from coffee grounds using hot water.
                The goal is to extract the right balance of flavors - not too little, not too much.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-100 p-4 rounded-xl border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-red-800">Under-Extracted</h4>
                  </div>
                  <p className="text-red-700 text-sm">
                    ⏱️ Too fast extraction
                    <br />😖 Sour, acidic taste
                    <br />🧂 Salty aftertaste
                    <br />💧 Weak body
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">Perfect Extraction</h4>
                  </div>
                  <p className="text-green-700 text-sm">
                    ⏱️ Optimal timing
                    <br />😋 Balanced sweetness
                    <br />🍯 Rich flavors
                    <br />☕ Full body
                  </p>
                </div>
                <div className="bg-orange-100 p-4 rounded-xl border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-orange-800">Over-Extracted</h4>
                  </div>
                  <p className="text-orange-700 text-sm">
                    ⏱️ Too slow extraction
                    <br />😣 Bitter, harsh taste
                    <br />🌿 Astringent finish
                    <br />🔥 Burnt flavors
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="espresso" className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Espresso Extraction Timing
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-amber-200">
                  <h4 className="font-bold text-amber-800 mb-2">⏰ Ideal Extraction Time: 25-30 seconds</h4>
                  <p className="text-amber-700">
                    For a double shot (36-42ml), the extraction should take 25-30 seconds from when you start the pump.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h5 className="font-bold text-red-800 mb-2">🚨 Too Fast ({"<"}25 seconds)</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Grind finer</li>
                      <li>• Use more coffee</li>
                      <li>• Tamp harder</li>
                      <li>• Check for channeling</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h5 className="font-bold text-orange-800 mb-2">🐌 Too Slow ({">"}35 seconds)</h5>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Grind coarser</li>
                      <li>• Use less coffee</li>
                      <li>• Lighter tamping</li>
                      <li>• Check for clogs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filter" className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Filter Coffee Extraction Timing
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">⏰ Ideal Extraction Time: 4-6 minutes</h4>
                  <p className="text-green-700">
                    Total brew time from first pour to last drip. Different methods have different optimal times.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h5 className="font-bold text-blue-800 mb-2">☕ Pour Over (V60)</h5>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Total time: 2:30-4:00</li>
                      <li>• Bloom: 30-45 seconds</li>
                      <li>• Multiple pours</li>
                      <li>• Medium-fine grind</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h5 className="font-bold text-purple-800 mb-2">🫖 French Press</h5>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Total time: 4:00</li>
                      <li>• Steep time: 4 minutes</li>
                      <li>• Single immersion</li>
                      <li>• Coarse grind</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <h5 className="font-bold text-teal-800 mb-2">💧 Drip Coffee</h5>
                    <ul className="text-teal-700 text-sm space-y-1">
                      <li>• Total time: 5-6 minutes</li>
                      <li>• Automatic brewing</li>
                      <li>• Consistent flow rate</li>
                      <li>• Medium grind</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h5 className="font-bold text-red-800 mb-2">🚨 Too Fast ({"<"}3 minutes)</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Grind finer</li>
                      <li>• Pour slower</li>
                      <li>• Use more coffee</li>
                      <li>• Lower water temp</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h5 className="font-bold text-orange-800 mb-2">🐌 Too Slow ({">"}7 minutes)</h5>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Grind coarser</li>
                      <li>• Pour faster</li>
                      <li>• Use less coffee</li>
                      <li>• Higher water temp</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
