import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: true,
};


@NgModule({
  imports: [
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    NgxMaskModule
  ],
})
export class AppInputMaskModule { }
