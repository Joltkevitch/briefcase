import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StaticDataService } from './services/static-data.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, ],
  exports: [],
  providers: [StaticDataService],
})
export class CoreModule {}
