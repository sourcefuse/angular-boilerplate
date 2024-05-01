import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {ColDef} from 'ag-grid-community/dist/types/core/entities/colDef';
import {GridApi} from 'ag-grid-community';

@Component({
  selector: 'app-plan-items',
  templateUrl: './plan-items.component.html',
  styleUrls: ['./plan-items.component.scss'],
})
export class PlanItemsComponent {
  [x: string]: any;
  addFeatureForm: FormGroup;
  gridApi: GridApi;

  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.addFeatureForm = this.fb.group({
      featureName: ['', Validators.required],
      featureDesc: ['', Validators.required],
    });
  }

  colDefs: ColDef[] = [
    {field: 'featureName', editable: true},
    {field: 'featureDescription', editable: true},
    {field: 'feature1', editable: true},
    {field: 'feature2', editable: true},
  ];

  rowData = [
    {
      featureName: 'S2 service',
      featureDescription: 'AWS Service',
      feature1: 'EC2',
      feature2: 'ECS',
    },
  ];

  ngOnInit(): void {
    this.planItems();
  }

  onDeleteButtonClick() {
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.node.data);
    }
  }

  planItems() {
    // this.tenantFacade
    //   .getTenantList()
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(res => {
    //     this.tenants = res;
    //   });
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onEditButtonClick() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedNode = selectedNodes[0];
      selectedNode.setRowHeight(100); // Adjust row height if needed
      selectedNode.setDataValue('editable', true); // Set row to editable mode
    }
  }

  onAddButtonClick() {
    const newItem = {
      featureName: 'New feature', // Provide default values or make them empty strings
      featureDescription: 'Description',
      feature1: 'Detail 1',
      feature2: 'Detail 2',
    };
    this.rowData.push(newItem);
    this.gridApi.setRowData(this.rowData); // Update the grid data
  }
}
