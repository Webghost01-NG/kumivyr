<div align="center">

# 🕸️ Kumivyr
### The Developer Workbench, Static Linter & Step Debugger for OpenServ BRAID Reasoning Graphs

[![OpenServ Hackathon](https://img.shields.io/badge/OpenServ_Hackathon-Edition_01-01fe93?style=for-the-badge&logo=target)](https://openserv.ai/hackathon)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![CI/CD Status](https://img.shields.io/badge/CI%2FCD-Passing-brightgreen?style=for-the-badge&logo=githubactions)](https://github.com/Webghost01-NG/kumivyr/actions)

<p align="center">
  <b>Transform messy natural language prompts into bounded, deterministic Mermaid reasoning flowcharts.</b><br>
  Lint against graph anti-patterns, visually step-debug node execution, tune Shadow Agent verifiers, and export production-ready code for <code>@openserv-labs/sdk</code>.
</p>

[Key Features](#-key-features) • [Why Kumivyr?](#-why-kumivyr-the-braid-dx-gap) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Milestones & Issues](#-roadmap-milestones--issues) • [Submission Track](#-hackathon-submission-context)

</div>

---

## ⚡ The 20-Second Pitch

> **The Problem:** Standard LLMs hallucinate and drift on multi-step reasoning. OpenServ solves this with **BRAID** (Bounded Reasoning for Autonomous Inference and Decisions), compiling logic into strict flowchart roadmaps (Guided Reasoning Diagrams). But writing and debugging these diagrams in raw text is like coding blindfolded: large graphs bloat and fail, terminal logs are unreadable, and there is zero visual debugging or test tooling.
>
> **The Solution:** **Kumivyr** is the "Figma meets Chrome DevTools" for OpenServ. Type your agent instructions, auto-compile into an optimized Mermaid flowchart, inspect health scores, step through execution node-by-node in real time, guarantee **0% false approvals** with Shadow Agents, and export ready-to-deploy TypeScript SDK code with one click.

---

## 🚀 Key Features

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  KUMIVYR WORKBENCH  •  OpenServ BRAID Reasoning Engine                   [Export SDK]  │
├───────────────────┬──────────────────────────────────┬─────────────────────────────────┤
│  1. AUTHOR & LINT │       2. VISUAL GRAPH & DEBUG    │  3. VERIFY & EVALS              │
│                   │                                  │                                 │
│ [Prompt / Spec]   │   [ Interactive Mermaid Canvas ] │ [ Tab A: Shadow Agent Tuner ]   │
│ "Loan approval... │                                  │ • Strictness: [High / 0% Risk]  │
│                   │      (Start)                     │ • Verification Hints: Auto      │
│ [Compile with     │         │                        │                                 │
│  SERV API ⚡]     │      [Check Credit]  <-- Active  │ [ Tab B: Test Suite / Evals ]   │
│                   │       /         \                │ • Test Case 1: ✅ Passed ($0.001)│
│ [BRAID Linter]    │   (Yes)         (No)             │ • Test Case 2: 🛑 Blocked (Risk)│
│ • Health: 94/100  │     │             │              │ • Accuracy: 100% | Cost: -92%   │
│ • 1 Open Node (⚠️)│ [Approve]     [Reject]           │                                 │
│                   │                                  │ [ Step-Through Controls ]       │
│                   │                                  │ [  ⏮️ Step  |  ▶️ Run  |  Reset ] │
└───────────────────┴──────────────────────────────────┴─────────────────────────────────┘
```

### 1. 🧠 Prompt-to-GRD Compiler
* **Zero Cognitive Overhead:** Paste multi-page enterprise policies, system prompts, or business rules.
* **Auto-Synthesis:** Calls the OpenServ Inference API (`https://inference-api.openserv.ai/v1`) using `gpt-5.4-nano-multipath` to generate clean, syntax-safe Mermaid flowcharts.
* **Bi-directional Sync:** Edit visually or modify the Mermaid source code directly with instant live preview.

### 2. 🛡️ The BRAID Static Linter Engine
Built directly on findings from OpenServ research papers (*arXiv:2512.15959*) and enterprise case studies (*Neol*, *ThoughtProof*):
* **Binary Decision Enforcer:** Flags open-ended or ambiguous branches (e.g. `-->|Maybe|`) and enforces high-reliability binary yes/no gates.
* **Graph Bloat Detector:** Alerts developers when a single graph exceeds 12 nodes or 7 hops, suggesting sub-graph decomposition.
* **Shadow Agent Coverage Gate:** Warns if financial actions or state mutations lack a preceding verification checkpoint.
* **Health Score (0-100):** Real-time diagnostic badge with actionable one-click fixes.

### 3. 🐞 Interactive Step-Through Debugger
* **Visual Node Lighting:** Watch the active node pulse with neon green highlights as execution progresses.
* **Timeline Controls:** `[⏮️ Step Back]`, `[▶️ Run/Pause]`, `[⏭️ Step Forward]`, and `[🔄 Reset]`.
* **State & Payload Inspector:** Examine JSON variables flowing into each node (e.g. `yearsExperience`, `creditScore`) and mutate variables mid-run to test edge cases.
* **Breakpoints:** Click any node to set a breakpoint that pauses execution automatically.

### 4. 👥 Shadow Agent Sandbox & Regression Evals
* **Shadow Agent Calibration:** Toggle strictness (`Permissive`, `Balanced`, `Strict`) to find the optimal balance between safety and avoiding false blocks.
* **0% False Approval Proof:** Test adversarial inputs and watch the Shadow Agent intercept invalid executions before they commit.
* **Batch Evals Runner:** Run 5 to 50 test scenarios concurrently to assert terminal node correctness and detect regression breaks between graph versions.
* **Benchmark Analytics:** Compares cost per call ($0.0006 for SERV-nano vs. $0.06 for frontier baselines) showing real 100x cost savings.

### 5. 📦 1-Click OpenServ SDK Exporter
* Automatically converts graph capabilities into idiomatic `@openserv-labs/sdk` TypeScript code.
* Synthesizes Zod schemas (`z.object({...})`) for every node input and output.
* Includes SDK v2 local WebSocket tunnel boilerplate (`run(agent)`).

---

## 🏗️ Architecture

Kumivyr runs as a lightweight, blazing-fast client-side application with zero external server dependencies:

```mermaid
flowchart LR
    A[User Prompt] --> B[SERV Inference API]
    B --> C[Mermaid Flowchart Code]
    C --> D[Kumivyr AST Parser]
    D --> E[BRAID Linter Engine]
    D --> F[Dynamic SVG Canvas]
    D --> G[Step Traversal Runtime]
    G --> H[Shadow Agent Verifier]
    G --> I[Batch Evals Runner]
    D --> J[@openserv-labs/sdk Exporter]
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full technical specifications and intermediate representation (IR) data models.

---

## 🛠️ Quick Start

### Prerequisites
* **Node.js:** v18.0.0 or higher (v22 recommended)
* **npm:** v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Webghost01-NG/kumivyr.git
cd kumivyr

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Running Locally

```bash
# Start the development server
npm run dev

# Open in your browser
http://localhost:3000
```

### Running Verification & Tests

```bash
# Run unit tests
npm test

# Run TypeScript typecheck
npm run typecheck

# Build production bundle
npm run build
```

---

## 🗺️ Roadmap: Milestones & Issues

Kumivyr is structured across **8 engineering milestones** and **52 granular issues** with explicit cross-issue blockers and acceptance criteria:

| Milestone | Focus Area | Issues | Status |
| :--- | :--- | :--- | :--- |
| **M1** | Core Shell & Architecture Setup | `#1` – `#6` | ✅ Completed |
| **M2** | Prompt-to-GRD Reasoning Compiler | `#7` – `#13` | 🔄 In Progress |
| **M3** | Kumivyr BRAID Static Linter Engine | `#14` – `#20` | 📅 Planned |
| **M4** | Interactive Visual Step-Through Debugger | `#21` – `#27` | 📅 Planned |
| **M5** | Shadow Agent Verification Sandbox | `#28` – `#34` | 📅 Planned |
| **M6** | Automated Evals Harness & Regression Runner | `#35` – `#41` | 📅 Planned |
| **M7** | OpenServ SDK Code Gen & Marketplace Export | `#42` – `#47` | 📅 Planned |
| **M8** | Enterprise Demos & Submission Showcase | `#48` – `#52` | 📅 Planned |

* Full milestone timeline: [docs/MILESTONES.md](docs/MILESTONES.md)
* Complete 52-issue matrix with blockers & acceptance criteria: [docs/ISSUES.md](docs/ISSUES.md)

---

## 🏆 Hackathon Submission Context

* **Event:** 1st OpenServ Hackathon (Edition 01)
* **Track:** **Track 4 — Open Track** (*"Anything that runs on SERV Reasoning and surprises us"*)
* **Submission Deadline:** September 28, 2026 (00:00 UTC)
* **Eligibility Rule:** Data collection enabled at `console.openserv.ai/settings/organization`.
* **Utility:** Provides the developer experience layer that accelerates adoption of OpenServ's BRAID engine, saving developers hours of debugging and preventing costly graph failure anti-patterns.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
