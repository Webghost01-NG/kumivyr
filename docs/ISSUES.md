# Kumivyr Issue Tracking & Dependency Matrix (52 Issues)

This document indexes all 52 engineering tasks organized by Milestone, specifying their technical requirements, cross-issue blockers, and explicit acceptance criteria.

---

## Milestone 1: Core Shell & Architecture Setup (Issues #1 - #6)

### Issue #1: Project Initialization & Base Toolchain Configuration
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `setup`, `toolchain`
- **Blockers:** None
- **Acceptance Criteria:**
  - [ ] Vite, React, TypeScript, and TailwindCSS initialized with zero circular dependencies.
  - [ ] Path aliases configured for `@/*` mapping to `./src/*`.
  - [ ] Strict TypeScript configuration with `noImplicitAny` and `strictNullChecks` enabled.
  - [ ] Vitest configuration operational for unit tests.

### Issue #2: Design System & Dark Cyberpunk Theme Tokens
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `ui`, `theme`
- **Blockers:** Blocked by #1
- **Acceptance Criteria:**
  - [ ] Dark theme palette specified: Background `#090a0f`, Surface tiers `#151722` to `#2e334d`.
  - [ ] Neon accent tokens established: Emerald (`#01fe93`), Violet (`#7928ca`), Cyan (`#00f0ff`), Amber (`#ffb703`).
  - [ ] Typography configured for Inter (body) and JetBrains Mono (code/AST).
  - [ ] Pulse glow and node highlight animation keyframes registered in Tailwind.

### Issue #3: Responsive 3-Pane Workbench Layout Shell
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `ui`, `layout`
- **Blockers:** Blocked by #2
- **Acceptance Criteria:**
  - [ ] Left pane: Prompt input, compiler triggers, and AST Linter diagnostics.
  - [ ] Center pane: Interactive Mermaid reasoning diagram canvas and zoom controls.
  - [ ] Right pane: Tabbed panel for Shadow Agent Tuner, Step Debugger, and Evals Runner.
  - [ ] Panes collapse gracefully on smaller screens or can be toggled via hotkeys.

### Issue #4: OpenServ Inference API Client & Gateway Adapter
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `api`, `core`
- **Blockers:** Blocked by #1
- **Acceptance Criteria:**
  - [ ] Client configured with default endpoint `https://inference-api.openserv.ai/v1`.
  - [ ] Handles header injection for `Authorization: Bearer <API_KEY>`.
  - [ ] Standardized error handling for rate limits, 401 unauthorized, and timeouts.
  - [ ] Mock mode fallback when no API key is provided for offline testing.

### Issue #5: LocalStorage Persistence for Settings & Workspace State
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `state`, `core`
- **Blockers:** Blocked by #1
- **Acceptance Criteria:**
  - [ ] Stores user API key in `localStorage` under `kumivyr_api_key`.
  - [ ] Persists active prompt text and edited Mermaid diagrams across page reloads.
  - [ ] Clear cache / reset workspace action provided in settings modal.

### Issue #6: Application Header, Model Selector & Global Status Indicators
- **Milestone:** M1: Core Shell & Architecture
- **Labels:** `ui`, `header`
- **Blockers:** Blocked by #2, #4
- **Acceptance Criteria:**
  - [ ] Displays Kumivyr branding, version badge (`v0.1.0-hackathon`), and repo links.
  - [ ] Model dropdown supporting `gpt-5.4-nano-multipath`, `gpt-5.4-nano`, and `serv-nano`.
  - [ ] Connection status pill (Online, Local Tunnel, Mock Mode).
  - [ ] One-click button to open SDK Export and Help documentation.

---

## Milestone 2: Prompt-to-GRD Reasoning Compiler (Issues #7 - #13)

### Issue #7: Natural Language Prompt Editor with Template Shortcuts
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `editor`, `ui`
- **Blockers:** Blocked by #3
- **Acceptance Criteria:**
  - [ ] Textarea supporting multi-line enterprise prompts and system instructions.
  - [ ] Quick-insert buttons for common constraints (e.g. "Enforce Binary Branching", "Add Shadow Checkpoint").
  - [ ] Character and estimated token count counter.

