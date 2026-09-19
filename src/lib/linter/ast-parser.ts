import { GraphEdge, GraphIR, GraphNode, GraphSubgraph, NodeType } from '../../types/braid';

export function parseMermaidFlowchart(code: string): GraphIR {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const subgraphs: GraphSubgraph[] = [];

  const lines = code.split('\n');
  let currentSubgraph: { id: string; title: string; nodeIds: string[] } | null = null;

  // Regex patterns
  // Node with shape: ID[Label], ID(Label), ID{Label}, ID((Label)), ID([Label]), ID[[Label]], ID[(Label)]
  const nodeDefRegex = /([a-zA-Z0-9_]+)\s*(\(\[|\[\[|\[\(|\(\(|\{\{|\[|\(|\{)(.*?)(\]\)|\]\]|\)\]|\)\)|\}\}|\]|\)|\})/g;
  
  // Edge: A --> B, A[Label] --> B{Label}, A -->|label| B, A -.-> B, A ==> B
  const edgeRegex = /([a-zA-Z0-9_]+)(?:\s*(?:\(\[|\[\[|\[\(|\(\(|\{\{|\[|\(|\{).*?(?:\]\)|\]\]|\)\]|\)\)|\}\}|\]|\)|\}))?\s*(?:(?:-->|---|-.->|==>)\s*(?:\|([^|]+)\|)?|--\s*([^-\n]+?)\s*-->)\s*([a-zA-Z0-9_]+)/;
  
  // Subgraph: subgraph Title or subgraph ID [Title]
  const subgraphStartRegex = /^\s*subgraph\s+(?:([a-zA-Z0-9_]+)\s*(?:\[(.*)\])?)?(.*)/i;
  const subgraphEndRegex = /^\s*end\s*$/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Check subgraph boundaries
    if (subgraphEndRegex.test(line)) {
      if (currentSubgraph) {
        subgraphs.push(currentSubgraph);
        currentSubgraph = null;
      }
      continue;
    }

    const subMatch = line.match(subgraphStartRegex);
    if (subMatch && !line.startsWith('flowchart') && !line.startsWith('graph')) {
      const id = subMatch[1] || `subgraph_${subgraphs.length + 1}`;
      const title = subMatch[2] || subMatch[3] || id;
      currentSubgraph = { id, title: title.trim(), nodeIds: [] };
      continue;
    }

    // Parse inline nodes
    let nodeMatch: RegExpExecArray | null;
    while ((nodeMatch = nodeDefRegex.exec(line)) !== null) {
      const nodeId = nodeMatch[1];
      const openBracket = nodeMatch[2];
      const label = nodeMatch[3].trim();

      let nodeType: NodeType = 'process';
      if (openBracket === '{' || openBracket === '{{') {
        nodeType = 'decision';
      } else if (openBracket === '((' || openBracket === '([') {
        nodeType = 'terminal';
      } else if (label.toLowerCase().includes('start') || label.toLowerCase().includes('input')) {
        nodeType = 'start';
      } else if (
        label.toLowerCase().includes('transfer') ||
        label.toLowerCase().includes('execute') ||
        label.toLowerCase().includes('sign') ||
        label.toLowerCase().includes('payout')
      ) {
        nodeType = 'action';
      }

      if (!nodes.has(nodeId)) {
        nodes.set(nodeId, {
          id: nodeId,
          label: label || nodeId,
          type: nodeType,
          rawShape: openBracket,
          outgoingEdges: [],
          incomingEdges: [],
          subgraphId: currentSubgraph?.id,
          metadata: {
            isBinary: nodeType === 'decision',
            requiresShadow: nodeType === 'action',
          },
        });
      }

      if (currentSubgraph && !currentSubgraph.nodeIds.includes(nodeId)) {
        currentSubgraph.nodeIds.push(nodeId);
      }
    }

    // Parse edges
    const edgeMatch = line.match(edgeRegex);
    if (edgeMatch) {
      const fromId = edgeMatch[1];
      const condition = (edgeMatch[2] || edgeMatch[3])?.trim();
      const toId = edgeMatch[4];

      // Ensure nodes exist even if defined without brackets
      if (!nodes.has(fromId)) {
        nodes.set(fromId, {
          id: fromId,
          label: fromId,
          type: 'process',
          rawShape: '[',
          outgoingEdges: [],
          incomingEdges: [],
        });
      }
      if (!nodes.has(toId)) {
        nodes.set(toId, {
          id: toId,
          label: toId,
          type: 'process',
          rawShape: '[',
          outgoingEdges: [],
          incomingEdges: [],
        });
      }

      const edgeId = `${fromId}->${toId}${condition ? `[${condition}]` : ''}`;
      const isBinary = condition ? /^(yes|no|true|false|pass|fail|approved|rejected|verified|discrepancy)$/i.test(condition) : undefined;

      edges.push({
        id: edgeId,
        fromNode: fromId,
        toNode: toId,
        condition,
        isBinary,
      });

      nodes.get(fromId)?.outgoingEdges.push(toId);
      nodes.get(toId)?.incomingEdges.push(fromId);
    }
  }

  // Determine start & terminal nodes
  let startNodeId: string | undefined;
  const terminalNodeIds: string[] = [];

  nodes.forEach((node) => {
    if (node.incomingEdges.length === 0) {
      if (!startNodeId || node.type === 'start') {
        startNodeId = node.id;
      }
    }
    if (node.outgoingEdges.length === 0 || node.type === 'terminal') {
      terminalNodeIds.push(node.id);
    }
  });

  // Calculate maximum depth from start node via BFS
  let maxDepth = 0;
  if (startNodeId) {
    const queue: Array<{ id: string; depth: number }> = [{ id: startNodeId, depth: 1 }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.depth > maxDepth) maxDepth = current.depth;
      visited.add(current.id);

      const node = nodes.get(current.id);
      if (node) {
        for (const outId of node.outgoingEdges) {
          if (!visited.has(outId)) {
            queue.push({ id: outId, depth: current.depth + 1 });
          }
        }
      }
    }
  }

  // Cyclomatic complexity M = E - N + 2P (P=1 for single connected graph)
  const nodeCount = nodes.size;
  const edgeCount = edges.length;
  const cyclomaticComplexity = Math.max(1, edgeCount - nodeCount + 2);

  return {
    nodes,
    edges,
    subgraphs,
    startNodeId,
    terminalNodeIds,
    metrics: {
      nodeCount,
      edgeCount,
      maxDepth,
      cyclomaticComplexity,
    },
  };
}
