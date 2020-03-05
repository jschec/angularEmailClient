import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; //provides <router-outlet \>
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
//import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { sideNavService } from '../services/sidenav.service';
import { LeftSideNavComponent } from './left-sidenav/left-sidenav.component';
import { HeaderComponent } from './/header/header.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LayoutComponent } from './layout.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule,
    //MaterialModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, 
    FlexLayoutModule
    
  ],
  declarations: [
    HeaderComponent, 
    LeftSideNavComponent,
    LayoutComponent
  ],
  providers: [ sideNavService ]
})
export class LayoutModule { }
