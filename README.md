# BlockOdyssey Front-End Recruitment 과제 제출 

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="redux-toolkit" src="https://img.shields.io/badge/React redux-v8.0.5-764ABC?style=plastic&logo=redux&logoColor=white"/>
<img alt="React-Query" src="https://img.shields.io/badge/React Query-v4.22.4-FF4154?style=plastic&logo=reactquery&logoColor=white"/>
<img alt="Sass" src="https://img.shields.io/badge/Sass-v1.57.1-CC6699?style=plastic&logo=sass&logoColor=white"/>

</p>

## 실행 방법

```sh
git clone // this repository
cd this file location
npm install 
npm run start
# http://localhost:3000
```

## 과제 진행 시 주안점 
---


## 사용 프레임 워크 및 라이브러리
---

- react-query  : 
- redux-toolkit : 


## 구현 요구사항 목록

### List
---

- [x] It should be a search result list.
- [x] After page refresh, the search result should persist.
- [x] The column is in order of [상품번호, 상품명, 브랜드, 상품내용, 가격, 평점, 재고].
- [x] Display the total amount of data at the top of the list.
- [x] The maximum length of [상품내용] is 40 characters. If it exceeds the maximum length, you should display the rest of the content using ellipsis ....

> 구현시 생각한 것 적기 및 시연 영상찍기


 ### Search
---

- [x] Search conditions are the following : [전체, 상품명, 브랜드, 상품내용].
- [x] Both search condition and keyword must be persisted after the refresh.

구현시 생각한 것 적기

 ### Pagination
---

- [x] Implement rows per page using a select box. The select box should display [10, 20, 50] options.
- [x] Both rows per page and page number must be persisted after the refresh.

구현시 생각한 것 적기


## SRC 폴더 구조
---
```
src
 ┣ 📂api
 ┃ ┗ 📜productService.ts
 ┣ 📂app
 ┃ ┣ 📜hooks.ts
 ┃ ┗ 📜store.ts
 ┣ 📂assets
 ┃ ┗ 📜spinner.gif
 ┣ 📂components
 ┃ ┣ 📂list
 ┃ ┃ ┣ 📜List.styles.scss
 ┃ ┃ ┣ 📜List.tsx
 ┃ ┃ ┣ 📜ListContainer.styles.scss
 ┃ ┃ ┣ 📜ListContainer.tsx
 ┃ ┃ ┣ 📜ListView.styles.scss
 ┃ ┃ ┗ 📜ListView.tsx
 ┃ ┣ 📂pagination
 ┃ ┃ ┣ 📜Pagination.styles.scss
 ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┣ 📜PaginationItem.styles.scss
 ┃ ┃ ┗ 📜PaginationItem.tsx
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📜Search.styles.scss
 ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┣ 📜SearchDropdown.styles.scss
 ┃ ┃ ┗ 📜SearchDropdown.tsx
 ┃ ┗ 📂ui
 ┃ ┃ ┗ 📜Spinner.tsx
 ┣ 📂features
 ┃ ┗ 📂product
 ┃ ┃ ┗ 📜productSlice.ts
 ┣ 📂hooks
 ┃ ┣ 📂queries
 ┃ ┃ ┗ 📜useGetProductQuery.tsx
 ┃ ┗ 📜useUrlSearch.tsx
 ┣ 📜App.styles.scss
 ┣ 📜App.tsx
 ┣ 📜index.scss
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜setupTests.ts
```


인적사항
---

이름 – 강명훈 

이메일 – myunghun0114@gmail.com

