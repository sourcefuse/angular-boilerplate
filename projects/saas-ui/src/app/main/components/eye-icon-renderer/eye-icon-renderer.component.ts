import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-eye-icon-renderer',
  templateUrl: './eye-icon-renderer.component.html',
  styleUrls: ['./eye-icon-renderer.component.scss'],
})
export class EyeIconRendererComponent implements ICellRendererAngularComp {
  private params: any;

  constructor(private router: Router) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onClick(event: Event): void {
    event.stopPropagation();
    const rowDataId = this.params.node.data.id;
    console.log(rowDataId);
    this.router.navigate([`/main/tenant-details/${rowDataId}`]);
  }
}
