# 리액트 +타입스크립트 + prettier + eslint 기초 세팅

## 설치 방법

### 1. 폴더의 깃 삭제하기

  <img src="https://user-images.githubusercontent.com/98315458/151786608-ee7bde50-49ae-4419-a6e3-6b57decaa045.png"/>

### 2. package.json의 name(이름) 바꾸어주기

 <img src="https://user-images.githubusercontent.com/98315458/151786905-a6a8c79d-0909-401f-b223-c94dfdee9d12.png"/>

### 3. package-lock.json 삭제하기

 <img src="https://user-images.githubusercontent.com/98315458/151787035-59ae7897-b1f2-4c08-a774-5845c3fdc016.png"/>

### 4. npm install , npm start로 작동하는지 테스트,세팅하기

```
npm install
```

```
npm start
```

## 폴더 구조

```
src
 ┣ assets
 ┃ ┗ images
 ┣ components
 ┣ constants
 ┣ hooks
 ┣ styles
 ┃ ┣ globalStyle.ts
 ┃ ┣ index.ts
 ┃ ┣ styled.d.ts
 ┃ ┗ theme.ts
 ┣ utils
 ┣ App.tsx
 ┗ index.tsx
```

- 폴더명과 파일 이름은 바꾸어야 합니다.

# 세팅

## styled-component

    ThemeProvider 와 GlobalStyle 을 적용한 상태입니다.

## .eslintrc 와 .prettierrc 을 적용한 상태입니다.

## tsconfig.json 세팅

    tsconfig.json 파일을 통해 baseUrl : "src" 폴더로 해놓아서 절대경로를 이용하는 상태입니다.
