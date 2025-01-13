import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CourseView from '@/views/CourseView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import InvoiceDetailView from '@/views/InvoiceDetailView.vue'
import CourseCreateView from '@/views/CourseCreateView.vue'
import InvoiceCreateView from '@/views/InvoiceCreateView.vue'
import CourseEditView from '@/views/CourseEditView.vue'
import { useUserStore } from '@/stores/user'

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
      meta: { guest: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/course',
      name: 'course',
      component: CourseView,
      meta: { requiresAuth: true },
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView,
      meta: { requiresAuth: true },
    },
    {
      path: '/course/:id',
      name: 'course-detail',
      component: CourseDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/invoice/:id',
      name: 'invoice-detail',
      component: InvoiceDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/course/create',
      name: 'course-create',
      component: CourseCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/invoice/create',
      name: 'invoice-create',
      component: InvoiceCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/course/edit/:id',
      name: 'course-edit',
      component: CourseEditView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userData = useUserStore()
  const isLoggedIn = userData.isAuthenticated()

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.guest && isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
