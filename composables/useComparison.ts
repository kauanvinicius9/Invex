import { useState, computed } from "#imports";
import type { ScenarioInput, ScenarioResult, ComparisonSummary } from "../types/simulator";
import { calculateScenario } from "../utils/comparisonCalculations";

export function useComparison() {
    const scenarios = useState<ScenarioInput[]>("comparisonScenarios", () => [
        {
            id: 1,
            name: "Cenário Conservador (CDB 100% CDI)",
            initialValue: 5000,
            monthlyValue: 500,
            anualProfitability: 10,
            years: 5,
            interestType: "compound"
        },
        {
            id: 2,
            name: "Cenário Moderado (Ações & FIIs)",
            initialValue: 5000,
            monthlyValue: 500,
            anualProfitability: 14,
            years: 5,
            interestType: "compound"
        }
    ]);

    const calculateResults = computed<ScenarioResult[]>(() => {
        return scenarios.value.map((scenario) => calculateScenario(scenario));
    });

    const comparisonSummary = computed<ComparisonSummary | null>(() => {
        if (calculateResults.value.length === 0) return null;

        const sorted = [...calculateResults.value].sort((a, b) => b.totalProfit - a.totalProfit);
        const best = sorted[0];
        const secondBest = sorted[1];
        const profitDifference = secondBest ? best.totalProfit - secondBest.totalProfit : 0;

        return { bestScenarioId: best.input.id, profitDifference: Number(profitDifference.toFixed(2)), results: calculateResults.value };
    });

    const addScenario = (scenario?: Partial<ScenarioInput>) => {
        const nextId = String(Date.now());
        const newScenario: ScenarioInput = { id: nextId, name: scenario?.name || `Cenário ${scenarios.value.length + 1}`, initialValue: 
                                                                                scenario?.initialValue ?? 1000, monthlyValue: scenario?.monthlyValue ?? 200, anualProfitability: 
                                                                                scenario?.anualProfitability ?? 10, years: scenario?.years ?? 5, interestType: scenario?.interestType || "compound" };

        scenarios.value.push(newScenario);
    };

    const removeScenario = (id: string) => {
        scenarios.value = scenarios.value.filter((s) => s.id !== id);
    };

    const duplicateScenario = (id: string) => {
        const target = scenarios.value.find((s) => s.id === id);
        if (target) {
            addScenario({
                ...target,
                name: `${target.name} (Cópia)`
            });
        }
    };

    const updateScenario = (id: string, updateFields: Partial<ScenarioInput>) => {
        const index = scenarios.value.findIndex((s) => s.id === id);
        if (index !== -1) {
            scenarios.value[index] = { ...scenarios.value[index], ...updateFields };
        }
    };

    return { scenarios, calculateResults, removeScenario, comparisonSummary, addScenario, duplicateScenario, updateScenario };
}