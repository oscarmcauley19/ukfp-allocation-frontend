export interface SimulationResults {
  [name: number]: number;
}

export interface DetailedSimulationResult {
  id: number;
  name: string;
  chance: number;
}
