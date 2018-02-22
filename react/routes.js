import PublishPage from 'components/PublishPage';
import AboutPage from 'components/AboutPage';
import LoginPage from 'containers/LoginPage';
import ShowPage from 'containers/ShowPage';
import FourOhFourPage from 'components/FourOhFourPage';

const routes = [
  { path     : '/',
    exact    : true,
    component: PublishPage,
  },
  { path     : '/about',
    exact    : true,
    component: AboutPage,
  },
  { path     : '/login',
    exact    : true,
    component: LoginPage,
  },
  { path     : '/:identifier/:claim',
    exact    : true,
    component: ShowPage,
  },
  { path     : '/:claim',
    exact    : true,
    component: ShowPage,
  },
  {
    component: FourOhFourPage,
  },
];

export default routes;
