import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CoachesList from '@/views/coaches/CoachesList.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';

const CoachDetail = () => import('@/views/coaches/CoachDetail.vue');
const CoachRegistration = () => import('@/views/coaches/CoachRegistration.vue');
const ContactCoach = () => import('@/views/requests/ContactCoach.vue');
const RequestReceived = () => import('@/views/requests/RequestReceived.vue');
const UserAuth = () => import('@/views/auth/UserAuth.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/coaches',
  },

  {
    path: '/coaches',
    component: CoachesList,
  },

  {
    path: '/coaches/:id',
    component: CoachDetail,
    props: true,
    children: [
      {
        path: 'contact',
        component: ContactCoach,
      },
    ],
  },

  {
    path: '/register',
    component: CoachRegistration,
    meta: { requiresAuth: true },
  },

  {
    path: '/requests',
    component: RequestReceived,
    meta: { requiresAuth: true },
  },

  {
    path: '/auth',
    component: UserAuth,
    meta: { requiresUnauth: true },
  },

  {
    path: '/:notFound(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return '/auth';
  }
});

export default router;
