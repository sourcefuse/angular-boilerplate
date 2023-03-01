import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../core';
import {ThemeModule} from '../theme';

import {MainComponent} from './main.component';
import {MainModule} from './main.module';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        MainModule,
        RouterTestingModule,
        CoreModule,
        ThemeModule.forRoot('boiler'),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