### Issue #8: SERV Reasoning Prompt Compiler Pipeline
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `ai`, `compiler`
- **Blockers:** Blocked by #4, #7
- **Acceptance Criteria:**
  - [ ] Formulates meta-prompt instructing SERV Reasoning engine to emit strict Mermaid flowchart syntax.
  - [ ] Strips markdown fences (e.g. ````mermaid ... ````) and normalizes whitespace.
  - [ ] Handles streaming responses or asynchronous graph compilation cleanly.

### Issue #9: Mermaid Flowchart Code Sanitizer & Parser
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `parser`, `compiler`
- **Blockers:** Blocked by #8
- **Acceptance Criteria:**
  - [ ] Sanitizes unescaped quotation marks and brackets inside node labels.
  - [ ] Enforces flowchart orientation (`flowchart TD` or `flowchart LR`).
  - [ ] Replaces syntax-breaking symbols with safe HTML entity equivalents.

### Issue #10: Dynamic SVG Mermaid Canvas Renderer
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `canvas`, `rendering`
- **Blockers:** Blocked by #9
- **Acceptance Criteria:**
  - [ ] Uses `mermaid.render()` to dynamically generate SVG in the canvas container.
  - [ ] Re-renders automatically on code updates with debounce (300ms).
  - [ ] Custom dark-mode theme styling applied to nodes, text, and edge paths.

### Issue #11: Canvas Zoom, Pan & Fit-to-Viewport Navigation
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `canvas`, `ux`
- **Blockers:** Blocked by #10
- **Acceptance Criteria:**
  - [ ] Mouse wheel / trackpad pinch-to-zoom support (0.2x to 3.0x zoom).
  - [ ] Click-and-drag pan across the infinite canvas.
  - [ ] "Reset View" and "Fit to Screen" buttons in canvas floating toolbar.

### Issue #12: Direct Mermaid Source Code Editor with Bi-directional Sync
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `editor`, `code`
- **Blockers:** Blocked by #10
- **Acceptance Criteria:**
  - [ ] Tab to toggle between Visual Canvas and Raw Mermaid Code.
  - [ ] Code syntax highlighting and monospace font display.
  - [ ] Edits to code immediately update visual canvas without losing view position.

### Issue #13: Real-Time Syntax Error Boundary & Visual Lint Callout
- **Milestone:** M2: Prompt-to-GRD Compiler
- **Labels:** `errors`, `ui`
- **Blockers:** Blocked by #10, #12
- **Acceptance Criteria:**
  - [ ] Catches Mermaid parsing errors gracefully without crashing the UI.
  - [ ] Displays inline error banner highlighting the offending line and syntax error.
  - [ ] Reverts to last known good diagram state if new input fails to parse.

---

## Milestone 3: Kumivyr BRAID Static Linter Engine (Issues #14 - #20)

### Issue #14: Mermaid AST Tokenizer & Graph Intermediate Representation (IR)
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `ast`
- **Blockers:** Blocked by #9
- **Acceptance Criteria:**
  - [ ] Tokenizes flowchart strings into nodes, edges, labels, and sub-graphs.
  - [ ] Extracts edge conditions (e.g. `-->|Yes|`, `-->|No|`, `-->|Pass|`).
  - [ ] Exposes a programmatic `GraphIR` interface for downstream rule evaluation.

### Issue #15: Rule 1: Binary Decision Checkpoint Validator
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `rules`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Identifies branch nodes with >2 outgoing transitions.
  - [ ] Flags open-ended or ambiguous edge labels (e.g. "Maybe", "Check again").
  - [ ] Emits warning: "Binary judgments outperform free-form reasoning (Neol Research Rule)".

### Issue #16: Rule 2: Graph Depth & Node Complexity Threshold Checker
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `rules`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Counts total nodes in a single graph.
  - [ ] Flags graphs with >12 nodes with a warning to decompose into subgraphs.
  - [ ] Measures maximum branch depth and alerts if execution path exceeds 7 hops.

