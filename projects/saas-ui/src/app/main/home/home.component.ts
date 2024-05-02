import {Component} from '@angular/core';
interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
