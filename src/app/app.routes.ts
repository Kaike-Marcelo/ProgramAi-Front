import { Routes } from '@angular/router';
import { UserAccessSignIn } from './modules/user-access/components/user-access-sign-in/user-access-sign-in';
import { UserAccessSignUp } from './modules/user-access/components/user-access-sign-up/user-access-sign-up';
import { UserAccessPasswordReset } from './modules/user-access/components/user-access-password-reset/user-access-password-reset';
import { Home } from './modules/learner/home/home';
import { LearnerContainer } from './modules/learner/learner-container/learner-container';
import { authGuard } from './core/guards/auth.guard';
import { Ranking } from './modules/learner/ranking/ranking';
import { ListModules } from './modules/learner/challenges/components/modules/list-modules/list-modules';
import { Topics } from './modules/learner/challenges/components/topics/topics';
import { Challenge } from './modules/learner/challenges/components/challenge/challenge';
import { UserProfile } from './modules/user-profile/user-profile';
import { Notifications } from './modules/notifications/notifications';

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
                data: { breadcrumb: 'Painel do Aluno' }
            },
            {
                path: 'ranking',
                component: Ranking,
                data: { breadcrumb: 'Ranking' }
            },
            {
                path: 'modules',
                data: { breadcrumb: 'Módulos' },
                children: [
                    {
                        path: '',
                        component: ListModules,
                        data: { breadcrumb: '' }
                    },
                    {
                        path: ':moduleId',
                        data: { breadcrumb: 'Tópicos' },
                        children: [
                            {
                                path: '',
                                data: { breadcrumb: '' },
                                component: Topics,
                            },
                            {
                                path: 'challenge/:questionId',
                                component: Challenge,
                                data: { breadcrumb: 'Desafio' }
                            },
                        ]
                    },
                ],
            },
            {
                path: 'profile',
                component: UserProfile,
                data: { breadcrumb: 'Perfil' }
            },
            {
                path: 'notifications',
                component: Notifications,
                data: { breadcrumb: 'Notificações' }
            }
        ]
    }
];
