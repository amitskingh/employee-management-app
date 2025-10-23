import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatButtonModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox {
  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}

  onClose(): void {
    this.dialogRef.close('close'); // sends 'close' back
  }

  onConfirm(): void {
    this.dialogRef.close('ok'); // sends 'ok' back
  }
}
