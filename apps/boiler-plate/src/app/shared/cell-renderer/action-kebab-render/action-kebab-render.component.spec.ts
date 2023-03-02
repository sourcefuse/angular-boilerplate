import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {CoreModule} from '@boiler/core/index';
import {IconPacksManagerService} from '@boiler/theme/services';
import {ThemeModule} from '@boiler/theme/theme.module';
import {NbMenuItem} from '@nebular/theme';
import {NgxPermissionsModule} from 'ngx-permissions';

import {ActionKebabRenderComponent} from './action-kebab-render.component';
import {CELL_PARENT} from './const';
import {IGridPageActionHandler} from './types';

describe('ActionKebabRenderComponent', () => {
  let component: ActionKebabRenderComponent<AnyObject>;
  let fixture: ComponentFixture<ActionKebabRenderComponent<AnyObject>>;
  let spyComponent: jasmine.SpyObj<IGridPageActionHandler<AnyObject>>;
  let debugElement: DebugElement;
  const dummyActions: NbMenuItem[] = [
    {
      title: 'dummy-titile',
      data: 'dummy-data',
      icon: 'dummy-icon',
    },
  ];

  beforeEach(async () => {
    spyComponent = jasmine.createSpyObj('IGridPageActionHandler', [
      'handleGridAction',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ActionKebabRenderComponent],
      imports: [
        ThemeModule.forRoot('boiler'),
        CoreModule,
        NgxPermissionsModule.forRoot(),
      ],
      providers: [
        {
          provide: CELL_PARENT,
          useValue: spyComponent,
        },
      ],
    }).compileComponents();
    const service = TestBed.inject(IconPacksManagerService);
    service.registerFontAwesome();
    service.registerSvgs();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionKebabRenderComponent);
    component = fixture.componentInstance;
    component.buttons = dummyActions;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
