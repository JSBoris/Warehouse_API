<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const pages = [
  { name: 'Заказы', path: '/orders' },
  { name: 'Продажи', path: '/sales' },
  { name: 'Поступления', path: '/incomes' },
  { name: 'Остатки на складе', path: '/stocks' }
]

const route = useRoute()

const currentPage = computed(() => pages.find(p => p.path === route.path))
</script>

<template>
  <header class="app-header">
    <h1 class="current-page">{{ currentPage?.name || 'Главная' }}</h1>
    <nav class="nav">
      <RouterLink
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="nav-link"
        :class="{ active: page.path === route.path }"
      >
        {{ page.name }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-top: 5px;
}

.current-page {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-size: 16px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #000;
}

.nav-link.active {
  font-weight: 600;
  text-decoration: underline;
  color: #000;
}
</style>
