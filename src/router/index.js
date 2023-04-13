import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterStudent from "../components/RegisterStudent.vue";
import SearchComp from "../components/SearchComponent.vue";
import RegisterStaff from "../components/RegisterStaff.vue";
import TestingAPI from "../components/Test.vue";
import DashBoardView from "../views/DashBoardView.vue";
import SubjectView from "../views/SubjectView.vue";
import TicketView from "../views/TicketView.vue";
const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/register", name: "register", component: RegisterStudent },
  { path: "/enroll", name: "enroll", component: RegisterStaff },
  { path: "/test", name: "test", component: TestingAPI },
  { path: "/dash", name: "dashboard", component: DashBoardView },
  { path: "/subject/:subject", component: SubjectView, name: "Subject Dashboard" },
  { path: "/ticket/:id", component: TicketView, name: "TicketPage" },
  { path: "/search/:search", component: SearchComp, name: "SearchPage" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
