import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importamos BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importamos IonicStorageModule
import { IonicStorageModule } from '@ionic/storage-angular';
import { RemediosEditPage } from './remedios/remedios-edit/remedios-edit.page';

@NgModule({
  declarations: [AppComponent],  // Agregamos RemediosEditPage aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Agregamos IonicStorageModule aquí
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,  // Agregamos BrowserAnimationsModule aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
