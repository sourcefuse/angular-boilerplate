import { Injectable } from "@angular/core";
@Injectable(
    {
        providedIn: "root"
    }
)
export class RedirectService {
    constructor() {
    //This is intentional
    }
    redirectTo(url: string, body: any) {
        const myform = document.createElement('form');
        myform.method = 'POST';
        myform.action = url;
        myform.style.display = 'none';
        myform.append('Content-Type', 'application/x-www-form-urlencoded');
        Object.keys(body).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = body[key];
            myform.appendChild(input);
        })
        document.body.appendChild(myform);
        myform.submit();
    }

}