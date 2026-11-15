# 마을 타이쿤: Windows에서 프로그램 설치 없이 APK 만들기

이 프로젝트는 **원본 HTML 게임**과 **Capacitor 7**, **Codemagic 빌드 설정**을 포함합니다. Codemagic 서버가 Android 프로젝트를 자동 생성하므로 Windows에 Android Studio/Node.js를 설치할 필요가 없습니다.

## 1. GitHub에 올리기

1. https://github.com 에 로그인하거나 계정을 만듭니다.
2. 우측 상단 `+` → `New repository` → 이름 `village-tycoon-mobile` → **Private** → `Create repository`.
3. 저장소 화면의 `uploading an existing file` 또는 `Add file` → `Upload files`를 누릅니다.
4. **ZIP 자체를 올리지 말고 압축을 푼 `village-tycoon-mobile` 폴더 안의 파일과 폴더**를 올립니다. `www/index.html`, `scripts/check-game.mjs`, `package.json`, `capacitor.config.json`, `codemagic.yaml` 등이 저장소 최상위에 있어야 합니다. GitHub 웹 업로드에서 폴더가 누락되면 파일 탐색기에서 해당 폴더를 끌어다 놓으세요.
5. `Commit changes`를 누릅니다. 비공개 저장소여도 외부 빌드 서비스에 코드 접근 권한을 부여해야 합니다.

## 2. Codemagic에서 빌드

1. https://codemagic.io/ 에서 계정을 만들고 GitHub 연동을 허용합니다.
2. `Add application`에서 방금 만든 GitHub 저장소를 선택합니다.
3. 설정에서 **Codemagic YAML** 구성 방식을 선택합니다. 저장소 루트의 `codemagic.yaml`을 읽어야 합니다.
4. `android-debug-apk` 워크플로를 선택하고 `Start new build`를 누릅니다.
5. 빌드가 성공하면 **Artifacts**에서 `app-debug.apk`를 다운로드합니다.

## 3. 갤럭시에 설치

1. 다운로드한 `app-debug.apk`를 갤럭시로 전송합니다(USB, 개인 클라우드 등).
2. 갤럭시에서 APK를 열고, 필요한 경우 해당 파일 앱에 한해 **알 수 없는 앱 설치** 권한을 일시적으로 허용합니다.
3. `설치` → `열기`를 누르고 게임을 시험합니다.
4. 테스트 후 불필요한 알 수 없는 앱 설치 권한은 다시 해제하세요.

## 주의사항

- 이 워크플로는 **Android 디버그 APK**를 생성합니다. 개인 테스트용이며 Google Play 스토어 등록용 서명 릴리스는 별도 설정이 필요합니다.
- iOS IPA는 생성하지 않습니다. iOS는 macOS 빌드와 Apple 코드 서명·배포 설정이 필요합니다.
- 공개 MQTT 브로커에 연결하는 기존 온라인 공유 기능은 안정성·보안·데이터 노출 가능성이 있어 정식 배포 전에 검토해야 합니다.
- 저장된 게임은 앱 데이터에 보관될 수 있습니다. 앱 삭제 또는 데이터 초기화 시 저장 내용이 사라질 수 있으므로 중요한 월드는 별도 백업 기능을 마련해야 합니다.
- 외부 폰트와 MQTT 라이브러리는 네트워크가 필요할 수 있습니다.
- Codemagic의 요금, 인스턴스 사용 가능 여부, GitHub 연동 UI는 서비스 정책에 따라 달라질 수 있습니다. 빌드 실패 시 로그를 공유해 주세요.
