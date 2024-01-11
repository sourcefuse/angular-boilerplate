import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'lib-live-demo',
  templateUrl: './live-demo.component.html',
  styleUrls: ['./live-demo.component.scss']
})
export class LiveDemoComponent {

  @Input() code: string = '';
  

  get liveDemoHtml(): string {
    return this.code;
  }

  // get renderedHtml(): string {
  //   // Implement code execution and HTML rendering based on the provided code
  //   // (This will depend on your specific use case and technology stack)
  //   return '<p>Live demo output</p>';
  // }

  constructor(private sanitizer: DomSanitizer) {}

  get renderedHtml(): SafeHtml {
    try {
      const sanitizedHtml = this.sanitizer.sanitize(
        SecurityContext.HTML,
        this.sanitizer.bypassSecurityTrustHtml(this.code)
      );
      return sanitizedHtml || 'Invalid HTML'; // Show a message for invalid HTML
    } catch (error) {
      console.error('Code execution error:', error);
      return 'Error rendering HTML';
    }
  }
}
