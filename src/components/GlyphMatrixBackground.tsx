"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "01·•+*/\\<>="
const CELL_SIZE = 20
const MUTATION_RATE = 0.04
const INTERVAL = 50

export function GlyphMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const cols = Math.ceil(canvas.width / CELL_SIZE)
    const rows = Math.ceil(canvas.height / CELL_SIZE)

    const grid: string[] = []
    for (let i = 0; i < cols * rows; i++) {
      grid[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    }

    const draw = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.font = `${CELL_SIZE}px monospace`
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c

          if (Math.random() < MUTATION_RATE) {
            grid[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }

          const x = c * CELL_SIZE + CELL_SIZE / 2
          const y = r * CELL_SIZE + CELL_SIZE / 2
          ctx.fillText(grid[idx], x, y)
        }
      }
    }

    const intervalId = setInterval(draw, INTERVAL)
    draw()

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ imageRendering: "pixelated", opacity: 0.5 }}
    />
  )
}
