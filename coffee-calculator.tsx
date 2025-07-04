"use client"

import { useState, useEffect } from "react"
import { SpinningWheel } from "./spinning-wheel"
import { CoffeeEducation } from "./coffee-education"
import { BrewingTimer } from "./brewing-timer"
import { PeopleIllustrations } from "./people-illustrations"
import { LanguageSelector } from "./language-selector"
import { RoastSelector } from "./roast-selector"
import { translations, type LanguageCode, type TranslationKey } from "./translations"

export default function Component() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [coffeeType, setCoffeeType] = useState("filter")
  const [people, setPeople] = useState(2)
  const [strength, setStrength] = useState("balanced")
  const [roast, setRoast] = useState("medium")
  const [results, setResults] = useState({ coffee: 0, water: 0 })
  const [coffeeMaker, setCoffeeMaker] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("en")

  const t = (key: TranslationKey): string => {
    return translations[selectedLanguage][key] || translations.en[key]
  }

  const calculateCoffee = () => {
    let coffeePerPerson = 0
    let waterPerPerson = 0

    if (coffeeType === "espresso") {
      // Espresso ratios per person (double shot) - fixed amounts: 16g, 18g, 21g
      waterPerPerson = 36 // Standard double shot volume
      switch (strength) {
        case "weak":
          coffeePerPerson = 16 // 16g for mild
          break
        case "balanced":
          coffeePerPerson = 18 // 18g for balanced
          break
        case "strong":
          coffeePerPerson = 21 // 21g for strong
          break
      }
    } else if (coffeeType === "filter") {
      // Filter coffee with absorption calculation
      const targetOutputPerPerson = 200 // ml of brewed coffee per person
      const totalTargetOutput = people * targetOutputPerPerson

      let ratio = 0
      switch (strength) {
        case "weak":
          ratio = 55 // 55g per litre
          break
        case "balanced":
          ratio = 60 // 60g per litre
          break
        case "strong":
          ratio = 72 // 72g per litre
          break
      }

      const totalWaterNeeded = totalTargetOutput * (1 + (2 * ratio) / 1000)
      const totalCoffeeNeeded = (ratio * totalTargetOutput) / 1000

      coffeePerPerson = totalCoffeeNeeded / people
      waterPerPerson = totalWaterNeeded / people
    } else if (coffeeType === "pourover") {
      // Pour Over V60 ratios (250ml per person)
      waterPerPerson = 250
      switch (strength) {
        case "weak":
          coffeePerPerson = (55 * waterPerPerson) / 1000
          break
        case "balanced":
          coffeePerPerson = (60 * waterPerPerson) / 1000
          break
        case "strong":
          coffeePerPerson = (72 * waterPerPerson) / 1000
          break
      }
    } else if (coffeeType === "aeropress") {
      // AeroPress ratios
      const maxBrewVolume = 250
      const totalVolume = people * 200
      const concentrateVolume = Math.min(totalVolume, maxBrewVolume)

      waterPerPerson = totalVolume / people
      switch (strength) {
        case "weak":
          coffeePerPerson = (55 * concentrateVolume) / 1000 / people
          break
        case "balanced":
          coffeePerPerson = (60 * concentrateVolume) / 1000 / people
          break
        case "strong":
          coffeePerPerson = (72 * concentrateVolume) / 1000 / people
          break
      }
    }

    const totalCoffee = Math.round(people * coffeePerPerson)
    const totalWater = Math.round(people * waterPerPerson)
    setResults({ coffee: totalCoffee, water: totalWater })
  }

  useEffect(() => {
    calculateCoffee()
  }, [coffeeType, people, strength])

  const handleWheelResult = (winner: string) => {
    setCoffeeMaker(winner)
  }

  const getBrewingMethodInfo = () => {
    switch (coffeeType) {
      case "espresso":
        return {
          grind: t("finelyGround"),
          time: "25-30 seconds",
          temp: "90-94°C",
          description: "High pressure extraction for concentrated coffee",
        }
      case "filter":
        return {
          grind: t("mediumGrind"),
          time: "5-6 minutes",
          temp: "92-96°C",
          description: "Automatic drip brewing for consistent results",
        }
      case "pourover":
        return {
          grind: t("mediumFineGrind"),
          time: "2:30-4:00 minutes",
          temp: "92-96°C",
          description: "Manual pour technique for clean, bright flavours",
        }
      case "aeropress":
        return {
          grind: t("fineMediumGrind"),
          time: "2:00-3:00 minutes + bypass",
          temp: "85-92°C",
          description: "Pressure brewing with bypass dilution for larger servings",
        }
      default:
        return {
          grind: t("mediumGrind"),
          time: "4-6 minutes",
          temp: "90-96°C",
          description: "Perfect brewing method",
        }
    }
  }

  const brewingInfo = getBrewingMethodInfo()

  const tabs = [
    { id: "calculator", label: t("coffeeCalculator"), icon: "☕" },
    { id: "wheel", label: t("whoMakesCoffee"), icon: "🎲" },
    { id: "education", label: t("learnAboutCoffee"), icon: "🎓" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <h1 className="text-2xl font-bold text-gray-900">{t("coffeeCalculator")}</h1>

              {/* Tab Navigation */}
              <div className="hidden md:flex space-x-2 bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden mt-6 flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-3 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {activeTab === "calculator" && (
          <div className="space-y-20">
            {/* Hero Section */}
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight tracking-tight">
                {t("createYour")} <span className="underline decoration-4 underline-offset-8">{t("perfectCup")}</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{t("heroSubtitle")}</p>
            </div>

            {/* Method Selection */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { type: "espresso", label: t("espresso"), image: "/images/red-espresso-machine.jpeg" },
                  { type: "filter", label: t("filter"), image: "/images/drip-coffee-maker.jpeg" },
                  { type: "pourover", label: t("pourOver"), image: "/images/pour-over-v60.jpeg" },
                  { type: "aeropress", label: t("aeropress"), image: "/images/aeropress-new.jpeg" },
                ].map((method) => (
                  <button
                    key={method.type}
                    onClick={() => setCoffeeType(method.type)}
                    className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      coffeeType === method.type
                        ? "border-coral-500 bg-coral-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden bg-white shadow-md flex items-center justify-center">
                      <img
                        src={method.image || "/placeholder.svg"}
                        alt={method.label}
                        className={`${
                          method.type === "espresso"
                            ? "w-4/5 h-4/5 object-contain"
                            : method.type === "pourover" || method.type === "aeropress"
                              ? "w-full h-full object-cover"
                              : "w-full h-full object-contain"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">{method.label}</span>
                    {coffeeType === method.type && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* People Selection */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">{t("people")}</h3>
                <div className="space-y-8">
                  <div className="flex justify-center py-4">
                    <PeopleIllustrations count={people} />
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPeople(num)}
                        className={`aspect-square rounded-xl text-lg font-bold transition-all duration-200 ${
                          people === num
                            ? "bg-navy-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strength Selection */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">{t("strength")}</h3>
                <div className="space-y-4">
                  {[
                    { value: "weak", label: t("mild"), description: "55g/L", emoji: "🌱" },
                    { value: "balanced", label: t("balanced"), description: "60g/L", emoji: "⚖️" },
                    { value: "strong", label: t("strong"), description: "72g/L", emoji: "🔥" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStrength(option.value)}
                      className={`w-full text-left p-6 rounded-xl transition-all duration-200 ${
                        strength === option.value
                          ? "bg-purple-50 border-2 border-purple-200"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{option.emoji}</span>
                          <span className="font-bold text-gray-900 text-lg">{option.label}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{option.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Roast Selection */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 max-w-6xl mx-auto">
              <RoastSelector selectedRoast={roast} onRoastChange={setRoast} selectedLanguage={selectedLanguage} />
            </div>

            {/* Recipe Results */}
            <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-3xl p-12 border border-coral-200 max-w-6xl mx-auto">
              <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">{t("yourRecipe")}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="text-center">
                  <div className="text-7xl md:text-8xl font-light text-coral-600 mb-4">{results.coffee}</div>
                  <div className="text-xl font-bold text-gray-800 mb-2 tracking-wide">{t("gramsCoffee")}</div>
                  <div className="text-base text-gray-600">{brewingInfo.grind}</div>
                </div>
                <div className="text-center">
                  <div className="text-7xl md:text-8xl font-light text-navy-600 mb-4">{results.water}</div>
                  <div className="text-xl font-bold text-gray-800 mb-2 tracking-wide">{t("mlWater")}</div>
                  <div className="text-base text-gray-600">{brewingInfo.temp}</div>
                </div>
              </div>

              {/* Brewing Instructions */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">{t("brewingInstructions")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl mb-3">⏱️</div>
                    <div className="font-bold text-gray-800 mb-1">{t("brewTime")}</div>
                    <div className="text-gray-600">{brewingInfo.time}</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl mb-3">🌡️</div>
                    <div className="font-bold text-gray-800 mb-1">{t("waterTemp")}</div>
                    <div className="text-gray-600">{brewingInfo.temp}</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl mb-3">⚙️</div>
                    <div className="font-bold text-gray-800 mb-1">{t("grindSize")}</div>
                    <div className="text-gray-600">{brewingInfo.grind}</div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <div className="text-sm text-gray-700 font-medium tracking-wide">
                  {people} {people === 1 ? t("person") : t("people")} • {coffeeType.toUpperCase()} •{" "}
                  {strength.toUpperCase()} • {roast.toUpperCase()} {t("roast")}
                </div>
              </div>
            </div>

            {/* Brewing Timer - Always Visible */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t("brewingTimer")}</h3>
              <BrewingTimer coffeeType={coffeeType} selectedLanguage={selectedLanguage} />
            </div>
          </div>
        )}

        {activeTab === "wheel" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-200">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">{t("whoMakesCoffeeTitle")}</h2>

              <div className="text-center text-gray-600 mb-12 space-y-2">
                <p className="text-xl">{t("addFriends")}</p>
                <p className="text-base">{t("someoneHasTo")}</p>
              </div>

              <div className="flex justify-center mb-12">
                <img
                  src="/images/coffee-team-illustration.png"
                  alt="Coffee team illustration"
                  className="w-96 h-80 object-contain"
                />
              </div>

              <SpinningWheel onResult={handleWheelResult} selectedLanguage={selectedLanguage} />

              {coffeeMaker && (
                <div className="text-center p-8 bg-green-50 border border-green-200 rounded-2xl mt-12">
                  <p className="text-xl text-green-800">
                    <strong className="font-bold">{coffeeMaker}</strong> {t("makesCoffee")}
                    <br />
                    <span className="text-base text-green-600">
                      {t("betterGetStarted")} {results.coffee}g of coffee! ☕
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-200">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">{t("learnAboutCoffeeTitle")}</h2>

              <div className="text-center text-gray-600 mb-12 space-y-2">
                <p className="text-xl">{t("discoverWorld")}</p>
                <p className="text-base">{t("everyStepMatters")}</p>
              </div>

              <CoffeeEducation />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
