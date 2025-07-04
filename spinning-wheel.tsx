"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, RotateCcw } from "lucide-react"
import { translations, type LanguageCode } from "./translations"

interface SpinningWheelProps {
  onResult: (winner: string) => void
  selectedLanguage: LanguageCode
}

export function SpinningWheel({ onResult, selectedLanguage }: SpinningWheelProps) {
  const [friends, setFriends] = useState<string[]>([])
  const [newFriend, setNewFriend] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  const t = (key: keyof typeof translations.en): string => {
    return translations[selectedLanguage][key] || translations.en[key]
  }

  const addFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend.trim())) {
      setFriends([...friends, newFriend.trim()])
      setNewFriend("")
    }
  }

  const removeFriend = (index: number) => {
    setFriends(friends.filter((_, i) => i !== index))
    setWinner(null)
  }

  const spinWheel = () => {
    if (friends.length < 2) return

    setIsSpinning(true)
    setWinner(null)

    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const randomRotation = 1440 + Math.random() * 720
    const finalRotation = rotation + randomRotation

    setRotation(finalRotation)

    setTimeout(() => {
      const segmentAngle = 360 / friends.length
      const normalizedRotation = finalRotation % 360
      const winnerIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % friends.length
      const selectedWinner = friends[winnerIndex]

      setWinner(selectedWinner)
      setIsSpinning(false)
      onResult(selectedWinner)
    }, 3000)
  }

  const resetWheel = () => {
    setRotation(0)
    setWinner(null)
    setIsSpinning(false)
  }

  return (
    <div className="space-y-8">
      {/* Add Friends */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder={t("addFriendPlaceholder")}
            onKeyPress={(e) => e.key === "Enter" && addFriend()}
            className="bg-transparent border-0 border-b border-gray-300 rounded-none text-lg py-3 focus:border-gray-600 transition-colors"
          />
          <Button
            onClick={addFriend}
            disabled={!newFriend.trim()}
            className="bg-gray-900 text-white hover:bg-gray-800 px-6"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Friends List */}
        {friends.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg"
              >
                <span className="text-sm">{friend}</span>
                <button onClick={() => removeFriend(index)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Spinning Wheel */}
      {friends.length >= 2 && (
        <div className="text-center space-y-6">
          <div className="relative w-64 h-64 mx-auto">
            {/* Wheel */}
            <div
              className="w-full h-full rounded-full border-4 border-gray-900 relative overflow-hidden transition-transform duration-[3000ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(${friends
                  .map(
                    (_, index) =>
                      `hsl(${(index * 360) / friends.length}, 70%, 60%) ${
                        (index * 100) / friends.length
                      }%, hsl(${((index + 1) * 360) / friends.length}, 70%, 60%) ${
                        ((index + 1) * 100) / friends.length
                      }%`,
                  )
                  .join(", ")})`,
              }}
            >
              {friends.map((friend, index) => {
                const angle = (index * 360) / friends.length
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full flex items-center justify-center text-black font-medium text-sm"
                    style={{
                      transform: `rotate(${angle + 180 / friends.length}deg)`,
                      transformOrigin: "center",
                    }}
                  >
                    <span
                      className="absolute"
                      style={{
                        transform: `translateY(-80px) rotate(${-(angle + 180 / friends.length)}deg)`,
                      }}
                    >
                      {friend}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={spinWheel}
              disabled={isSpinning || friends.length < 2}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3"
            >
              {isSpinning ? t("spinning") : t("spinWheel")}
            </Button>
            <Button
              onClick={resetWheel}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Winner Display */}
          {winner && !isSpinning && (
            <div className="text-center space-y-2">
              <div className="text-4xl font-light">🎉</div>
              <div className="text-2xl font-medium">
                {winner} {t("makesCoffee")}
              </div>
            </div>
          )}
        </div>
      )}

      {friends.length < 2 && (
        <div className="text-center text-gray-500 text-sm">Add at least 2 friends to spin the wheel</div>
      )}
    </div>
  )
}
