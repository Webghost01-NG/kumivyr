export interface OpenServCompileRequest {
  prompt: string;
  model?: string;
  strictness?: 'permissive' | 'balanced' | 'strict';
}

export interface OpenServCompileResponse {
  mermaidCode: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    estimatedCostUsd: number;
  };
}

export class OpenServClient {
  private apiUrl: string;
  private apiKey: string | null;

  constructor(apiUrl?: string, apiKey?: string | null) {
    this.apiUrl = apiUrl || import.meta.env.VITE_OPENSERV_API_URL || 'https://inference-api.openserv.ai/v1';
    this.apiKey = apiKey || localStorage.getItem('kumivyr_api_key') || null;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('kumivyr_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async compilePromptToGrd(req: OpenServCompileRequest): Promise<OpenServCompileResponse> {
    // If API key is available, call live inference API
    if (this.apiKey && this.apiKey.trim().length > 0) {
      try {
        const response = await fetch(`${this.apiUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: req.model || 'gpt-5.4-nano-multipath',
            messages: [
              {
                role: 'system',
                content: `You are the OpenServ BRAID Reasoning Compiler. 
Convert the user's objective into a strict, machine-readable Guided Reasoning Diagram using Mermaid flowchart TD syntax.
Follow BRAID best practices:
1. Every decision node MUST use binary branching (-->|Yes| and -->|No| or -->|Pass| and -->|Fail|).
2. Decompose sub-tasks into subgraphs if complexity exceeds 8 nodes.
3. Every high-stakes or irreversible action MUST have a preceding Shadow Agent verification gate.
4. Output ONLY the raw mermaid flowchart code without explanations.`,
              },
              {
                role: 'user',
                content: req.prompt,
              },
            ],
            temperature: 0.1,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          const cleanedMermaid = content
            .replace(/^```mermaid/m, '')
            .replace(/```$/m, '')
            .trim();

          return {
            mermaidCode: cleanedMermaid,
            model: req.model || 'gpt-5.4-nano-multipath',
            usage: {
              promptTokens: data.usage?.prompt_tokens || 120,
              completionTokens: data.usage?.completion_tokens || 85,
              estimatedCostUsd: 0.0006,
            },
          };
        }
      } catch (err) {
        console.warn('OpenServ live API call failed, falling back to local synthesizer:', err);
      }
    }

    // Local Synthesizer / Intelligent Mock Mode
    return this.synthesizeLocalGrd(req.prompt);
  }

  private synthesizeLocalGrd(prompt: string): OpenServCompileResponse {
    const isFinancial = /yield|vault|rwa|trade|transfer|fund|treasury|token/i.test(prompt);
    const isEscrow = /escrow|milestone|dispute|bounty|contract/i.test(prompt);

    let mermaidCode = '';

    if (isFinancial) {
      mermaidCode = `flowchart TD
    Start([Initiate Capital Allocation]) --> FetchMetrics[Query Vault Health & APY]
    FetchMetrics --> CheckYield{APY >= Minimum Threshold?}
    
    CheckYield -->|No| RejectYield([Hold Assets in Reserve])
    CheckYield -->|Yes| CheckRiskScore{Counterparty Grade >= A?}
    
    CheckRiskScore -->|No| FlagAudit([Flag for Risk Committee])
    CheckRiskScore -->|Yes| ShadowVerifier{Shadow Agent Pre-Flight}
    
    ShadowVerifier -->|Approved| ExecuteTx[Execute On-Chain Deposit]
    ShadowVerifier -->|Flagged| HaltTx([Safe Intercept & Halt])
    
    ExecuteTx --> Receipt([Emit Immutable Audit Receipt])`;
    } else if (isEscrow) {
      mermaidCode = `flowchart TD
    StartDeliverable([Milestone Submitted]) --> CheckPR[Verify GitHub PR Status]
    CheckPR --> IsMerged{PR Merged & CI Green?}
    
    IsMerged -->|No| RequestRevisions([Reject & Request Updates])
    IsMerged -->|Yes| CheckDocs{Docs & Tests Complete?}
    
    CheckDocs -->|No| AlertDocs([Require Test Fixtures])
    CheckDocs -->|Yes| ShadowAudit{Shadow Security Validator}
    
    ShadowAudit -->|Approved| ReleaseEscrow[Release Milestone Payout via AgentKit]
    ShadowAudit -->|Disputed| OpenDispute([Freeze Escrow for Arbitration])
    
    ReleaseEscrow --> Complete([Milestone Finalized])`;
    } else {
      mermaidCode = `flowchart TD
    Start([Receive User Objective]) --> ParseInput[Extract Intent & Parameters]
    ParseInput --> ValidateParameters{Input Valid & Safe?}
    
    ValidateParameters -->|No| RejectInput([Return Validation Error])
    ValidateParameters -->|Yes| ExecuteStep[Execute Reasoning Sub-Task]
    
    ExecuteStep --> ShadowVerification{Shadow Agent Checkpoint}
    ShadowVerification -->|Approved| FinalizeResult([Deliver Verified Result])
    ShadowVerification -->|Blocked| Retry([Safe Fallback / Retry])`;
    }

    return {
      mermaidCode,
      model: 'kumivyr-synthesizer (local)',
      usage: {
        promptTokens: 80,
        completionTokens: 64,
        estimatedCostUsd: 0.0006,
      },
    };
  }
}
