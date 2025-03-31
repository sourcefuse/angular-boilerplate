import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router, RouterModule} from '@angular/router';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {
  NbMenuService,
  NbSidebarService,
  NbMenuItem,
  NbThemeService,
  NbSpinnerService,
  NbOverlayContainer,
  NbThemeModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSidebarModule,
  NbRestoreScrollTopHelper,
} from '@nebular/theme';
import {of, Subject, throwError} from 'rxjs';
import {concatMap, takeUntil} from 'rxjs/operators';
import {MainComponent} from './main.component';
import {AuthService, LoggedInUserDM} from '@project-lib/core/auth';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {APP_CONFIG} from '@project-lib/app-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {LeadListComponent} from './components/lead-list/lead-list.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authService: AuthService;
  let menuService: NbMenuService;
  let sidebarServiceMock: NbSidebarService;
  let iconMgr: IconPacksManagerService;
  let router: Router;
  let routerMock;

  // Mock services
  const authServiceMock = {
    currentUser: jasmine
      .createSpy('currentUser')
      .and.returnValue(of(new LoggedInUserDM())),
    logout: jasmine.createSpy('logout').and.returnValue(of(void 0)),
    logoutCognito: jasmine
      .createSpy('logoutCognito')
      .and.returnValue(of(void 0)),
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    sidebarServiceMock = jasmine.createSpyObj('NbSidebarService', ['toggle']);
    authService = jasmine.createSpyObj('AuthService', [
      'currentUser ',
      'logout',
    ]);
    menuService = jasmine.createSpyObj('NbMenuService', ['onItemClick']);
    const nbRestoreScrollTopHelperMock = {
      shouldRestore: jasmine
        .createSpy('shouldRestore')
        .and.returnValue(of(true)), // mock the observable
    };
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbCardModule,
        NbSidebarModule,
        NbInputModule,
        ThemeModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: Location, useValue: {}},
        {provide: APP_CONFIG, useValue: {}},
        {provide: ActivatedRoute, useValue: {params: of({})}},
        {
          provide: NbRestoreScrollTopHelper,
          useValue: nbRestoreScrollTopHelperMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    sidebarServiceMock = jasmine.createSpyObj('NbSidebarService', ['toggle']);
    router = TestBed.inject(Router);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct link on menu click', () => {
    spyOn(router, 'navigate');
    component.navigate('link');
    expect(router.navigate).toHaveBeenCalledWith(['link']);
  });
});
