import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '../layouts/AppLayout.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import SalesPage from '../pages/SalesPage.vue'
import IncomesPage from '../pages/IncomesPage.vue'
import StocksPage from '../pages/StocksPage.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: OrdersPage 
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrdersPage
      },
      {
        path: 'sales',
        name: 'sales',
        component: SalesPage
      },
      {
        path: 'incomes',
        name: 'incomes',
        component: IncomesPage
      },
      {
        path: 'stocks',
        name: 'stocks',
        component: StocksPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

