import type { ScenarioInput, ScenarioResult, TimelinePoint } from "../types/simulator";

export function calculateScenario(input: ScenarioInput): ScenarioResult {
    const { initialValue, monthlyValue, anualProfitability, years, interestType } = input;

    const totalMonths = years * 12;
    const rateAnnualDecimal = anualProfitability / 100;
    const rateMonthly = Math.pow(1 + rateAnnualDecimal, 1 / 12) - 1;

    let currentTotal = initialValue;
    let currentInvested = initialValue;
    const timeline: TimelinePoint[] = [];

    for (let month = 1; month <= totalMonths; month++) {
        currentInvested += monthlyValue;

        if (interestType === "simple") {
            const interest = initialValue * rateAnnualDecimal * (month / 12);
            currentTotal = currentInvested + interest;
        } else {
            currentTotal =(currentTotal + monthlyValue) * (1 + rateMonthly);
        }

        timeline.push({
            periodo: month,
            totalInvestido: Number(currentInvested.toFixed(2)),
            totalAcumulado: Number(currentTotal.toFixed(2))
        });
    }

    const finalValue = timeline.length > 0 ? timeline[timeline.length - 1]?.totalAcumulado : initialValue;
    const totalInvested = currentInvested;
    const totalProfit = Math.max(0, finalValue - totalInvested);
    const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    return {
        input,
        finalValue: Number(finalValue.toFixed(2)),
        totalInvested: Number(totalInvested.toFixed(2)),
        totalProfit: Number(totalProfit.toFixed(2)),
        profitPercentage: Number(profitPercentage.toFixed(2)),
        timeline
    };
}