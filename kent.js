const wrapper = document.querySelector(".wrapper");

const signupHeader =
    document.querySelector(".signup header");

const loginHeader =
    document.querySelector(".login header");


// QEYDİYYAT / GİRİŞ KEÇİDİ

loginHeader.addEventListener("click", () => {
    wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
    wrapper.classList.remove("active");
});


// ===============================
// HESABA DAXİL OL
// ===============================

function login(e) {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail")
        .value
        .trim();

    const password =
        document.getElementById("loginPassword")
        .value;


    if (email === "" || password === "") {

        alert("Email və şifrəni doldur.");

        return;
    }


    // ===============================
    // OPERATOR
    // ===============================

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem(
            "login",
            "true"
        );

        localStorage.setItem(
            "operator",
            "true"
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        window.location.href =
            "operator.html";

        return;
    }


    // ===============================
    // QEYDİYYAT YOXLANIŞI
    // ===============================

    const registeredEmail =
        localStorage.getItem("registeredEmail");

    const registeredPassword =
        localStorage.getItem("registeredPassword");

    const registeredName =
        localStorage.getItem("registeredName");


    // QEYDİYYATDAN KEÇMƏYİB

    if (
        registeredEmail === null ||
        registeredPassword === null
    ) {

        alert(
            "❌ Bu hesab qeydiyyatdan keçməyib. Əvvəlcə Qeydiyyatdan keç."
        );

        return;
    }


    // GMAIL DÜZGÜN DEYİL

    if (
        email !== registeredEmail
    ) {

        alert(
            "❌ Bu Gmail ilə qeydiyyat yoxdur."
        );

        return;
    }


    // PAROL DÜZGÜN DEYİL

    if (
        password !== registeredPassword
    ) {

        alert(
            "❌ Parol səhvdir."
        );

        return;
    }


    // ===============================
    // GİRİŞ UĞURLUDUR
    // ===============================

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
        registeredName
    );

    localStorage.setItem(
        "userEmail",
        registeredEmail
    );


    window.location.href =
        "index.html";
}



// ===============================
// QEYDİYYATDAN KEÇ
// ===============================

function qeydiyyat(e) {

    e.preventDefault();


    const name =
        document.getElementById("signupName")
        .value
        .trim();

    const email =
        document.getElementById("signupEmail")
        .value
        .trim();

    const password =
        document.getElementById("signupPassword")
        .value;


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        alert(
            "Bütün xanaları doldur."
        );

        return;
    }


    // ===============================
    // OPERATOR
    // ===============================

    if (
        email === "ttik66006@gmail.com" &&
        password === "a1m2i3d42006"
    ) {

        localStorage.setItem(
            "login",
            "true"
        );

        localStorage.setItem(
            "operator",
            "true"
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        window.location.href =
            "operator.html";

        return;
    }


    // ===============================
    // HESAB ARTİQ VAR?
    // ===============================

    const oldEmail =
        localStorage.getItem(
            "registeredEmail"
        );


    if (
        oldEmail &&
        oldEmail === email
    ) {

        alert(
            "❌ Bu Gmail artıq qeydiyyatdan keçib."
        );

        return;
    }


    // ===============================
    // QEYDİYYATI YADDA SAXLA
    // ===============================

    localStorage.setItem(
        "registeredName",
        name
    );

    localStorage.setItem(
        "registeredEmail",
        email
    );

    localStorage.setItem(
        "registeredPassword",
        password
    );


    // AVTOMATİK GİRİŞ ETMİRİK

    localStorage.setItem(
        "login",
        "false"
    );

    localStorage.setItem(
        "operator",
        "false"
    );


    alert(
        "✅ Qeydiyyat tamamlandı! İndi Hesaba daxil ol bölməsindən Gmail və parolunla giriş et."
    );


    // GİRİŞ FORMUNA KEÇ

    wrapper.classList.add("active");

}



// ===============================
// GOOGLE İLƏ GİRİŞ
// ===============================

function handleCredentialResponse(response) {

    try {

        const data =
            jwt_decode(response.credential);


        /*
           GOOGLE HESABI İLƏ DƏ
           ƏVVƏLCƏ QEYDİYYAT YOXLANIR
        */

        const registeredEmail =
            localStorage.getItem(
                "registeredEmail"
            );


        // QEYDİYYAT YOXDUR

        if (
            !registeredEmail ||
            registeredEmail !== data.email
        ) {

            alert(
                "❌ Bu Gmail ilə əvvəlcə qeydiyyatdan keçməlisən."
            );

            return;
        }


        // GOOGLE HESABI QEYDİYYATDADIR

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


        window.location.href =
            "index.html";


    } catch (error) {

        console.error(error);

        alert(
            "Google ilə giriş alınmadı."
        );

    }

}
