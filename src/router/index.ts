import AdminComponent from '@/components/admin/AdminComponent.vue'
import BonComponent from '@/components/admin/BonComponent.vue'
import GhiseeComponent from '@/components/admin/GhiseeComponent.vue'
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
      children: [
        {
          path: '',
          component: AdminComponent,
        },
        {
          path: 'bon',
          component: BonComponent
        },
        {
          path: 'ghisee',
          component: GhiseeComponent
        }
      ]
    }
  ],
})

export default router
