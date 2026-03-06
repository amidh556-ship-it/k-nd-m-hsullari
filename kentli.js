window.onload = function(){

let loginYoxla = localStorage.getItem("isLoggedIn");

if(loginYoxla === "true"){
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
}
else{
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
}
}

function hesabaGir(){
  window.location.href = "kent.html";
}

document.getElementById("profileBtn").addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = "kent.html";
});

let btn = document.getElementById("profileBtn");

if(localStorage.getItem("login") === "true"){

    
}

btn.addEventListener("click", function(){

    if(localStorage.getItem("login") === "true"){
        window.location.href = "profile.html";
    }else{
        window.location.href = "kent.html";
    }

});
function goOrders(){
window.location.href="profle.html#orders";
}

function goComments(){
window.location.href="profle.html#comments";
}

function goProfile(){
window.location.href="profle.html#profil";
}

function goHistory(){
window.location.href="profle.html#history";
}
function openMenu(){
document.getElementById("sideMenu").style.right="0";
}
function handleCredentialResponse(response) {

  const data = jwt_decode(response.credential);

  localStorage.setItem("userName", data.name);
  localStorage.setItem("userPhoto", data.picture);

  document.getElementById("profileBtn").innerText = data.name;

  let img = document.getElementById("userPhoto");
  img.src = data.picture;
  img.style.display = "block";

  window,location.href = ""
}



window.onload = function(){

let name = localStorage.getItem("userName");
let photo = localStorage.getItem("userPhoto");

if(name && photo){

document.getElementById("userName").innerText = name;
document.getElementById("userPhoto").src = photo;
document.getElementById("userInfo").style.display = "flex";

}

}

 window.onload = function() {

  const photo = localStorage.getItem("photo");

  if(photo){
    document.getElementById("userPhoto").src = photo;
  }

}