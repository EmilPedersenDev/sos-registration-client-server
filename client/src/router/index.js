import Vue from "vue";
import VueRouter from "vue-router";

import Users from "@/components/Users.vue";
import RegisterPosition from "@/components/RegisterPosition";
import EditPost from "@/components/EditPost";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";

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
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/add-position",
    name: "RegisterPosition",
    component: RegisterPosition,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts/:id",
    name: "EditPost",
    component: EditPost,
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
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
