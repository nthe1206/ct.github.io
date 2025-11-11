// Hiệu ứng fade khi cuộn
const fades = document.querySelectorAll('.fade');
window.addEventListener('scroll', () => {
  fades.forEach(f => {
    const rect = f.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) f.classList.add('visible');
  });
});

// Bộ đếm lượt truy cập ổn định (localStorage)
let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('view-count').textContent = count;

// Bình luận hiển thị trực tiếp
let comments = JSON.parse(localStorage.getItem('comments')) || [];
const commentList = document.getElementById('commentList');
const loadMoreBtn = document.getElementById('loadMore');

function renderComments(limit = 10) {
  commentList.innerHTML = '';
  comments.slice(0, limit).forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<strong>${c.name}</strong><br>${c.text}`;
    commentList.appendChild(div);
  });
  if (comments.length > limit) loadMoreBtn.classList.remove('hidden');
  else loadMoreBtn.classList.add('hidden');
}

document.getElementById('sendComment').onclick = () => {
  const name = document.getElementById('commentName').value.trim() || 'Ẩn danh';
  const text = document.getElementById('commentText').value.trim();
  if (text) {
    comments.unshift({ name, text });
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('commentText').value = '';
    renderComments();
  }
};

let currentLimit = 10;
loadMoreBtn.onclick = () => {
  currentLimit += 10;
  renderComments(currentLimit);
};

renderComments();
