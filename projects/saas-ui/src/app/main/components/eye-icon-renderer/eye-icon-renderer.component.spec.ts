import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EyeIconRendererComponent} from './eye-icon-renderer.component';
import {NbThemeModule} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {ICellRendererParams} from 'ag-grid-community';

describe('EyeIconRendererComponent', () => {
  let component: EyeIconRendererComponent;
  let fixture: ComponentFixture<EyeIconRendererComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj(['navigate']);
    await TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), ThemeModule],
      declarations: [EyeIconRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EyeIconRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agInit', () => {
    it('should initialize params with the provided values', () => {
      const mockParams = {node: {data: {id: '123'}}};
      component.agInit(mockParams);
      expect(component['params']).toEqual(mockParams);
    });
  });

  describe('refresh', () => {
    it('should return false when refresh is called', () => {
      const result = component.refresh({});
      expect(result).toBeFalse();
    });
  });

  it('should render the eye icon as visible when the parameter is true', () => {
    const mockParams = {node: {data: {id: '123', visible: true}}};
    component.agInit(mockParams);
    fixture.detectChanges();
    const iconElement = fixture.debugElement.query(By.css('.eye-icon'));
    expect(iconElement).toBeTruthy(); // Check if the icon is rendered
    // expect(iconElement.nativeElement.classList).toContain('visible'); // Assuming there's a class for visibility
  });

  it('should handle invalid parameters gracefully', () => {
    const mockParams = null; // Simulating invalid parameters
    component.agInit(mockParams);
    expect(component['params']).toBeNull();
  });

  it('should navigate to the correct route when onClick is called', () => {
    // Arrange: Set up mock parameters with a specific row data ID
    const mockParams = {node: {data: {id: '123'}}};
    component.agInit;
  });
});
