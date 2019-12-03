import Wads from '#View/Wads';
import Settings from '#View/Settings';
import Sourceports from '#View/Sourceports';

const routes = [
  {
    label: 'wads',
    href: '/',
    component: Wads
  },
  {
    label: 'sourceports',
    href: '/sourceports',
    component: Sourceports
  },
  {
    label: 'settings',
    href: '/settings',
    component: Settings
  }
];

export default routes;
