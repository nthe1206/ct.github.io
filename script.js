// Import Firebase SDKs (Firebase 9+ Modular Syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- Cấu hình Firebase ---
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

// --- Khởi tạo Firebase ---
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============= LƯỢT TRUY CẬP ============= //
const visitRef = ref(db, "visits/count");
get(visitRef).then((snapshot) => {
  let count = snapshot.exists() ? snapshot.val() : 0;
  count++;
  set(visitRef, count);
  document.getElementById("visitCount").innerText = `Lượt truy cập: ${count}`;
});

// ============= GỬI & HIỂN THỊ BÌNH LUẬN ============= //
const commentBox = document.getElementById("commentBox");
const commentButton = document.getElementById("sendComment");
const commentList = document.getElementById("commentList");
const commentsRef = ref(db, "comments");

commentButton.addEventListener("click", () => {
  const text = commentBox.value.trim();
  if (text === "") return alert("Vui lòng nhập nội dung bình luận!");

  const newComment = {
    text: text,
    timestamp: new Date().toLocaleString("vi-VN")
  };

  push(commentsRef, newComment);
  commentBox.value = "";
});

// Hiển thị bình luận realtime
onValue(commentsRef, (snapshot) => {
  const data = snapshot.val();
  commentList.innerHTML = "";

  if (data) {
    const entries = Object.values(data);
    const recent = entries.slice(-10); // Hiển thị tối đa 10 bình luận mới nhất

    for (let c of recent) {
      const div = document.createElement("div");
      div.classList.add("comment");
      div.innerHTML = `<p>${c.text}</p><span>${c.timestamp}</span>`;
      commentList.prepend(div);
    }

    // Nếu có hơn 10 bình luận, hiển thị thông báo rút gọn
    if (entries.length > 10) {
      const notice = document.createElement("div");
      notice.classList.add("more-comments");
      notice.innerText = `Đã rút gọn ${entries.length - 10} bình luận cũ hơn...`;
      commentList.appendChild(notice);
    }
  } else {
    commentList.innerHTML = "<p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>";
  }
});
