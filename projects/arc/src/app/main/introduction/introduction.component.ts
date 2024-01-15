import {Component} from '@angular/core';
import {COMPONENTS_ITEMS} from '../constants/components.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {NEBULAR_COMP_ITEMS} from '../constants/nebularComponents.constants';

@Component({
  selector: 'arc-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  config = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.loadConfig();
    });
  }

  loadConfig() {
    if (this.router.url.includes('arc-comp')) {
      this.config = COMPONENTS_ITEMS;
    } else {
      this.config = NEBULAR_COMP_ITEMS;
    }
  }

  redirectComponent(c) {
    if (c.url) {
      // Open external URL in a new tab
      window.open(c.url, '_blank');
    } else {
      // Navigate to local link using Angular Router
      this.router.navigate([c.link]);
    }
    console.log(this.route.snapshot);
  }
}
