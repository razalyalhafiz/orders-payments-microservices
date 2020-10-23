import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderState } from './states/order.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { AppFirebaseModule } from './modules/app-firebase.module';
import { EnvServiceFactory, EnvServiceProvider } from './services/env.service.provider';

const env = EnvServiceFactory();

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DialogComponent,
    HeaderComponent,
    ProfileCardComponent,
    OrdersComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxsModule.forRoot([OrderState], { developmentMode: !env.production }),
    AppFirebaseModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
