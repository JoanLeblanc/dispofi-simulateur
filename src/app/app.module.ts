import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormSimulationComponent } from './formulaire/form-simulation/form-simulation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TwoDigitDecimaNumberDirective } from './shared/directives/two-digit-decimal-number.directive';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FormSimulationComponent,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [DecimalPipe, CurrencyPipe, {provide: LOCALE_ID, useValue:'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
