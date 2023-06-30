import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-consent',
  templateUrl: './self-consent.component.html',
  styleUrls: ['./self-consent.component.scss']
})
export class SelfConsentComponent implements OnInit {
  text: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
