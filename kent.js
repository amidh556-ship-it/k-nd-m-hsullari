const wrapper = document.querySelector(".wrapper"),
signupHeader = document.querySelector(".signup header"),
loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
    wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

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
    if (email === "ttik66006@gmail.com" && password === "a1m2i3d42006") {
        localStorage.setItem("operator", "true");
        window.location.href = "operator.html";
        return;
    }

    // ADİ İSTİFADƏÇİ
    localStorage.setItem("operator", "false");
    window.location.href = "index.html";
}

function qeydiyyat(e) {
    e.preventDefault();

    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Bütün xanaları doldur");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("login", "true");

    // OPERATOR
    if (email === "ttik66006@gmail.com" && password === "a1m2i3d42006") {
        localStorage.setItem("operator", "true");
        window.location.href = "operator.html";
        return;
    }

    // ADİ İSTİFADƏÇİ
    localStorage.setItem("operator", "false");
    window.location.href = "index.html";
}
