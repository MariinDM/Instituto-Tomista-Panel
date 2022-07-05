import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef, OnInit, AfterViewInit, Renderer2, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { RouteInfo } from './sidebar.metadata';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ViewsrolesService } from 'src/app/services/viewsroles.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SidebarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy {
  public sidebarItems: any[] = []
  level1Menu = '';
  level2Menu = '';
  level3Menu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  routerObj = null;

  user!: any
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  dataVR: any = []
  menu: any = []
  submenu: any[] = []
  icons: any[] = [
    'monitor',
    'monitor',
    'monitor',
  ]

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router,
    private vrService: ViewsrolesService,
    private cd: ChangeDetectorRef,
  ) {
    super();
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currenturl = event.url.split('?')[0];
        this.level1Menu = currenturl.split('/')[1];
        this.level2Menu = currenturl.split('/')[2];
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  getall(): void {
    this.vrService.getone(this.code, this.rol).subscribe((data: any) => {
      this.dataVR = data.role.views
      if (localStorage.getItem('token')) {
        //CATEGORIES
        for (let j = 0; j < this.dataVR.length; j++) {
          let route: RouteInfo = null
          route = {
            path: '',
            title: this.dataVR[j].categories.name,
            moduleName: this.dataVR[j].categories.name,
            icon: 'monitor',
            class: 'menu-toggle',
            groupTitle: false,
            submenu: []
          }
          let name = this.dataVR[j].categories.name
          if (this.menu.length == 0) {
            this.menu.push(route)
          }
          else {
            let index = this.menu.findIndex(item => item.moduleName == name)
            if (index == -1) {
              this.menu.push(route)
            }
          }
        }
        //VIEWS
        for (let j = 0; j < this.menu.length; j++) {
          for (let i = 0; i < this.dataVR.length; i++) {
            let submenu: RouteInfo = null
            submenu = {
              path: this.dataVR[i].url,
              title: this.dataVR[i].name,
              moduleName: this.dataVR[i].name,
              icon: '',
              class: 'ml-menu',
              groupTitle: false,
              submenu: []
            }
            if (this.menu[j].moduleName == this.dataVR[i].categories.name) {
              this.menu[j].submenu.push(submenu)
            }
          }
        }
        for (let h = 0; h < this.menu.length; h++) {
          this.menu[h].moduleName = this.tolowercase(this.menu[h].moduleName)
        }
        this.sidebarItems = this.menu
      }
      this.initLeftSidebar();
      this.bodyTag = this.document.body;
    })
  }
  tolowercase(value: string): string {
    return value.toLowerCase();
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = '0';
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = '0';
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = '0';
    } else {
      this.level3Menu = element;
    }
  }
  ngOnInit() {
    this.getall()
  }
  ngAfterViewInit(): void {

    this.cd.detectChanges()
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
