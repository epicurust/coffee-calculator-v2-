"use client"

import { useState } from "react"
import { ChevronDown, Leaf, Globe, Thermometer } from "lucide-react"

export function CoffeeEducation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const educationSections = [
    {
      id: "journey",
      title: "From Bean to Cup",
      icon: <Leaf className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl">🌱</div>
              <h4 className="font-medium">Growing</h4>
              <p className="text-sm opacity-80">Coffee plants grow in tropical regions around the world</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🍒</div>
              <h4 className="font-medium">Harvesting</h4>
              <p className="text-sm opacity-80">Coffee cherries are hand-picked when perfectly ripe</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">☕</div>
              <h4 className="font-medium">Processing</h4>
              <p className="text-sm opacity-80">Beans are extracted, dried, and roasted to perfection</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl">🫖</div>
              <h4 className="font-medium">Brewing</h4>
              <p className="text-sm opacity-80">Ground beans meet hot water to create your perfect cup</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "regions",
      title: "Coffee Growing Regions",
      icon: <Globe className="w-6 h-6" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-white/20 space-y-3">
            <h4 className="text-xl font-medium text-yellow-400">☀️ Africa</h4>
            <p className="text-sm opacity-80">
              <strong>Ethiopia & Kenya:</strong> Bright, fruity, wine-like flavors with floral notes
            </p>
            <p className="text-xs opacity-60">Best for: Pour-over, light roasts</p>
          </div>
          <div className="p-6 border border-white/20 space-y-3">
            <h4 className="text-xl font-medium text-green-400">🌿 Central America</h4>
            <p className="text-sm opacity-80">
              <strong>Guatemala & Costa Rica:</strong> Balanced, chocolatey, nutty with bright acidity
            </p>
            <p className="text-xs opacity-60">Best for: Espresso, medium roasts</p>
          </div>
          <div className="p-6 border border-white/20 space-y-3">
            <h4 className="text-xl font-medium text-orange-400">🏔️ South America</h4>
            <p className="text-sm opacity-80">
              <strong>Brazil & Colombia:</strong> Full-bodied, caramel sweetness, low acidity
            </p>
            <p className="text-xs opacity-60">Best for: Espresso blends, dark roasts</p>
          </div>
        </div>
      ),
    },
    {
      id: "science",
      title: "The Science of Brewing",
      icon: <Thermometer className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-medium">🌡️ Temperature Matters</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>
                  <strong>195-205°F (90-96°C):</strong> Optimal extraction temperature
                </p>
                <p>
                  <strong>Too Hot:</strong> Burns coffee, creates bitter taste
                </p>
                <p>
                  <strong>Too Cool:</strong> Under-extracts, creates sour taste
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-medium">⏱️ Time is Everything</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>
                  <strong>Espresso:</strong> 25-30 seconds for perfect extraction
                </p>
                <p>
                  <strong>Pour-over:</strong> 2:30-4:00 minutes total brew time
                </p>
                <p>
                  <strong>French Press:</strong> 4 minutes steeping time
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 border border-white/20 bg-white/5">
            <h4 className="text-lg font-medium mb-3">💡 Pro Tip: The Golden Ratio</h4>
            <p className="text-sm opacity-80">
              The "Golden Ratio" for coffee is generally 1:15 to 1:17 (coffee to water). This means for every 1 gram of
              coffee, use 15-17 grams of water. Our calculator automatically adjusts this based on your strength
              preference!
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {educationSections.map((section) => (
        <div key={section.id} className="border border-white/20">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex justify-between items-center p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              {section.icon}
              <span className="text-xl font-light">{section.title}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${activeSection === section.id ? "rotate-180" : ""}`}
            />
          </button>
          {activeSection === section.id && (
            <div className="p-6 border-t border-white/20 bg-white/5">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}
