import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-remedios',
  templateUrl: './remedios.page.html',
  styleUrls: ['./remedios.page.scss'],
})
export class RemediosPage implements OnInit {

  constructor(private router: Router) 
  {}

  ngOnInit() {
  }
}
