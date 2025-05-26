// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot } from "@angular/router";

// @Injectable({ providedIn: 'root' })
// export class BreadcrumbLabelResolver {
//   resolveLabel(snapshot: ActivatedRouteSnapshot): string {
//     const path = snapshot.routeConfig?.path ?? '';

//     const result = path
//       .split('/')
//       .map(segment => {
//         if (segment.startsWith(':')) {
//           const param = segment.slice(1);
//           return snapshot.params[param] || `{${param}}`;
//         }
//         return segment;
//       })
//       .join(' ');

//     return this.toTitleCase(result);
//   }

//   private toTitleCase(str: string): string {
//     return str
//       .replace(/[-_]/g, ' ')
//       .replace(/\b\w/g, char => char.toUpperCase());
//   }
// }
