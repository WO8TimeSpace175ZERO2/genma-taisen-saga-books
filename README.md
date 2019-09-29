# genma-taisen-saga-books
幻魔大戦シリーズの書籍一覧

## Firebase hosting/Cloudfunctionsのプロジェクトのセットアップ手順

参考文献

https://fireship.io/lessons/angular-universal-firebase/

https://webbibouroku.com/Blog/Article/angular-ssr-firebase

https://medium.com/@donuzium/angular-material%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%8B%E3%82%89%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%81%BE%E3%81%A7-d1e9c868688c

### Angularプロジェクトを新規作成

`ng new genma-taisen-saga-books`

### Angular Material / Angular CDK等を追加

`npm install --save @angular/material @angular/cdk @angular/animations`

app.module.tsにて、
「@angular/platform-browser/animations」からBrowserAnimationsModuleをインポートして、
AppModuleクラスのNgModule.importsに追加する。

同じく、「@angular/material」からMatButtonModule, MatButtonModule, MatCheckboxModuleをインポートして、
AppModuleクラスのNgModule.importsに追加する。


style.cssに「@import "~@angular/material/prebuilt-themes/indigo-pink.css"」を追加

### Hammer.jsを追加

`npm install --save hammerjs`

「./src/main.ts」に「import 'hammerjs';」を追加。

### マテリアルアイコンの追加

「./src/index.html」に「<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">」を追加。


### 実装をする。

実装の内容を含めて、Gitのソースコードを参照。

### Angular Universalを追加

`cd genma-taisen-saga-books`

`ng add @nguniversal/express-engine  --clientProject genma-taisen-saga-books`

### とりあえず、build:ssr でビルドして、serve:ssr でサーバーを起動してAngular Universalの動作確認

`npm run build:ssr`

`npm run serve:ssr`

### Firebase Toolsがインストールされていなければインストール

`npm install -g firebase-tools`

### Firebaseにログインしていなければログインする。

ChromeでFirebaseにログインし、
コマンドラインかターミナルで、

`firebase login`

でログインする。

### Firebaseを初期化する。

`firebase init`

? Are you ready to proceed? Yes

? Which Firebase CLI features do you want to set up for this folder? Press Space to 
select features, then Enter to confirm your choices.

 ( ) Database: Deploy Firebase Realtime Database Rules

 ( ) Firestore: Deploy rules and create indexes for Firestore

 (*) Functions: Configure and deploy Cloud Functions

>(*) Hosting: Configure and deploy Firebase Hosting sites

 ( ) Storage: Deploy Cloud Storage security rules

? What language would you like to use to write Cloud Functions?

  JavaScript

> TypeScript

? Do you want to use TSLint to catch probable bugs and enforce style ? No

? Do you want to install dependencies with npm now ? No

? What do you want to use as your public directory? public

? Configure as a single-page app (rewrite all urls to /index.html)? No

### firebase.jsonの修正

firebase.jsonのhostingフィールドにrewritesの設定を追加。
詳しくはGitのfirebase.jsonを参照。


firebaseの初期化により生成されたpublic/index.htmlを削除する。

### server.tsのポートリッスン設定をコメントアウトする。

server.tsを次のように修正（詳細はソースコードを参照）。

// export を追加

export const app = express();


// そのほかは変更しない

// 以下のコードをコメントアウト

// Start up the Node server

// app.listen(PORT, () => {

//   console.log(`Node Express server listening on http://localhost:${PORT}`);

// });


### webpack.server.config.jsのoutputにlibraryフィールドとlibraryTargetフィールドを追加

「webpack.server.config.js」のoutputオブジェクトに「library: 'app'」と「libraryTarget: 'umd'」を追加する（詳細はソースコードを参照）。

### functions/src/index.tsでssrメソッドを生成してexportする

「functions/src/index.ts」を次のように修正する（詳細はソースコードを参照）。

const universal = require(`${process.cwd()}/dist/server`).app;

export const ssr = functions.https.onRequest(universal);


### Angular アプリのコピースクリプトを作成

「npm run build:ssr」で生成した「/dist」を、「/functions/dist」にコピーするスクリプトを生成する。

`cd functions`

`npm i fs-extra`

「/functions/cp-angular.js」の内容はソースコードを参照。

「/functions/package.json」のscripts.buildを「tsc」から「node cp-angular && tsc」に変更。

### 「/node_modules/@types/jasminewd2」フォルダを削除する。

「/node_modules/@types/jasminewd2」フォルダを削除する。詳しくはGit Issueを参照。



## Firebase 実行 & デプロイ

Firebase初期化後の「npm run build:ssr」を動かすと、「/dist/server.js」がバグった状態でトランスパイルされるため、対応が必要（2019年9月29日頃の話）。

## Angularアプリ直下でSSR用の資源をビルド

`npm run build:ssr`

この処理の完了後に生成された「/dist/server.js」はバグった状態で生成されているため、
「factory(require("require(\"./server/main\")"))」を「factory(require("./server/main"))」で置換する。

`cd functions`

`npm run build`

`firebase serve`

「functions: HTTP trigger initialized at http」に表示されたSSR用のWebサービスを実行し、レスポンスにDOMが返ってくることをブラウザで確認し、
「hosting: Local server」に表示されたURLを打ち込んで、ブラウザにDOMとJavaScriptのロードが動作して、画面が表示されることを確認する。

### FirebaseのCloudfunctionsとhostingをデプロイする。

「functions」フォルダ直下で、

`firebase deploy`

を実行する。

