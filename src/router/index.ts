import AdminComponent from '@/components/admin/AdminComponent.vue'
import BonComponent from '@/components/admin/BonComponent.vue'
import GhiseeComponent from '@/components/admin/GhiseeComponent.vue'
import GhiseuComponent from '@/components/admin/GhiseuComponent.vue'
import BonCreeatComponent from '@/components/user/BonCreatComponent.vue'
import CreeareBonComponent from '@/components/user/CreareBonComponent.vue'
import UserComponent from '@/components/user/UserComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
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
        },
        {
          path: 'ghisee/:id',
          component: GhiseuComponent,
          props: true
        }
      ]
    }
  ],
})

export default router
