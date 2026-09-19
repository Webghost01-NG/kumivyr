export type NodeType = 'start' | 'process' | 'decision' | 'action' | 'terminal';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  rawShape: string;
  outgoingEdges: string[];
  incomingEdges: string[];
  subgraphId?: string;
  metadata?: {
    isBinary?: boolean;
    requiresShadow?: boolean;
    suggestedFix?: string;
  };
}

export interface GraphEdge {
  id: string;
  fromNode: string;
  toNode: string;
  condition?: string;
  isBinary?: boolean;
}

export interface GraphSubgraph {
  id: string;
  title: string;
  nodeIds: string[];
}

export interface GraphIR {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  subgraphs: GraphSubgraph[];
  startNodeId?: string;
  terminalNodeIds: string[];
  metrics: {
    nodeCount: number;
    edgeCount: number;
    maxDepth: number;
    cyclomaticComplexity: number;
  };
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  mermaidCode: string;
  initialPayload: Record<string, unknown>;
}
