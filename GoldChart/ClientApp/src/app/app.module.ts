//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';

//@NgModule({
//  declarations: [
//    AppComponent
//  ],
//  imports: [
//    BrowserModule,
//    AppRoutingModule
//  ],
//  providers: [],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { ChartModule } from '../../modules/chart.module'
import { jqxChartComponent } from '../jqwidgets-ver7.1.0/jqwidgets-ts/angular_jqxchart';
import { AppComponent } from './app.component';
@NgModule({
  imports: [BrowserModule, /*ChartModule,*/ CommonModule, FormsModule],
  declarations: [AppComponent, jqxChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
