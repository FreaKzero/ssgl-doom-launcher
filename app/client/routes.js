import Wads from '#View/Wads';
import Settings from '#View/Settings';
import SourcePorts from './views/Souceports';

const routes = [
  {
    label: 'wads',
    href: '/',
    component: Wads
  },
  {
    label: 'sourceports',
    href: '/sourceports',
    component: SourcePorts
  },
  {
    label: 'settings',
    href: '/settings',
    component: Settings
  }
];

export default routes;
