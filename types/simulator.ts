export type InterestType = "compound" | "simple";

export interface ScenarioInput {
    id: string;
    name: string;
    initialValue: number;
    monthlyValue: number;
    anualProfitability: number;
    years: number;
    interestType: InterestType;
}

export interface TimelinePoint {
    periodo: number;
    totalInvestido: number;
    totalAcumulado: number;
}

export interface ScenarioResult {
    input: ScenarioInput;
    finalValue: number;
    totalInvested: number;
    totalProfit: number;
    profitPercentage: number;
    timeline: TimelinePoint[];
}

export interface ComparisonSummary {
    bestScenarioId: string;
    profitDifference: number;
    results: ScenarioResult[];
}