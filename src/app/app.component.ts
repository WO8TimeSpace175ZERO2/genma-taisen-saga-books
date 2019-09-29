import { Component, OnInit  } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { SagaSeries } from './saga-series';
import { SagaBook } from './saga-book';

import series1stJson from './series1.json';
import series2ndJson from './series2.json';
import series3rdJson from './series3.json';
import series4thJson from './series4.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit {

  series1: SagaBook[];
  series2: SagaBook[];
  series3: SagaBook[];
  series4: SagaBook[];

  constructor(private meta: Meta) { }

  ngOnInit() {
    this.series1 = series1stJson.books;
    this.series2 = series2ndJson.books;
    this.series3 = series3rdJson.books;
    this.series4 = series4thJson.books;

    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:title', content: '金町の北上から幻魔大戦を叫んだけもの　幻魔大戦サーガ一覧 Firebase Hosting / Firebase Cloud Functions 出張版' },
      { name: 'twitter:title', content: '金町の北上から幻魔大戦を叫んだけもの　幻魔大戦サーガ一覧 Firebase Hosting / Firebase Cloud Functions 出張版' },
      { name: 'og:description', content: 'Amazonや復刊ドットコムで入手可能な幻魔大戦シリーズ書籍の入手先を一覧にして紹介' },
      { name: 'twitter:description', content: 'Amazonや復刊ドットコムで入手可能な幻魔大戦シリーズ書籍の入手先を一覧にして紹介' },
      { name: 'og:image', content: 'https://genma-taisen-saga-books.web.app/assets/kanamachi-genma-taisen.png' },
      { name: 'twitter:image', content: 'https://genma-taisen-saga-books.web.app/assets/kanamachi-genma-taisen.png' }
    ]);

  }

  openLink(uri: string) {
    window.open(uri, '_system');
  }
}
