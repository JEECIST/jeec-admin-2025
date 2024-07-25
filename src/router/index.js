import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import Dashboard from "../global-components/TheDashboard.vue";

const routes = [
  {
    path: "/dashboard",
    alias: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { 
      title: "Dashboard",
      children: ["activities", "admin", "business", "claimprizes", "qrcodes", "speakers", "sponsors", "studentapp"],
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/activities",
    name: "activities",
    meta: { title: "Activities", children: false},
    component: () => import("../pages/Activities/Activities.vue"),
    children: [
      {
        path: "types",
        name: "activitytypes",
        meta: { title: "Activity Types" },
        component: () => import("../pages/Activities/ActivityTypes.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Admin Dashboard",
      children: ["events", "teamusers"],
    },
  },
  {
    path: "/admin/events",
    name: "events",
    meta: { title: "Events" },
    component: () => import("../pages/Admin/AdminEvents.vue"),
  },
  {
    path: "/admin/team-users",
    name: "teamusers",
    meta: { title: "Team Users" },
    component: () => import("../pages/Admin/AdminTeamUsers.vue"),
    children: [
      {
        path: "roles",
        meta: { title: "Team User Roles" },
        component: () => import("../pages/Admin/AdminTeamUsersRoles.vue"),
      },
    ],
  },
  {
    path: "/business",
    name: "business",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Business Dashboard",
      children: ["meals", "companies"],
    },
  },
  {
    path: "/business/meals",
    name: "meals",
    meta: { title: "Meals" },
    component: () => import("../pages/Business/BusinessMeals.vue"),
  },
  {
    path: "/business/companies",
    name: "companies",
    meta: { title: "Companies" },
    component: () => import("../pages/Business/BusinessCompanies.vue"),
    children: [
      {
        path: "tiers",
        meta: { title: "Company Tiers" },
        component: () =>
          import("../pages/Business/BusinessCompanyTiers.vue"),
      },
    ],
  },
  {
    path: "/claim-prizes",
    name: "claimprizes",
    meta: { title: "Claim Prizes", children: false },
    component: () => import("../pages/ClaimPrizes/ClaimPrizes.vue"),
  },
  {
    path: "/qr-codes",
    name: "qrcodes",
    meta: { title: "QR Codes", children: false },
    component: () => import("../pages/QRCodes/QRCodes.vue"),
  },
  {
    path: "/speakers",
    name: "speakers",
    meta: { title: "Speakers", children: false },
    component: () => import("../pages/Speakers/Speakers.vue"),
    children: [
      {
        path: "types",
        meta: { title: "Speaker Types" },
        component: () => import("../pages/Speakers/SpeakerTypes.vue"),
      },
    ],
  },
  {
    path: "/sponsors",
    name: "sponsors",
    meta: { title: "Sponsors", children: false },
    component: () => import("../pages/Sponsors/Sponsors.vue"),
    children: [
      {
        path: "tiers",
        meta: { title: "Sponsor Tiers" },
        component: () => import("../pages/Sponsors/SponsorsTiers.vue"),
      },
    ],
  },
  {
    path: "/student-app",
    name: "studentapp",
    component: Dashboard,
    meta: {
      title: "Student App", children: ["points", "prizes", "students"]
    },
  },
  {
    path: "/student-app/points",
    name: "points",
    meta: { title: "Points" },
    component: () => import("../pages/StudentApp/StudentAppPoints.vue"),
  },
  {
    path: "/student-app/students",
    name: "students",
    meta: { title: "Students" },
    component: () => import("../pages/StudentApp/StudentAppStudents.vue"),
  },
  {
    path: "/student-app/prizes",
    name: "prizes",
    meta: { title: "Prizes" },
    component: () => import("../pages/StudentApp/StudentAppPrizes.vue"),
    children: [
      {
        path: "types",
        meta: { title: "Prize Types" },
        component: () =>
          import("../pages/StudentApp/StudentAppPrizeTypes.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  document.title = to.meta.title;

  if (!userStore.loggedIn && to.name !== "login")
    return { name: "login" };
  
  if (userStore.loggedIn && to.name !== "login") {
    const routeName = router.getRoutes().find(rte => rte.path === ('/' + to.path.split('/')[1])).name;
    if (!userStore.accessList[routeName])
      return { name: "dashboard" }
  }
  
});

export default router;
