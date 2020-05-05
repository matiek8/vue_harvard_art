import Vue from 'vue'
import VueRouter from 'vue-router'
import Collection from "../views/Collection";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Collection
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favourites.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
