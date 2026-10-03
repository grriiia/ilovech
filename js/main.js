document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("memoryGrid");
  const todayText = document.getElementById("todayText");
  const daysTogether = document.getElementById("daysTogether");
  const startDateText = document.getElementById("startDateText");

  const start = parseLocalDate(siteConfig.startDate);
  const today = new Date();

  startDateText.textContent = formatDate(start);
  todayText.textContent = formatDate(today);

  const diff = Math.floor(
    (stripTime(today) - stripTime(start)) / 86400000
  );

  daysTogether.textContent = diff >= 0 ? `D+${diff + 1}` : "";

  memories.forEach((memory, index) => {
    const card = document.createElement("a");

    card.className = "memory-card";

    card.href = `memory.html?date=${encodeURIComponent(memory.date)}`;

    card.style.setProperty("--delay", `${index * 80}ms`);

    const cover = memory.photos?.[0]?.src || "";

    card.innerHTML = `
      <div class="card-image">

        ${
          cover
            ? `<img 
                src="${cover}" 
                alt="${escapeHtml(memory.title)}" 
                loading="lazy"
                onerror="this.parentElement.classList.add('no-image'); this.style.display='none';"
              >`
            : ""
        }

        <div class="card-placeholder">♥</div>

        <span class="card-date">
          ${formatMemoryDate(memory.date)}
        </span>

      </div>

      <div class="card-info">

        <span class="card-category">
          ${escapeHtml(memory.category)}
        </span>

        <h3>
          ${escapeHtml(memory.title)}
        </h3>

        <p>
          ${escapeHtml(memory.description)}
        </p>

        <span class="view-memory">
          VIEW MEMORY →
        </span>

      </div>
    `;

    grid.appendChild(card);
  });
});


/* ========================================
   날짜 문자열 → Date
======================================== */

function parseLocalDate(value) {
  const [y, m, d] = value.split("-").map(Number);

  return new Date(y, m - 1, d);
}


/* ========================================
   날짜 범위의 시작 날짜 가져오기
======================================== */

function getStartDate(value) {
  const startDate = value.split("~")[0].trim();

  return parseLocalDate(startDate);
}


/* ========================================
   날짜 표시
======================================== */

function formatDate(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}


/* ========================================
   단일 날짜 / 날짜 범위 모두 표시
======================================== */

function formatMemoryDate(value) {

  // 날짜 범위인 경우
  if (value.includes("~")) {

    const [start, end] = value.split("~");

    const startDate = parseLocalDate(start.trim());
    const endDate = parseLocalDate(end.trim());

    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  }

  // 일반적인 하루짜리 기억
  return formatDate(parseLocalDate(value));
}


/* ========================================
   시간 제거
======================================== */

function stripTime(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}


/* ========================================
   HTML Escape
======================================== */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}