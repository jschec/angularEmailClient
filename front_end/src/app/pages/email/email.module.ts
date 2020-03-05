import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent, NewEmailDialogComponent, ReplyEmailDialogComponent} from './email.component';
import { EmailRoutingModule } from './email-routing.module';
import { EmailListComponent } from './email-list/email-list.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmailService } from '../../services'

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    EmailRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    FlexLayoutModule,
  ],
  declarations: [ 
    EmailComponent,
    EmailListComponent,
    EmailDetailComponent,
    NewEmailDialogComponent,
    ReplyEmailDialogComponent ],
  entryComponents: 
  [
    NewEmailDialogComponent, 
    ReplyEmailDialogComponent],
  providers: [
    EmailService
  ]
})
export class EmailModule { }