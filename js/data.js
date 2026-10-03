/*
 * ============================================================
 *  여기만 수정하면 날짜와 사진을 추가할 수 있습니다.
 * ============================================================
 */

const siteConfig = {
  // 사귄 날짜로 변경하세요.
  startDate: "2026-02-19",

  // 메인 화면에 표시할 오늘 날짜 형식
  locale: "ko-KR"
};

const memories = [
  {
    date: "2026-02-19",
    title: "다시 시작",
    category: "SPECIAL DAY",
    description: "오랜 나의 꿈이 이루어진 날",
    letter: "다시는 멀어지고 싶지 않아",
    photos: [
      { src: "images/2026-02-19/1.png", caption: "우리의 첫 번째 사진" }
    ]
  },
  {
    date: "2026-02-26",
    title: "휴민트",
    category: "Movie",
    description: "우리의 처음♥",
    letter: "좋았어!!!",
    photos: [
      { src: "images/2026-02-26/260226.png", caption: "아이고 이뻐라" },
      { src: "images/2026-02-26/채현냐옹.png", caption: "" }
    ]
  },
  {
    date: "2026-03-05",
    title: "카공한 날",
    category: "Study",
    description: "어깨 냠냠",
    letter: "어깨가 참 이뻐요",
    photos: [
      { src: "images/2026-03-05/260305카공.JPG", caption: "어깨는 맛있는거야" }
    ]
  },
  {
    date: "2026-03-17",
    title: "단발 여신 등장",
    category: "Beautiful",
    description: "단발 여신 등장",
    letter: "단발 채현이를 처음 본 날",
    photos: [
      { src: "images/2026-03-17/20260317.JPG", caption: "감상하시죠" },
      { src: "images/2026-03-17/20260317-2.JPG", caption: "2번째 사진" }
    ]
  },
  {
    date: "2026-03-28",
    title: "오이도 여행",
    category: "Trip",
    description: "오이도 여행",
    letter: "이 날은 미안해",
    photos: [
      { src: "images/2026-03-28/260328ch.JPG", caption: "내 배경화면" },
      { src: "images/2026-03-28/260328wink.JPG", caption: "윙크채현" },
      { src: "images/2026-03-28/260328인생네컷.JPG", caption: "마무리는 역시" }
    ]
  },
  {
    date: "2026-04-27",
    title: "채현냥이다",
    category: "Date",
    description: "일상 데이트",
    letter: "채현이가 냐옹냐옹",
    photos: [
      { src: "images/2026-04-27/260427인생네컷.JPG", caption: "역시 내 고양이" },
      { src: "images/2026-04-27/260427.JPG", caption: "검스 야해요" },
    ]
  },
  {
    date: "2026-04-28",
    title: "공주채현 등장",
    category: "Date",
    description: "일상 데이트",
    letter: "이 날 진짜 역대급 이쁜날!!!",
    photos: [
      { src: "images/2026-04-28/260428인생네컷.JPG", caption: "이 날 우리 좀 있어보여" },
      { src: "images/2026-04-28/20260428얼빡샷.png", caption: "으 하고싶어진다" },
      { src: "images/2026-04-28/20260428ㅁㅌ.png", caption: "그래서 데려왔지" }
    ]
  },
  {
    date: "2026-04-20",
    title: "100일",
    category: "100 DAYS",
    description: "우리의 100번째 하루.",
    letter: "100일 동안 내 옆에 있어줘서 고마워. 100일 뒤에도, 1000일 뒤에도 같이 웃고 있자.",

  },

  {
   date: "2026-07-29",
   title: "오마카세",
   category: "OUR DAY",
   description: "첫 월급 기념 채현이와 오마카세",
   letter: "채현이가 압구정중학교 앞에서 실수한 날♥",
 },


 {
   date: "2026-09-29",
   title: "새로운 추억",
   category: "OUR DAY",
   description: "이날 있었던 일을 짧게 적어주세요.",
   letter: "그날의 마음을 적어주세요.",
 }
];

// 사진을 추가할 때 사용할 기본 구조:
// {
//   date: "2026-05-01",
//   title: "새로운 추억",
//   category: "OUR DAY",
//   description: "이날 있었던 일을 짧게 적어주세요.",
//   letter: "그날의 마음을 적어주세요.",
//   photos: [
//     { src: "images/2026-05-01/01.jpg", caption: "사진 설명" },
//     { src: "images/2026-05-01/02.jpg", caption: "사진 설명" }
//   ]
// }
