const routesConfig = [
    {
        path: '/',
        redirect: '/pet/display',
    },
    {
        path: '/pet',
        layout: false,
        name: 'vPet',
        routes: [
            {path: '/pet/display', name: 'vPetDisplay', component: './Pet/Display'},
        ],
    },
    {
        path: '/table',
        layout: false,
        name: '表展示',
        routes: [
            {path: '/table/drink', name: 'drinkTable', component: './Table/Drink'},
            {path: '/table/food', name: 'foodTable', component: './Table/Food'},
            {path: '/table/medicine', name: 'medicineTable', component: './Table/Medicine'},
            {path: '/table/present', name: 'presentTable', component: './Table/Present'},
        ],
    },
    {path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎界面'},
    {path: '/test', icon: 'smile', component: './Test', name: 'Test'},
    {
        name: '管理员',
        path: '/admin',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
            {path: '/admin', name: 'admin1', redirect: '/admin/sub-page'},
            {path: '/admin/sub-page', name: 'admin2', component: './Admin'},
        ],
    },
    {path: '/', redirect: '/welcome'},
    {path: '*', layout: false, component: './404'},
];

export default routesConfig;
