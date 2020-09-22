Angular 插入 HTML 字符串要先通过 sanitizer 处理。

```html
<div class="svg" [innerHTML]="svg"></div>
```

```js
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  svg:SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.svg = this.sanitizer.bypassSecurityTrustHtml("‹‹ SVG CONTENT ››");
  }
}
```

-   参见：[Angular: Dynamically inserting SVG into an element](https://www.chrisjmendez.com/2017/06/17/angular-dynamically-inserting-svg-into-an-element/)
