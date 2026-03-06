/ Əgər login olmayıbsa profile-ə girməyə icazə vermə
if(localStorage.getItem("login") !== "true"){
    window.location.href = "kent.html";
}

// İstifadəçi məlumatlarını göstər
document.getElementById("profName").innerText =
localStorage.getItem("userName");

document.getElementById("profEmail").innerText =
localStorage.getItem("userEmail");


// Çıxış etmək
function logout(){
    localStorage.removeItem("login");
    window.location.href = "kent.html";
}
