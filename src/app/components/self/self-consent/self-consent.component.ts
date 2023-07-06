import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-self-consent',
  templateUrl: './self-consent.component.html',
  styleUrls: ['./self-consent.component.scss']
})
export class SelfConsentComponent implements OnInit {
  src: string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  text: string = decodeURI("%3Cp%3ETTTTT%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20TTTTTTTTTTTTTTTTT%3C/p%3E");
  displayManage: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  submit() {
    // console.log(this.text);
    console.log(encodeURI(this.text))
    console.log(decodeURI("%3Cp%3ETTTTT%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20TTTTTTTTTTTTTTTTT%3C/p%3E"))
    // let result = this.text.replace(/\s/g, '&nbsp;')
    // console.log(result)
  }
  test(e: any) {
    console.log(e)
    if (e.delta.ops.length == 1) {
      const { insert } = e.delta.ops[0]
      console.log(insert)
    } else {
      const { insert } = e.delta.ops[1]
      console.log(insert)
    }
    // let result = this.text.replace(/\s/g, '&nbsp;')
    // console.log(result)
  }
}
