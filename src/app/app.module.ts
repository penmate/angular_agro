import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ProductTileComponent } from './shared/product-tile/product-tile.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TokenInterceptor } from './token-interceptor';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CreateProductComponent,
    ProductTileComponent,
    SideBarComponent,
    ViewProductComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
