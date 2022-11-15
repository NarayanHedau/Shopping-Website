import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

const Material:any=[
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material,
   
    
  ],
  exports:[ Material]
})
export class AngularMaterialModule { }
