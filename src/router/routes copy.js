import usersRoutes from './users'
import devicesRoutes from './devices'
import locationsRoutes from './locations'
import currentUserRoutes from './my'

const routes = [
  {
    path: '/login',
    component: () => import('layouts/Unsecure.vue'),
    children: [
      { path: '', component: () => import('pages/Authorization/Login.vue') }
    ]
  },
  {
    path: '/forgot-password',
    component: () => import('layouts/Unsecure.vue'),
    children: [
      { path: '', component: () => import('pages/Authorization/Forgot.vue') }
    ]
  },
  {
    path: '/sign-up',
    component: () => import('layouts/Unsecure.vue'),
    children: [
      { path: '', component: () => import('pages/Authorization/Signup.vue') }
    ]
  },
  {
    path: '/password-recovery',
    component: () => import('layouts/Unsecure.vue'),
    children: [
      { path: '', component: () => import('pages/Authorization/Recovery.vue') }
    ]
  },
  {
    path: '/email-confirmation',
    component: () => import('layouts/Unsecure.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Authorization/Confirmation.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Secure.vue'),
    redirect: 'dashboard',
    children: [
      ...usersRoutes,
      ...devicesRoutes,
      ...locationsRoutes,
      //
      ...currentUserRoutes
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
