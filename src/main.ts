import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

/**
 * Load user data raw
 */

function getCookie(name) {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  return decodeURIComponent(cookie[name]);
}

console.log(getCookie('token'));

const http = new XMLHttpRequest();
const url = window.location.protocol + '//' + window.location.hostname + ':8888/api/user';

http.open('POST', url, true);
http.setRequestHeader('Content-type', 'application/json');

http.onreadystatechange = function () {
  if (http.readyState === 4 && http.status === 200) {
    window['_userObject'] = JSON.parse(http.responseText);
    platformBrowserDynamic().bootstrapModule(AppModule);
  }
};

const str = JSON.stringify({ token: getCookie('token') });
console.log(str);

http.send(str);

if (environment.production) {
  enableProdMode();
}
