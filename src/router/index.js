import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import Dashboard from "../global-components/TheDashboard.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/dashboard",
    alias: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { 
      title: "Dashboard",
      children: ["activities", "admin", "bills", "business", "claimprizes", "qrcodes", "speakers", "sponsors", "studentapp", "teams"],
    },
  },
  {
    path: "/activities",
    name: "activities",
    meta: { title: "Activities", children: false },
    component: () => import("../pages/Activities/Activities.vue"),
  },
  {
    path: "/activities/types",
    name: "activity-types",
    meta: { title: "Activity Types" },
    component: () => import("../pages/Activities/ActivityTypes.vue"),
  },
  {
    path: "/activities/types/locations",
    name: "activity-types-locations",
    meta: { title:"Locations" },
    component: () => import("../pages/Activities/ActivitiesTypesLocations.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Admin",
      children: ["admin-accounting", "admin-events", "admin-teamusers"],
    },
  },
  {
    path: "/admin/accounting",
    name: "admin-accounting",
    meta: { title: "Accounting" },
    component: () => import("../pages/Admin/AdminAccounting.vue"),
  },
  {
    path: "/admin/events",
    name: "admin-events",
    meta: { title: "Events" },
    component: () => import("../pages/Admin/AdminEvents.vue"),
  },
  {
    path: "/admin/team-users",
    name: "admin-teamusers",
    meta: { title: "Team Users" },
    component: () => import("../pages/Admin/AdminTeamUsers.vue"),
  },
  {
    path: "/admin/team-users/roles",
    name: "admin-teamusers-roles",
    meta: { title: "Team User Roles" },
    component: () => import("../pages/Admin/AdminTeamUsersRoles.vue"),
  },
  {
    path: "/bills",
    name: "bills",
    meta: { title: "Bills", children: false },
    component: () => import("../pages/Bills/Bills.vue")
  },
  {
    path: "/business",
    name: "business",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Business",
      children: ["business-meals", "business-companies"],
    },
  },
  {
    path: "/business/meals",
    name: "business-meals",
    meta: { title: "Meals" },
    component: () => import("../pages/Business/BusinessMeals.vue"),
  },
  {
    path: "/business/companies",
    name: "business-companies",
    meta: {title: "Companies" },
    component: () => import("../pages/Business/BusinessCompanies.vue"),
  },
  {
    path: "/business/companies/tiers",
    name: "business-companies-tiers",
    meta: { title: "Company Tiers" },
    component: () =>
      import("../pages/Business/BusinessCompanyTiers.vue"),
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
  },
  {
    path: "/speakers/types",
    name: "speakers-types",
    meta: { title: "Speaker Types" },
    component: () => import("../pages/Speakers/SpeakerTypes.vue"),
  },
  {
    path: "/speakers/bills/:externalid",
    name: "speakers-bills",
    meta: { title: "Speaker Bills" },
    component: () => import("../pages/Speakers/SpeakerBills.vue")
  },
  {
    path: "/sponsors",
    name: "sponsors",
    meta: { title: "Sponsors", children: false },
    component: () => import("../pages/Sponsors/Sponsors.vue"),
  },
  {
    path: "/sponsors/tiers",
    name: "sponsors-tiers",
    meta: { title: "Sponsor Tiers" },
    component: () => import("../pages/Sponsors/SponsorsTiers.vue"),
  },
  {
    path: "/sponsors/bills/:externalid",
    name: "sponsors-bills",
    meta: { title: "Sponsor Bills" },
    component: () => import("../pages/Sponsors/SponsorBills.vue")
  },
  {
    path: "/student-app",
    name: "studentapp",
    component: Dashboard,
    meta: {
      title: "Student App", children: ["studentapp-points", "studentapp-prizes", "studentapp-squads", "studentapp-students"]
    },
  },
  {
    path: "/student-app/points",
    name: "studentapp-points",
    meta: { title: "Points" },
    component: () => import("../pages/StudentApp/StudentAppPoints.vue"),
  },
  {
    path: "/student-app/students",
    name: "studentapp-students",
    meta: { title: "Students" },
    component: () => import("../pages/StudentApp/StudentAppStudents.vue"),
  },
  {
    path: "/student-app/squads",
    name: "studentapp-squads",
    meta: { title: "Squads" },
    component: () => import("../pages/StudentApp/StudentAppSquads.vue"),
  },
  {
    path: "/student-app/prizes",
    name: "studentapp-prizes",
    meta: { title: "Prizes" },
    component: () => import("../pages/StudentApp/StudentAppPrizes.vue"),
  },
  {
    path: "/student-app/types",
    name: "studentapp-types",
    meta: { title: "Prize Types" },
    component: () => import("../pages/StudentApp/StudentAppPrizeTypes.vue"),
  },
  {
    path: "/teams",
    name: "teams",
    meta: { title: "Teams", children: false },
    component: () => import("../pages/Teams/Teams.vue"),
  },
  {
    path: "/teams/members/:externalid",
    name: "teams-members",
    meta: { title: "Team Members" },
    component: () => import("../pages/Teams/TeamMembers.vue"),
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
