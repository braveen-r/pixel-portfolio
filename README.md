# 👾 Braveen's Pixel Portfolio

> An interactive, 8-bit retro developer portfolio featuring RPG-style components, a fully playable background Snake game, and direct transmission capabilities.

---

## 🎯 Overview

**Cyber Wizard Portfolio** bridges the gap between a standard static resume and an interactive arcade experience. By combining a classic 8-bit aesthetic with modern React frontend architecture, this portfolio showcases technical skills through gamified UI elements (HP/MP bars, XP levels, tech-tree skill arsenals). It features a persistent, playable background Snake game equipped with an Auto-CPU mode, custom web audio synthesizer sounds, and a fully functional Web3Forms contact terminal for direct recruiter outreach.

---

## 💻 Development Environment

This project was natively engineered and tested in the following environment:

* **Operating System:** Arch Linux (Wayland / Hyprland) & Windows OS (PowerShell)
* **Editor/Environment:** Neovim / VS Code
* **Core Languages/Tools:** React, TypeScript, Tailwind CSS
* **Package Management & Build System:** `npm`, Vite

---

## 🚀 Installation

### Local Development Setup

To run this portfolio locally or modify the source code:

1. **Clone the repository:**

```bash
git clone https://github.com/Braveen811/braveen-cyber-portfolio.git
cd braveen-cyber-portfolio

```

2. **Install dependencies:**

```bash
npm install

```

3. **Configure Environment Variables:**
Create a `.env` file in the root directory using `.env.example` as a template, and add your Web3Forms Access Key:

```env
VITE_WEB3FORMS_KEY="YOUR_WEB3FORMS_ACCESS_KEY_HERE"

```

---

## 🎮 How to Run (Usage)

### 1. Launch the Development Server

Boot up the Vite dev server with hot-module replacement (HMR):

```bash
npm run dev

```

*The application will launch on `http://localhost:3000`. You can use the WASD keys immediately to take control of the background Snake game.*

### 2. Build for Production

Compile the TypeScript and generate the optimized static assets for deployment (Vercel, GitHub Pages, etc.):

```bash
npm run build

```

---

## 🏗️ System Architecture

```text
[ Global State / UI ] ────────────┐
                                  ▼
[ Interactive Components ] ───► [ Background Snake Engine ]
 (Navbar, Hero, Skills)           │          │
        │                         ▼          ▼
        ▼              [ Auto-CPU AI ]   [ Web Audio Synth ]
[ Contact Terminal ]
        │
        ▼
[ Web3Forms API ] ──► (Delivers to Gmail)

```

---

## 🛠️ Tech Stack

* **Frontend Framework:** `React 19` (Functional components, Hooks, Context)
* **Type Safety:** `TypeScript` (Strict interface definitions for Game logic and UI props)
* **Styling Engine:** `Tailwind CSS v4` (Utility-first CSS, custom retro hex palettes)
* **Icons & Graphics:** `Lucide React` (SVG iconography)
* **Build Tooling:** `Vite` (Lightning-fast HMR and optimized bundling)

---

## 📂 Project Structure

```text
pixel-portfolio/
├── src/
│   ├── components/
│   │   ├── BackgroundSnakeGame.tsx  # Core game loop, collision logic, and CPU AI
│   │   ├── ContactTerminal.tsx      # Web3Forms integration and Cheat Console
│   │   ├── Hero.tsx                 # RPG HUD, dialogue box, and dynamic typing effect
│   │   ├── Navbar.tsx               # Fixed scroll nav with mobile hamburger menu
│   │   ├── PixelProfileAvatar.tsx   # Custom 24x24 SVG Cyber Wizard pixel art
│   │   └── SkillsArsenal.tsx        # RPG tech-tree categorized skills layout
│   ├── data/
│   │   └── portfolioData.ts         # Centralized user identity and project data
│   ├── utils/
│   │   └── audio.ts                 # 8-bit sound effects (Level Up, Game Over)
│   ├── App.tsx                      # Main layout wrapper
│   ├── index.css                    # Custom fonts and CRT scanline animations
│   └── types.ts                     # TypeScript interfaces (GameMode, Quests, Particles)
├── .env.example                     # Environment variable blueprint
├── index.html                       # Entry point with inline SVG Favicon
├── package.json                     # Project metadata and dependencies
└── vite.config.ts                   # Vite configuration

```

---

## 🚀 Key Features

* **Playable Background Engine:** A custom-built Snake game runs directly on the canvas background. Features a CPU auto-pilot mode that seamlessly transitions to manual user control via keyboard inputs.
* **RPG UI Aesthetics:** Integrates role-playing game mechanics into standard portfolio sections, including a functional HP/MP HUD, level indicators, and an interactive item-drop tech stack.
* **Serverless Communications:** Utilizes Web3Forms to capture contact requests directly from the front end, bypassing the need for a dedicated backend server.
* **Custom SVG Pixel Art:** Includes an inline, hand-coded 24x24 SVG Cyber-Anime Hacker avatar with breathing animations and floating holographic drones.

---

## ⚙️ Custom Tweaks & Architecture Decisions

* **Infinite Death-Loop Resolution:** The Snake AI originally encountered an edge case where it would infinitely crash into its own neck if food spawned exactly on the respawn coordinate. This was resolved by aggressively wiping the `foodsRef` array on the Game Over frame before initiating the respawn sequence.
* **Mobile Navigation Click-Out:** To improve UX on mobile devices, a `useRef` boundary listener was attached to the Navbar. This ensures the 8-bit dropdown menu automatically snaps shut if the user clicks anywhere on the external page background.
* **Inline SVG Favicon:** To prevent `404 (Not Found)` errors without requiring external image assets, a scalable, inline emoji SVG (`💻`) was injected directly into the `index.html` head, maintaining the tech aesthetic with zero extra network requests.

---

## 🛠️ System Tweaks & Troubleshooting

* **Contact Form Failing / "Network Error":** Ensure your Web3Forms access key is correctly pasted into the fetch request body inside `ContactTerminal.tsx` or loaded properly from your `.env` file. The free tier limits to 250 requests per month.
* **Navbar Disappears When Scrolling:** Ensure the main `Navbar` container is set to `fixed` and NOT `sticky`, as parent containers utilizing `overflow-x-hidden` (to prevent horizontal scrollbars) will silently break CSS sticky positioning.

---

**Author:** [Braveen R](https://braveenr.linklee.in/)

---

## ✌️ Wrapping Up

Stop sending boring, static PDF resumes. Equip your skills, launch the background engine, and let recruiters play their way through your professional experience. 🚀

See you in the terminal!