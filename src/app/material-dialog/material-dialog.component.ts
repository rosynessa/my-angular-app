import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-dialog',
  standalone: true,
  imports: [],
  templateUrl: './material-dialog.component.html',
  styleUrl: './material-dialog.component.css'
})
export class MaterialDialogComponent {

  constructor(public dialogRef: MatDialogRef<MaterialDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onYes(): void {
    this.dialogRef.close(true);
  }


}
