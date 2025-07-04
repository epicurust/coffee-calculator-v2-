"use client"

import { useState, useEffect } from "react"

export function TimeBasedGreeting() {
  const [greeting, setGreeting] = useState("Hello")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getLocalizedGreeting = async () => {
      try {
        // Get user's timezone from IP
        const response = await fetch("https://worldtimeapi.org/api/ip")
        const data = await response.json()
        const userTime = new Date(data.datetime)
        const hour = userTime.getHours()

        // Determine greeting based on time
        if (hour >= 5 && hour < 12) {
          setGreeting("Good morning")
        } else if (hour >= 12 && hour < 18) {
          setGreeting("Good afternoon")
        } else if (hour >= 18 && hour < 22) {
          setGreeting("Good evening")
        } else {
          setGreeting("Good night")
        }
      } catch (error) {
        // Fallback to local time if API fails
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) {
          setGreeting("Good morning")
        } else if (hour >= 12 && hour < 18) {
          setGreeting("Good afternoon")
        } else if (hour >= 18 && hour < 22) {
          setGreeting("Good evening")
        } else {
          setGreeting("Good night")
        }
      } finally {
        setIsLoading(false)
      }
    }

    getLocalizedGreeting()
  }, [])

  if (isLoading) {
    return <span className="text-amber-700">Hello</span>
  }

  return <span className="text-amber-700">{greeting}</span>
}
