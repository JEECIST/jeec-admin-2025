import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import Dashboard from "../global-components/TheDashboard.vue";

const routes = [
  {
    path: "/",
    name: "login",
    meta: {
      title: "JEEC Admin",
    },
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
      children: ["activities", "admin", "bills", "business", "claimprizes", "qrcodes", "speakers", "sponsors", "studentapp", "teams", "usershifts", "myshifts"],
    },
  },
  {
    path: "/activities",
    name: "activities",
    meta: { title: "Activities", children: false },
    component: () => import("../pages/Activities/Activities.vue"),
  },
  {
    path: "/activities/day/:day/:event_day_external_id/:event_id",
    name: "activities-day",
    meta: { title: "Activities Day", children: false },
    component: () => import("../pages/Activities/ActivitiesDay.vue"),
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
    meta: { title: "Locations" },
    component: () => import("../pages/Activities/ActivitiesTypesLocations.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Admin",
      children: ["admin-accounting", "admin-events", "admin-teamusers", "admin-inventory", "admin-bills", "admin-chances", "shiftcentral"],
    },
  },
  {
    path: "/admin/inventory",
    name: "admin-inventory",
    meta: { title: "Inventory" },
    component: () => import("../pages/Admin/AdminInventory.vue"),
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
    path: "/admin/bills",
    name: "admin-bills",
    meta: { title: "Bills Management" },
    component: () => import("../pages/Admin/AdminBills.vue"),
  },
  {
  path: "/admin/chances",
  name: "admin-chances",
  meta: { title: "Chances" },
  component: () => import("../pages/Admin/AdminChances.vue"),
  },
  {
    path: "/admin/shift-central",
    name: "shiftcentral",
    meta: { title: "Shift Central" },
    component: () => import("../pages/Admin/ShiftCentral.vue"),
  },
  {
    path: "/bills",
    name: "bills",
    meta: {
      title: "Bills",
      children: false
    },
    component: () => import("../pages/Bills/Bills.vue")
  },
  {
    path: "/business",
    name: "business",
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "Business",
      children: ["business-meals", "business-companies", "business-parking"],
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
    meta: { title: "Companies" },
    component: () => import("../pages/Business/BusinessCompanies.vue"),
  },
  {
    path: "/business/parking",
    name: "business-parking",
    meta: {title: "Parking" },
    component: () => import("../pages/Business/BusinessParking.vue"),
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
    component: () => import("../global-components/TheDashboard.vue"),
    meta: {
      title: "QR Codes",
      children: ["qrcodes-eletrolink", "qrcodes-scan"],
    },
  },
  {
    path: "/qr-codes/scan",
    name: "qrcodes-scan",
    meta: { title: "QR Codes Scan" },
    component: () => import("../pages/QRCodes/QRCodes.vue"),
  },
  {
    path: "/qr-codes/eletrolink",
    name: "qrcodes-eletrolink",
    meta: { title: "Eletrolink Registrations" },
    component: () => import("../pages/QRCodes/Eletrolink.vue"),
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
    path: "/student-app",
    name: "studentapp",
    component: Dashboard,
    meta: {
      title: "Student App", children: ["studentapp-prizes", "studentapp-squads", "studentapp-students", "studentapp-cvs" , "studentapp-notifications", "studentapp-wordle","studentapp-connections", "studentapp-testPush"]
    },
  },
  {
    path: "/student-app/points",
    name: "studentapp-points",
    meta: { title: "Points" },
    component: () => import("../pages/StudentApp/StudentAppPrizesSpecial.vue"),
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
    path: "/student-app/connections",
    name: "studentapp-connections",
    meta: { title: "Connections" },
    component: () => import("../pages/StudentApp/ConnectionsGame.vue"),
  },
  {
    path: "/student-app/prizes",
    name: "studentapp-prizes",
    meta: { title: "Prizes" },
    component: () => import("../pages/StudentApp/StudentAppPrizes.vue"),
  },
  {
    path: "/student-app/prizes/special",
    name: "studentapp-prizes-special",
    meta: { title: "Special Prizes" },
    component: () => import("../pages/StudentApp/StudentAppPrizesSpecial.vue"),
  },
  {
    path: "/student-app/prizes/shop",
    name: "studentapp-prizes-shop",
    meta: { title: "Shop" },
    component: () => import("../pages/StudentApp/StudentAppPrizeShop.vue"),
  },
  {
    path: "/student-app/cvs",
    name: "studentapp-cvs",
    meta: { title: "Student CVs" },
    component: () => import("../pages/StudentApp/StudentCVs.vue"),
  },
  {
    path: "/student-app/notifications",
    name: "studentapp-notifications",
    meta: { title: "Notifications" },
    component: () => import("../pages/StudentApp/Notifications.vue"),
  },
  {    
    path: "/student-app/wordle",
    name: "studentapp-wordle",
    meta: { title: "Wordle" },
    component: () => import("../pages/StudentApp/StudentAppWordle.vue"),
  },
  {
    path: "/student-app/testPush",
    name: "studentapp-testPush",
    meta: { title: "TestPush" },
    component: () => import("../pages/StudentApp/testPush.vue"),
  },
  {
    path: "/teams",
    name: "teams",
    meta: { title: "Teams", children: false },
    component: () => import("../pages/Teams/Teams.vue"),
  },
  {
    path: "/teams/members/:external_id",
    name: "teams-members",
    props: true,
    meta: { title: "Team Members" },
    component: () => import("../pages/Teams/TeamMembers.vue"),
  },
  {
    path: "/user-shifts",
    name: "usershifts",
    meta: { title: "Availability", children: false },
    component: () => import("../pages/UserShifts/UserShifts.vue"),
  },
  {
    path: "/my-shifts",
    name: "myshifts",
    meta: { title: "My JEEC Tasks", children: false },
    component: () => import("../pages/MyShifts/MyShifts.vue"),
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

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  let expired = false;

  document.title = to.meta.title;

  // If navigating to login, don’t run auth logic
  if (to.name === "login") {
    return true;
  }

  // Check for token expiration and try refreshing
  if (userStore.loggedIn && userStore.isTokenExpired()) {
    try {
      await userStore.refreshJWT();
      expired = userStore.isTokenExpired();
    } catch {
      expired = true;
    }
  }

  if (!userStore.loggedIn || expired) {
    userStore.logoutUser();
    return { name: "login" };
  }

  // Permissions
  await userStore.verifyPermission();

  const routeName = router.getRoutes().find(
    rte => rte.path === '/' + to.path.split('/')[1]
  )?.name;

  if (routeName && !userStore.accessList[routeName]) {
    return { name: "dashboard" };
  }

  return true;
});



export default router;
