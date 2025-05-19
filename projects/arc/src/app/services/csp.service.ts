import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
@Injectable({providedIn: 'root'})
/**
 * Service to apply Content Security Policy (CSP) to the application.
 * This service reads the CSP configuration from the environment and applies it
 * by creating a meta tag in the document head.
 */
export class CspService {
  applyCsp(): void {
    if (
      !('csp' in environment) ||
      !environment.csp ||
      typeof environment.csp !== 'object'
    ) {
      console.warn('CSP configuration not found in environment.');
      return;
    }
    const {csp, ...envVars} = environment;
    const directives: string[] = [];

    for (const [key, rawValue] of Object.entries(csp)) {
      const directiveKey = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();

      if (typeof rawValue === 'boolean') {
        if (rawValue === true) {
          directives.push(`${directiveKey};`);
        }
        continue;
      }
      if (Array.isArray(rawValue)) {
        const values = rawValue
          .map(v => {
            if (v === true) return "'self'";
            if (typeof v === 'string' && v.startsWith('env:')) {
              const key = v.slice(4);
              return envVars[key] ?? null;
            }
            return v;
          })
          .filter(Boolean)
          .join(' ');
        directives.push(`${directiveKey} ${values};`);
      } else {
        directives.push(`${directiveKey} ${rawValue};`);
      }
    }

    const policy = directives.join(' ').trim();
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Security-Policy';
    metaTag.content = policy;
    document.head.appendChild(metaTag);
  }
}
