import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Auth from "@/components/Auth";
import cookList from "@/components/CookList";
import cookCreate from "@/components/CookCreate";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/cook-list",
      name: "cookList",
      component: cookList
    },
    {
      path: "/cook-list/:msg",
      name: "cookUpdatedList",
      component: cookList
    },
    {
      path: "/cook-create",
      name: "cookCreate",
      component: cookCreate
    },
    {
      path: "/cook-create/:pk",
      name: "cookUpdate",
      component: cookCreate
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth
    }
  ]
});
