export interface Investment {
  initialValue: number;
  anualProfitability: number;
  years: number;
}

export interface InvestmentResult {
  initialValue: number;
  anualProfitability: number;
  years: number;
  finalValue: number;
  profit: number;
}
