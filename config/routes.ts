export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', name: '主页', icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      //{ path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
      { name: '接口管理', icon: 'table', path: '/admin/interface', component: './Admin/InterfaceInfo' },
      { name: '接口调用次数', icon: 'table', path: '/admin/analysis', component: './Admin/Analysis' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
