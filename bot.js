let selectedProduct = null;

function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();
    let chatBox = document.getElementById("chatBox");

    if (message === "") return;

    chatBox.innerHTML += "<p><b>Sən:</b> " + message + "</p>";

    let response = processMessage(message);

    chatBox.innerHTML += "<p><b>Bot:</b> " + response + "</p>";

    input.value = "";
}

function processMessage(message) {

    // Əgər mesajda rəqəm varsa → məhsul nömrəsi kimi qəbul et
    if (/\d+/.test(message)) {
        selectedProduct = message.match(/\d+/)[0];
        return "Siz " + selectedProduct + " nömrəli məhsuldan danışırsınız?";
    }

    // Əgər artıq məhsul seçilibsə → problem kimi qəbul et
    if (selectedProduct !== null) {
        return "Deməli " + selectedProduct + 
               " nömrəli məhsulda bu problemdən danışırsınız: '" + 
               message + "' ?";
    }

    return "Zəhmət olmasa əvvəl məhsul nömrəsini yazın.";
}