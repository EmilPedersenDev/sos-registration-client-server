import Vue from "vue";
import VueRouter from "vue-router";

import Users from "@/components/views/Users.vue";
import RegisterPosition from "@/components/views/RegisterPosition";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";
import About from "@/components/views/About.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (localStorage.getItem("jwt")) {
    next({ path: "/users" });
    return;
  }
  next();
};

let router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/add-position",
      name: "RegisterPosition",
      component: RegisterPosition,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/users",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
