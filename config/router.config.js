export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      //{path: '/user/register', component: './User/Register'},
      //{path: '/user/register-result', component: './User/RegisterResult'},
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
      { path: '/main/profile', component: './User/Profile' },
      { path: '/main/list', component: './List/TableList' },
      {
        path: '/main/home',
        name: 'home',
        icon: 'form',
        component: './Main/MainView',
      },
      {
        path: '/refunds',
        icon: 'form',
        name: 'refunds',
        routes: [
          { path: '/refunds', redirect: '/refunds/reestr' },
          {
          path: '/refunds/reestr',
          icon: 'form',
          name: 'reestr',
          component: './List/Articles',
        },{
          path: '/refunds/stat',
          icon: 'form',
          name: 'stat',
        }],
      },
      {
        path: '/requests',
        icon: 'form',
        name: 'requests',
      },
      {
        path: '/payments',
        icon: 'form',
        name: 'payments',
      },
      {
        path: '/reports',
        icon: 'form',
        name: 'reports',
      },
      {
        path: '/journal',
        icon: 'form',
        name: 'journal',
      },
      {
        path: '/calendar',
        icon: 'form',
        name: 'calendar',
        component: './Calendar/CalendarView'
      },
      {
        path: '/templates_view',
        icon: 'form',
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
