# J_community
중대숲
### 기술 스택
- **node.js & express.js(백엔드):** 웹서버, API서버  
- **mongoDB:** NoSQL 데이터베이스  
- **vue.js(프론트엔드):** 화면구성  
- **vuetify.js(프론트엔드):** 머터리얼 화면구성  
---
### 초기 setting
- node.js 설치
- mongoDB 설치 혹은 mongodb Atlas 사용
- git clone 이후 be & fe에서 yarn install
- config 파일 설정
- fe에서 apiRootPath를 localhost로 설정
- 웹상에서 관리자 계정으로 모든 페이지를 클릭하여 페이지 생성

---
### 구현 세부 정보
##### 백엔드
- **REST ful**한 API
- API 디렉토리는 resource기반 작명
- **http-errors** 모듈 이용한 API에서의 HTTP 예외처리 (200,400,401,403,404,500 사용)
- 미들웨어 통한 권한별 접근제어
- 회원가입시 암호화 설정(**crypto** 모듈 사용, 단방향 암호화)
- 오픈소스이므로 **config**파일을 통한 핵심 설정파일(서버주소, 보안 등) 분리
- token 발급 및 갱신 로직 (**JWT**: jsonwebtoken 모듈사용)
- **moment.js** 모듈 도입(토큰 재발급시 사용)
- **multer, sharp, image-data-uri**모듈 사용으로 이미지를 DB에 저장

##### 프론트엔드
- 로그인시 **localStorage**에 **token**정보 저장
- **Vuex**사용으로 전역적인 상태관리
- **axios**를 통한 API접근
- **axios intercepter** 새로고침 없이 로그인 하기
- **vee-validate** 모듈 사용으로 회원가입 유효성 검사
- **vue-daum-map**을 통한 지도 API 도입
- 공용 알림메세지 사용 (**Vuex**로 전역등록, App.vue에 **snack-bar** 구현)
```javascript
// pop 사용법 (axios 응답에 대해 사용)
if(!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
// if문이 붙는 이유는 router.js에서 api가 보낸 http-errors를 처리하기 때문이다(중복 snackbar 활성화 방지)
```
- 건의사항 및 마음의 편지함에는 **Vue data Table**을 사용하여 검색, 정렬기능 구현(서버사이드 pagenation 준비중)
---

### config 파일 세팅 방법.

```javascript
module.exports = {
  dbUrl: 'mongodb://localhost:27017/nemv',
  admin: {
    id: String
    pwd: String
    name: '관리자',
    number: String,
    company: String
  },
  company: {
    name: String,
    phoneNumber: String
  },
  jwt: {
    secretKey: String,
    subject: 'token',
    issuer: 'xxx.com',
    algorithm: 'HS256',    
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 6 ,// 기억하기 눌렀을 때 6일
    expiresInDiv: 3 // 토큰시간 나누는 기준
  },
}
```

이런식으로 관리자 계정, 초기부대정보, 디비 연결 문자열 등을 작성해야 웹서버가 정상 구동됨.

### 지도 API관련
- 지금 마커의 좌표 -> 주소 정보까지 불러옴
- 1보고의 경우 어디든지 상관없음
- 2보고의 경우 같은 시여야 함
- 3보고의 경우 위병소 좌표로 부터 직선거리 5Km내 이어야 함