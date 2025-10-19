import { Component } from '@angular/core';
import { MedicinesComponent } from './medicines/medicines.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MedicinesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
