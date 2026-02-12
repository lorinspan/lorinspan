export interface DecisionNode {
  id: string;
  text: string;
  options?: DecisionOption[]; // Dacă are opțiuni, e întrebare
  result?: string;            // Dacă are result, e final
}

export interface DecisionOption {
  label: string;
  nextNodeId: string;
}
