import { RouteInfo } from './sidebar.metadata';

export let ROUTES: RouteInfo[] = [
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
    path: '/dashboard',
    title: 'Dashboard',
    moduleName: 'dashboard',
    icon: 'category',
    class: '',
    groupTitle: false,
    rol: 0,
    submenu: []
  },
  {
    path: '/users',
    title: 'Usuarios',
    moduleName: 'users',
    icon: 'person',
    class: '',
    groupTitle: false,
    rol: 1,
    submenu: []
  },
  {
    path: '/roles',
    title: 'Roles',
    moduleName: 'roles',
    icon: 'badge',
    class: '',
    groupTitle: false,
    rol: 1,
    submenu: []
  },
  {
    path: '/grades',
    title: 'Grados',
    moduleName: 'grades',
    icon: 'grade',
    class: '',
    groupTitle: false,
    rol: 1,
    submenu: []
  },
  {
    path: '/sections',
    title: 'Secciones',
    moduleName: 'sections',
    icon: 'filter_list',
    class: '',
    groupTitle: false,
    rol: 1,
    submenu: []
  },
  {
    path: '/groups',
    title: 'Grupos',
    moduleName: 'groups',
    icon: 'group',
    class: '',
    groupTitle: false,
    rol: 1,
    submenu: []
  },
  // {
  //   path: '/education-levels',
  //   title: 'Niveles Educativos',
  //   moduleName: 'education-levels',
  //   icon: 'school',
  //   class: '',
  //   groupTitle: false,
  //   submenu: []
  // }
];
