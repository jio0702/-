# 마을 타이쿤 — iOS / Android 설치형 앱 프로젝트

기존에 제공된 HTML/CSS/JavaScript 게임을 수정 없이 `www/index.html`로 포함한 **Capacitor 7** 프로젝트입니다.

## 준비물

- Node.js 20 이상 및 npm
- Android: Android Studio, Android SDK, JDK (Android Studio 권장 환경)
- iOS: macOS, Xcode, CocoaPods(환경에 따라 필요), Apple 개발 서명 환경

## 최초 설치 및 프로젝트 생성

```bash
npm install
npm run check
npm run add:android
npm run add:ios   # macOS에서만 실행
npm run sync
```

이미 해당 플랫폼 폴더가 있다면 `add`를 다시 실행하지 말고 `npm run sync`만 실행합니다.

### Android

```bash
npm run android
```

Android Studio에서 에뮬레이터 또는 USB 연결 기기를 선택해 실행합니다. APK가 필요하면 Android Studio의 Build 메뉴에서 생성합니다. 정식 배포는 별도 서명 및 스토어 등록이 필요합니다.

### iPhone

```bash
npm run ios
```

Mac의 Xcode에서 Signing & Capabilities의 Team과 고유 Bundle Identifier를 설정한 뒤 연결된 iPhone 또는 시뮬레이터에서 실행합니다. 실기기 설치·배포 조건은 Apple 계정 및 서명 방식에 따라 달라집니다.

## 게임 수정 후 반영

`www/index.html`을 편집한 뒤:

```bash
npm run check
npm run sync
```

Android Studio/Xcode에서 다시 빌드합니다.

## 주요 유의사항

1. **원본 보존:** 게임 콘텐츠와 로직은 원본 파일을 그대로 포함합니다. 본 프로젝트는 게임을 네이티브 언어로 재작성한 것이 아니라 WebView 패키징입니다.
2. **저장:** 게임은 `localStorage`에 월드 데이터를 저장합니다. 앱 삭제, 앱 데이터 초기화 또는 웹 데이터 삭제 시 손실될 수 있습니다. 클라우드 동기화/백업은 별도 검증이 필요합니다.
3. **온라인 공유:** 게임이 공개 MQTT 브로커와 CDN을 사용합니다. 네트워크가 없으면 온라인 기능이 작동하지 않을 수 있으며, 공개 브로커는 신뢰할 수 있는 개인 데이터 저장소가 아닙니다. 비밀번호나 민감한 정보를 입력하지 마세요. 멀티플레이 동기화·보안은 검증되지 않았습니다.
4. **폰트:** Google Fonts에서 Jua 글꼴을 불러오므로 오프라인에서는 시스템 폰트로 대체될 수 있습니다.
5. **성능/호환성:** 정적 JavaScript 문법 검사만 수행했습니다. 실제 iOS/Android 기기에서 조작, 프레임, 사운드, 저장, 온라인 연결을 반드시 검증해야 합니다.
6. **앱 ID:** `com.villagetycoon.apocalypse`는 임시 식별자입니다. 스토어 배포 전에 소유 도메인에 맞는 고유 ID로 변경하세요.
7. **iOS WebView:** 플랫폼별 브라우저 정책에 따라 오디오 자동재생, 스토리지, WebSocket 연결 동작이 다를 수 있습니다.

## 구성

- `www/index.html` — 제공된 게임 원본
- `capacitor.config.json` — 앱 이름/식별자 및 WebView 설정
- `package.json` — Capacitor 의존성과 빌드 명령
- `scripts/check-game.mjs` — 게임 인라인 JavaScript 문법 및 필수 UI 검사

**참고:** `android/`, `ios/` 네이티브 프로젝트 폴더는 최초 `npm run add:android` / `npm run add:ios` 실행 시 생성됩니다. 현재 ZIP은 네이티브 빌드를 생성할 수 있는 소스 프로젝트이며, 바로 설치하는 APK/IPA는 아닙니다.


## Windows: online APK build (no local installation)

See [ONLINE_BUILD_GUIDE_KO.md](ONLINE_BUILD_GUIDE_KO.md). `codemagic.yaml` defines a cloud Android debug APK build.
