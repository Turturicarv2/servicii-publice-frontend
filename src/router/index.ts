import AdminComponent from '@/components/admin/adminComponent.vue'
import BonCreeatComponent from '@/components/user/BonCreeatComponent.vue'
import CreeareBonComponent from '@/components/user/CreeareBonComponent.vue'
import UserComponent from '@/components/user/UserComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          component: UserComponent,
        },
        {
          path: 'creeareBon',
          component: CreeareBonComponent
        },
        {
          path: 'bonCreeat/:id',
          component: BonCreeatComponent,
          props: true
        }
      ],
    },
    {
      path: '/admin',
      component: AdminComponent
    }
  ],
})

export default router
