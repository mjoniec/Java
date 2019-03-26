import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import { ChartModule } from '../../modules/chart.module'
import { jqxChartComponent } from '../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { AppComponent } from './app.component';
@NgModule({
    imports: [BrowserModule, /*ChartModule,*/ CommonModule, FormsModule],
    declarations: [AppComponent, jqxChartComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }


//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component';

//import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

//@NgModule({
//  declarations: [
//    AppComponent, jqxGridComponent
//  ],
//  imports: [
//    BrowserModule
//  ],
//  providers: [],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }
