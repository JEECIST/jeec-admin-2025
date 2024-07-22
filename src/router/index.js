import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/dashboard',
    alias: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/activities',
    name: 'Activities',
    children: [
      { path: 'types', name: 'Activity Types', component: () => import('../pages/Activities/ActivityTypes.vue')}
    ]
  },
  {
    path: '/admin',
    children: [
      { path: '', alias: 'dashboard', name:'Admin', component: () => import('../pages/Admin/AdminDashboard.vue') },
      { path: 'events', name:'Events', component: () => import('../pages/Admin/AdminEvents.vue') },
      { path: 'team-users', name:'Team Users', component: () => import('../pages/Admin/AdminTeamUsers.vue'), children: [
        { path: 'roles', name:'Team Users Roles', component: () => import('../pages/Admin/AdminTeamUsersRoles.vue') } 
      ]},
    ]
  },
  {
    path: '/business',
    children: [
      { path: '', alias: 'dashboard', name:'Business', component: () => import('../pages/Business/BusinessDashboard.vue') },
      { path: 'meals', name:'Meals', component: () => import('../pages/Business/BusinessMeals.vue') },
      { path: 'companies', name: 'Companies', component: () => import('../pages/Business/BusinessCompanies.vue'), children: [
        { path: 'tiers', name: 'Company Tiers', component: () => import('../pages/Business/BusinessCompanyTiers.vue') }
      ]},
    ]
  },
  {
    path: '/claim-prizes',
    name: 'Claim Prizes',
    component: () => import('../pages/ClaimPrizes/ClaimPrizes.vue')
  },
  {
    path: '/qr-codes',
    name: 'QR Codes',
    component: () => import('../pages/QRCodes/QRCodes.vue')
  },
  {
    path: '/speakers',
    name: 'Speakers',
    component: () => import('../pages/Speakers/Speakers.vue'),
    children: [
      { path: 'types', name: 'Speaker Types', component: () => import('../pages/Speakers/SpeakerTypes.vue') }
    ]
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: () => import('../pages/Sponsors/Sponsors.vue'),
    children: [
      { path: 'tiers', name: 'Sponsor Tiers', component: () => import('../pages/Sponsors/SponsorsTiers.vue') }
    ]
  },
  {
    path: '/student-app',
    children: [
      { path: '', alias: 'dashboard', name:'Student App', component: () => import('../pages/StudentApp/StudentAppDashboard.vue') },
      { path: 'activities', name:'Activities', component: () => import('../pages/StudentApp/StudentAppActivities.vue') },
      { path: 'points', name:'Points', component: () => import('../pages/StudentApp/StudentAppPoints.vue') },
      { path: 'students', name:'Students', component: () => import('../pages/StudentApp/StudentAppStudents.vue') },
      { path: 'prizes', name:'Prizes', component: () => import('../pages/StudentApp/StudentAppPrizes.vue'), children: [
        { path: 'types', name:'Prize Types', component: () => import('../pages/StudentApp/StudentAppPrizeTypes.vue') }
      ]},
    ]
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
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
