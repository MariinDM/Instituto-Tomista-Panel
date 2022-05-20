import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '',
  //   title: 'Informacion',// Name del apartado
  //   moduleName: '',
  //   icon: '',
  //   class: '',
  //   groupTitle: true,// Es el que decide si es apartado
  //   submenu: []
  // },
  {
    path: '/',
    title: 'Inicio',
    moduleName: 'dashboard',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/dashboard',
        title: 'Estadisticas',
        moduleName: 'dashboard',
        icon: 'monitor',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Gestion',
    moduleName: 'gestion',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/gestion/usuarios',
        title: 'Usuarios',
        moduleName: 'users',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/dispositivos',
        title: 'Dispositivos',
        moduleName: 'devices',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/categorias',
        title: 'Categorias',
        moduleName: 'categories',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/vistas',
        title: 'Vistas',
        moduleName: 'views',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/roles',
        title: 'Roles',
        moduleName: 'roles',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/vistaroles',
        title: 'Vistas roles',
        moduleName: 'authentication',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/gestion/comunidad',
        title: 'Comunidad',
        moduleName: 'comunity',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Usuario',
    moduleName: 'user',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/user/profile',
        title: 'Perfil',
        moduleName: 'extra-pages',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
];
