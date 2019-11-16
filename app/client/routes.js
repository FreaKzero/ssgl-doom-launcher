import Wads from '#View/Wads';
import Settings from '#View/Settings';

const routes = [
  {
    label: 'wads',
    href: '/',
    component: Wads
  },
  {
    label: 'packages',
    href: '/packages',
    component: Wads
  },
  {
    label: 'sourceports',
    href: '/sourceports',
    component: Wads
  },
  {
    label: 'settings',
    href: '/settings',
    component: Settings
  }
];

export default routes;
