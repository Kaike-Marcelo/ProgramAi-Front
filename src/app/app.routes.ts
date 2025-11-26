import { Routes } from '@angular/router';
import { UserAccessSignIn } from './modules/user-access/components/user-access-sign-in/user-access-sign-in';
import { UserAccessSignUp } from './modules/user-access/components/user-access-sign-up/user-access-sign-up';
import { UserAccessPasswordReset } from './modules/user-access/components/user-access-password-reset/user-access-password-reset';
import { Home } from './modules/learner/home/home';
import { LearnerContainer } from './modules/learner/learner-container/learner-container';
import { authGuard } from './core/guards/auth-guard';
import { Ranking } from './modules/learner/ranking/ranking';
import { Challenges } from './modules/learner/challenges/challenges';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
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
    },
    {
        path: 'learner',
        canActivate: [authGuard()],
        component: LearnerContainer,
        children: [
            {
                path: 'home',
                component: Home,
            },
            {
                path: 'ranking',
                component: Ranking,
            },
            {
                path: 'challenges',
                component: Challenges,
            }
        ]
    }
];
