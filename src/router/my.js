// let props = { default: true, top: true, bottom: true }

export default [
  {
    path: 'dashboard',
    components: {
      default: () => import('pages/My/Dashboard.vue'),
      top: () => import('layouts/Header.vue')
    },
    meta: { title: 'Welcome to Dijoca!' }
  },
  // {
  //   path: 'my/places',
  //   components: {
  //     default: () => import('pages/My/Locations/layout.vue'),
  //     top: () => import('layouts/Header.vue')
  //   },
  //   children: [
  //     // All my locations list
  //     {
  //       path: '',
  //       component: () => import('pages/My/Locations/LocationList.vue'),
  //       meta: { title: 'My Places' }
  //     },
  //     // Single location details and share settings
  //     {
  //       path: ':locationId/details',
  //       props: props,
  //       components: {
  //         default: () => import('pages/My/Locations/Location.vue'),
  //         top: () => import('pages/My/Locations/TopTabs.vue'),
  //         bottom: () => import('pages/My/Locations/BottomTabsDetails.vue')
  //       },
  //       children: [
  //         {
  //           path: '',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/Details.vue'),
  //           meta: {
  //             title: 'Place Details',
  //             backButton: 'back',
  //             backButtonPath: -1,
  //             backButtonIcon: 'mdi-arrow-down',
  //             backButtonTooltip: ''
  //           }
  //         },
  //         {
  //           path: 'share',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/Share/Router.vue'),
  //           meta: {
  //             title: 'Shared Access',
  //             backButton: 'back',
  //             backButtonPath: -1,
  //             backButtonIcon: 'mdi-arrow-left',
  //             backButtonTooltip: 'Back to Place Details'
  //           }
  //         }
  //       ]
  //     },
  //     // single location data
  //     {
  //       path: ':locationId',
  //       props: props,
  //       components: {
  //         default: () => import('pages/My/Locations/Location.vue'),
  //         top: () => import('pages/My/Locations/TopTabs.vue'),
  //         bottom: () => import('pages/My/Locations/BottomTabs.vue')
  //       },
  //       children: [
  //         {
  //           path: '',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/Home.vue'),
  //           meta: {
  //             backButton: 'back',
  //             backButtonPath: '/my/places',
  //             backButtonIcon: 'mdi-arrow-left',
  //             backButtonTooltip: 'Back to My Places'
  //           }
  //         },
  //         {
  //           path: 'schedule',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/Schedule.vue'),
  //           meta: {
  //             backButton: 'back',
  //             backButtonPath: '/my/places',
  //             backButtonIcon: 'mdi-arrow-left',
  //             backButtonTooltip: 'Back to My Places'
  //           }
  //         },
  //         {
  //           path: 'zones',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/Zones.vue'),
  //           meta: {
  //             backButton: 'back',
  //             backButtonPath: '/my/places',
  //             backButtonIcon: 'mdi-arrow-left',
  //             backButtonTooltip: 'Back to My Places'
  //           }
  //         },
  //         {
  //           path: 'history',
  //           props: true,
  //           component: () => import('pages/My/Locations/Tabs/History.vue'),
  //           meta: {
  //             backButton: 'back',
  //             backButtonPath: '/my/places',
  //             backButtonIcon: 'mdi-arrow-left',
  //             backButtonTooltip: 'Back to My Places'
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // current user settings
  {
    path: 'my/settings',
    components: {
      // default: () => import('pages/My/Profile.vue'),
      top: () => import('layouts/Header.vue')
    },
    props: true,
    meta: {
      title: 'My Profile',
      backButton: 'back',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: ''
    }
  }
]
