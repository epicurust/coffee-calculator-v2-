"use client"

import { translations, type LanguageCode } from "./translations"

interface RoastSelectorProps {
  selectedRoast: string
  onRoastChange: (roast: string) => void
  selectedLanguage: LanguageCode
}

export function RoastSelector({ selectedRoast, onRoastChange, selectedLanguage }: RoastSelectorProps) {
  const t = (key: keyof typeof translations.en): string => {
    return translations[selectedLanguage][key] || translations.en[key]
  }

  const roastOptions = [
    {
      value: "light",
      label: t("lightRoast"),
      emoji: "🌅",
      color: "from-coral-100 to-coral-200",
      borderColor: "border-coral-300",
      textColor: "text-coral-800",
      bgColor: "bg-coral-50",
      description: t("lightDescription"),
      grindInfo: "Requires a finer grind due to increased bean density",
      brewingTips: [
        "Higher density beans need more extraction time",
        "Finer grind increases surface area for better extraction",
        "Results in brighter acidity and clearer flavour notes",
        "Ideal for pour-over and filter methods",
      ],
    },
    {
      value: "medium",
      label: t("mediumRoast"),
      emoji: "☕",
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300",
      textColor: "text-purple-800",
      bgColor: "bg-purple-50",
      description: t("mediumDescription"),
      grindInfo: "Standard grind size works well for balanced extraction",
      brewingTips: [
        "Perfect balance between origin flavours and roast character",
        "Medium density allows for consistent extraction",
        "Works brilliantly with most brewing methods",
        "Ideal for espresso and drip coffee",
      ],
    },
    {
      value: "dark",
      label: t("darkRoast"),
      emoji: "🌑",
      color: "from-navy-100 to-navy-200",
      borderColor: "border-navy-300",
      textColor: "text-navy-800",
      bgColor: "bg-navy-50",
      description: t("darkDescription"),
      grindInfo: "Requires a coarser grind as beans are more brittle and porous",
      brewingTips: [
        "More brittle beans break apart easily in the grinder",
        "Lower density means faster extraction",
        "Coarser grind prevents over-extraction and bitterness",
        "Perfect for French press and cold brew",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">{t("coffeeRoast")}</h3>
        <p className="text-lg text-gray-600">{t("chooseRoast")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roastOptions.map((roast) => (
          <button
            key={roast.value}
            onClick={() => onRoastChange(roast.value)}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
              selectedRoast === roast.value
                ? `${roast.bgColor} ${roast.borderColor} shadow-lg`
                : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">{roast.emoji}</span>
              <h4 className={`text-xl font-bold ${selectedRoast === roast.value ? roast.textColor : "text-gray-900"}`}>
                {roast.label}
              </h4>
            </div>

            <p className={`text-base mb-4 ${selectedRoast === roast.value ? roast.textColor : "text-gray-600"}`}>
              {roast.description}
            </p>

            <div
              className={`text-sm font-bold mb-3 ${selectedRoast === roast.value ? roast.textColor : "text-gray-800"}`}
            >
              {t("grindRequirement")}
            </div>
            <p className={`text-sm mb-4 ${selectedRoast === roast.value ? roast.textColor : "text-gray-600"}`}>
              {roast.grindInfo}
            </p>

            {selectedRoast === roast.value && (
              <div className="space-y-3">
                <div className={`text-sm font-bold ${roast.textColor}`}>{t("brewingTips")}</div>
                <ul className={`text-sm space-y-2 ${roast.textColor}`}>
                  {roast.brewingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-sm mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedRoast === roast.value && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
