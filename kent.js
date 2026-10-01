const wrapper = document.querySelector(".wrapper");

const signupHeader =
    document.querySelector(".signup header");

const loginHeader =
    document.querySelector(".login header");


// QEYDİYYAT VƏ GİRİŞ KEÇİDİ

loginHeader.addEventListener("click", () => {

    wrapper.classList.add("active");

});


signupHeader.addEventListener("click", () => {

    wrapper.classList.remove("active");

});


// NORMAL GİRİŞ

function login(e) {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        alert("Email və şifrəni doldur");

        return;
    }


    localStorage.setItem("login", "true");

    localStorage.setItem(
        "userEmail",
        email
    );


    // OPERATOR

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem(
            "operator",
            "true"
        );

        window.location.href =
            "operator.html";

        return;
    }


    // ADİ MÜŞTƏRİ

    localStorage.setItem(
        "operator",
        "false"
    );

    window.location.href =
        "index.html";
}



// NORMAL QEYDİYYAT

function qeydiyyat(e) {

    e.preventDefault();


    const name =
        document.getElementById("signupName")
        .value.trim();

    const email =
        document.getElementById("signupEmail")
        .value.trim();

    const password =
        document.getElementById("signupPassword")
        .value;


    if (!name || !email || !password) {

        alert("Bütün xanaları doldur");

        return;
    }


    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "userPassword",
        password
    );

    localStorage.setItem(
        "login",
        "true"
    );


    // OPERATOR

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem(
            "operator",
            "true"
        );

        window.location.href =
            "operator.html";

        return;
    }


    // ADİ MÜŞTƏRİ

    localStorage.setItem(
        "operator",
        "false"
    );

    window.location.href =
        "index.html";
}



// GOOGLE İLƏ GİRİŞ

function handleCredentialResponse(response) {

    try {

        const data =
            jwt_decode(response.credential);


        // GOOGLE MƏLUMATLARI

        localStorage.setItem(
            "login",
            "true"
        );

        localStorage.setItem(
            "operator",
            "false"
        );

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


        // SAYTA QAYIT

        window.location.href =
            "index.html";


    } catch (error) {

        console.error(error);

        alert(
            "Google ilə giriş alınmadı."
        );

    }

}



// SƏHİFƏ AÇILANDA PROFİLİ GÖSTƏR

window.addEventListener(
    "load",
    function () {

        const name =
            localStorage.getItem(
                "userName"
            );

        const email =
            localStorage.getItem(
                "userEmail"
            );

        const photo =
            localStorage.getItem(
                "userPhoto"
            );


        const userName =
            document.getElementById(
                "userName"
            );

        const userEmail =
            document.getElementById(
                "userEmail"
            );

        const userPhoto =
            document.getElementById(
                "userPhoto"
            );

        const userInfo =
            document.getElementById(
                "userInfo"
            );


        if (userName && name) {

            userName.innerText =
                name;

        }


        if (userEmail && email) {

            userEmail.innerText =
                email;

        }


        if (userPhoto && photo) {

            userPhoto.src =
                photo;

        }


        if (
            userInfo &&
            (name || email || photo)
        ) {

            userInfo.style.display =
                "flex";

        }

    }
);
