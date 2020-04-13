import About from './views/About';
import Packages from './views/Packages';
import Settings from './views/Settings';
import SourcePorts from './views/Sourceports';
import Wads from './views/Wads';

const routes = [
  {
    label: 'wads',
    href: '/',
    component: Wads,
    hide: false,
    shortcut: 'F1'
  },
  {
    label: 'packages',
    href: '/packages',
    component: Packages,
    hide: false,
    shortcut: 'F2'
  },
  {
    label: 'sourceports',
    href: '/sourceports',
    component: SourcePorts,
    hide: false,
    shortcut: 'F3'
  },
  {
    label: 'settings',
    href: '/settings',
    component: Settings,
    hide: false,
    shortcut: 'F4'
  },
  {
    label: 'about',
    href: '/about',
    component: About,
    hide: true,
    shortcut: ''
  }
];

export const order = routes.map(r => r.href);

export default routes;
