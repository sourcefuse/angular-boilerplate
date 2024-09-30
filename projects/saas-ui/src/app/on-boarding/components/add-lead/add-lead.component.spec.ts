import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NbCardModule,
  NbInputModule,
  NbThemeModule,
  NbToastrService,
} from '@nebular/theme';
import {Location} from '@angular/common';
import {of, throwError} from 'rxjs';
import {AddLeadComponent} from './add-lead.component';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {Lead} from '../../../shared/models/lead.model';

describe('AddLeadComponent', () => {
  let component: AddLeadComponent;
  let fixture: ComponentFixture<AddLeadComponent>;
  let mockOnBoardingService: jasmine.SpyObj<OnBoardingService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastrService: jasmine.SpyObj<NbToastrService>;

  beforeEach(async () => {
    const onBoardingServiceSpy = jasmine.createSpyObj('OnBoardingService', [
      'addLead',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrServiceSpy = jasmine.createSpyObj('NbToastrService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [AddLeadComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NbThemeModule.forRoot(),
        NbCardModule,
        NbInputModule,
        ThemeModule,
      ],
      providers: [
        {provide: OnBoardingService, useValue: onBoardingServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: NbToastrService, useValue: toastrServiceSpy},
        {provide: Location, useValue: {}},
        {provide: ActivatedRoute, useValue: {paramMap: of(new Map())}},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLeadComponent);
    component = fixture.componentInstance;
    mockOnBoardingService = TestBed.inject(
      OnBoardingService,
    ) as jasmine.SpyObj<OnBoardingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockToastrService = TestBed.inject(
      NbToastrService,
    ) as jasmine.SpyObj<NbToastrService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.addLeadForm.valid).toBeFalse();
  });

  it('should validate the form fields correctly', () => {
    const firstName = component.addLeadForm.controls['firstName'];
    const lastName = component.addLeadForm.controls['lastName'];
    const email = component.addLeadForm.controls['email'];
    const zip = component.addLeadForm.controls['zip'];

    firstName.setValue('');
    lastName.setValue('');
    email.setValue('invalid-email');
    zip.setValue('invalid-zip');

    expect(firstName.valid).toBeFalse();
    expect(lastName.valid).toBeFalse();
    expect(email.valid).toBeFalse();
    expect(zip.valid).toBeFalse();

    firstName.setValue('John');
    lastName.setValue('Doe');
    email.setValue('john.doe@example.com');
    zip.setValue('12345');

    expect(firstName.valid).toBeTrue();
    expect(lastName.valid).toBeTrue();
    expect(email.valid).toBeTrue();
    expect(zip.valid).toBeTrue();
  });

  it('should show a failure message when adding lead fails', () => {
    const errorMessage = 'Error occurred';
    mockOnBoardingService.addLead.and.returnValue(throwError(errorMessage));

    component.addLeadForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Example Inc.',
      email: 'john.doe@example.com',
      address: '123 Main St',
      zip: '12345',
      country: 'USA',
    });

    component.onSubmit();

    expect(mockOnBoardingService.addLead).toHaveBeenCalled();
    expect(mockToastrService.show).toHaveBeenCalledWith(
      'Unable to add lead. Please check your input and try again.',
      'Failure',
    );
  });
});
