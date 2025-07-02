<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

defineProps({
  chartData: Object,
  chartOptions: Object
})
</script>

<template>
  <div class="chart_wrapper">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>

    .chart_wrapper {
        margin-bottom: 15px;
    }

</style>