### Issue #17: Rule 3: Subgraph Decomposition & Multipath Recommender
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `rules`
- **Blockers:** Blocked by #16
- **Acceptance Criteria:**
  - [ ] Detects disconnected or loosely-coupled node clusters.
  - [ ] Suggests wrapping secondary workflows in `subgraph ... end` blocks.
  - [ ] Recommends using `gpt-5.4-nano-multipath` model tag for multi-rule diagrams.

### Issue #18: Rule 4: Terminal Node Safety & Dead-End Detection
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `rules`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Verifies that every graph has at least one explicit terminal state (e.g. `[Approved]`, `[Rejected]`, `[Completed]`).
  - [ ] Flags dead-end non-terminal nodes that lack outgoing edges.
  - [ ] Detects circular loops that lack an exit condition (infinite recursion hazard).

### Issue #19: Rule 5: Shadow Verification Coverage on High-Stakes Nodes
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `rules`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Identifies action/tool-invocation nodes (e.g. `TransferFunds`, `SignTx`, `DeleteRecord`).
  - [ ] Checks if a verification node or shadow gate precedes the execution node.
  - [ ] Emits warning: "High-stakes financial action requires Shadow Agent pre-verification".

### Issue #20: Graph Health Score (0-100) & Diagnostic Panel
- **Milestone:** M3: BRAID Static Linter
- **Labels:** `linter`, `ui`
- **Blockers:** Blocked by #15, #16, #17, #18, #19
- **Acceptance Criteria:**
  - [ ] Calculates weighted score: 100 base, deductions for critical/warning violations.
  - [ ] Visual badge with color coding (Green: 90+, Amber: 70-89, Red: <70).
  - [ ] Expandable diagnostic panel listing each issue with a 1-click "Auto-Fix" suggestion.

---

## Milestone 4: Interactive Visual Step-Through Debugger (Issues #21 - #27)

### Issue #21: Graph Traversal State Machine & Node Pointer
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `runtime`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Tracks current execution state (`IDLE`, `RUNNING`, `PAUSED`, `STEPPED`, `FINISHED`).
  - [ ] Maintains an active node pointer (`currentNodeId`).
  - [ ] Evaluates next node transition based on simulated or live payload variables.

### Issue #22: Active Node SVG Highlighter & Neon Glow Animation
- **Milestone:** M4: Visual Debugger
- **Labels:** `canvas`, `ui`
- **Blockers:** Blocked by #10, #21
- **Acceptance Criteria:**
  - [ ] Injects dynamic CSS classes to the SVG element matching `currentNodeId`.
  - [ ] Applies animated pulsing border in emerald (`#01fe93`).
  - [ ] Dim non-active paths to focus user attention on the active execution trace.

### Issue #23: Step Forward, Step Back, and Reset Execution Controls
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `ui`
- **Blockers:** Blocked by #21, #22
- **Acceptance Criteria:**
  - [ ] Control toolbar: `[⏮️ Step Back]`, `[▶️ Run/Pause]`, `[⏭️ Step Forward]`, `[🔄 Reset]`.
  - [ ] Step back restores previous variable state and moves highlighter to prior node.
  - [ ] Keyboard shortcuts: Space (Play/Pause), Right Arrow (Step Forward), R (Reset).

### Issue #24: Variable & Payload State Inspector
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `ui`
- **Blockers:** Blocked by #21
- **Acceptance Criteria:**
  - [ ] Side drawer displaying the JSON payload entering the current node.
  - [ ] Shows simulated extracted values (e.g. `yearsExperience: 8`, `creditScore: 740`).
  - [ ] Allows developer to edit payload values mid-run to test branching decisions.

### Issue #25: Breakpoint Toggling on Diagram Nodes
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `interaction`
- **Blockers:** Blocked by #10, #21
- **Acceptance Criteria:**
  - [ ] Clicking a node or node row in inspector sets a breakpoint indicator (🔴).
  - [ ] "Run" mode automatically pauses when execution reaches any breakpointed node.
  - [ ] Breakpoints persist throughout the debugging session.

### Issue #26: Mock Input Scenario Selector & Data Fixture Generator
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `data`
- **Blockers:** Blocked by #24
- **Acceptance Criteria:**
  - [ ] Dropdown of pre-set scenarios (e.g. "Compliant User", "Borderline Risk", "Adversarial Input").
  - [ ] 1-click load scenario into the execution state.
  - [ ] Ability to save current payload as a custom scenario fixture.

