import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyD9_pM1QPug4y_7FT1ltYg6-eUDgz17NOo",
  authDomain: "cantho-22806.firebaseapp.com",
  databaseURL: "https://cantho-22806-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cantho-22806",
  storageBucket: "cantho-22806.firebasestorage.app",
  messagingSenderId: "620807927683",
  appId: "1:620807927683:web:8e120572f2581e68e6a8b6",
  measurementId: "G-QPNY1FV450"
};

// --- Init Firebase ---
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Đếm lượt truy cập ---
const visitRef = ref(db, "visits/count");
get(visitRef).then((snapshot) => {
  let count = snapshot.exists() ? snapshot.val() : 0;
  count++;
  set(visitRef, count);
  document.getElementById("visitCount").innerText = `👁️ Lượt truy cập: ${count}`;
});

// --- Bình luận realtime ---
const commentBox = document.getElementById("commentBox");
const commentButton = document.getElementById("sendComment");
const commentList = document.getElementById("commentList");
const commentsRef = ref(db, "comments");

commentButton.addEventListener("click", () => {
  const text = commentBox.value.trim();
  if (text === "") return alert("⚠️ Vui lòng nhập nội dung bình luận!");
  const newComment = {
    text: text,
    timestamp: new Date().toLocaleString("vi-VN")
  };
  push(commentsRef, newComment);
  commentBox.value = "";
});

// Hiển thị realtime
onValue(commentsRef, (snapshot) => {
  const data = snapshot.val();
  commentList.innerHTML = "";

  if (data) {
    const entries = Object.values(data);
    const recent = entries.slice(-10);
    for (let c of recent) {
      const div = document.createElement("div");
      div.classList.add("comment");
      div.innerHTML = `<p>${c.text}</p><span>${c.timestamp}</span>`;
      commentList.prepend(div);
    }

    if (entries.length > 10) {
      const more = document.createElement("div");
      more.classList.add("more-comments");
      more.innerText = `Đã rút gọn ${entries.length - 10} bình luận cũ hơn...`;
      commentList.appendChild(more);
    }
  } else {
    commentList.innerHTML = "<p>Chưa có bình luận nào, hãy là người đầu tiên!</p>";
  }
});
