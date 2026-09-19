import { describe, it, expect } from 'vitest';
import { parseMermaidFlowchart } from '../src/lib/linter/ast-parser';
import { generateOpenServTypeScriptSdk, generatePythonSdkAgent } from '../src/lib/export/sdk-generator';

describe('SDK Code Generator', () => {
  it('generates valid TypeScript code referencing @openserv-labs/sdk', () => {
    const code = `
flowchart TD
    Start([Start]) --> VerifyRisk{Verify Risk}
    VerifyRisk -->|Yes| ExecutePayout[Execute On-Chain Transfer]
`;
    const graph = parseMermaidFlowchart(code);
    const tsCode = generateOpenServTypeScriptSdk(graph, 'TreasuryAgent', code);

    expect(tsCode).toContain("import { Agent, run } from '@openserv-labs/sdk';");
    expect(tsCode).toContain('agent.addCapability({');
    expect(tsCode).toContain('const { stop } = await run(agent);');
  });

  it('generates Python SDK code', () => {
    const code = `
flowchart TD
    Start([Start]) --> Action[Execute Action]
`;
    const graph = parseMermaidFlowchart(code);
    const pyCode = generatePythonSdkAgent(graph, 'TreasuryAgent', code);

    expect(pyCode).toContain('from openserv import Agent, Capability');
    expect(pyCode).toContain('agent.run()');
  });
});
