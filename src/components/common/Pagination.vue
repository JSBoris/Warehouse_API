<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  lastPage: Number
})

const emit = defineEmits(['update:page'])

const pagesToShow = computed(() => {
  let start = Math.max(props.currentPage - 2, 1)
  let end = start + 4

  if (end > props.lastPage) {
    end = props.lastPage
    start = Math.max(end - 4, 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('update:page', page)
  }
}
</script>

<template>
  <div class="pagination">
    <button @click="goToPage(1)">1</button>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">&lt;</button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === lastPage">&gt;</button>
    <button @click="goToPage(lastPage)">{{ lastPage }}</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.pagination button {
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.pagination button:hover {
  border-color: #aaa;
}

.pagination button.active {
  border-color: #333;
  font-weight: bold;
}

.pagination button:disabled {
  color: #bbb;
  cursor: default;
}
</style>
