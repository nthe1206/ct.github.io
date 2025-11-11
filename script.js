// Hiệu ứng fade-in khi cuộn
const fadeEls = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("show");
  });
});

// Đếm lượt truy cập (localStorage)
let count = localStorage.getItem("visits") || 0;
count++;
localStorage.setItem("visits", count);
document.getElementById("visitor-count").textContent = count;

// Bình luận góp ý
const sendBtn = document.getElementById("send");
const list = document.getElementById("comments-list");
sendBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("message").value.trim();
  if (msg === "") return alert("Vui lòng nhập góp ý!");
  const li = document.createElement("li");
  li.textContent = `${name ? name : "Ẩn danh"}: ${msg}`;
  list.appendChild(li);
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
});
