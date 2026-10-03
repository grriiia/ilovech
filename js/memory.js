document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const memory = memories.find(item => item.date === date);

  if (!memory) {
    document.title = "Memory not found";
    document.getElementById("memoryTitle").textContent = "추억을 찾을 수 없어요.";
    document.getElementById("memoryDescription").textContent =
      "메인 화면에서 날짜를 선택해주세요.";
    document.getElementById("photoGrid").style.display = "none";
    return;
  }

  document.title = `${memory.title} ♥ Our Memory`;

  document.getElementById("memoryDate").textContent =
    formatDate(parseLocalDate(memory.date));

  document.getElementById("memoryCategory").textContent = memory.category;
  document.getElementById("memoryTitle").textContent = memory.title;
  document.getElementById("memoryDescription").textContent = memory.description;
  document.getElementById("memoryLetter").textContent = memory.letter;

  const grid = document.getElementById("photoGrid");
  const empty = document.getElementById("emptyState");

  // 현재 사진 목록
  const photos = memory.photos || [];

  if (photos.length === 0) {
    empty.classList.add("show");
  } else {
    photos.forEach((photo, index) => {
      const item = document.createElement("figure");
      item.className = `photo-item photo-${(index % 4) + 1}`;

      const caption = (photo.caption || "").trim();

      item.innerHTML = `
        <img
          src="${photo.src}"
          alt="${escapeHtml(caption || memory.title)}"
          loading="lazy"
        >

        ${
          caption
            ? `<figcaption>${escapeHtml(caption)}</figcaption>`
            : ""
        }
      `;

      // 사진 클릭
      item.querySelector("img").addEventListener("click", () => {
        openLightbox(index);
      });

      // 이미지 로딩 실패
      item.querySelector("img").addEventListener("error", () => {
        item.classList.add("broken");
      });

      grid.appendChild(item);
    });
  }

  // 닫기 버튼
  document
    .getElementById("lightboxClose")
    .addEventListener("click", closeLightbox);

  // Lightbox 바깥쪽 클릭 → 닫기
  document.getElementById("lightbox").addEventListener("click", event => {
    if (event.target.id === "lightbox") {
      closeLightbox();
    }
  });

  // 키보드 조작
  document.addEventListener("keydown", event => {
    const box = document.getElementById("lightbox");

    if (!box.classList.contains("open")) {
      return;
    }

    // ESC → 닫기
    if (event.key === "Escape") {
      closeLightbox();
    }

    // ← → 사진 이동
    if (event.key === "ArrowLeft") {
      showPreviousPhoto();
    }

    if (event.key === "ArrowRight") {
      showNextPhoto();
    }
  });

  // 이전 사진 버튼
  const prevButton = document.getElementById("lightboxPrev");

  if (prevButton) {
    prevButton.addEventListener("click", event => {
      event.stopPropagation();
      showPreviousPhoto();
    });
  }

  // 다음 사진 버튼
  const nextButton = document.getElementById("lightboxNext");

  if (nextButton) {
    nextButton.addEventListener("click", event => {
      event.stopPropagation();
      showNextPhoto();
    });
  }

  // 전체화면 버튼
  const fullscreenButton = document.getElementById("lightboxFullscreen");

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", event => {
      event.stopPropagation();
      toggleFullscreen();
    });
  }
});


// ==============================
// 현재 Lightbox 사진 번호
// ==============================

let currentPhotoIndex = 0;


// ==============================
// Lightbox 열기
// ==============================

function openLightbox(index) {
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const memory = memories.find(item => item.date === date);

  if (!memory || !memory.photos || memory.photos.length === 0) {
    return;
  }

  currentPhotoIndex = index;

  updateLightbox();

  const box = document.getElementById("lightbox");

  box.classList.add("open");
  document.body.classList.add("locked");
}


// ==============================
// Lightbox 사진 업데이트
// ==============================

function updateLightbox() {
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const memory = memories.find(item => item.date === date);

  if (!memory || !memory.photos) {
    return;
  }

  const photos = memory.photos;
  const photo = photos[currentPhotoIndex];

  const image = document.getElementById("lightboxImage");
  const captionElement = document.getElementById("lightboxCaption");

  image.src = photo.src;

  const caption = (photo.caption || "").trim();

  // 캡션이 있으면 표시
  if (caption) {
    captionElement.textContent = caption;
    captionElement.style.display = "";
  } else {
    // 캡션이 없으면 숨김
    captionElement.textContent = "";
    captionElement.style.display = "none";
  }

  // 사진이 1장뿐이면 좌우 버튼 숨김
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  if (photos.length <= 1) {
    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";
  } else {
    if (prevButton) prevButton.style.display = "";
    if (nextButton) nextButton.style.display = "";
  }
}


// ==============================
// 이전 사진
// ==============================

function showPreviousPhoto() {
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const memory = memories.find(item => item.date === date);

  if (!memory || !memory.photos || memory.photos.length <= 1) {
    return;
  }

  currentPhotoIndex--;

  // 첫 번째에서 이전 → 마지막 사진
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = memory.photos.length - 1;
  }

  updateLightbox();
}


// ==============================
// 다음 사진
// ==============================

function showNextPhoto() {
  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const memory = memories.find(item => item.date === date);

  if (!memory || !memory.photos || memory.photos.length <= 1) {
    return;
  }

  currentPhotoIndex++;

  // 마지막에서 다음 → 첫 번째 사진
  if (currentPhotoIndex >= memory.photos.length) {
    currentPhotoIndex = 0;
  }

  updateLightbox();
}


// ==============================
// Lightbox 닫기
// ==============================

function closeLightbox() {
  const box = document.getElementById("lightbox");

  box.classList.remove("open");
  document.body.classList.remove("locked");

  // 전체화면 상태라면 종료
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}


// ==============================
// 전체화면
// ==============================

function toggleFullscreen() {
  const box = document.getElementById("lightbox");

  if (!document.fullscreenElement) {
    box.requestFullscreen().catch(() => {
      // 브라우저가 전체화면을 지원하지 않는 경우
    });
  } else {
    document.exitFullscreen().catch(() => {});
  }
}


// ==============================
// 날짜 처리
// ==============================

function parseLocalDate(value) {
  const [y, m, d] = value.split("-").map(Number);

  return new Date(y, m - 1, d);
}


function formatDate(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}


// ==============================
// HTML Escape
// ==============================

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}