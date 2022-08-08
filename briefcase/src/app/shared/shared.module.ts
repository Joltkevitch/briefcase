import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UwuButtonDirective } from './directives/uwu-button.directive';
import { LogoComponent } from './components/logo/logo.component';
import { AnimatedLogoDirective } from './directives/animated-logo.directive';
import { UwuRaisedButtonDirective } from './directives/uwu-raised-button.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UwuButtonDirective,
    LogoComponent,
    AnimatedLogoDirective,
    UwuRaisedButtonDirective
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    UwuButtonDirective,
    LogoComponent,
    AnimatedLogoDirective,
    UwuRaisedButtonDirective
  ],
})
export class SharedModule {}
