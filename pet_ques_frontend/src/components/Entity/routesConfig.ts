const routesConfig = [
  {
    path: '/pet',
    layout: false,
    name: 'vPet',
    routes: [
      { path: '/pet/display', name: 'vPetDisplay', component: './Pet/Display' },
    ],
  },
  {
    path: '/add',
    layout: false,
    name: '添加',
    routes: [
      { path: '/add/drink', name: 'drinkAdd', component: './Add/Drink' },
      { path: '/add/food', name: 'foodAdd', component: './Add/Food' },
      { path: '/add/medicine', name: 'medicineAdd', component: './Add/Medicine' },
      { path: '/add/present', name: 'presentAdd', component: './Add/Present' },
    ],
  },
  {
    path: '/update',
    layout: false,
    name: '修改',
    routes: [
      { path: '/update/drink', name: 'drinkUpdate', component: './Update/Drink' },
      { path: '/update/food', name: 'foodUpdate', component: './Update/Food' },
      { path: '/update/medicine', name: 'medicineUpdate', component: './Update/Medicine' },
      { path: '/update/present', name: 'presentUpdate', component: './Update/Present' },
    ],
  },
  {
    path: '/table',
    layout: false,
    name: '表展示',
    routes: [
      { path: '/table/drink', name: 'drinkTable', component: './Table/Drink' },
      { path: '/table/food', name: 'foodTable', component: './Table/Food' },
      { path: '/table/medicine', name: 'medicineTable', component: './Table/Medicine' },
      { path: '/table/present', name: 'presentTable', component: './Table/Present' },
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
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

export default routesConfig;