### Issue #27: Live Execution Trace Timeline
- **Milestone:** M4: Visual Debugger
- **Labels:** `debugger`, `timeline`
- **Blockers:** Blocked by #21, #24
- **Acceptance Criteria:**
  - [ ] Displays chronological breadcrumb list of visited nodes: `Start → CheckScore → Approve`.
  - [ ] Shows latency and token estimation for each node hop.
  - [ ] Clicking any historical breadcrumb steps the canvas view back to that execution moment.

---

## Milestone 5: Shadow Agent Verification Sandbox (Issues #28 - #34)

### Issue #28: Shadow Agent Configuration Panel & Strictness Slider
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `ui`
- **Blockers:** Blocked by #3, #21
- **Acceptance Criteria:**
  - [ ] Strictness slider with 3 tiers: `Permissive`, `Balanced`, `Strict (0% False Approvals)`.
  - [ ] Displays current configuration parameters sent to SERV Reasoning API.
  - [ ] Visual explanation of trade-off between false blocks vs. false approvals.

### Issue #29: Dual-Agent Simulation Architecture (Decision vs. Validation)
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `core`
- **Blockers:** Blocked by #28
- **Acceptance Criteria:**
  - [ ] Simulates the primary Decision Agent proposing an action.
  - [ ] Simulates the Validation Agent independently verifying against criteria before execution.
  - [ ] Renders the dual-agent communication handshake in real time.

### Issue #30: Automated Verification Hints Generator
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `ai`
- **Blockers:** Blocked by #29
- **Acceptance Criteria:**
  - [ ] Analyzes high-risk nodes (financial transfers, data mutation).
  - [ ] Generates targeted verification hints steering the validator to check specific constraints.
  - [ ] Displays generated hints in the inspector for developer review.

### Issue #31: Simulated "False Approval Interception" Demo Case
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `demo`
- **Blockers:** Blocked by #29
- **Acceptance Criteria:**
  - [ ] Pre-configured adversarial input (e.g. "Candidate claims 10 years experience, but CV shows 2 years").
  - [ ] Decision Agent attempts to approve; Shadow Agent successfully intercepts and blocks.
  - [ ] Visual alert showing: "0% False Approval Safeguard Triggered".

### Issue #32: Verification Verdict Breakdown Card
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `ui`
- **Blockers:** Blocked by #29, #31
- **Acceptance Criteria:**
  - [ ] Card displaying status: `APPROVED`, `BLOCKED`, or `FLAGGED_FOR_HUMAN`.
  - [ ] Confidence score and bulleted justification from the Shadow Agent.
  - [ ] Timestamped audit log entry ready for compliance export.

### Issue #33: Over-Blocking Sensitivity Tuner
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `tuning`
- **Blockers:** Blocked by #28, #32
- **Acceptance Criteria:**
  - [ ] Highlights if a valid step was blocked due to extreme strictness.
  - [ ] Suggests tuning parameter adjustments to reduce false negatives without sacrificing safety.
  - [ ] Live re-test button to test updated threshold immediately.

### Issue #34: Token & Cost Delta Estimator for Shadow Calls
- **Milestone:** M5: Shadow Agent Sandbox
- **Labels:** `shadow`, `analytics`
- **Blockers:** Blocked by #29
- **Acceptance Criteria:**
  - [ ] Displays estimated cost per verified call (e.g. `$0.0006` for SERV-nano vs `$0.06` for cascade).
  - [ ] Shows total projected monthly savings based on input query volume.

---

## Milestone 6: Automated Evals Harness & Regression Runner (Issues #35 - #41)

### Issue #35: Evaluation Test Suite Data Model & Schema
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `schema`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] TypeScript interface for `TestCase`: ID, name, input payload, expected terminal node, forbidden nodes.
  - [ ] Support for tagging tests: `smoke`, `regression`, `edge-case`, `security`.
  - [ ] JSON schema validation using Zod.

