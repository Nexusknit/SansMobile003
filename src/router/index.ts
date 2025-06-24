import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import EnterCode from '../views/EnterCode.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import { useSessionStore } from '../stores/session';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/enter-code', component: EnterCode },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const session = useSessionStore();
  if (['/login', '/enter-code', '/register'].includes(to.path)) {
    next();
  } else {
    if (!session.token || session.isExpired()) {
      session.clear();
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
