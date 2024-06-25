import {Component} from '@angular/core';

@Component({
  selector: 'app-clone-boilerplate-doc',
  templateUrl: './clone-boilerplate-doc.component.html',
  styleUrls: ['./clone-boilerplate-doc.component.scss'],
})
export class CloneBoilerplateDocComponent {
  yourDataList: object[] = [
    {
      lable: 'Navigate to Desired Directory:',
      listData: 'cd path/to/your/directory',
    },
    {
      lable: 'Clone the Repository:',
      listData: 'git clone https://github.com/sourcefuse/angular-boilerplate',
    },
    {
      lable: 'Navigate into the Cloned Directory',
      listData: 'cd your-boilerplate-project-name',
    },
  ];
  addItem(newItem: object) {
    this.yourDataList.push(newItem);
  }
}
