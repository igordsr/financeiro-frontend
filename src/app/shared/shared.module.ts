import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

@NgModule({
  declarations: [
    ToastNotificationComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    ToastNotificationComponent,
    FieldErrorDisplayComponent
  ]
})
export class SharedModule { }
