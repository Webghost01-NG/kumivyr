# Kumivyr Engineering Roadmap & Milestones

This document establishes the official engineering roadmap, phase gates, dependencies, and milestone tracking for **Kumivyr**—the Developer Workbench, Static Linter, and Step Debugger for OpenServ BRAID Reasoning Graphs.

---

## Milestone Overview

```mermaid
gantt
    title Kumivyr Development Milestones (Hackathon Sprint)
    dateFormat  YYYY-MM-DD
    section Core Infrastructure
    M1: Core Shell & Architecture        :done, m1, 2026-09-19, 2d
    M2: Prompt-to-GRD Compiler           :active, m2, 2026-09-20, 2d
    section Quality & Debugging
    M3: Kumivyr BRAID Static Linter      :m3, 2026-09-21, 2d
    M4: Visual Step-Through Debugger     :m4, 2026-09-22, 2d
    section Verification & Evals
    M5: Shadow Agent Sandbox & Tuner     :m5, 2026-09-23, 2d
    M6: Evals CI/CD Regression Runner    :m6, 2026-09-24, 2d
    section Export & Submission
    M7: SDK Code Gen & Manifests         :m7, 2026-09-25, 2d
    M8: Enterprise Polish & Submission   :m8, 2026-09-26, 2d
```

---

## 1. Milestone 1: Core Shell & Architecture Setup
* **Target Completion:** Sept 20, 2026
* **Objective:** Establish the foundational frontend infrastructure, state management, OpenServ API client, theme tokens, and 3-panel responsive workbench layout.
* **Key Dependencies:** None (Base Milestone)
* **Associated Issues:** `#1` to `#6` (6 issues)

---

## 2. Milestone 2: Prompt-to-GRD Reasoning Compiler
* **Target Completion:** Sept 21, 2026
* **Objective:** Transform natural language system prompts and raw business rules into validated Mermaid Guided Reasoning Diagrams (GRD) with two-way code synchronization and dynamic SVG rendering.
* **Key Dependencies:** Blocked by Milestone 1
* **Associated Issues:** `#7` to `#13` (7 issues)

---

## 3. Milestone 3: Kumivyr BRAID Static Linter Engine
* **Target Completion:** Sept 22, 2026
* **Objective:** Build the static analysis rule engine that tokenizes Mermaid graphs, flags non-binary decision nodes, detects excessive graph depth, checks terminal safety, and calculates an overall Graph Health Score (0-100).
* **Key Dependencies:** Blocked by Milestone 2 (Requires Mermaid AST Parser)
* **Associated Issues:** `#14` to `#20` (7 issues)

---

## 4. Milestone 4: Interactive Visual Step-Through Debugger
* **Target Completion:** Sept 23, 2026
* **Objective:** Create a step-by-step visual execution simulator that highlights active nodes on the canvas in glowing neon green, allows step forward/back, inspects payloads, and tracks variable state.
* **Key Dependencies:** Blocked by Milestone 2 & Milestone 3
* **Associated Issues:** `#21` to `#27` (7 issues)

---

## 5. Milestone 5: Shadow Agent Verification Sandbox & Tuner
* **Target Completion:** Sept 24, 2026
* **Objective:** Simulate OpenServ's dual Shadow Agent architecture (Decision Agent + Validation Agent), tune verification strictness, generate verification hints, and prove zero false approvals.
* **Key Dependencies:** Blocked by Milestone 4 (Requires Execution State Machine)
* **Associated Issues:** `#28` to `#34` (7 issues)

---

## 6. Milestone 6: Automated Evals Harness & Regression Runner
* **Target Completion:** Sept 25, 2026
* **Objective:** Implement an in-browser batch evaluation runner that executes test fixtures across reasoning diagrams, asserts expected pathways, and computes cost/accuracy benchmarks vs. baseline frontier models.
* **Key Dependencies:** Blocked by Milestone 4 & Milestone 5
* **Associated Issues:** `#35` to `#41` (7 issues)

---

## 7. Milestone 7: OpenServ SDK Code Generator & Marketplace Export
* **Target Completion:** Sept 26, 2026
* **Objective:** Generate copy-paste-ready `@openserv-labs/sdk` TypeScript capability definitions, Zod input/output schemas, and Python SDK agent templates directly from the verified reasoning diagram.
* **Key Dependencies:** Blocked by Milestone 3 (Requires Verified Graph Schema)
* **Associated Issues:** `#42` to `#47` (6 issues)

---

## 8. Milestone 8: Production Polish, Enterprise Demos & Submission Showcase
* **Target Completion:** Sept 27-28, 2026
* **Objective:** Provide pre-loaded enterprise templates (RWA Treasury Rebalancing, Neol CV Experience Extractor, Milestone Escrow), interactive tour, demo recording, and prepare submission materials for OpenServ judges.
* **Key Dependencies:** Blocked by Milestones 1–7
* **Associated Issues:** `#48` to `#52` (5 issues)
