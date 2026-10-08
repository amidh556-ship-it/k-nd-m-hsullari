const wrapper = document.querySelector(".wrapper");

const signupHeader =
    document.querySelector(".signup header");

const loginHeader =
    document.querySelector(".login header");


/* =========================
   İDARƏÇİ
========================= */

const ADMIN_EMAIL =
    "amidh365@gmail.com";

const ADMIN_PASSWORD =
    "a1m2i3d42006";


/* =========================
   OPERATOR HESABLARI
========================= */

const operators = {

    "ttiktok66006@gmail.com":
        "a1m2i3d42006",

    "amallizad72@gmail.com":
        "amal2005"

};


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

    loginHeader.addEventListener(
        "click",
        function () {

            wrapper.classList.add("active");

        }
    );

}


if (signupHeader) {

    signupHeader.addEventListener(
        "click",
        function () {

            wrapper.classList.remove("active");

        }
    );

}


/* =========================
   QEYDİYYAT
========================= */

function qeydiyyat(e) {

    e.preventDefault();

    const name =
        document.getElementById("signupName")
        .value.trim();

    const email =
        document.getElementById("signupEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword")
        .value;


    if (!name || !email || !password) {

        alert("Bütün xanaları doldur.");

        return;

    }


    /* İDARƏÇİ */

    if (email === ADMIN_EMAIL) {

        alert(
            "Bu idarəçi hesabıdır. Giriş bölməsindən daxil ol."
        );

        return;

    }


    /* OPERATOR */

    if (
        operators[email] &&
        operators[email] === password
    ) {

        const key =
            accountKey(email);


        const operatorAccount = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "account_" + key,
            JSON.stringify(operatorAccount)
        );


        localStorage.setItem(
            "cart_" + key,
            JSON.stringify([])
        );


        localStorage.setItem(
            "orders_" + key,
            JSON.stringify([])
        );


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


        localStorage.setItem(
            "operator",
            "true"
        );


        localStorage.setItem(
            "operatorEmail",
            email
        );


        window.location.href =
            "operator.html";

        return;

    }


    /* MÜŞTƏRİ */

    const key =
        accountKey(email);


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


    const account = {

        name: name,

        email: email,

        password: password

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


    localStorage.setItem(
        "operator",
        "false"
    );


    localStorage.removeItem(
        "operatorEmail"
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
            "Email və şifrəni doldur."
        );

        return;

    }


    /* =========================
       İDARƏÇİ
    ========================= */

    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem(
            "login",
            "true"
        );


        localStorage.setItem(
            "userName",
            "İdarəçi"
        );


        localStorage.setItem(
            "userEmail",
            ADMIN_EMAIL
        );


        localStorage.setItem(
            "operator",
            "false"
        );


        localStorage.removeItem(
            "operatorEmail"
        );


        window.location.href =
            "admin.html";

        return;

    }


    /* =========================
       TTIKTOK OPERATOR
    ========================= */

    if (
        email === "ttiktok66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        const key =
            accountKey(email);


        const operatorAccount = {

            name: "Operator",

            email: "ttiktok66006@gmail.com",

            password: "a1m2i3d42006"

        };


        localStorage.setItem(
            "account_" + key,
            JSON.stringify(operatorAccount)
        );


        localStorage.setItem(
            "login",
            "true"
        );


        localStorage.setItem(
            "userName",
            "Operator"
        );


        localStorage.setItem(
            "userEmail",
            "ttiktok66006@gmail.com"
        );


        localStorage.setItem(
            "operator",
            "true"
        );


        localStorage.setItem(
            "operatorEmail",
            "ttiktok66006@gmail.com"
        );


        window.location.href =
            "operator.html";

        return;

    }


    /* =========================
       AMALLIZAD OPERATOR
    ========================= */

    if (
        email === "amallizad72@gmail.com" &&
        password === "amal2005"
    ) {

        const key =
            accountKey(email);


        const operatorAccount = {

            name: "Operator",

            email: "amallizad72@gmail.com",

            password: "amal2005"

        };


        localStorage.setItem(
            "account_" + key,
            JSON.stringify(operatorAccount)
        );


        localStorage.setItem(
            "login",
            "true"
        );


        localStorage.setItem(
            "userName",
            "Operator"
        );


        localStorage.setItem(
            "userEmail",
            "amallizad72@gmail.com"
        );


        localStorage.setItem(
            "operator",
            "true"
        );


        localStorage.setItem(
            "operatorEmail",
            "amallizad72@gmail.com"
        );


        window.location.href =
            "operator.html";

        return;

    }


    /* =========================
       OPERATOR EMAIL, SƏHV PAROL
    ========================= */

    if (operators[email]) {

        alert(
            "Operator parolu səhvdir."
        );

        return;

    }


    /* =========================
       MÜŞTƏRİ GİRİŞİ
    ========================= */

    const key =
        accountKey(email);


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


    let account;

    try {

        account =
            JSON.parse(saved);

    } catch (error) {

        alert(
            "Hesab məlumatında xəta var."
        );

        return;

    }


    if (
        account.password !== password
    ) {

        alert(
            "Email və ya parol səhvdir."
        );

        return;

    }


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


    localStorage.setItem(
        "operator",
        "false"
    );


    localStorage.removeItem(
        "operatorEmail"
    );


    window.location.href =
        "index.html";

}


/* =========================
   ÇIXIŞ
========================= */

function logout() {

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

    localStorage.removeItem(
        "operatorEmail"
    );


    window.location.href =
        "index.html";

}


/* =========================
   GOOGLE GİRİŞİ
========================= */

function handleCredentialResponse(
    response
) {

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


        /* GOOGLE İDARƏÇİ */

        if (
            email === ADMIN_EMAIL
        ) {

            localStorage.setItem(
                "login",
                "true"
            );


            localStorage.setItem(
                "userName",
                data.name ||
                "İdarəçi"
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


            localStorage.removeItem(
                "operatorEmail"
            );


            window.location.href =
                "admin.html";

            return;

        }


        /* GOOGLE OPERATOR */

        if (
            operators[email]
        ) {

            let saved =
                localStorage.getItem(
                    "account_" + key
                );


            if (!saved) {

                const operatorAccount = {

                    name:
                        data.name ||
                        "Operator",

                    email:
                        email,

                    password:
                        operators[email]

                };


                localStorage.setItem(
                    "account_" + key,
                    JSON.stringify(
                        operatorAccount
                    )
                );

            }


            localStorage.setItem(
                "login",
                "true"
            );


            localStorage.setItem(
                "userName",
                data.name ||
                "Operator"
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
                "true"
            );


            localStorage.setItem(
                "operatorEmail",
                email
            );


            window.location.href =
                "operator.html";

            return;

        }


        /* GOOGLE MÜŞTƏRİ */

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

                password: ""

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


        localStorage.removeItem(
            "operatorEmail"
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
   HTML ÜÇÜN AÇ
========================= */

window.qeydiyyat =
    qeydiyyat;

window.login =
    login;

window.logout =
    logout;

window.handleCredentialResponse =
    handleCredentialResponse;
