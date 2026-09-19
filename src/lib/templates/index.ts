import { TemplateDefinition } from '../../types/braid';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'template-rwa-treasury',
    name: 'RWA Vault Allocator & Risk Sentinel',
    category: 'DeFi & Asset Management',
    description: 'Autonomous treasury agent that evaluates yields across licensed IXS RWA vaults with zero-false-approval shadow gates.',
    prompt: `You are an institutional RWA Treasury Agent. Evaluate stablecoin yield across IXS Finance RWA Vaults. 
1. Check vault APY and duration match.
2. Verify counterparty risk rating (minimum A-grade).
3. Confirm liquidity threshold > $1,000,000.
4. Pass through Shadow Agent verification before executing fund allocation.
5. If verified, trigger vault deposit; otherwise flag for manual governance review.`,
    mermaidCode: `flowchart TD
    Start([Receive Treasury Capital]) --> FetchVaults[Fetch IXS Vault Yields]
    FetchVaults --> CheckYield{APY >= 6.5%?}
    
    CheckYield -->|No| RejectYield([Hold in Treasury Reserve])
    CheckYield -->|Yes| CheckRisk{Risk Score >= A?}
    
    CheckRisk -->|No| AlertRisk([Flag High Risk to Governance])
    CheckRisk -->|Yes| CheckLiquidity{Liquidity >= $1M?}
    
    CheckLiquidity -->|No| RouteSecondary([Route to Liquid Pool])
    CheckLiquidity -->|Yes| ShadowGate{Shadow Agent Verification}
    
    ShadowGate -->|Approved| ExecuteDeposit[Execute Vault Deposit via AgentKit]
    ShadowGate -->|Rejected| SafeHalt([Halt Transaction & Audit])
    
    ExecuteDeposit --> Success([Emit On-Chain Receipt])`,
    initialPayload: {
      treasuryAmountUsdc: 500000,
      targetVault: 'IXS-US-Treasury-3M',
      vaultApyPercent: 7.2,
      counterpartyRating: 'A+',
      vaultLiquidityUsd: 4500000,
      maxSlippageBps: 15,
    },
  },
  {
    id: 'template-neol-cv',
    name: 'Neol CV Experience Extractor (arXiv:2512.15959)',
    category: 'Enterprise Intelligence',
    description: 'Structured experience extraction pipeline achieving 100% reliability over 2,400 runs via sub-graph decomposition.',
    prompt: `Extract candidate years of experience from CV document without hallucination or drift.
1. Parse resume text into structured sections.
2. Isolate employment dates across each role.
3. Apply binary validation: exact vs range vs words.
4. Verify total tenure against role overlaps using Shadow Agent validator.
5. Emit standardized candidate experience profile for government network matching.`,
    mermaidCode: `flowchart TD
    StartDoc([Parse Candidate CV]) --> ExtractDates[Extract Work History Dates]
    
    subgraph DateExtraction [Sub-Graph: Experience Decomposition]
        ExtractDates --> CheckFormat{Numeric or Words?}
        CheckFormat -->|Numeric| ParseNumbers[Convert Dates to Month/Year]
        CheckFormat -->|Words| NormalizeText[Map Lexical Numbers to Digits]
        ParseNumbers --> CalcTenure[Calculate Role Durations]
        NormalizeText --> CalcTenure
    end
    
    CalcTenure --> CheckOverlap{Overlapping Roles Detected?}
    CheckOverlap -->|Yes| DeduplicatePeriods[Deduplicate Concurrent Months]
    CheckOverlap -->|No| SumTenure[Sum Total Verified Experience]
    DeduplicatePeriods --> SumTenure
    
    SumTenure --> ShadowValidator{Shadow Agent Verification}
    ShadowValidator -->|Verified| EmitProfile([Emit Candidate Profile: 100% Reliable])
    ShadowValidator -->|Discrepancy| FlagManual([Flag for Human Recruiter Review])`,
    initialPayload: {
      candidateName: 'Alexia Chen',
      targetRole: 'Arctic Wolf Protocol Lead',
      extractedWorkHistory: [
        { role: 'Senior Blockchain Architect', startYear: 2021, endYear: 2026 },
        { role: 'Smart Contract Auditor', startYear: 2018, endYear: 2021 },
      ],
      statedExperienceYears: 8,
    },
  },
  {
    id: 'template-dispute-escrow',
    name: 'Autonomous Milestone Settlement & Dispute Guard',
    category: 'Agentic Commerce',
    description: 'Auditable escrow contract mediator that verifies software deliverables (PR merges, test suites) before releasing milestone payments.',
    prompt: `Verify deliverable for Hackathon Project Milestone #1.
1. Check GitHub PR merge status and CI test results.
2. Confirm documentation and test coverage >= 80%.
3. Use Shadow Agent to verify absence of malicious commits or backdoor patterns.
4. If valid, trigger automated payout via Robinhood MCP / Coinbase AgentKit.
5. If disputed, freeze escrow and notify arbitration multi-sig.`,
    mermaidCode: `flowchart TD
    SubmitMilestone([Submit Milestone Deliverable]) --> VerifyPR[Inspect GitHub PR Status]
    VerifyPR --> CheckMerged{PR Merged to Main?}
    
    CheckMerged -->|No| RejectMilestone([Request Re-submission])
    CheckMerged -->|Yes| CheckTests{CI Tests Passing?}
    
    CheckTests -->|No| FailCI([Trigger Build Failure Warning])
    CheckTests -->|Yes| CheckCoverage{Code Coverage >= 80%?}
    
    CheckCoverage -->|No| RequestCoverage([Require Additional Unit Tests])
    CheckCoverage -->|Yes| ShadowAudit{Shadow Security Validator}
    
    ShadowAudit -->|Passed| ExecutePayout[Release Escrow Payout via MCP]
    ShadowAudit -->|Flagged| FreezeFunds([Freeze Escrow & Open Dispute])
    
    ExecutePayout --> Completed([Settle Milestone & Log Audit])`,
    initialPayload: {
      bountyId: 'OPENSERV-BOUNTY-042',
      escrowAmountUsdc: 2000,
      githubRepo: 'Webghost01-NG/kumivyr',
      prNumber: 14,
      ciStatus: 'SUCCESS',
      coveragePercent: 92.4,
      securityVulnerabilitiesCount: 0,
    },
  },
];
