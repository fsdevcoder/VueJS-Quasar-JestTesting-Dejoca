import { deviceDetails } from './devices'

export default [
  {
    path: 'locations',
    components: {
      default: () => import('pages/Locations/Locations.vue'),
      top: () => import('layouts/Header.vue')
    },
    meta: { title: 'Locations' }
  },
  {
    path: 'locations/:locationId',
    component: () => import('pages/Locations/Location.vue'),
    props: true,
    children: [
      {
        path: '',
        component: () => import('pages/Locations/LocationDetails.vue'),
        props: true,
        meta: { title: 'Location Details' }
      },
      deviceDetails()
    ]
  }
]
