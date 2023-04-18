import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'view-product/:id', component: ViewProductComponent },
  { path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
