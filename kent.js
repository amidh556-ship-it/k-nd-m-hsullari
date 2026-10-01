const wrapper = document.querySelector(".wrapper");
const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");


// QEYDİYYAT / GİRİŞ KEÇİDİ

loginHeader.addEventListener("click", () => {
    wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
    wrapper.classList.remove("active");
});


// NORMAL HESABA GİRİŞ

function login(e) {

    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Email və şifrəni doldur");
        return;
    }

    localStorage.setItem("login", "true");
    localStorage.setItem("userEmail", email);


    // OPERATOR

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem("operator", "true");

        window.location.href = "operator.html";

        return;
    }


    // ADİ İSTİFADƏÇİ

    localStorage.setItem("operator", "false");

    window.location.href = "index.html";
}



// NORMAL QEYDİYYAT

function qeydiyyat(e) {

    e.preventDefault();

    let name =
        document.getElementById("signupName").value.trim();

    let email =
        document.getElementById("signupEmail").value.trim();

    let password =
        document.getElementById("signupPassword").value;


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Bütün xanaları doldur");

        return;
    }


    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    localStorage.setItem("login", "true");


    // OPERATOR

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem("operator", "true");

        window.location.href = "operator.html";

        return;
    }


    // ADİ İSTİFADƏÇİ

    localStorage.setItem("operator", "false");

    window.location.href = "index.html";
}



// GOOGLE İLƏ GİRİŞ
// Google düyməsinə basanda bu funksiya işləyir.

function handleCredentialResponse(response) {

    try {

        const data = jwt_decode(response.credential);


        // GOOGLE MƏLUMATLARINI YADDA SAXLA

        localStorage.setItem("login", "true");

        localStorage.setItem("operator", "false");

        localStorage.setItem(
            "userName",
            data.name || ""
        );

        localStorage.setItem(
            "userEmail",
            data.email || ""
        );

        localStorage.setItem(
            "userPhoto",
            data.picture || ""
        );


        // GOOGLE PROFİLİNİ GÖSTƏR

        const userName =
            document.getElementById("userName");

        const userEmail =
            document.getElementById("userEmail");

        const userPhoto =
            document.getElementById("userPhoto");

        const userInfo =
            document.getElementById("userInfo");


        if (userName) {
            userName.innerText = data.name || "";
        }

        if (userEmail) {
            userEmail.innerText = data.email || "";
        }

        if (userPhoto && data.picture) {
            userPhoto.src = data.picture;
        }

        if (userInfo) {
            userInfo.style.display = "flex";
        }


        // SAYTA QAYIT

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);


    } catch (error) {

        console.error(error);

        alert("Google ilə giriş alınmadı.");
    }
}



// SƏHİFƏ AÇILANDA GOOGLE PROFİLİNİ YÜKLƏ

window.addEventListener("load", () => {

    const name =
        localStorage.getItem("userName");

    const email =
        localStorage.getItem("userEmail");

    const photo =
        localStorage.getItem("userPhoto");


    const userName =
        document.getElementById("userName");

    const userEmail =
        document.getElementById("userEmail");

    const userPhoto =
        document.getElementById("userPhoto");

    const userInfo =
        document.getElementById("userInfo");


    if (name && userName) {
        userName.innerText = name;
    }

    if (email && userEmail) {
        userEmail.innerText = email;
    }

    if (photo && userPhoto) {
        userPhoto.src = photo;
    }

    if (
        userInfo &&
        (name || email || photo)
    ) {
        userInfo.style.display = "flex";
    }

});
