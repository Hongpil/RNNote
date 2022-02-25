# RNNote
React Native 기반 메모 어플입니다.

---
## 스크린샷
||||
|--|--|--|
|<img src="./git_image/rnnote_loading.png" width="200"><br>로딩|<img src="./git_image/rnnote_login.png" width="200"><br>로그인|<img src="./git_image/rnnote_register.png" width="200"><br>회원가입
|<img src="./git_image/rnnote_register2.png" width="200"><br>회원가입 완료|<img src="./git_image/rnnote_mainhome1.png" width="200"><br>홈01|<img src="./git_image/rnnote_mainhome1.png" width="200"><br>홈02
|<img src="./git_image/rnnote_notedetail.png" width="200"><br>메모 상세|<img src="./git_image/rnnote_noteedit.png" width="200"><br>메모 수정|<img src="./git_image/renote_mainsettings.png" width="200"><br>세팅
<br>

참고자료01<br><img src="./git_image/rnnote_storage.jpeg" width="650">
<br>
참고자료02<br><img src="./git_image/rnnote_navigator.jpeg" width="650">

---
## 기능
- HTTP통신 기반 회원가입 및 로그인
- 메모 조회 / 등록 / 수정 / 삭제

---
## 사용 기술
- Fetch API
- async-storage
- @react-navigation/native
- @react-navigation/bottom-tabs

---
## Routes
`GET /api/rnExamUsers?useridx=<useridx>`
메모조회 요청

`POST /api/rnExamUsers/register`
회원등록 요청

`POST /api/rnExamUsers/login`
로그인 요청

---
## 라이센스
Copyright 2021 Kim Hong Pil

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
