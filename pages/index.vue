<script setup lang="ts">
import "./index.scss";
</script>

<template>
    <main class="home">
        <section class="home__hero">
            <div class="home__content">
                <span class="home__tag">Invex - Simule seus Investimentos</span>

                <h1>
                    Planeje de forma <span>simples</span>
                </h1>

                <p>
                    Crie uma simulação, veja a evolução do seu patrimônio e 
                    acompanhe os resultados através de um dashboard
                </p>

                <NuxtLink to="/simulator" class="home__button">
                    Iniciar simulação
                </NuxtLink>
            </div>

            <div class="home__card">
                <p>Exemplo de investimento</p>

                <h2>R$ 10.000,00</h2>

                <div class="home__info">
                    <strong>Rentabilidade anual</strong>
                    <span>10%</span>
                </div>

                <div class="home__info">
                    <strong>Período</strong>
                    <span>05 anos</span>
                </div>

                <div class="home__info">
                    <strong>Valor estimado</strong>
                    <span>R$ 16.105,10</span>
                </div>
            </div>
        </section>
    </main>
</template>
