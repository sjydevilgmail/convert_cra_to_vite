Create React App(CRA)로 만든 프로젝트를 Vite로 마이그레이션하는 방법을 단계별로 설명드리겠습니다.A

## 고려 사항
1. Node 버전
  현재 Vite의 Node.js 최소 버전 요구사항은 다음과 같습니다:
  Vite 1.x ~ 4.x: Node.js 14.18+ 이상
  Vite 5.x (현재): Node.js 18+ 이상

2. 환경별 설정 파일 분리
- config/vite.config.dev.js
- config/vite.config.prd.js

## 1. 기존 의존성 제거

먼저 CRA 관련 패키지들을 제거합니다:

```bash
npm uninstall react-scripts
```

## 2. Vite 관련 패키지 설치

```bash
npm install --save-dev vite@4.4.1 @vitejs/plugin-react
```

## 3. package.json 스크립트 수정

`package.json`의 scripts 섹션을 다음과 같이 변경합니다:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 4. Vite 설정 파일 생성

프로젝트 루트에 `vite.config.js` (또는 TypeScript의 경우 `vite.config.ts`) 파일을 생성합니다:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  }
})
```

## 5. index.html 파일 이동 및 수정

`public/index.html`을 프로젝트 루트로 이동하고 다음과 같이 수정합니다:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your App Title</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
```

## 6. 환경 변수 처리

CRA에서 `REACT_APP_` 접두사를 사용했다면, Vite에서는 `VITE_` 접두사를 사용합니다:

- 기존: `REACT_APP_API_URL`
- 변경: `VITE_API_URL`

코드에서도 다음과 같이 변경:
```javascript
// 기존
const apiUrl = process.env.REACT_APP_API_URL

// 변경
const apiUrl = import.meta.env.VITE_API_URL
```

## 7. 절대 경로 import 설정 (선택사항)

CRA에서 `src/` 기준 절대 경로를 사용했다면, `vite.config.js`에 다음을 추가:

```javascript
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ... 기타 설정
})
```

## 8. 기타 고려사항

- **Public 폴더**: `public/` 폴더의 파일들은 그대로 사용 가능
- **CSS Modules**: `.module.css` 파일들은 그대로 작동
- **SVG imports**: SVG를 React 컴포넌트로 import하려면 `vite-plugin-svgr` 설치 필요
- **Proxy**: API 프록시 설정이 필요한 경우 vite.config.js에서 설정

## 9. 실행 및 테스트

```bash
npm run dev
```

마이그레이션 후 모든 기능이 정상 작동하는지 확인하고, 빌드도 테스트해보세요:

```bash
npm run build
```

이렇게 하면 CRA 프로젝트를 Vite로 성공적으로 마이그레이션할 수 있습니다. Vite는 더 빠른 개발 서버와 빌드 시간을 제공할 것입니다.