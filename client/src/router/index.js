import Vue from "vue";
import VueRouter from "vue-router";

import Posts from "@/components/Posts.vue";
import NewPost from "@/components/NewPost";
import EditPost from "@/components/EditPost";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (localStorage.getItem("jwt")) {
    next({ path: "/posts" });
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
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts/new",
    name: "NewPost",
    component: NewPost,
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
