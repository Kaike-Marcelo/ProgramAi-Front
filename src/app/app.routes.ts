import { Routes } from '@angular/router';
import { UserAccessSignIn } from './modules/user-access/components/user-access-sign-in/user-access-sign-in';
import { UserAccessSignUp } from './modules/user-access/components/user-access-sign-up/user-access-sign-up';
import { UserAccessPasswordReset } from './modules/user-access/components/user-access-password-reset/user-access-password-reset';

export const routes: Routes = [
    {
        path: 'sign-in',
        component: UserAccessSignIn,
    },
    {
        path: 'sign-up',
        component: UserAccessSignUp,
    },
    {
        path: 'password-reset',
        component: UserAccessPasswordReset,
    }
];
