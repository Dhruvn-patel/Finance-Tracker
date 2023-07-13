import { createRouter, createWebHistory } from "vue-router";
import Signin from "../pages/auth/signin.vue";
import Signup from "../pages/auth/signup.vue";
import AddTransaction from "../pages/transaction-page/add-transaction.vue";
import ViewTransaction from "../pages/transaction-page/view-transaction.vue";
import ViewData from "../pages/transaction-page/view-data.vue";
import EditData from "../pages/transaction-page/edit-transaction.vue";
import Notfound from "../pages/page-not-found/not-found.vue";

function guardMyroute(to: any, from: any, next: any) {
  let isAuthenticated = false;
  if (
    localStorage.getItem("loginUser") != null &&
    localStorage.getItem("token") != null
  )
    isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login");
  }
}

function guardMySign(to: any, from: any, next: any) {
  let isAuthenticated = false;
  if (
    localStorage.getItem("loginUser") != null &&
    localStorage.getItem("token") != null
  )
    isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next("/"); // allow to enter route
  } else {
    next();
  }
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name:'root',
      redirect: "/transactions",
    },
    {
      path: "/transactions",
      component: ViewTransaction,
      beforeEnter: guardMyroute,
    },
    { name:'login',path: "/login", component: Signin, beforeEnter: guardMySign },
    {name:'register', path: "/register", component: Signup, beforeEnter: guardMySign },
    {
      path: "/transactions/create",
      component: AddTransaction,
      beforeEnter: guardMyroute,
    },
    {
      path: "/transactions/:id",
      component: ViewData,
      name: "view",
      beforeEnter: guardMyroute,
    },
    {
      path: "/transactions/edit/:id",
      component: EditData,
      name: "Edit",
      beforeEnter: guardMyroute,
    },
    { path: "/:pathMatch(.*)*", component: Notfound },
  ],
});

export default router;
