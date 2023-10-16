import { Story, moduleMetadata } from '@storybook/angular';

import { AuthService, LoggedInUserDM } from '@project-lib/core/auth';

import { takeUntil } from 'rxjs';
import { HomeComponent } from '@main-project/boiler/main/home/home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeModule } from '@project-lib/theme/theme.module';
import { NbThemeModule } from '@nebular/theme';

export default {
    title: 'Components/Home',
    component: HomeComponent,
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [ThemeModule,
                NbThemeModule.forRoot()],
            providers: [
                {provide: ActivatedRoute,
                    useValue: {},
                },
                {
                    provide: Location,
                    useValue: {
                        /* Mock Location methods here if needed */
                    },
                },
                {
                    provide: Router,
                    useValue: {
                        /* Mock Router methods here if needed */
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        currentUser: () => {
                            /* Mock the AuthService's currentUser method here */
                        },
                    },
                },
            ],
        }),
    ],
};

const Template = (args: HomeComponent) => ({
    component: HomeComponent,
    props: args,
});

export const Default = Template.bind({});
Default.args = {};

export const WithImage = Template.bind({});

WithImage.args = {

    // render: () => {<img src="/images/Illustration.svg" alt="my image" />},
    loggedInUserDM: {
        /* Set your user data here if needed */
    },

    greeting: 'Hello, World!',
};


