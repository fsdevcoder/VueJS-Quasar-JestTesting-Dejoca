export default [
  {
    path: 'users',
    components: {
      default: () => import('pages/Users/Users.vue'),
      top: () => import('layouts/Header.vue')
    },
    meta: {
      title: 'Users',
      backButton: 'back',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-left',
      backButtonTooltip: ''
    }
  },
  {
    path: 'users/add-user',
    components: {
      default: () => import('pages/Users/AddUser.vue'),
      top: () => import('layouts/Header.vue')
    },
    meta: { title: 'Add User' }
  },
  {
    path: 'users/:userId',
    components: {
      default: () => import('pages/Users/User.vue'),
      top: () => import('layouts/Header.vue')
    },
    props: true,
    meta: { title: 'User Details',
      backButton: 'back',
      backButtonPath: -1,
      backButtonIcon: 'mdi-arrow-down',
      backButtonTooltip: ''
    }
  }
]
