import type { Investment } from "../types/investments";
import { calculateInvestment } from "../utils/calculations";
import { computed } from "vue";

export type InterestType = "compound" | "simple";

export function useSimulator() {
  const initialValue = useState<number | null>("initialValue", () => null)
  const anualProfitability = useState<number | null>("anualProfitability", () => null)
  const years = useState<number | null>("years", () => null)

  const interestType = useState<InterestType>("interestType", () => "compound");

  const investment = computed<Investment | null>(() => {
    if (
      initialValue.value === null ||
      anualProfitability.value === null ||
      years.value === null
    ) {
      return null
    }

    return {
      initialValue: initialValue.value,
      anualProfitability: anualProfitability.value,
      years: years.value,
      interestType: interestType.value
    }
  })

  const result = computed(() => {
    if (!investment.value) {
      return null
    }
    return calculateInvestment(investment.value)
  })

  const finalValue = computed(() => {
    if (
      initialValue.value === null ||
      anualProfitability.value === null ||
      years.value === null
    ) {
      return 0
    }

    const P = initialValue.value;
    const rate = anualProfitability.value / 100;
    const t = years.value;

    if (interestType.value === "simple") {
      return P * (1 + rate * t);
    }

    return Number.isFinite(result) ? result : Number.MAX_VALUE;
  })

  const profit = computed(() => {
    if (
      initialValue.value === null ||
      finalValue.value === 0
    ) {
      return 0
    }

    return Math.max(0, finalValue.value - initialValue.value)
  })

  return {
    initialValue,
    anualProfitability,
    years,
    interestType,
    investment,
    result,
    finalValue,
    profit
  };
}
