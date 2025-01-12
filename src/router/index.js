import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CourseView from '@/views/CourseView.vue'
import InvoiceView from '@/views/InvoiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView,
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'home' },
    },
  ],
})

export default router
