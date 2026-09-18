import type { Investment, InvestmentResult } from "../types/investments";

export function calculateInvestment(
  investment: Investment
): InvestmentResult {
  const { initialValue, monthlyValue = 0, anualProfitability, years, interestType } = investment;

  const annualRate = anualProfitability / 100;
  const totalMonths = years * 12;

  let finalValue = initialValue;
  let totalInvested = initialValue;

  if (interestType === "simple") {
    const initialInterest = initialValue * annualRate * years;
    const totalPMT = monthlyValue * totalMonths;
    const pmtInterest = monthlyValue * (annualRate / 12) * ((totalMonths * (totalMonths + 1)) / 2);
    
    finalValue = initialValue + initialInterest + totalPMT + pmtInterest;
    totalInvested = initialValue + totalPMT;

  } else {
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    const compoundInitial = initialValue * Math.pow(1 + monthlyRate, totalMonths);
    const compoundPMT = monthlyRate > 0 
      ? monthlyValue * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : monthlyValue * totalMonths;

    finalValue = compoundInitial + compoundPMT;
    totalInvested = initialValue + (monthlyValue * totalMonths);
  }

  const profit = Math.max(0, finalValue - totalInvested);

  return {
    ...investment,
    finalValue: Number(finalValue.toFixed(2)),
    profit: Number(profit.toFixed(2))
  };
}