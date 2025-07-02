<script setup>
const props = defineProps({
  rows: Array,
  headers: Array,
  fields: Array
})
</script>

<template>
  <table class="simple-table">
    <thead>
      <tr>
        <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="field in fields" :key="field">{{ row[field] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
}

.simple-table thead {
  background-color: #f4f4f4;
}

.simple-table th,
.simple-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.simple-table tr:hover {
  background-color: #f9f9f9;
}

.simple-table th {
  font-weight: bold;
  color: #333;
}
</style>

