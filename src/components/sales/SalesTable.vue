<script setup>
import { ref, onMounted, computed } from 'vue'
import Table from '../common/Table.vue'
import Pagination from '../common/Pagination.vue'
import LineChart from '../common/LineChart.vue'

// График
const chartData = computed(() => {
  const grouped = {}

  for (const sale of rows.value) {
    if (!grouped[sale.date]) grouped[sale.date] = 0
    grouped[sale.date] += parseFloat(sale.for_pay || 0)
  }

  const labels = Object.keys(grouped).sort()
  const data = labels.map(date => grouped[date])

  return {
    labels,
    datasets: [
      {
        label: 'Сумма продаж по дате',
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        data,
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 2,
        pointHoverRadius: 4,
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Сумма продаж по датам'
    }
  }
}

// Стейты
const rows = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const visibleCount = ref(15)
const itemsPerPage = 15

// Заголовки и поля таблицы
const headers = ['№', 'Дата', 'ID Продажи', 'Сумма', 'Регион', 'Отмена']
const fields = ['index', 'date', 'sale_id', 'for_pay', 'region_name', 'is_strono']

// Фильтры
const filters = ref({
  date: '',
  sale_id: '',
  for_pay: '',
  region_name: '',
  is_strono: '',
})

// Фильтрация
const filteredRows = computed(() => {
  return rows.value.filter(row => {
    return Object.keys(filters.value).every(field => {
      const filterValue = filters.value[field].toString().toLowerCase()
      const rowValue = row[field]?.toString().toLowerCase()
      return rowValue.includes(filterValue)
    })
  })
})

// Текущие строки на отображение (пагинация + show more)
const visibleRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + visibleCount.value
  return filteredRows.value.slice(start, end)
})

// Показать ещё
const showMore = () => {
  visibleCount.value += 15
}

// Загрузка заказов
const fetchSales = async () => {
  const url =
    '/api-proxy/api/sales?dateFrom=2025-06-01&dateTo=2025-06-28&page=1&limit=500&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

  try {
    const response = await fetch(url)
    const result = await response.json()

    rows.value = result.data.map((sale, index) => ({
      index: index + 1,
      date: sale.date,
      sale_id: sale.sale_id,
      for_pay: sale.for_pay,
      region_name: sale.region_name,
      is_strono: sale.is_strono ? 'Да' : 'Нет'
    }))

    totalPages.value = Math.ceil(result.data.length / itemsPerPage)
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error)
  }
}

onMounted(fetchSales)
</script>

<template>
  <div>
    <!-- 🔎 Фильтры -->
    <div class="filters">
      <input v-model="filters.date" placeholder="Фильтр по дате" />
      <input v-model="filters.for_pay" placeholder="Фильтр по сумме" />
      <input v-model="filters.region_name" placeholder="Фильтр по региону" />
      <input v-model="filters.is_strono" placeholder="Фильтр по отмене" />
    </div>

    <!-- 📊 График -->
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />

    <!-- 📋 Таблица -->
    <Table :rows="visibleRows" :headers="headers" :fields="fields" />

    <!-- ⬆️ Показать ещё -->
    <button v-if="visibleCount < filteredRows.length" @click="showMore" class="show-more-btn">
      Показать ещё
    </button>

    <!-- 🔢 Пагинация -->
    <Pagination :current-page="currentPage" :last-page="totalPages" @update:page="currentPage = $event" />
  </div>
</template>

<style scoped>
.show-more-btn {
  display: block;
  margin: 24px auto;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
}

.show-more-btn:hover {
  background-color: #f2f2f2;
  border-color: #999;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filters input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  min-width: 0;
}
</style>
