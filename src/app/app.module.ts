import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HptInputDetailsComponent } from './hpt-input-details/hpt-input-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { FetchdetailsdialogComponent } from './fetchdetailsdialog/fetchdetailsdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AreyousuredialogComponent } from './areyousuredialog/areyousuredialog.component';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpEvent } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './AuthGuardService';
import { LoginAuthGuard } from './LoginAuthGuard';
import { TokenStorage } from './TokenStorage';
import { SpinnerService } from './SpinnerService';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthInterceptor} from './AuthInterceptor';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ErrordialogComponent } from './errordialog/errordialog.component';
import { CheckerdialogComponent } from './checkerdialog/checkerdialog.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'sessionExpired',
    component: LoginComponent
  },
  {
    path: 'cancel',
    component: HptInputDetailsComponent, canActivate:[AuthGuardService]
    //data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HptInputDetailsComponent,
    FetchdetailsdialogComponent,
    AreyousuredialogComponent,
    LoginComponent,
    ErrordialogComponent,
    CheckerdialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule

  ],
  providers: [MatDatepickerModule,
    MatNativeDateModule, AuthGuardService, LoginAuthGuard, TokenStorage, SpinnerService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
