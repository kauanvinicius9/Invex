import type { Investment } from "../types/investments";
import { calculateInvestment } from "../utils/calculations";

export function useSimulator() {
  const initialValue = useState<number | null>("initialValue", () => null)
  const anualProfitability = useState<number | null>("anualProfitability", () => null)
  const years = useState<number | null>("years", () => null)

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
      years: years.value
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

    return initialValue.value * Math.pow(
      1 + anualProfitability.value / 100,
      years.value
    )
  })
  const profit = computed(() => {
    if (
      initialValue.value === null ||
      finalValue.value === 0
    ) {
      return 0
    }

    return finalValue.value - initialValue.value
  })

  return {
    initialValue,
    anualProfitability,
    years,
    investment,
    result,
    finalValue,
    profit
  }
}
