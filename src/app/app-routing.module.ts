import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'rememberPass',
    loadChildren: () => import('./pages/rememberpass/rememberpass.module').then( m => m.RememberpassPageModule)
  },
  {
    path: 'publications',
    loadChildren: () => import('./pages/publications/publications.module').then( m => m.PublicationsPageModule)
  },
  {
    path: 'single-publication/:id',
    loadChildren: () => import('./pages/single-publication/single-publication.module').then( m => m.SinglePublicationPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'create-publication',
    loadChildren: () => import('./pages/create-publication/create-publication.module').then( m => m.CreatePublicationPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'adoptar',
    loadChildren: () => import('./pages/getadoption/getadoption.module').then( m => m.GetadoptionPageModule)
  },
  {
    path: '**',
    redirectTo: 'publications',
    pathMatch: 'full'
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
