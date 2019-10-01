# J_community
중대숲
### 기술 스택
- **node.js & express.js(백엔드):** 웹서버, API서버  
- **mongoDB:** NoSQL 데이터베이스  
- **vue.js(프론트엔드):** 화면구성  
- **vuetify.js(프론트엔드):** 머터리얼 화면구성  

---

### 구현 세부 정보
##### 백엔드
- **REST ful**한 API
- 회원가입시 암호화 설정(crypto 모듈 사용)
- config 폴더관리를 통한 설정파일 분리

##### 프론트엔드
- 로그인시 localStorage에 token정보 저장
- Vuex사용으로 전역적인 상태관리
- axios를 통한 API접근
- vee-validate 모듈 사용으로 회원가입 유효성 검사

---

### config 파일 세팅 방법.

```javascript
module.exports = {
	dbUrl: 'mongodb://localhost:27017/nemv'
}
```

이런식으로 디비 연결 문자열을 작성해야 웹서버가 정상 구동됨.