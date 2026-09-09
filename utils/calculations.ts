import type { Investment, InvestmentResult } from "../types/investments"

export function calculateInvestment(
  investment: Investment
): InvestmentResult {
  
  const finalValue = investment.initialValue = Math.pow(1 + investment.anualProfitability / 100, investment.years)
  const profit = finalValue - investment.initialValue

  return {
    ...investment,
    finalValue,
    profit
  }
}
