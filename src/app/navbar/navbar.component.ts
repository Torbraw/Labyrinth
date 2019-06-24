import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

  switchLang() {
    if (this.translate.getDefaultLang() === 'fr') {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.setDefaultLang('fr');
    }
  }

  show() {
    const x = document.getElementById('smallNav');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }

  click() {
    const x = document.getElementById('smallNav');
    x.className = x.className.replace(' w3-show', '');
  }
}
