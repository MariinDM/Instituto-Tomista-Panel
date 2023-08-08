import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef, OnInit, Renderer2, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouteInfo } from './sidebar.metadata';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ApiServiceService } from 'src/app/services/api-service.service';

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

  user: any = {}
  picture: string = ''
  image: string = null
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  dataVR: any = []
  menu: any = []
  submenu: any[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router,
    private apiService: ApiServiceService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private _snack: MatSnackBar
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
    this.sidebarItems = []
    this.apiService.getRoleViewUser().subscribe({
      next: (v) => {
        for (let i = 0; i < v.roleViews.length; i++) {
          let route: RouteInfo = null
          route = {
            path: v.roleViews[i].views.route,
            title: v.roleViews[i].views.name,
            moduleName: v.roleViews[i].views.name,
            icon: v.roleViews[i].views.icon,
            class: '',
            groupTitle: false,
            submenu: []
          }

          this.sidebarItems.push(route)
        }
      },
      error: (e) => {

      }
    })
  }
  getInfo(): void {
    this.apiService.profile().subscribe({
      next: (v) => {
        localStorage.setItem('role', v.me.role_id)
        // console.log(v)
        this.user = v.me

        this.user.full_name = `${this.user.profile.name} ${this.user.profile.last_name}`
        this.user.role_name = this.user.role.name
        this.user.img = `${environment.apiUrl}get/profile/picture/${this.user.profile.image}`
        // console.log(this.user.profile.image)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
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
    this.getInfo()
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
