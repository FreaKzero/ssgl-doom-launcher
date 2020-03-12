import Packages from './views/Packages';
import Settings from './views/Settings';
import SourcePorts from './views/Sourceports';
import Test from './views/Test';
import Wads from './views/Wads';

const routes = [
  {
    label: 'test',
    href: '/test',
    component: Test
  },
  {
    label: 'wads',
    href: '/',
    component: Wads
  },
  {
    label: 'packages',
    href: '/packages',
    component: Packages
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
