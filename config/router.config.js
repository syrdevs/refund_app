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
        icon: 'faSyncAlt',
        component: './Main/MainView',
      },
      {
        path: '/refunds',
        icon: 'faCreditCard',
        name: 'refunds',
        routes: [
          { path: '/refunds', redirect: '/refunds/reestr' },
          {
            path: '/refunds/reestr',
            icon: 'faSyncAlt',
            name: 'reestr',
            component: './List/Articles',
          },
          {
            path: '/refunds/stat',
            icon: 'faSyncAlt',
            name: 'stat',
          },
        ],
      },
      {
        path: '/requests',
        name: 'requests',
        icon: 'faListAlt',
        component: './Requests/Requests',
      },
      {
        path: '/options',
        name: 'options',
        icon: 'faSyncAlt',
        component: './Options/Options',
      },
      {
        path: '/payments',
        icon: 'faSyncAlt',
        name: 'payments',
        component: './Payments/PaymentsPage',
      },
      {
        path: '/reports',
        icon: 'faSyncAlt',
        name: 'reports',
      },
      {
        path: '/journal',
        icon: 'faSyncAlt',
        name: 'journal',
        component: './Journal/JournalPage',
      },
      {
        path: '/calendar',
        icon: 'faSyncAlt',
        name: 'calendar',
        component: './Calendar/CalendarView',
      },
      {
        path: '/templates_view',
        icon: 'faSyncAlt',
        name: 'templates_view',
        component: './Templates/Template',
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
