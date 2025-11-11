// Firebase v9+ Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue, increment, get, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// cấu hình của Thế
const firebaseConfig = {
  apiKey: "AIzaSyD9_pM1QPug4y_7FT1ltYg6-eUDgz17NOo",
  authDomain: "cantho-22806.firebaseapp.com",
  databaseURL: "https://cantho-22806-default-rtdb.firebaseio.com",
  projectId: "cantho-22806",
  storageBucket: "cantho-22806.firebasestorage.app",
  messagingSenderId: "620807927683",
  appId: "1:620807927683:web:8e120572f2581e68e6a8b6",
  measurementId: "G-QPNY1FV450"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ghi lượt truy cập
const visitRef = ref(db, "visits/count");
get(visitRef).then(snapshot => {
  let count = snapshot.exists() ? snapshot.val() + 1 : 1;
  set(visitRef, count);
  document.getElementById("visitCount").textContent = `Lượt truy cập: ${count}`;
});

// Hiển thị và gửi bình luận
const commentList = document.getElementById("commentList");
function loadComments() {
  const commentsRef = ref(db, "comments/");
  onValue(commentsRef, (snapshot) => {
    commentList.innerHTML = "";
    const data = snapshot.val();
    if (data) {
      Object.values(data).slice(-100).reverse().forEach((text) => {
        const div = document.createElement("div");
        div.className = "comment";
        div.textContent = text;
        commentList.appendChild(div);
      });
    }
  });
}
loadComments();

window.submitComment = function() {
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (text) {
    const commentsRef = ref(db, "comments/");
    push(commentsRef, text);
    input.value = "";
  }
};
