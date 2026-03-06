const wrapper = document.querySelector(".wrapper"),
signupHeader = document.querySelector(".signup header"),
loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () =>{
    wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () =>{
    wrapper.classList.remove("active");
});
function login(e){
    e.preventDefault();  // ❗ BU ÇOX VACİBDİR (refresh olmasın)

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if(email !== "" && password !== ""){

        // login oldu kimi yadda saxla
        localStorage.setItem("login", "true");

        // ANA SƏHİFƏYƏ KEÇ
        window.location.href = "kentli.html";

    } else {
        alert("Email və şifrəni doldur");
    }
}

function qeydiyyat(e){
    e.preventDefault();

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if(name !== "" && email !== "" && password !== ""){

        // istifadəçini yadda saxla
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        // login oldu kimi yadda saxla
        localStorage.setItem("login", "true");

        // ANA SƏHİFƏYƏ KEÇ
        window.location.href = "index.html";

    } else {
        alert("Bütün xanaları doldur");
    }
}

window.onload = function(){
    if(this.localStorage.getItem("userEmail")){

        Document.getElementById("signupForm").styl
        e.display = "none"
    }
}
 localStorage.setItem("login", "true");
    localStorage.setItem("userEmail", email);
    window.location.href = "profil.html";
    

    const provider = new firebase.auth.GoogleAuthProvider();

function googleLogin(){

  firebase.auth().signInWithPopup(provider)

  .then((result) => {

    alert("login oldu");   // ← BURADA olacaq
    window.location.href = "index.html";  // ← BURADA olacaq

  })

  .catch((error) => {
    alert(error.message);
  });

}   

