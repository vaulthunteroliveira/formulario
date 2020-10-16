import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';


import { AppService } from './app.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputTextModule,
    TableModule,
    InputTextareaModule,
    NgbModule,
    FontAwesomeModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    AppService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
