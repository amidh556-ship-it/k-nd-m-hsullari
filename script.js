import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBDKe-57avB_Oajvq7PemHcl4LIxIv0ziY",
  authDomain: "kendmehsullari-6a53d.firebaseapp.com",
  databaseURL: "https://kendmehsullari-6a53d-default-rtdb.firebaseio.com",
  projectId: "kendmehsullari-6a53d",
  storageBucket: "kendmehsullari-6a53d.firebasestorage.app",
  messagingSenderId: "551607499773",
  appId: "1:551607499773:web:a84aa63dc5b55c38687794"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesRef = ref(db, "messages");
const operatorRef = ref(db, "operatorOnline");


const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");


let operatorOnline = false;
let botReplied = false;


// ============================
// OPERATOR STATUSU
// ============================

onValue(operatorRef, function(snapshot) {
  operatorOnline = snapshot.val() === true;
});


// ============================
// MÜŞTƏRİ MESAJ GÖNDƏRİR
// ============================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});


function sendMessage() {

  const message = userInput.value.trim();

  if (message === "") return;


  // MÜŞTƏRİ MESAJINI GÖSTƏR
  const userMsgDiv = document.createElement("div");

  userMsgDiv.className = "user-message";
  userMsgDiv.textContent = message;

  chatBox.appendChild(userMsgDiv);


  // FIREBASE
  push(messagesRef, {
    message: message,
    sender: "customer",
    time: Date.now()
  });


  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;


  // OPERATOR ARTİQ QOŞULUBSA BOT SUSUR
  if (operatorOnline) {
    return;
  }


  // BOT SADECE 1 DƏFƏ CAVAB VERİR
  if (botReplied) {
    return;
  }


  botReplied = true;


  setTimeout(function() {

    // 500 ms ərzində operator qoşulubsa bot cavab vermir
    if (operatorOnline) {
      return;
    }


    const botMsgDiv = document.createElement("div");

    botMsgDiv.className = "bot-message";


    const text = message.toLowerCase();


    if (text.includes("salam")) {

      botMsgDiv.textContent =
        "Salam, xoş gəlmisiniz! Sizə necə kömək edə bilərəm?";

    }

    else if (
      text.includes("necəsən") ||
      text.includes("necesen")
    ) {

      botMsgDiv.textContent =
        "Mən yaxşıyam, təşəkkür edirəm!";

    }

    else {

      botMsgDiv.textContent =
        "Mesajınızı aldım. Operatorumuz sizə cavab verəcək.";

    }


    chatBox.appendChild(botMsgDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

  }, 500);

}


// ============================
// AGENTİN MESAJI
// ============================

onChildAdded(messagesRef, function(snapshot) {

  const data = snapshot.val();

  if (!data || !data.message) return;


  // YALNIZ AGENT MESAJI
  if (data.sender !== "agent") {
    return;
  }


  // OPERATOR QOŞULDU
  operatorOnline = true;

  // BOT ARTİQ SUSUR
  botReplied = true;


  // AGENT MESAJINI GÖSTƏR
  const agentMsgDiv = document.createElement("div");

  agentMsgDiv.className = "bot-message";
  agentMsgDiv.textContent = data.message;

  chatBox.appendChild(agentMsgDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

});
