import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Call the KPI api
    this.apiService.insertKpi();


    const typed = new Typed('.typed-element', {
      strings: ['<span class="orange">this</span>.<span class="purple">page</span>.<span class="purple">notFound</span> = <span class="orange">true;</span>'],
      typeSpeed: 20,
      fadeOut: true,
      showCursor: false
    });
    const typed1 = new Typed('.typed-element1', {
      strings: ['<span class="orange">if</span> (<span class="orange">this</span>.<span class="purple">youMisspelledIt</span>) { <span class="orange">this</span>.<span class="yellow">tryAgain()</span><span class="orange">;</span> }'],
      typeSpeed: 20,
      startDelay: 1200,
      fadeOut: true,
      showCursor: false
    });
    const typed2 = new Typed('.typed-element2', {
      strings: ['<span class="orange">else</span> { window.<span class="purple">location</span> = <a class="gray" id="home" href="https://labyrinth.maxgendron.com">home</a><span class="orange">;</span> }'],
      typeSpeed: 20,
      startDelay: 3500,
      fadeOut: true,
      showCursor: false
    });
  }

}
