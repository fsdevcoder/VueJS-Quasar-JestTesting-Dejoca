export function deviceDetails () {
  return {
    path: 'devices',
    props: true,
    components: {
      default: () => import('pages/Devices/index.vue'),
      top: () => import('layouts/Header.vue')
    },
    children: [
      {
        path: '',
        props: true,
        component: () => import('pages/Devices/List.vue'),
        meta: { title: 'SmartHubs' }
      },
      {
        path: ':deviceId',
        component: () => import('pages/Devices/Device/index.vue'),
        props: true,
        children: [
          {
            path: '',
            props: true,
            component: () => import('pages/Devices/Device/Device.vue'),
            meta: { title: 'SmartHub Details' }
          },
          {
            path: 'console',
            props: true,
            component: () => import('pages/Devices/Device/Console.vue'),
            meta: { title: 'SmartHub Console' }
          },
          {
            path: 'mcu',
            props: true,
            component: () => import('pages/Devices/Device/MCU.vue'),
            meta: { title: 'SmartHub Health Status (From MCU)' }
          }
        ]
      }
    ]
  }
}

export default [
  deviceDetails(),
  {
    path: 'device-models',
    component: () => import('pages/Devices/Models.vue'),
    meta: { title: 'SmartHub Models' }
  },
  {
    path: 'device-types',
    component: () => import('pages/Devices/Types.vue'),
    meta: { title: 'SmartHub Types' }
  },
  {
    path: 'device-software',
    component: () => import('pages/Devices/Software.vue'),
    meta: { title: 'SmartHub Firmware' }
  }
]
