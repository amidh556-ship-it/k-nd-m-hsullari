const wrapper = document.querySelector(".wrapper");

const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");


/* =========================
   HESAB AÇARI
========================= */

function accountKey(email) {

    return email
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "_");

}


/* =========================
   QEYDİYYAT / GİRİŞ KEÇİDİ
========================= */

if (loginHeader) {

    loginHeader.addEventListener("click", function () {

        wrapper.classList.add("active");

    });

}


if (signupHeader) {

    signupHeader.addEventListener("click", function () {

        wrapper.classList.remove("active");

    });

}


/* =========================
   QEYDİYYAT
========================= */

function qeydiyyat(e) {

    e.preventDefault();


    const name =
        document.getElementById("signupName")
        .value
        .trim();


    const email =
        document.getElementById("signupEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById("signupPassword")
        .value;


    if (!name || !email || !password) {

        alert("Bütün xanaları doldur");

        return;

    }


    const key =
        accountKey(email);


    /*
       BU HESAB ƏVVƏL VARMI?
    */

    const oldAccount =
        localStorage.getItem(
            "account_" + key
        );


    if (oldAccount) {

        alert(
            "Bu Gmail artıq qeydiyyatdan keçib. Hesaba giriş et."
        );

        return;

    }


    /*
       HESABI YARAT
    */

    const account = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(

        "account_" + key,

        JSON.stringify(account)

    );


    /*
       BU HESAB ÜÇÜN AYRI SƏBƏT
    */

    localStorage.setItem(

        "cart_" + key,

        JSON.stringify([])

    );


    /*
       BU HESAB ÜÇÜN AYRI SİFARİŞLƏR
    */

    localStorage.setItem(

        "orders_" + key,

        JSON.stringify([])

    );


    /*
       AKTİV HESAB
    */

    localStorage.setItem(
        "login",
        "true"
    );

    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "userEmail",
        email
    );


    /*
       OPERATOR
    */

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


    localStorage.setItem(
        "operator",
        "false"
    );


    window.location.href =
        "index.html";

}


/* =========================
   GİRİŞ
========================= */

function login(e) {

    e.preventDefault();


    const email =
        document.getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById("loginPassword")
        .value;


    if (!email || !password) {

        alert(
            "Email və şifrəni doldur"
        );

        return;

    }


    const key =
        accountKey(email);


    /*
       HESABI TAP
    */

    const saved =
        localStorage.getItem(
            "account_" + key
        );


    if (!saved) {

        alert(
            "Bu Gmail ilə əvvəlcə qeydiyyatdan keç."
        );

        return;

    }


    const account =
        JSON.parse(saved);


    /*
       PAROLU YOXLAYIRIQ
    */

    if (
        account.password !== password
    ) {

        alert(
            "Email və ya parol səhvdir."
        );

        return;

    }


    /*
       AKTİV HESAB
    */

    localStorage.setItem(
        "login",
        "true"
    );

    localStorage.setItem(
        "userName",
        account.name
    );

    localStorage.setItem(
        "userEmail",
        account.email
    );


    /*
       OPERATOR
    */

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


    localStorage.setItem(
        "operator",
        "false"
    );


    window.location.href =
        "index.html";

}


/* =========================
   ÇIXIŞ
========================= */

function logout() {

    /*
       HESABIN SƏBƏTİNƏ VƏ
       SİFARİŞLƏRİNƏ TOXUNMURUQ.
    */

    localStorage.removeItem(
        "login"
    );

    localStorage.removeItem(
        "userName"
    );

    localStorage.removeItem(
        "userEmail"
    );

    localStorage.removeItem(
        "userPhoto"
    );

    localStorage.removeItem(
        "operator"
    );


    window.location.href =
        "index.html";

}


/* =========================
   GOOGLE GİRİŞİ
========================= */

function handleCredentialResponse(response) {

    try {

        const data =
            jwt_decode(
                response.credential
            );


        const email =
            (data.email || "")
            .toLowerCase()
            .trim();


        if (!email) {

            alert(
                "Google hesabı tapılmadı."
            );

            return;

        }


        const key =
            accountKey(email);


        /*
           GOOGLE HESABI YOXDURSA
           YARADIRIQ
        */

        let saved =
            localStorage.getItem(
                "account_" + key
            );


        if (!saved) {

            const account = {

                name:
                    data.name || "",

                email:
                    email,

                password:
                    ""

            };


            localStorage.setItem(

                "account_" + key,

                JSON.stringify(account)

            );


            localStorage.setItem(

                "cart_" + key,

                JSON.stringify([])

            );


            localStorage.setItem(

                "orders_" + key,

                JSON.stringify([])

            );

        }


        /*
           AKTİV HESAB
        */

        localStorage.setItem(
            "login",
            "true"
        );

        localStorage.setItem(
            "userName",
            data.name || ""
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        localStorage.setItem(
            "userPhoto",
            data.picture || ""
        );

        localStorage.setItem(
            "operator",
            "false"
        );


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(error);

        alert(
            "Google ilə giriş alınmadı."
        );

    }

}


/* =========================
   FUNKSİYALARI HTML ÜÇÜN AÇ
========================= */

window.qeydiyyat =
    qeydiyyat;

window.login =
    login;

window.logout =
    logout;

window.handleCredentialResponse =
    handleCredentialResponse;
