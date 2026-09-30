import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBDKe-57avB_Oajvq7PemHcl4LIxIv0ziY",
  authDomain: "kendmehsullari-6a53d.firebaseapp.com",
  databaseURL: "https://kendmehsullari-6a53d-default-rtdb.firebaseio.com",
  projectId: "kendmehsullari-6a53d",
  storageBucket: "kendmehsullari-6a53d.firebasestorage.app",
  messagingSenderId: "551607499773",
  appId: "1:551607499773:web:a84aa63dc5b55c38687794",
  measurementId: "G-2JZ105RRPH"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesRef = ref(db, "messages");


const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");


sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});


function sendMessage() {

  const message = userInput.value.trim();

  if (message === "") return;


  // Müştərinin mesajını ekranda göstər
  const userMsgDiv = document.createElement("div");

  userMsgDiv.className = "user-message";

  userMsgDiv.textContent = message;

  chatBox.appendChild(userMsgDiv);


  // Firebase-ə göndər
  push(messagesRef, {
    message: message,
    sender: "customer",
    time: Date.now()
  });


  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;


  // Botun avtomatik cavabı
  setTimeout(function() {

    const botMsgDiv = document.createElement("div");

    botMsgDiv.className = "bot-message";


    const text = message.toLowerCase();


    if (text.includes("salam")) {

      botMsgDiv.textContent =
      "Salam, xoş gəlmisiniz! Sizə necə kömək edə bilərəm?";

    }

    else if (text.includes("necəsən") || text.includes("necesen")) {

      botMsgDiv.textContent =
      "Mən yaxşıyam, təşəkkür edirəm! Sizə necə kömək edə bilərəm?";

    }

    else if (text.includes("bu nedi")) {

      botMsgDiv.textContent =
      "Əziz müştəri, zəhmət olmasa hansı məhsulu nəzərdə tutduğunuzu yazın.";

    }

    else if (
      text.includes("mehsulum niye gelmiyib") ||
      text.includes("məhsulum niyə gəlməyib")
    ) {

      botMsgDiv.textContent =
      "Əziz müştəri, zəhmət olmasa sifariş kodunuzu yazın.";

    }

    else if (text.includes("sen peysersen")) {

      botMsgDiv.textContent =
      "Əziz müştəri, mən sizə kömək etmək üçün buradayam. 😊";

    }

    else {

      botMsgDiv.textContent =
      "Mesajınızı aldım. Operatorumuz sizə cavab verəcək.";

    }


    chatBox.appendChild(botMsgDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

  }, 500);

}