### Issue #36: Interactive Test Case Management Table
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `ui`
- **Blockers:** Blocked by #35
- **Acceptance Criteria:**
  - [ ] Table displaying all test fixtures with status pills (Untested, Passed, Failed).
  - [ ] "Add Test Case" modal to create new scenarios directly in the UI.
  - [ ] Edit and delete test case actions with instant local storage sync.

### Issue #37: Batch Execution Engine with Async Concurrency
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `runtime`
- **Blockers:** Blocked by #21, #36
- **Acceptance Criteria:**
  - [ ] "Run All Evals" button executing tests in parallel (concurrency limit: 4).
  - [ ] Progress bar showing completion percentage (e.g. `8/10 completed`).
  - [ ] Cancellation button to abort running batches.

### Issue #38: Pass/Fail Assertion Evaluator
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `logic`
- **Blockers:** Blocked by #37
- **Acceptance Criteria:**
  - [ ] Asserts that graph traversal ended at `expectedTerminalNode`.
  - [ ] Asserts that no `forbiddenNodes` were visited during the trace.
  - [ ] Marks test as Passed (Green check) or Failed (Red cross) with path mismatch diff.

### Issue #39: Cost vs. Frontier Benchmark Comparison Widget
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `analytics`
- **Blockers:** Blocked by #38
- **Acceptance Criteria:**
  - [ ] Displays side-by-side benchmark: SERV Reasoning ($0.0006/call) vs. GPT-4o ($0.06/call).
  - [ ] Shows 100x cost reduction metric and 0% false approval rate (ThoughtProof paper metrics).
  - [ ] Interactive query volume slider showing annual savings in dollars.

### Issue #40: Graph Version Regression Diff Analyzer
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `diff`
- **Blockers:** Blocked by #38
- **Acceptance Criteria:**
  - [ ] Compares eval results between Diagram Version A and Version B.
  - [ ] Flags any previously passing test case that now fails ("Regression Detected!").
  - [ ] Highlights the exact node where behavior diverged between versions.

### Issue #41: Export Test Reports as Markdown & JSON Artifacts
- **Milestone:** M6: Evals CI/CD
- **Labels:** `evals`, `export`
- **Blockers:** Blocked by #38
- **Acceptance Criteria:**
  - [ ] "Export Eval Report" button.
  - [ ] Generates formatted Markdown audit report suitable for GitHub PR comments or compliance files.
  - [ ] Downloadable JSON report with complete node traces and execution latencies.

---

## Milestone 7: OpenServ SDK Code Generator & Marketplace Export (Issues #42 - #47)

### Issue #42: TypeScript `@openserv-labs/sdk` Capability Generator
- **Milestone:** M7: SDK Code Gen
- **Labels:** `sdk`, `codegen`
- **Blockers:** Blocked by #14
- **Acceptance Criteria:**
  - [ ] Parses graph decision nodes and tool invocations into `agent.addCapability()` calls.
  - [ ] Formats idiomatic TypeScript code matching OpenServ SDK v2 standards.
  - [ ] Includes `systemPrompt` populated with compiled Guided Reasoning Diagram.

### Issue #43: Automatic Zod Schema Synthesizer
- **Milestone:** M7: SDK Code Gen
- **Labels:** `sdk`, `codegen`
- **Blockers:** Blocked by #42
- **Acceptance Criteria:**
  - [ ] Converts node input variables into `z.object({...})` syntax.
  - [ ] Adds `.describe()` annotations based on node labels.
  - [ ] Imports `z` from `'zod'` cleanly.

### Issue #44: Python SDK Agent Scaffold Generator
- **Milestone:** M7: SDK Code Gen
- **Labels:** `sdk`, `python`
- **Blockers:** Blocked by #42
- **Acceptance Criteria:**
  - [ ] Option to toggle between TypeScript and Python in code export modal.
  - [ ] Generates valid Python code compatible with `openserv-labs/python-sdk`.
  - [ ] Sets up capability handler functions and Pydantic models.

### Issue #45: Local Tunnel Development Snippet (`run(agent)`)
- **Milestone:** M7: SDK Code Gen
- **Labels:** `sdk`, `codegen`
- **Blockers:** Blocked by #42
- **Acceptance Criteria:**
  - [ ] Includes SDK v2 local WebSocket tunnel boilerplate: `import { run } from '@openserv-labs/sdk'`.
  - [ ] Configures graceful shutdown handler (`process.on('SIGINT')`).
  - [ ] Adds instructions for testing locally without deploying a public URL.

