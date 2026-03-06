const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
 let selectedProduct = null


function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // istifadəçi mesajı
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "user-message";
  userMsgDiv.textContent = message;
  chatBox.appendChild(userMsgDiv);

  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  
 window.onload = function() {

    const chatBox = document.getE(".chat-box");

    const botMsgDiv = document.createElement("div");
    botMsgDiv.className = "bot-message message";
    botMsgDiv.textContent = "Salam, mən Kənt məhsulunun botuyam 🤖 Sizə necə kömək olum?";

    chatBox.appendChild(botMsgDiv);

};

  // bot cavabı
  setTimeout(() => {
    const botMsgDiv = document.createElement("div");
    botMsgDiv.className = "bot-message";
   if (message.toLowerCase().includes("salam")) {
      botMsgDiv.textContent = "salam xos glmisiz kend meshullara size nece komek ola bilerem hansisa mehsuunuz catmiyib?";
    } else if (message.toLowerCase().includes("sen peysersen")) {
      botMsgDiv.textContent = "eziz musderimiz bele soz demeyin men yapay zekayam sizin prablemleri hell etmek ucun yaranmisam ";
    }
    else if (message.toLowerCase().includes("bu nedi")) {
      botMsgDiv.textContent = "ne nedi eziz musderimiz";
    } else if (message.toLowerCase().includes("mehsulum niye gelmiyib")) {
      botMsgDiv.textContent = "hansi mehsuldan danisirsiz ezi musderimiz kodu deyin zehmet olmasa ";
    } else {
      botMsgDiv.textContent = "Üzr istəyirəm, bunu başa düşmədim 😅";
    }
  else if (message.toLowerCase().includes("")) {
      botMsgDiv.textContent = "Salam! Necəsən?";
    } else if (message.toLowerCase().includes("necəsən")) {
      botMsgDiv.textContent = "Mən yaxşıyam, sən necəsən?";
    }

    chatBox.appendChild(botMsgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}