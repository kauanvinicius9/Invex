import type { Investment } from "../types/investments";
import { calculateInvestment } from "../utils/calculations";
import { computed } from "vue";

export type InterestType = "compound" | "simple";

export function useSimulator() {
  const initialValue = useState<number | null>("initialValue", () => null);
  const monthlyValue = useState<number | null>("monthlyValue", () => null);
  const anualProfitability = useState<number | null>("anualProfitability", () => null);
  const years = useState<number | null>("years", () => null);

  const interestType = useState<InterestType>("interestType", () => "compound");

  const investment = computed<Investment | null>(() => {
    if (
      initialValue.value === null ||
      anualProfitability.value === null ||
      years.value === null
    ) {
      return null;
    }

    return {
      initialValue: initialValue.value,
      monthlyValue: monthlyValue.value ?? 0,
      anualProfitability: anualProfitability.value,
      years: years.value,
      interestType: interestType.value
    };
  });

  const result = computed(() => {
    if (!investment.value) {
      return null;
    }
    return calculateInvestment(investment.value);
  });

  const finalValue = computed(() => {
    if (
      initialValue.value === null ||
      anualProfitability.value === null ||
      years.value === null
    ) {
      return 0;
    }

    if (result.value !== null) {

      if (typeof result.value === "object" && "finalValue" in result.value) {
        return result.value.finalValue;
      }

      if (typeof result.value === "number") {
        return result.value;
      }
    }

    const P = initialValue.value;
    const rate = anualProfitability.value / 100;
    const t = years.value;

    if (interestType.value === "simple") {
      return P * (1 + rate * t);
    }

    const calculatedCompound = P * Math.pow(1 + rate, t);
    return Number.isFinite(calculatedCompound) ? calculatedCompound : 0;
  });

  const profit = computed(() => {
    if (initialValue.value === null || finalValue.value === 0) {
      return 0;
    }

    const totalInvestido = initialValue.value + ((monthlyValue.value ?? 0) * (years.value ?? 0) * 12);
    return Math.max(0, finalValue.value - totalInvestido);
  });

  return {
    initialValue,
    monthlyValue,
    anualProfitability,
    years,
    interestType,
    investment,
    result,
    finalValue,
    profit
  };
}