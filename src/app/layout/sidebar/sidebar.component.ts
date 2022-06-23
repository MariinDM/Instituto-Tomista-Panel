import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef, OnInit, AfterViewInit, Renderer2, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from './sidebar-items';
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
  sidebar: any[] = []
  menu: any = []
  cat: any[] = []
  pass: boolean = false
  submenu: any[] = []

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
        // this.sidebar = this.routes 
        this.sidebar = ROUTES.filter((sidebarItem) => sidebarItem);
        //CATEGORIES
        for (let i = 0; i < this.sidebar.length; i++) {
          for (let j = 0; j < this.dataVR.length; j++) {
            if (this.sidebar[i].moduleName == this.dataVR[j].categories.name) {
              //Primer Categoria
              if (this.menu.length == 0) {
                this.menu.push(this.sidebar[i])
              }
              //Otras Categorias
              else {
                for (let o = 0; o < this.menu.length; o++) {
                  if (this.menu[o].moduleName != this.dataVR[j].categories.name) {
                    this.pass = true
                  } else { this.pass = false }
                }
                if (this.pass) {
                  this.menu.push(this.sidebar[i])
                }
              }
            }
          }
        }

        //MENU
        for (let j = 0; j < this.menu.length; j++) {
          //SUBMENU
          for (let o = 0; o < this.menu[j].submenu.length; o++) {
            //DATAVR
            for (let i = 0; i < this.dataVR.length; i++) {
              if (this.dataVR[i].name == this.menu[j].submenu[o].moduleName) {
                this.submenu.push(this.menu[j].submenu[o])
              }
            }
          }
          this.menu[j].submenu = this.submenu
          this.submenu = []
        }
        this.sidebarItems = this.menu
      }
      this.initLeftSidebar();
      this.bodyTag = this.document.body;
    })
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