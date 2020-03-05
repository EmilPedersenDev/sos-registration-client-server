import Vue from "vue";
import VueRouter from "vue-router";

import Users from "@/components/Users.vue";
import RegisterPosition from "@/components/RegisterPosition";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";
import About from "@/components/About.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (localStorage.getItem("jwt")) {
    next({ path: "/users" });
    return;
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/users/add-position",
    name: "RegisterPosition",
    component: RegisterPosition,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/users"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
