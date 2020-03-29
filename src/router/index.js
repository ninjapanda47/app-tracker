import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Form from '@/views/Form.vue';
import Tracker from '@/views/Tracker.vue';
import { authGuard } from '@/auth/authGuard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      beforeEnter: authGuard
    },
    {
      path: '/tracker',
      name: 'Tracker',
      component: Tracker,
      beforeEnter: authGuard
    }
  ]
});

export default router;
