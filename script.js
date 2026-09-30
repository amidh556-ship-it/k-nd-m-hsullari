import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onValue
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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


/* OPERATOR ONLINE */

onValue(operatorRef, (snapshot) => {

  operatorOnline =
    snapshot.val() === true;

});


/* MESAJ GÖNDƏR */

sendBtn.addEventListener(
  "click",
  sendMessage
);


userInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      event.preventDefault();

      sendMessage();

    }

  }
);


function sendMessage() {

  const message =
    userInput.value.trim();

  if (message === "") return;


  /* MÜŞTƏRİNİN MESAJINI EKRANDA GÖSTƏR */

  const div =
    document.createElement("div");

  div.className =
    "user-message";

  div.textContent =
    message;

  chatBox.appendChild(div);


  /* FIREBASE */

  push(messagesRef, {

    message: message,

    sender: "customer",

    time: Date.now()

  })
  .catch((error) => {

    console.error(error);

    alert(
      "Mesaj göndərilmədi: " +
      error.message
    );

  });


  userInput.value = "";

  chatBox.scrollTop =
    chatBox.scrollHeight;


  /* OPERATOR VARSA BOT SUSUR */

  if (operatorOnline) {
    return;
  }


  /* BOT YALNIZ BİR DƏFƏ */

  if (botReplied) {
    return;
  }

  botReplied = true;


  setTimeout(() => {

    if (operatorOnline) {
      return;
    }


    const bot =
      document.createElement("div");

    bot.className =
      "bot-message";


    const lower =
      message.toLowerCase();


    if (lower.includes("salam")) {

      bot.textContent =
        "Salam, xoş gəlmisiniz! Sizə necə kömək edə bilərəm?";

    }

    else if (
      lower.includes("necəsən") ||
      lower.includes("necesen")
    ) {

      bot.textContent =
        "Mən yaxşıyam, təşəkkür edirəm!";

    }

    else {

      bot.textContent =
        "Mesajınızı aldım. Operatorumuz sizə cavab verəcək.";

    }


    chatBox.appendChild(bot);

    chatBox.scrollTop =
      chatBox.scrollHeight;

  }, 500);

}


/* FIREBASE-DƏN OPERATOR MESAJLARINI OXU */

onChildAdded(
  messagesRef,
  (snapshot) => {

    const data =
      snapshot.val();

    if (!data) return;


    /* YALNIZ OPERATOR MESAJI */

    if (data.sender !== "agent") {
      return;
    }


    const messageText =
      data.message || data.text || "";


    if (messageText === "") {
      return;
    }


    /* OPERATOR QOŞULUB */

    operatorOnline = true;

    botReplied = true;


    const div =
      document.createElement("div");

    div.className =
      "bot-message";

    div.textContent =
      messageText;


    chatBox.appendChild(div);

    chatBox.scrollTop =
      chatBox.scrollHeight;

  }
);
