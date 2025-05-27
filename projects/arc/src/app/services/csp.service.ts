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
    // NOTE: Setting CSP via meta tag is less secure than HTTP headers and some directives may be ignored by browsers.
    // For production, prefer setting CSP via HTTP headers on the server if possible.
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
    // Update or create the CSP meta tag
    let metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement | null;
    if (metaTag) {
      metaTag.content = policy;
    } else {
      metaTag = document.createElement('meta') as HTMLMetaElement;
      metaTag.httpEquiv = 'Content-Security-Policy';
      metaTag.content = policy;
      document.head.appendChild(metaTag);
    }
    // Log the CSP string in development mode
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.log('[CSP] Applied CSP:', policy);
    }
  }
}
