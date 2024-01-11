import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeComponent} from '@main-project/boiler/main/home/home.component';
import {NbMenuItem} from '@nebular/theme';
import {COMPONENTS_DETAILS} from '../../constants/details.constant';

@Component({
  selector: 'lib-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
})
export class ComponentDetailsComponent {
  [x: string]: any;
  config = {};
  // @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  // dynamicContentContainer!: ViewContainerRef;
  private _counter = 1;

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  editorOptions = {theme: 'vs-dark', language: 'angular'};
  // code: string= '<button>Hello</button>';
  code: string = `<nb-card class="h-100 card-row">
  <nb-card-body class="m-0">
    <div>
      <img
        src="../../../assets/images/auth/ARC_logo.png"
        alt="logo"
        draggable="false"
      />
    </div>
    <div class="main-wrapper">
      <div>
        <div class="sign-in-title">
          <h2>Sign In</h2>
          <h3>Welcome to Arc by SourceFuse</h3>
          <p>
            Cut down your application development process to 60% Sign In to your
            account
          </p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Email field -->
          <div>
            <div class="input-title">
              <span>Email</span>
            </div>
            <div class="input">
              <input
                type="text"
                placeholder="Email"
                nbInput
                fieldSize="medium"
                formControlName="email"
                required
              />
            </div>
            <div
              *ngIf="
                loginForm.get('email').hasError('required') &&
                loginForm.get('email').touched
              "
            >
              Email is required.
            </div>
            <div
              *ngIf="
                loginForm.get('email').hasError('email') &&
                loginForm.get('email').touched
              "
            >
              Invalid email format.
            </div>
          </div>

          <!-- Password field -->
          <div>
            <div class="input-title">
              <span>Password</span>
            </div>
            <div class="input">
              <input
                placeholder=" Enter New Password"
                [type]="getInputType()"
                formControlName="password"
                required
                nbInput
              />
              <button
                type="button"
                nbSuffix
                nbButton
                ghost
                (click)="toggleShowPassword()"
              >
                <nb-icon
                  [icon]="showPassword ? 'eye-outline' : 'eye-off-2-outline'"
                  pack="eva"
                  [attr.aria-label]="
                    showPassword ? 'hide password' : 'show password'
                  "
                >
                </nb-icon>
              </button>
              <!-- forgot password link -->
              <div class="forgot-password">
                <a [routerLink]="['/auth/forgotpassword']">Forgot Password</a>
              </div>
            </div>
            <div
              *ngIf="
                loginForm.get('password').hasError('required') &&
                loginForm.get('password').touched
              "
            >
              Password is required.
            </div>
            <div
              *ngIf="
                loginForm.get('password').hasError('minlength') &&
                loginForm.get('password').touched
              "
            >
              Password must be at least 6 characters.
            </div>
          </div>

          <!-- login button -->
          <div class="loginbtn">
            <button
              nbButton
              shape="round"
              size="medium"
              type="submit"
              status="basic"
              [disabled]="!loginForm.valid"
              (click)="onSubmit()"
            >
              Sign In
            </button>
          </div>
        </form>

        <div class="devider align-center">
          <span> You can also Sign In via </span>
        </div>

        <!-- Social login button -->
        <div class="sign-in-button">
          <button
            nbButton
            shape="round"
            size="medium"
            (click)="loginViaGoogle()"
          >
            <img
              src="../../../assets/images/auth/image.png"
              alt="googlelogo"
              margin-let="5px"
              draggable="false"
            />
            Sign In with Google
          </button>
        </div>
        <div class="align-center footer footer">
          <span class="text-center">
            I don't have an account in Arc by SourceFuse
            <a [routerLink]="['/auth/signup']">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  </nb-card-body>
</nb-card>

`;
  @Output() codeChange = new EventEmitter<string>();

  // @Input() htmlcode:string;
  // @Input() heading: string;
  // @Input()Desc :string;
  ngOnInit() {
    // var abc = this.router.url.split('/');
    // var x = abc[abc.length - 1];
    // console.log(this.router.url);
    // console.log(abc);
    // console.log(x);
    // this.router.events.subscribe(param => {
    this.loadConfig();
    // });
  }

  loadConfig() {
    this.config = COMPONENTS_DETAILS['gantt-bars'];
    // if (this.x.includes('gantt-bars')) {

    // } else if (this.router.url.includes('gantt-columns')) {
    //   this.config = COMPONENTS_DETAILS['gantt-columns'];
    // } else if (this.router.url.includes('gantt-header')) {
    //   this.config = COMPONENTS_DETAILS['gantt-header'];
    // } else if (this.router.url.includes('gantt-tooltip')) {
    //   this.config = COMPONENTS_DETAILS['gantt-tooltip'];
    // }
  }

  // ngAfterContentInit(){
  //    // create the component factory
  //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomeComponent);

  //     // // add the component to the view
  //     const componentRef = this.container.createComponent(componentFactory);

  // }

  onCodeChange() {
    this.codeChange.emit(this.code);
  }
  items: NbMenuItem[] = [
    {
      title: 'home',
      link: '/',
    },
    {
      title: 'dashboard',
      link: 'dashboard',
    },
  ];
}
