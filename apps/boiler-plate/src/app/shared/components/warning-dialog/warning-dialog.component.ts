import {Component, Input, OnInit} from '@angular/core';
import {ComponentBaseDirective} from '@boiler/core/component-base';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'boiler-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss'],
})
export class WarningDialogComponent
  extends ComponentBaseDirective
  implements OnInit
{
  @Input()
  warningMessageLbl!: string;

  @Input()
  confirmationLbl!: string;

  constructor(protected dialogRef: NbDialogRef<WarningDialogComponent>) {
    super();
  }

  ngOnInit(): void {
    this.blurActiveElement();
  }

  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }
}
