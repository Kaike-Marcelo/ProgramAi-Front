import { Routes } from '@angular/router';
import { UserAccessSignIn } from './modules/user-access/components/user-access-sign-in/user-access-sign-in';

export const routes: Routes = [
    {
        path: 'login',
        component: UserAccessSignIn,
    }
];
