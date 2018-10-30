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
  //exceptions
  {
    path: '/exception',
    routes: [
      { path: '/exception', component: '/Exception/404' },
      { path: '/exception/404', component: '/Exception/404' },
      { path: '/exception/403', component: '/Exception/403' },
      { path: '/exception/500', component: '/Exception/500' },
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
          },
          {
            path: '/refunds/stat',
            icon: 'form',
            name: 'stat',
          },
        ],
      },
      {
        path: '/requests',
        name: 'requests',
        icon: 'form',
        component: './Requests/Requests',
      },
      {
        path: '/options',
        name: 'options',
        icon: 'form',
        component: './Options/Options',
      },
      {
        path: '/payments',
        icon: 'form',
        name: 'payments',
        component: './Payments/PaymentsPage',
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
        component: './Result/TestPage',
      },
      {
        path: '/calendar',
        icon: 'form',
        name: 'calendar',
        component: './Calendar/CalendarView',
      },
      {
        path: '/templates_view',
        icon: 'form',
        name: 'templates_view',
      },
      {
        component: '404',
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
    ],
  },
];
