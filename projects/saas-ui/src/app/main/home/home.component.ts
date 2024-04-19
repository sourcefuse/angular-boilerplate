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
export class HomeComponent {
  // subscriptionPlans = [
  //   {
  //     name: 'Basic',
  //     price: '$10/month',
  //     features: ['Feature 1', 'Feature 2', 'Feature 3'],
  //   },
  //   {
  //     name: 'Standard',
  //     price: '$20/month',
  //     features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  //   },
  //   {
  //     name: 'Premium',
  //     price: '$30/month',
  //     features: [
  //       'Feature 1',
  //       'Feature 2',
  //       'Feature 3',
  //       'Feature 4',
  //       'Feature 5',
  //     ],
  //   },
  // ];

  subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 10,
      features: ['Feature 1', 'Feature 2'],
    },
    {
      id: 2,
      name: 'Standard',
      price: 20,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 3,
      name: 'Premium',
      price: 30,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
  ];

  selectedPlan: number;

  selectPlan(planId: number) {
    this.selectedPlan = planId;
  }
}
