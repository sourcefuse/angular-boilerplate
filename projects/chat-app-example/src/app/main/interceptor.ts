import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http'; import { UserService } from './chat.service';
import { RedirectService } from './redirectService';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    Token!: any;
    constructor(private userService: RedirectService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.Token = localStorage.getItem('token');
        if (this.Token) {
            const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.Token) });
            return next.handle(tokenizedReq);
        }
        return next.handle(req);
    }
}