# WebSite
홈페이지 외주작업 - 김덕성

## Getting started
node.js가 설치되어있어야합니다. 
npm과 bower의 dependency를 설치합니다.

> npm install && bower install

페이지를 build합니다.

> gulp build

## Dependency

개발 환경

- gulp
- browser-sync

주요 모듈

- sass (node-sass)

## Demo

진행상황은 cleanbasket.github.io/WebSite/(페이지이름.html)로 확인할 수 있습니다.

- [main](http://cleanbasket.github.io/WebSite/main.html)
- [크바연구소](http://cleanbasket.github.io/WebSite/sub01.html)
- [문의하기](http://cleanbasket.github.io/WebSite/sub02.html)
- [소개](http://cleanbasket.github.io/WebSite/sub03.html)
- [크린파트너](http://cleanbasket.github.io/WebSite/sub04.html)

실시간은 아니며 master로 커밋된 빌드에 한해 deploy하고 있습니다.

## Code

### common 

페이지마다 공통적으로 쓰이는 코드들이 들어있습니다.

## Deploy

### gh-pages Deploy방법

master를 dev와 merge합니다.

``` bash
git checkout master
git merge dev
```

gh-pages용으로 코드를 빌드합니다

``` bash
gulp build-ghPages
```

빌드된것을 추가하고 커밋합니다

``` bash
git add -f build/
git commit -m "gh-pages"
```

gh-pages에 build를 디플로이합니다. subtree 방식을 사용합니다.

``` bash
git subtree push --prefix build/ origin gh-pages
```

이러면 build폴더를 그대로 gh-pages에 이동시켜서 https://cleanbasket.github.io/WebSite/파일경로 로 이용가능합니다 :)

