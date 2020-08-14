import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { StarRatingComponent } from './star-rating/star-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [MatIconRegistry, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry,
    private cookieService: CookieService) {

    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fontawesomesolid', 'fas');

    this.cookieService.set('SameSite', 'None');
    this.cookieService.set('Secure', 'false');
  }
}
