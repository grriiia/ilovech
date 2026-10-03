
## 1. 실행 방법

가장 간단한 방법:
- `index.html`을 더블클릭해서 브라우저로 엽니다.

권장 방법:
VS Code에서 이 폴더를 열고 Live Server 확장 프로그램으로 `index.html`을 실행합니다.

## 2. 사진 넣기

예를 들어 2026년 2월 14일 사진을 넣으려면:

images/
└── 2026-02-14/
    ├── 01.jpg
    ├── 02.jpg
    └── 03.jpg

사진 이름은 `01.jpg`, `02.jpg`처럼 맞추는 것이 가장 편합니다.

## 3. 날짜 추가하기

`js/data.js`를 열고 `memories` 배열에 아래 형태로 추가합니다.

{
  date: "2026-05-01",
  title: "새로운 추억",
  category: "OUR DAY",
  description: "이날 있었던 일을 적어주세요.",
  letter: "그날의 마음을 적어주세요.",
  photos: [
    { src: "images/2026-05-01/01.jpg", caption: "사진 설명" },
    { src: "images/2026-05-01/02.jpg", caption: "사진 설명" }
  ]
}

그리고:
images/2026-05-01/
폴더를 만들고 사진을 넣으면 됩니다.

## 4. 사귄 날짜 변경

`js/data.js` 상단의

startDate: "2026-02-14"

를 실제 사귄 날짜로 변경하세요.

## 5. 사진 비율

사진은 세로/가로 상관없이 자동으로 잘라서 카드에 맞춥니다.
사진을 클릭하면 원본 비율로 크게 볼 수 있습니다.

## 폴더 구조

our-memory/
├── index.html
├── memory.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── main.js
│   └── memory.js
├── images/
│   ├── 2026-02-14/
│   ├── 2026-03-01/
│   └── 2026-04-20/
└── README.md
