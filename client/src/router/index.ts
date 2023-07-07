import { createRouter, createWebHistory } from "vue-router";
import Signin from "../components/Signin.vue";
import Signup from "../components/Signup.vue";
import AddTransaction from "../components/AddTransaction.vue";
import ViewTransaction from "../components/ViewTransaction.vue";
import ViewData from "../components/ViewData.vue";
import EditData from "../components/EditData.vue";
import Notfound from "../components/Notfound.vue";

function guardMyroute(to: any, from: any, next: any) {
  let isAuthenticated = false;
  if (localStorage.getItem("loginUser") != null) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login");
  }
}

function guardMySign(to: any, from: any, next: any) {
  let isAuthenticated = false;
  if (localStorage.getItem("loginUser") != null) isAuthenticated = true;
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
      redirect: "/transactions",
    },
    {
      path: "/transactions",
      component: ViewTransaction,
      beforeEnter: guardMyroute,
    },
    { path: "/login", component: Signin, beforeEnter: guardMySign },
    { path: "/register", component: Signup, beforeEnter: guardMySign },
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
  ],
});

export default router;
