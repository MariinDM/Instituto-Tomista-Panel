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
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/users',
    title: 'Usuarios',
    moduleName: 'users',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/roles',
    title: 'Roles',
    moduleName: 'roles',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/grades',
    title: 'Grados',
    moduleName: 'grades',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/sections',
    title: 'Secciones',
    moduleName: 'sections',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/groups',
    title: 'Grupos',
    moduleName: 'groups',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/education-levels',
    title: 'Niveles Educativos',
    moduleName: 'education-levels',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  }
];
