export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/main/home' },

      {
        path: '/main/home',
        name: 'home',
        icon: 'home',
        component: './Main/MainView',
      },
      {
        path: '/refunds',
        name: 'refunds',
      },
      {
        path: '/requests',
        name: 'requests',
      },
      {
        path: '/payments',
        name: 'payments',
      },
      {
        path: '/reports',
        name: 'reports',
      },
      {
        path: '/journal',
        name: 'journal',
      },
      {
        path: '/calendar',
        name: 'calendar',
      },
      {
        path: '/templates_view',
        name: 'templates_view',
      },
      /*{
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },*/
      {
        component: '404',
      },
    ],
  },
];
