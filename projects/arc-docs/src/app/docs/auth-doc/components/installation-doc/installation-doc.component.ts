import {Component} from '@angular/core';

@Component({
  selector: 'app-installation-doc',
  templateUrl: './installation-doc.component.html',
  styleUrls: ['./installation-doc.component.scss'],
})
export class InstallationDocComponent {
  dataWrapper: object[] = [
    {
      code: `import { HttpClientModule } from '@angular/common/http';`,
    },
  ];
}
