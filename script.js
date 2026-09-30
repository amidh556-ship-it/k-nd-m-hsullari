import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onValue
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


/* OPERATOR STATUSU */

onValue(operatorRef, (snapshot) => {
  operatorOnline = snapshot.val() === true;
});


/* MÜŞTƏRİ MESAJ GÖNDƏRİR */

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    sendMessage();
  }

});


function sendMessage() {

  const message = userInput.value.trim();

  if (message === "") return;


  /* MÜŞTƏRİ MESAJINI EKRANDA GÖSTƏR */

  const userMsgDiv = document.createElement("div");

  userMsgDiv.className = "user-message";
  userMsgDiv.textContent = message;

  chatBox.appendChild(userMsgDiv);


  /* FIREBASE */

  push(messagesRef, {

    message: message,

    sender: "customer",

    time: Date.now()

  });


  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;


  /* OPERATOR VARSA BOT SUSUR */

  if (operatorOnline) {
    return;
  }


  /* BOT 1 DƏFƏ CAVAB VERİR */

  if (botReplied) {
    return;
  }

  botReplied = true;


  setTimeout(function() {

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


/* FIREBASE-DƏN MESAJLARI OXU */

onChildAdded(messagesRef, function(snapshot) {

  const data = snapshot.val();

  if (!data) return;


  /* MÜŞTƏRİNİN ÖZ MESAJINI TƏKRAR GÖSTƏRMƏ */

  if (data.sender === "customer") {
    return;
  }


  /* OPERATOR MESAJI */

  if (data.sender === "agent") {

    operatorOnline = true;
    botReplied = true;


    const agentMsgDiv = document.createElement("div");

    agentMsgDiv.className = "bot-message";

    agentMsgDiv.textContent =
      data.message || data.text || "";


    chatBox.appendChild(agentMsgDiv);

    chatBox.scrollTop =
      chatBox.scrollHeight;

  }

});
