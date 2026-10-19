## Technical Documentation: Invex

**Invex** is a high-performance web application developed for managing, simulating and comparing financial investments. Built with **Nuxt 3**, **Vue 3**, **TypeScript** and **SCSS**, the platform offers a reactive and intuitive interface for graphical portfolio analysis, compound interest simulation and equity projections.

---

## Summary

- [1. Overview and Features](#1-overview-and-features)
- [2. Technology Stack](#2-technology-stack)
- [3. System Architecture](#3-system-architecture)
- [4. Directory Structure](#4-directory-structure)
- [5. Main Modules and Features](#5-main-modules-and-features)
  - [5.1 Financial Dashboard](#51-financial-dashboard)
  - [5.2 Investment Simulator](#52-investment-simulator)
  - [5.3 Asset Comparator](#53-asset-comparator)
- [6. Composables and Business Logic](#6-composables-and-business-logic)
- [7. Utilities and Algorithms (Utils)](#7-utilidades-e-algorithmos-utils)
- [8. Configuration and Installation](#8-configuration-and-installation)
- [9. Unit Tests](#9-unit-tests)

---

## 1. Overview and Features

The **Invex** platform was designed to serve investors and analysts who seek to simulate financial scenarios and visualize the distribution of their assets in real time.

### Key Features:

- **Input Simulations:** Projection of asset growth with configurable compound interest rate and recurring contributions.
- **Dynamic Charts:** Real-time visualization of the distribution by asset classes and equity evolution.
- **Asset Comparison:** Comparative table to evaluate returns between different types of investment (Fixed Income, Shares, FIIs, etc.).
- **Modular Architecture:** Clear separation between visual layer (Components/Pages), states and actions (`composables`), and calculation engines (`utils`).

---

## 2. Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Web Framework** | [Nuxt 3](https://nuxt.com/) | Meta-framework for Vue 3 focused on performance, SSR and file-based routes. |
| **UI Library** | [Vue 3](https://vuejs.org/) | Reactivity with the Composition API (`<script setup lang="ts">`). |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end static typing to ensure data robustness and predictability. |
| **Styling** | [SCSS (Sass)](https://sass-lang.com/) | CSS preprocessor with organized variables and style modularization. |
| **Unit Tests** | [Vitest](https://vitest.dev/) | Fast, native test runner for Vite-based ecosystems. |

---

## 3. System Architecture

The application follows the **Clean Architecture** standard adapted for the Vue/Nuxt ecosystem:

```
[Presentation Layer]
     Pages & Components (Vue + SCSS)
              │
              ▼
[State & Reactivity Layer]
     Composables (useSimulator, useComparison)
              │
              ▼
[Mastery & Mathematics Layer]
     Utils & Calculations (calculations.ts, comparisonCalculations.ts)
```

- **Decoupling:** No financial calculation rules are executed directly within the visual components.
- **Testability:** The calculation functions inside `utils/` are pure, making it easy to cover unit tests with Vitest.

---

## 4. Directory Structure

```text
Invex-main/
├──assets/
│ └── scss/
│ ├── _variables.scss # Design tokens (colors, fonts, spacing)
│ └── main.scss # Global styles and resets
├── components/
│ ├── comparison/
│ │ ├── ComparisonTable.scss # Comparison table styles
│ │ └── ComparisonTable.vue # Asset comparison component
│ ├── dashboard/
│ │ ├── DistributionChart.scss # Pie Chart/Allocation Styles
│ │ ├── DistributionChart.vue # Portfolio distribution chart
│ │ ├── GrouthChart.scss # Growth chart styles
│ │ └── GrowthChart.vue # Evolution line/bar chart
│ ├── Footer.scss # Footer styles
│ ├── Footer.vue # Global footer
│ ├── InvestmentTable.scss # Investment table styles
│ └── InvestmentTable.vue # Detail and extract table
├── composables/
│ ├── useComparison.ts # Global asset comparison state
│ └── useSimulator.ts # Financial simulator state and logic
├── pages/
│ ├── dashboard.scss # Dashboard page styles
│ ├── dashboard.vue # Charts and metrics overview
│ ├── index.scss # Home page styles
│ ├── index.vue # Landing page / Home
│ ├── simulator.scss # Simulator styles
│ └── simulator.vue # Interactive simulation page
├── types/
│ ├── investments.ts # Asset and wallet interfaces
│ └── simulator.ts # Simulation parameter interfaces
├── utils/
│ ├── calculations.ts # Compound interest formulas and yields
│ └── comparisonCalculations.ts # Percentage comparison and profitability
├── app.vue # Application root layout
├── nuxt.config.ts # Configuration of routes, SCSS and Nuxt plugins
├── package.json # Scripts and project dependencies
├── tsconfig.json # Strict TypeScript configuration
└── vitest.config.ts # Automated test suite
```

---

## 5. Main Modules and Features

### 5.1 Financial Dashboard (`/dashboard`)

Offers a panoramic view of the distribution and growth of accumulated assets:
- **DistributionChart:** Displays the percentage proportion of the portfolio by category (Ex: 40% Fixed Income, 30% Stocks, 30% FIIs).
- **GrowthChart:** Plots the evolution line over the months/years, comparing the amount invested *versus* the amount earned in interest.

### 5.2 Investment Simulator (`/simulator`)

Interactive interface of dynamic inputs to project the financial future:
- **Inputs:** Initial Contribution ($R\$$), Monthly Contribution ($R\$$), Annual/Monthly Interest Rate ($\%$) and Period ($Months/Years$).
- **Results:** Total Invested, Total Interest, estimated Gross and Net Equity.

### 5.3 Asset Comparator (`/comparison`)

Allows you to place two or more securities side by side to identify the best opportunity based on terms, liquidity and taxation.

---

## 6. Composables and Business Logic

Composables manage the reactive state of pages and expose helper functions to manipulate form and graph data.

### `useSimulator.ts`
Manages the data provided by the user in the simulation form and automatically recalculates deadlines and projections.

```typescript
// Example of simplified interface
export const useSimulator = () => {
  const params = ref<SimulatorParams>({
    initialAmount: 1000,
    monthlyContribution: 200,
    interestRate: 10, // % per year
    periodMonths: 12
  });

  const results = computed(() => calculateCompoundInterest(params.value));

  return { params, results };
};
```

### `useComparison.ts`

Controls asset selection for the comparison table, allowing you to add, remove, or change security rates in real time.

---

## 7. Utilities and Algorithms (Utils)

Located in `utils/`, these files contain pure math functions with no Vue/Nuxt dependencies.

### `calculations.ts`

Calculates capital accumulation using the classic formula of compound interest with monthly contributions:

$$M = P(1 + i)^n + E \left[ \frac{(1 + i)^n - 1}{i} \right]$$

Where:
- $M$ = Final amount
- $P$ = Initial contribution
- $i$ = Interest rate per period
- $n$ = Number of periods
- $E$ = Recurring monthly contribution

---

## 8. Configuration and Installation

### Prerequisites

- **Node.js:** `^18.x` or `^20.x`
- **npm** or **yarn** / **pnpm**

### Step by Step

1. **Clone the repository and access the folder:**
   ```bash
   cd Invex-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The application will be accessible at `http://localhost:3000`.

4. **Generate the Build for Production:**
   ```bash
   npm run build
   ```

5. **Run the Production Build:**
   ```bash
   npm run preview
   ```

---

## 9. Unit Tests

The project has **Vitest** configured for continuous validation of financial calculations and composables.

To run the automated tests:

```bash
# Run the test suite in watch mode
npm run test

# Run the tests once (CI/CD)
npm run test:run
