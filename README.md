# 🌀 Double Pendulum Chaos Ensemble

An interactive, browser-based **double pendulum chaos simulator** built with **p5.js**, designed to visually demonstrate **sensitive dependence on initial conditions** using an ensemble of nearly identical systems.

🔗 **Live Demo:** https://<your-username>.github.io/<repo-name>/

---

## ✨ Features

- 🎯 Physically accurate double pendulum dynamics
- 🧪 **Chaos ensemble mode** — generate many near-identical pendulums
- 🌈 Smooth rainbow-colored trajectory trails
- 🎲 **“I’m Feeling Lucky”** button to randomize initial angles
- 🎛️ Real-time interactive controls:
  - Initial angles (θ₁, θ₂)
  - Rod lengths (L₁, L₂)
  - Masses (m₁, m₂)
  - Number of ensemble copies
  - Initial deviation magnitude
- 🖥️ Responsive layout (desktop + mobile)
- ⚡ Runs entirely in the browser — no installation required

---

## 📸 Preview

*(Add a screenshot or GIF here if you want)*

---

## 🧠 Physics Background

The double pendulum is a classic example of a **deterministic chaotic system**.  
Although governed by Newtonian mechanics, its equations of motion are:

- Nonlinear
- Coupled
- Highly sensitive to initial conditions

This simulator numerically integrates the full equations of motion and visualizes chaos by evolving an **ensemble** of pendulums whose initial angles differ by only a tiny amount:

\[
\theta_i \rightarrow \theta_i + \delta
\]

Even minute perturbations lead to dramatically different trajectories over time.

---

## 🕹️ Controls

| Control | Description |
|------|-------------|
| **Start** | Begin the simulation |
| **Stop** | Pause the simulation |
| **Reset** | Return to preview state |
| **I'm Feeling Lucky 🎲** | Randomize both initial angles |
| **Copies** | Number of ensemble pendulums |
| **Deviation** | Angular perturbation size |

---

## 🗂️ Project Structure

```text
.
├── index.html     # Entry point
├── script.js      # Physics, rendering, UI logic
├── style.css      # UI styling
└── README.md
