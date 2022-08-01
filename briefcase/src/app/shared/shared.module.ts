import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UwuButtonDirective } from './directives/uwu-directive/uwu-button.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UwuButtonDirective],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, UwuButtonDirective],
})
export class SharedModule {}
