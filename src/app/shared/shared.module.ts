import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DeleteConfirmationDialog } from './dialogs';

const MAT_SNACKBAR_CONFIG: MatSnackBarConfig<void> = {
  politeness: 'polite',
  duration: 3000,
  horizontalPosition: 'start',
  verticalPosition: 'bottom',
};

@NgModule({
  declarations: [
    // Dialogs
    DeleteConfirmationDialog,
  ],
  imports: [
    // Angular Material
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACKBAR_CONFIG },
  ],
  exports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // Angular material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    // Components
    DeleteConfirmationDialog,
  ],
})
export class SharedModule { }
