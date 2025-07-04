"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"
import { translations, type LanguageCode } from "./translations"

interface BrewingTimerProps {
  coffeeType: string
  selectedLanguage: LanguageCode
}

export function BrewingTimer({ coffeeType, selectedLanguage }: BrewingTimerProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const t = (key: keyof typeof translations.en): string => {
    return translations[selectedLanguage][key] || translations.en[key]
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    setIsRunning(true)
    setIsFinished(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
    setIsFinished(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsFinished(false)
    setTime(0)
  }

  const getTimerFeedback = () => {
    if (!isFinished || time === 0) return null

    switch (coffeeType) {
      case "espresso":
        if (time < 20) {
          return {
            type: "warning",
            title: "⚠️ Under-Extracted",
            message:
              "Your espresso extracted too quickly! It will likely taste sour and weak. Try grinding finer or using more coffee.",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
          }
        } else if (time >= 20 && time <= 34) {
          return {
            type: "success",
            title: "✅ Perfect Extraction",
            message: "Excellent timing! Your espresso should taste balanced with good sweetness and body.",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
          }
        } else {
          return {
            type: "warning",
            title: "⚠️ Over-Extracted",
            message:
              "Your espresso extracted too slowly. It will likely taste bitter and harsh. Try grinding coarser or using less coffee.",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
          }
        }

      case "filter":
        if (time < 240) {
          return {
            type: "info",
            title: "⏱️ Quick Brew",
            message: "Your filter coffee brewed quickly. If it tastes weak or sour, try grinding finer next time.",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
          }
        } else if (time >= 240 && time <= 420) {
          return {
            type: "success",
            title: "✅ Good Timing",
            message: "Perfect timing for filter coffee! Your brew should have good balance and flavor extraction.",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
          }
        } else {
          return {
            type: "warning",
            title: "⚠️ Long Extraction",
            message: "Your filter coffee took a while to brew. If it tastes bitter, try grinding coarser next time.",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
          }
        }

      case "pourover":
        if (time < 150) {
          return {
            type: "info",
            title: "⏱️ Fast Pour",
            message: "Quick pour-over! If it tastes weak, try pouring slower or grinding finer for better extraction.",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
          }
        } else if (time >= 150 && time <= 300) {
          return {
            type: "success",
            title: "✅ Excellent Timing",
            message: "Perfect pour-over timing! Your coffee should have bright, clean flavors with good balance.",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
          }
        } else {
          return {
            type: "warning",
            title: "⚠️ Slow Pour",
            message:
              "Long pour-over time. If it tastes bitter or over-extracted, try grinding coarser or pouring faster.",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
          }
        }

      case "aeropress":
        if (time < 90) {
          return {
            type: "info",
            title: "⏱️ Quick Press",
            message: "Fast AeroPress brew! For stronger flavor, try steeping longer before pressing.",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
          }
        } else if (time >= 90 && time <= 210) {
          return {
            type: "success",
            title: "✅ Perfect Timing",
            message: "Great AeroPress timing! Your coffee should be smooth and full-bodied with good extraction.",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
          }
        } else {
          return {
            type: "warning",
            title: "⚠️ Long Steep",
            message: "Long AeroPress steep time. If it tastes bitter, try shorter steeping or coarser grind next time.",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
          }
        }

      default:
        return null
    }
  }

  const getOptimalTime = () => {
    switch (coffeeType) {
      case "espresso":
        return "25-30 seconds"
      case "filter":
        return "4-6 minutes"
      case "pourover":
        return "2:30-4:00 minutes"
      case "aeropress":
        return "1:30-3:00 minutes"
      default:
        return "Follow method guidelines"
    }
  }

  const feedback = getTimerFeedback()

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-light mb-4 tabular-nums">{formatTime(time)}</div>
        <div className="text-sm text-gray-500 mb-6">Optimal time: {getOptimalTime()}</div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              <Play className="w-4 h-4 mr-2" />
              {t("start")}
            </Button>
          ) : (
            <Button onClick={stopTimer} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              <Pause className="w-4 h-4 mr-2" />
              {t("stop")}
            </Button>
          )}

          <Button
            onClick={resetTimer}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("reset")}
          </Button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-6 rounded-2xl border-2 ${feedback.bgColor} ${feedback.borderColor}`}>
          <h4 className={`text-lg font-medium mb-3 ${feedback.color}`}>{feedback.title}</h4>
          <p className={`text-sm ${feedback.color}`}>{feedback.message}</p>
        </div>
      )}

      {/* Brewing Tips */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-lg font-medium mb-3 text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {coffeeType.charAt(0).toUpperCase() + coffeeType.slice(1)} Timing Tips
        </h4>
        <div className="text-sm text-gray-700 space-y-2">
          {coffeeType === "espresso" && (
            <>
              <p>• Start timer when you begin extraction</p>
              <p>• Aim for 25-30 seconds for a double shot</p>
              <p>• Watch the flow - it should be steady like warm honey</p>
              <p>• Stop if extraction becomes too light or too dark</p>
            </>
          )}
          {coffeeType === "filter" && (
            <>
              <p>• Start timer when you begin brewing</p>
              <p>• Total brew time should be 4-6 minutes</p>
              <p>• Ensure even water distribution</p>
              <p>• Stop timer when dripping stops</p>
            </>
          )}
          {coffeeType === "pourover" && (
            <>
              <p>• Start timer with first pour (bloom)</p>
              <p>• Bloom for 30-45 seconds</p>
              <p>• Complete all pours within 2:30-4:00 minutes</p>
              <p>• Pour in circular motions for even extraction</p>
            </>
          )}
          {coffeeType === "aeropress" && (
            <>
              <p>• Start timer when you add water</p>
              <p>• Stir for 10 seconds, then steep</p>
              <p>• Press slowly over 20-30 seconds</p>
              <p>• Total time: 1:30-3:00 minutes</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
