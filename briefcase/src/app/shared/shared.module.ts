import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UwuButton } from './directives/uwu-button.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UwuButton],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, UwuButton],
})
export class SharedModule {}