### Issue #46: 1-Click Clipboard Copy & Project ZIP Downloader
- **Milestone:** M7: SDK Code Gen
- **Labels:** `export`, `ux`
- **Blockers:** Blocked by #42, #44
- **Acceptance Criteria:**
  - [ ] "Copy to Clipboard" with animated checkmark feedback.
  - [ ] "Download ZIP" button bundling `agent.ts`, `package.json`, `tsconfig.json`, and `.env.example`.
  - [ ] Ready to run immediately with `npm install && npm start`.

### Issue #47: OpenServ Agent Manifest & Metadata Generator (`agent.json`)
- **Milestone:** M7: SDK Code Gen
- **Labels:** `export`, `marketplace`
- **Blockers:** Blocked by #42
- **Acceptance Criteria:**
  - [ ] Generates `agent.json` containing agent name, description, capabilities list, and tags.
  - [ ] Embeds the verified Guided Reasoning Diagram in manifest metadata for marketplace auditability.
  - [ ] Validates manifest against OpenServ platform schema.

---

## Milestone 8: Production Polish, Enterprise Demos & Submission (Issues #48 - #52)

### Issue #48: Preloaded Template 1: Institutional RWA Treasury & Rebalancing
- **Milestone:** M8: Polish & Submission
- **Labels:** `templates`, `rwa`
- **Blockers:** Blocked by #10, #21, #36
- **Acceptance Criteria:**
  - [ ] Preloaded scenario: Evaluates yields across IXS RWA vaults, checks duration and counterparty score.
  - [ ] Has explicit binary nodes and Shadow Agent verification on fund allocation.
  - [ ] Included in "Quick Templates" dropdown in header.

### Issue #49: Preloaded Template 2: Neol CV Experience Extractor (arXiv:2512.15959)
- **Milestone:** M8: Polish & Submission
- **Labels:** `templates`, `research`
- **Blockers:** Blocked by #10, #21, #36
- **Acceptance Criteria:**
  - [ ] Faithful reproduction of the 5-category experience extractor from the Neol research paper.
  - [ ] Demonstrates sub-graph decomposition and binary judgment framing yielding 100% reliability.
  - [ ] Included in "Quick Templates" dropdown.

### Issue #50: Preloaded Template 3: Milestone Escrow & Dispute Resolution
- **Milestone:** M8: Polish & Submission
- **Labels:** `templates`, `escrow`
- **Blockers:** Blocked by #10, #21, #36
- **Acceptance Criteria:**
  - [ ] Preloaded scenario: B2B contract deliverable checker (PR verification, test passing, multi-sig sign-off).
  - [ ] Shows automatic release of escrow funds via AgentKit or Robinhood MCP.
  - [ ] Included in "Quick Templates" dropdown.

### Issue #51: Interactive User Onboarding Tour & Tooltips
- **Milestone:** M8: Polish & Submission
- **Labels:** `ux`, `onboarding`
- **Blockers:** Blocked by #3, #20, #23
- **Acceptance Criteria:**
  - [ ] Welcome modal highlighting the 4 core pillars of Kumivyr.
  - [ ] Step-by-step guided spotlight tour: 1. Prompt → 2. Linter → 3. Canvas → 4. Debugger → 5. Evals.
  - [ ] Can be dismissed or re-opened anytime from the header help icon.

### Issue #52: Hackathon Submission Package & Finalist Showcase Assets
- **Milestone:** M8: Polish & Submission
- **Labels:** `submission`, `docs`
- **Blockers:** Blocked by #1 - #51
- **Acceptance Criteria:**
  - [ ] 2-minute video demo script demonstrating all 4 pillars end-to-end.
  - [ ] Project logotype and banner graphics saved in `public/`.
  - [ ] Public X announcement post drafted tagging `@openservai` with demo video and live URL.
  - [ ] OpenServ Typeform submission ready with all URLs, descriptions, and data collection enabled.
