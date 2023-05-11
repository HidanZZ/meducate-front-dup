// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
    },
    {
      title: 'Webinar',
      icon: 'solar:play-stream-broken',
      badgeColor: 'success',
      children: [
        {
          title: 'single webinar',
          path: '/webinar/single-webinar'
        },
        {
          title: 'Stage',
          path: '/webinar/stage'
        },
        {
          title: 'schedule',
          path: '/webinar/schedule'
        },
        {
          title: 'Speakers',
          path: '/webinar/speakers'
        }
      ]
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
