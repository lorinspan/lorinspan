export interface DecisionNode {
  id: string;
  text: string;
  options?: DecisionOption[];
  result?: string;
  isHighRisk?: boolean;
}

export interface DecisionOption {
  label: string;
  nextNodeId: string;
}
