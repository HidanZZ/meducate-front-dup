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
      sectionTitle: 'Apps'
    },
    {
      title: 'Webinar',
      icon: 'solar:play-stream-broken',
      badgeColor: 'success',
      children: [
        {
          title: 'single webinar',
          path: '/apps/webinar/single-webinar'
        },
        {
          title: 'Stage',
          path: '/apps/webinar/stage'
        },
        {
          title: 'schedule',
          path: '/apps/webinar/schedule'
        },
        {
          title: 'Speakers',
          path: '/apps/webinar/speakers'
        }
      ]
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    },
    {
      sectionTitle: 'Admin'
    },
    {
      title :'Webinar',
      icon: 'mdi:acount',
      path: '/admin/webinar'
    },
  ]
}

export default navigation
