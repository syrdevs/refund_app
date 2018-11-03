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
        icon: 'faHome',
        component: './HomePage/HomePage',
      },
      {
        path: '/rpmu',
        icon: 'faUserMd',
        name: 'rpmu',
        routes: [
          { path: '/rpmu', redirect: '/rpmu/payments' },
          {
            path: '/rpmu/payments',
            icon: 'faMoneyBill',
            name: 'payments',
            component: './Payments/PaymentsPage',
          },
          {
            path: '/rpmu/searcher',
            icon: 'faMoneyBill',
            name: 'searcher',
            component: './SearchPhysical/Searcher',
          },
        ],
      },
      {
        path: '/refunds',
        icon: 'faCreditCard',
        name: 'refunds',
        routes: [
          { path: '/refunds', redirect: '/refunds/reestr' },
          {
            path: '/refunds/requests',
            name: 'requests',
            icon: 'faListAlt',
            component: './Requests/Requests',
          },//Заявки
          {
            path: '/refunds/reestr',
            icon: 'faCoins',
            name: 'reestr',
            component: './Main/MainView',
          },
          {
            path: '/refunds/calendar',
            icon: 'faCalendarAlt',
            name: 'calendar',
            component: './Calendar/CalendarView',
          },
          {
            path: '/refunds/templates_view',
            icon: 'faFileInvoice',
            name: 'templates_view',
            component: './Templates/Template',
          },
          {
            path: '/refunds/stat',
            icon: 'faChartBar',
            name: 'stat',
            component: './Main/MainView',
          },
        ],
      },
      {
        path: '/options',
        name: 'options',
        icon: 'faUserCog',
        component: './Options/Options',
      },
      {
        path: '/reports',
        icon: 'faFileExcel',
        name: 'reports',
      },
      {
        path: '/journal',
        icon: 'faBookOpen',
        name: 'journal',
        component: './Journal/JournalPage',
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
