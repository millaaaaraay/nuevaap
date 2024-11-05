import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Combina estas importaciones
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AuthGuard } from './guards/auth.guard';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],  // Asegúrate de que tus otras páginas también estén declaradas aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, // Asegúrate de tener ReactiveFormsModule
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
