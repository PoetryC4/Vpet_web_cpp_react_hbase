const routesConfig = [
  {
    path: '/add',
    layout: false,
    name: '添加',
    routes: [
      { path: '/add/drink', name: 'drinkAdd', component: './Add/Drink' },
    ],
  },
  {
    path: '/update',
    layout: false,
    name: '修改',
    routes: [
      { path: '/update/drink', name: 'drinkUpdate', component: './Update/Drink' },
    ],
  },
  {
    path: '/table',
    layout: false,
    name: '表展示',
    routes: [
      { path: '/table/drink', name: 'drinkTable', component: './Table/Drink' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎界面' },
  { path: '/test', icon: 'smile', component: './Test', name: 'Test' },
  {
    name: '管理员',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: 'admin1', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'admin2', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList', name: 'table' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

export default routesConfig;
