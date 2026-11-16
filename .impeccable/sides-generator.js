// Laterales del castillo: prolongan el paisaje de scene.png con las MISMAS fórmulas
// (cielo tramado, montañas sinusoidales, suelo con hierba) para x fuera de 0..359,
// así la unión con la escena es exacta píxel a píxel.
const fs = require("fs"), path = require("path")
const OUT = process.argv[2]
const H = 225, SW = 240
const mod = (a, n) => ((a % n) + n) % n

function side(x0, seedInit) {
  const grid = Array.from({ length: H }, () => Array(SW).fill(null))
  const set = (gx, y, c) => { const i = gx - x0; if (i >= 0 && i < SW && y >= 0 && y < H) grid[y][i] = c }
  let seed = seedInit
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const sky = ["#050409", "#07060c", "#0a0812", "#0d0a18", "#110c1d", "#160f22", "#1c1126", "#241329", "#2e142a", "#38152a"]
  const bandH = 16
  for (let y = 0; y < 170; y++) {
    const b = Math.min(sky.length - 1, Math.floor(y / bandH)), within = y % bandH
    for (let x = x0; x < x0 + SW; x++) {
      let c = sky[b]
      if (within >= bandH - 3 && b + 1 < sky.length) {
        const k = within - (bandH - 3), p = mod(x + y, 4)
        if ((k === 0 && p === 0) || (k === 1 && p % 2 === 0) || (k === 2 && p !== 0)) c = sky[b + 1]
      }
      set(x, y, c)
    }
  }
  for (let i = 0; i < 46; i++) {
    const x = x0 + Math.floor(rand() * SW), y = Math.floor(rand() * 90)
    const bright = rand() > 0.85
    set(x, y, bright ? "#e9e2d0" : rand() > 0.5 ? "#8f88a8" : "#5d5677")
    if (bright) { set(x - 1, y, "#8f88a8"); set(x + 1, y, "#8f88a8"); set(x, y - 1, "#8f88a8"); set(x, y + 1, "#8f88a8") }
  }
  const ridge = (base, amp, f1, f2, color, rim) => {
    const hAt = (x) => Math.round(base - amp * (0.6 * Math.sin(x * f1) + 0.4 * Math.sin(x * f2 + 1.7)))
    for (let x = x0; x < x0 + SW; x++) {
      const h = hAt(x)
      for (let y = h; y < 190; y++) set(x, y, color)
      if (rim && hAt(x + 1) <= h) set(x, h, rim)
    }
  }
  ridge(150, 22, 0.031, 0.083, "#120d1c", "#2c1a2e")
  ridge(166, 16, 0.047, 0.11, "#0c0912", "#1f1424")
  ridge(178, 10, 0.07, 0.15, "#08060c", null)
  for (let x = x0; x < x0 + SW; x++) {
    const top = 184 + (mod(x, 7) === 0 ? -1 : 0)
    for (let y = top; y < H; y++) {
      let c = y < 187 ? "#1d261b" : "#0e130e"
      if (y >= 187 && mod(x * 7 + y * 3, 11) === 0) c = "#131a12"
      set(x, y, c)
    }
    if (mod(x, 5) === 0) set(x, 183, "#26321f")
  }
  // Algunas rocas y matas sueltas en la hierba
  for (let i = 0; i < 7; i++) {
    const x = x0 + 8 + Math.floor(rand() * (SW - 16)), y = 192 + Math.floor(rand() * 26)
    if (rand() > 0.5) {
      ;[[0, 0, "#2a2833"], [1, 0, "#2a2833"], [2, 0, "#1d1c25"], [-1, 1, "#2a2833"], [0, 1, "#3a3846"], [1, 1, "#2a2833"], [2, 1, "#1d1c25"], [3, 1, "#1d1c25"]].forEach(([dx, dy, c]) => set(x + dx, y + dy, c))
    } else {
      ;[[0, 0], [2, -1], [4, 0], [1, 1], [3, 1]].forEach(([dx, dy]) => set(x + dx, y + dy, "#26321f"))
    }
  }
  const byColor = {}
  for (let y = 0; y < H; y++) {
    let i = 0
    while (i < SW) {
      const c = grid[y][i]
      if (!c) { i++; continue }
      let w = 1
      while (i + w < SW && grid[y][i + w] === c) w++
      ;(byColor[c] = byColor[c] || []).push(`M${i} ${y}h${w}v1h-${w}z`)
      i += w
    }
  }
  const paths = Object.entries(byColor).map(([c, d]) => `<path fill="${c}" d="${d.join("")}"/>`).join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${H}" width="${SW}" height="${H}" shape-rendering="crispEdges" preserveAspectRatio="none">${paths}</svg>`
}
fs.writeFileSync(path.join(OUT, "side-left.svg"), side(-SW, 11))
fs.writeFileSync(path.join(OUT, "side-right.svg"), side(360, 23))
console.log(["side-left.svg", "side-right.svg"].map(f => f + " " + fs.statSync(path.join(OUT, f)).size).join(" | "))
