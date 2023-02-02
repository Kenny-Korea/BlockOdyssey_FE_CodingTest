# 블록오디세이 프론트엔드 직무 코딩테스트

김광민_프론트엔드_원티드

### **요약**

- 주어진 조건 모두 만족
- url파라미터(URLSearchParams객체)를 사용하여, 새로고침 시에도 기존 조건들이 url에 남아 있도록 설계
- window.history의 pushState 메소드를 사용하여, 부드러운 라우팅 구현
-

### **라이브러리**

- SASS(SCSS)

---

### **List**

- **It should be a search result list.**

  - 완료

- **After page refresh, the search result should persist.**

  - url 파라미터를 읽어와서 HTML select, input 태그에 value를 넣어주도록 구성

- **The column is in order of [상품번호, 상품명, 브랜드, 상품내용, 가격, 평점, 재고].**

  - 완료

- **Display the total amount of data at the top of the list.**

  - filtering 조건에 만족하는 data 배열의 length를 출력하도록 구성

- **The maximum length of [상품내용] is 40 characters. If it exceeds the maximum length, you should display the rest of the content using ellipsis ....**
  - string 길이가 40을 초과하면 substring한 값을 출력하도록 restrictTextLength 함수 선언

---

### **Search**

- **Search conditions are the following : [전체, 상품명, 브랜드, 상품내용].**

  - 완료

- **Both search condition and keyword must be persisted after the refresh.**
  - url 파라미터를 읽어와서 HTML select, input 태그에 value를 넣어주도록 구성

---

### **Pagination**

- **Implement rows per page using a select box. The select box should display [10, 20, 50] options.**

  - 완료

- **Both rows per page and page number must be persisted after the refresh.**
  - url 파라미터를 읽어와서 HTML select, input 태그에 value를 넣어주도록 구성
