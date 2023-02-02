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

## 목록

- [과제 진행 시 주안점](#과제진행-시-주안점)<br/>
- [구현 요구사항 목록](#구현-요구사항-목록)<br/>
- [개선 사항](#개선-사항)<br/>
- [SRC 폴더 구조](#폴더-구조)<br/>
- [인적사항](#인적사항)<br/>



## 과제진행 시 주안점 


1. 주어진 과제를 완성도 있게 구현하고자 노력했습니다. 
   - 제공된 이미지와 최대한 비슷하게 구현이 되도록 코드를 짜는 것을 우선으로 했습니다. 
   
2. 가독성
   - 코드의 가독성을 좋게 하기 위해 관심사를 계속 분리하려 했습니다.  
   - searchParams 세팅을 커스텀 훅으로 빼고 UI 관련 컴포넌트에서는 UI 외 다른 코드는 없도록 노력했습니다.  

3. 라이브러리 사용
   - react query를 처음 data를 fetching 할 때만 사용하고 있어서 사용할 필요성에 대해 고민했습니다. 
   - 하지만 react query를 사용함으로써 redux가 오직 app 안의 data 상태에만 집중할 수 있다고 생각되어 사용하게 되었습니다.   


## 구현 요구사항 목록

### List


- [x] It should be a search result list.
- [x] After page refresh, the search result should persist.
- [x] The column is in order of [상품번호, 상품명, 브랜드, 상품내용, 가격, 평점, 재고].
- [x] Display the total amount of data at the top of the list.
- [x] The maximum length of [상품내용] is 40 characters. If it exceeds the maximum length, you should display the rest of the content using ellipsis ....


List 및 Pagination 시연 영상

![list-part](https://user-images.githubusercontent.com/79836148/216230784-07184d76-ed02-4add-a464-9bc91f068936.gif)


 ### Search


- [x] Search conditions are the following : [전체, 상품명, 브랜드, 상품내용].
- [x] Both search condition and keyword must be persisted after the refresh.


Search 시연 영상

![search-part](https://user-images.githubusercontent.com/79836148/216230884-9b4e3289-ab10-4d35-8926-5cd71cf45aa3.gif)


 ### Pagination


- [x] Implement rows per page using a select box. The select box should display [10, 20, 50] options.
- [x] Both rows per page and page number must be persisted after the refresh.


## 구현 고려사항


### List

* 페이지 당 행에 따른 리스트의 길이가 길어져 전체 화면이 길어지는 부분

  - overflow-y : auto; 를 주어서 리스트 화면안에서 스크롤되게 구현하였습니다.
  
* 40글자가 넘어가면 ellipsis 효과를 주는 부분  ( 이슈 Using ellipsis question #2 )

  - text-overflow : ellipsis 는 width가 정해져야 설정이 적용되는 것으로 알고 있습니다. 그래서 받아온 **상품내용** 의 글자 길이를 기반으로 동적으로 width를 정해주려 했으나 
    재 설정된 width는 실제 40글자의 width라 원하는대로 적용되지 않았습니다. 그래서 **상품내용**에 width를 %로 설정하고 40글자가 넘어가는 상품내용은 slice로 잘라서 보여주는 것으로 했습니다.  

### 검색 기록 유지

*  redux-persist 와 localStorage 를 사용하지 않고 data기록을 유지하는 부분
   - 현재 페이지 번호, 페이지 당 행 값, 검색 카테고리 그리고 검색어 를 url의 search params로 넣어서 유지할 수 있도록 했습니다. 
    Search params에 값을 넣는 부분이 여러 컴포넌트에 걸쳐있어서 따로 커스텀 훅을 만들어 관리했습니다.


## 개선 사항

- Pagination 기능을 커스텀 훅이나 redux로 빼면 좋을 것 같아서 시도하고 있습니다.

- Search 기능에 사용되는 상수를 type assertion하여 사용하는 쪽으로 개선하려 합니다.

- Product slice의 searchProduct action의 가독성이 떨어지는 것 같습니다. search condition에 따른 값을 if else if 로 구분하여 값을 설정하는데 else if 문이 많아 가독성이 떨어지는 것 같습니다. switch문이다 다른 방식으로 바꾸는 것을 고려하고 있습니다. 

> redux-persist나 localStorage의 도움없이 상태를 유지하는 부분을 따로 생각하고 있지 않았는데 이번 기회에 많이 알아보게 되었습니다.  

## 폴더 구조

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



## 인적사항


이름 – 강명훈 

이메일 – myunghun0114@gmail.com

