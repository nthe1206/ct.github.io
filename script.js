// Fade-in hiệu ứng khi cuộn
const fades = document.querySelectorAll('.fade');
function showOnScroll() {
  fades.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// Bộ đếm lượt truy cập toàn cầu
fetch('https://api.countapi.xyz/hit/cantho2025/visits')
  .then(res => res.json())
  .then(data => {
    document.getElementById('view-count').textContent = data.value.toLocaleString('vi-VN');
  });
