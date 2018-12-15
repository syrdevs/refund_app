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
    authority: ['ADMIN', 'FSMS1', 'FSMS2'],
    routes: [
      // dashboard
      { path: '/', redirect: '/main/home' },
      { path: '/main/profile', component: './User/Profile' },
      { path: '/main/list', component: './List/TableList' },

      {
        path: '/main/home',
        name: 'home',
        icon: 'faHome',
        component: './Dashboard/Analysis',
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
            authority: ['ADMIN']
          },
          /*{
            path: '/rpmu/searcher',
            icon: 'faSearch',
            name: 'searcher',
            component: './SearchPhysical/Searcher',
            authority: ['ADMIN', 'FSMS2']
          },*/
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
            authority: ['ADMIN', 'FSMS1', 'FSMS2']
          },//Заявки
          {
            path: '/refunds/reestr',
            icon: 'faListAlt',
            name: 'reestr',
            component: './Main/MainView',
            authority: ['ADMIN', 'FSMS1', 'FSMS2']
          },
          {
            path: '/refunds/calendar',
            icon: 'faCalendarAlt',
            name: 'calendar',
            component: './Calendar/CalendarView',
            authority: ['ADMIN','FSMS2']
          },
          {
            path: '/refunds/templates_view',
            icon: 'faFileInvoice',
            name: 'templates_view',
            component: './Templates/Template',
            authority: ['ADMIN', 'FSMS2']
          },
          {
            path: '/refunds/stat',
            icon: 'faChartBar',
            name: 'stat',
            component: './StaticticsView/StaticticsView',
            authority: ['ADMIN', 'FSMS1', 'FSMS2']
          },
        ],
      },
      {
        path: '/options',
        name: 'options',
        icon: 'faUserCog',
        component: './Options/Options',
        authority: ['ADMIN']
      },
      {
        path: '/reports',
        icon: 'faFileExcel',
        name: 'reports',
        component: './Reports/ReportsPage',
        authority: ['ADMIN', 'FSMS2']
      },
      {
        path: '/journal',
        icon: 'faBookOpen',
        name: 'journal',
        component: './Journal/JournalPage',
        authority: ['ADMIN', 'FSMS2']
      },
      {
        path: '/add/newact',
        component: './Acts/Actsadd',
      },
      {
        path: '/add/newcontractrequest',
        component: './ContractRequests/ContractRequestsadd',
      },
      {
        path: '/contract',
        icon: 'faFileContract',
        name: 'contract',
        routes: [
          {
            path: '/contract/counteragent',
            name: 'counteragent',
            icon: 'faFileMedicalAlt',
            component: './CounterAgent/CounterAgentMain',
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/contract/counteragent',
                redirect: '/contract/counteragent/main',
              },
              {
                path: '/contract/counteragent/main',
                component: './CounterAgent/CounterAgent',
              },
              {
                path: '/contract/counteragent/viewcontract',
                name:"viewcounteragent",
                component: './CounterAgent/CounterAgentView',
              },
              {
                path: '/contract/counteragent/create',
                name:"contractView",
                component: './CounterAgent/CounterAgentCreate',
              },
              {
                path: '/contract/counteragent/editcontract',
                name:'contractView',
                component: './CounterAgent/CounterAgentEdit',
              },
            ],
          },
          {
            path: '/contract/contracts',
            name: 'contracts',
            component: './ContractView/ContractMain',
            icon: 'faFileSignature',
            hideChildrenInMenu: true,
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
            routes: [
              {
                path: '/contract/contracts',
                redirect: '/contract/contracts/table',
              },
              {
                path: '/contract/contracts/table',
                component: './ContractView/ContractTable',
              },
              {
                path: '/contract/contracts/new',
                name: 'add',
                component: './ContractView/ContractNew',
              },
              {
                path: '/contract/contracts/acts/add',
                name: 'actadd',
                component: './Acts/Actsadd',
              },
              {
                path: '/contract/contracts/acts/view',
                name: 'actview',
                component: './Acts/ViewAct',
              },
              {
                path: '/contract/contracts/acts/add/viewcontract',
                name:"viewcontract",
                component: './Acts/viewcontract',
              },
              {
                path: '/contract/contracts/payment/add',
                name: 'paymentadd',
                component: './ContractRequests/ContractRequestsadd',
              },

            ],
          },
          {
            path: '/contract/acts',
            name: 'acts',
            icon: 'faFileInvoice',
            component: './Acts/index',
            hideChildrenInMenu: true,
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
            routes: [
              {
                path: '/contract/acts',
                redirect: '/contract/acts/table',
              },
              {
                path: '/contract/acts/table',
                component: './Acts/main',
              },
              {
                path: '/contract/acts/add',
                name: 'actadd',
                component: './Acts/Actsadd',
              },
              {
                path: '/contract/acts/viewAct',
                name: 'actadd',
                component: './Acts/ViewAct',
              },
              {
                path: '/contract/acts/contractrequest/add',
                name: 'requestadd',
                component: './ContractRequests/ContractRequestsadd',
              },
            ],
          },
          {
            path: '/contract/contractrequests',
            name: 'contractrequests',
            icon: 'faFileAlt',
            component: './ContractRequests/index',
            hideChildrenInMenu: true,
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
            routes: [
              {
                path: '/contract/contractrequests',
                redirect: '/contract/contractrequests/table',
              },
              {
                path: '/contract/contractrequests/table',
                component: './ContractRequests/main',
              },
              {
                path: '/contract/contractrequests/add',
                name: 'add',
                component: './ContractRequests/ContractRequestsadd',
              },
              {
                path: '/contract/contractrequests/view',
                component: './ContractRequests/ViewRequest',
              },
            ],
          },
        ]
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
      /*{
        path: '/contracts',
        icon: 'faBookOpen',
        name: 'contracts',
        component: './ContractView/ContractPage',
        hideChildrenInMenu: true,
        authority: ['ADMIN', 'FSMS1','FSMS2'],
        routes: [
          { path: '/contracts/new', redirect: '/contracts/new' },
          {
            path: '/contracts/new',
            component: './ContractView/ContractNew',
          },
        ],
      },*/
    ],
  },
];
