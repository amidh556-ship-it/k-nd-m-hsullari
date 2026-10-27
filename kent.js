const wrapper = document.querySelector(".wrapper");
const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");

/* İDARƏÇİ */
const ADMIN_EMAIL = "amidh365@gmail.com";
const ADMIN_PASSWORD = "a1m2i3d42006";

/* OPERATOR HESABLARI */
const operators = {
    "ttik66006@gmail.com": "a1m2i3d42006",
    "ttiktok66006@gmail.com": "a1m2i3d42006",
    "amallizad72@gmail.com": "amal2005"
};

function accountKey(email) {
    return email.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
}

/* QEYDİYYAT / GİRİŞ KEÇİDİ */
if (loginHeader && wrapper) {
    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
    });
}

if (signupHeader && wrapper) {
    signupHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });
}

/* GİRİŞ MƏLUMATLARINI SAXLA */
function setLogin(email, name, isOperator, photo = "") {
    email = email.toLowerCase().trim();

    localStorage.setItem("login", "true");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name || "İstifadəçi");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("operator", isOperator ? "true" : "false");

    if (photo) {
        localStorage.setItem("userPhoto", photo);
    } else {
        localStorage.removeItem("userPhoto");
    }

    if (isOperator) {
        localStorage.setItem("operatorEmail", email);

        // DÜZƏLİŞ: Operator səhifəsinə birbaşa keçid
        window.location.href = "https://amidh556-ship-it.github.io/k-nd-m-hsullari/operator.html";
    } else {
        localStorage.removeItem("operatorEmail");

        window.location.href = "./index.html";
    }
}

/* QEYDİYYAT */
function qeydiyyat(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Bütün xanaları doldur.");
        return;
    }

    if (email === ADMIN_EMAIL || Object.hasOwn(operators, email)) {
        alert("Bu idarəçi və ya operator hesabıdır. Qeydiyyat etmə, giriş bölməsindən daxil ol.");
        return;
    }

    const key = accountKey(email);

    if (localStorage.getItem("account_" + key)) {
        alert("Bu Gmail artıq qeydiyyatdan keçib. Hesaba daxil ol.");
        return;
    }

    localStorage.setItem("account_" + key, JSON.stringify({
        name: name,
        email: email,
        password: password
    }));

    localStorage.setItem("cart_" + key, JSON.stringify([]));
    localStorage.setItem("orders_" + key, JSON.stringify([]));

    alert("Qeydiyyat uğurludur. İndi hesabına daxil ol.");
    document.querySelector(".login header")?.click();
}

/* EMAIL VƏ PAROL İLƏ GİRİŞ */
function login(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Email və parolu daxil et.");
        return;
    }

    /* İDARƏÇİ */
    if (email === ADMIN_EMAIL) {
        if (password !== ADMIN_PASSWORD) {
            alert("İdarəçi parolu səhvdir.");
            return;
        }

        localStorage.setItem("login", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", "İdarəçi");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("operator", "false");
        localStorage.removeItem("operatorEmail");

        window.location.href = "./admin.html";
        return;
    }

    /* OPERATOR HESABLARI */
    if (Object.prototype.hasOwnProperty.call(operators, email)) {
        if (password !== operators[email]) {
            alert("Operator parolu səhvdir.");
            return;
        }

        const name = email === "amallizad72@gmail.com"
            ? "Operator Amal"
            : "Operator";

        setLogin(email, name, true);
        return;
    }

    /* MÜŞTƏRİ GİRİŞİ */
    const key = accountKey(email);
    const saved = localStorage.getItem("account_" + key);

    if (!saved) {
        alert("Bu Gmail ilə əvvəlcə qeydiyyatdan keç.");
        return;
    }

    let account;

    try {
        account = JSON.parse(saved);
    } catch (error) {
        alert("Hesab məlumatında xəta var.");
        return;
    }

    if (
        account.email?.toLowerCase() !== email ||
        account.password !== password
    ) {
        alert("Email və ya parol səhvdir.");
        return;
    }

    setLogin(email, account.name || "Müştəri", false);
}

/* ÇIXIŞ */
function logout() {
    [
        "login",
        "isLoggedIn",
        "userName",
        "userEmail",
        "userPhoto",
        "operator",
        "operatorEmail"
    ].forEach(key => localStorage.removeItem(key));

    window.location.href = "./index.html";
}

/* GOOGLE İLƏ GİRİŞ */
function handleCredentialResponse(response) {
    try {
        if (typeof jwt_decode !== "function") {
            alert("Google giriş kitabxanası yüklənməyib. Səhifəni yenilə.");
            return;
        }

        const data = jwt_decode(response.credential);
        const email = (data.email || "").toLowerCase().trim();

        if (!email) {
            alert("Google hesabının emaili tapılmadı.");
            return;
        }

        /* İDARƏÇİ */
        if (email === ADMIN_EMAIL) {
            localStorage.setItem("login", "true");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userName", data.name || "İdarəçi");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("operator", "false");
            localStorage.removeItem("operatorEmail");

            window.location.href = "./admin.html";
            return;
        }

        /* OPERATOR */
        if (Object.prototype.hasOwnProperty.call(operators, email)) {
            const name = email === "amallizad72@gmail.com"
                ? "Operator Amal"
                : "Operator";

            setLogin(email, name, true, data.picture || "");
            return;
        }

        /* MÜŞTƏRİ */
        const key = accountKey(email);
        let saved = localStorage.getItem("account_" + key);

        if (!saved) {
            localStorage.setItem("account_" + key, JSON.stringify({
                name: data.name || "Müştəri",
                email: email,
                password: ""
            }));

            localStorage.setItem("cart_" + key, JSON.stringify([]));
            localStorage.setItem("orders_" + key, JSON.stringify([]));
        }

        localStorage.setItem("login", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.name || "Müştəri");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhoto", data.picture || "");
        localStorage.setItem("operator", "false");
        localStorage.removeItem("operatorEmail");

        window.location.href = "./index.html";

    } catch (error) {
        console.error("Google giriş xətası:", error);
        alert("Google ilə giriş alınmadı. Səhifəni yenilə.");
    }
}

/* HTML-DƏN ÇAĞIRILAN FUNKSİYALAR */
window.qeydiyyat = qeydiyyat;
window.login = login;
window.logout = logout;
window.handleCredentialResponse = handleCredentialResponse;
