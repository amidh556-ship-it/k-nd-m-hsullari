
const wrapper = document.querySelector(".wrapper");

const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");

/* İDARƏÇİ */
const ADMIN_EMAIL = "amidh365@gmail.com";
const ADMIN_PASSWORD = "a1m2i3d42006";

/* OPERATOR HESABLARI */
const operators = {
    "ttiktok66006@gmail.com": "a1m2i3d42006",
    "amallizad72@gmail.com": "amal2005"
};

/* HESAB AÇARI */
function accountKey(email) {
    return email.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
}

/* QEYDİYYAT VƏ GİRİŞ KEÇİDİ */
if (loginHeader && wrapper) {
    loginHeader.addEventListener("click", function () {
        wrapper.classList.add("active");
    });
}

if (signupHeader && wrapper) {
    signupHeader.addEventListener("click", function () {
        wrapper.classList.remove("active");
    });
}

/* ÜMUMİ YÖNLƏNDİRMƏ */
function setLogin(email, name, isOperator, photo = "") {
    email = email.toLowerCase().trim();

    localStorage.setItem("login", "true");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name || "İstifadəçi");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("operator", isOperator ? "true" : "false");

    if (photo) {
        localStorage.setItem("userPhoto", photo);
    }

    if (isOperator) {
        localStorage.setItem("operatorEmail", email);
        window.location.replace("operator.html");
    } else {
        localStorage.removeItem("operatorEmail");
        window.location.replace("index.html");
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

    if (email === ADMIN_EMAIL) {
        alert("Bu idarəçi hesabıdır. Hesaba giriş bölməsindən daxil ol.");
        return;
    }

    if (operators[email]) {
        alert("Bu operator hesabıdır. Qeydiyyat yox, Hesaba daxil ol bölməsindən giriş et.");
        return;
    }

    const key = accountKey(email);
    const saved = localStorage.getItem("account_" + key);

    if (saved) {
        alert("Bu Gmail artıq qeydiyyatdan keçib. Hesaba giriş et.");
        return;
    }

    const account = { name, email, password };

    localStorage.setItem("account_" + key, JSON.stringify(account));
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
        localStorage.setItem("userEmail", ADMIN_EMAIL);
        localStorage.setItem("operator", "false");
        localStorage.removeItem("operatorEmail");
        window.location.replace("admin.html");
        return;
    }

    /* OPERATOR — HƏR İKİ HESAB */
    if (Object.prototype.hasOwnProperty.call(operators, email)) {
        if (password !== operators[email]) {
            alert("Operator parolu səhvdir.");
            return;
        }

        const key = accountKey(email);
        const operatorName = email === "amallizad72@gmail.com"
            ? "Operator Amal"
            : "Operator";

        const operatorAccount = {
            name: operatorName,
            email: email,
            password: operators[email]
        };

        localStorage.setItem("account_" + key, JSON.stringify(operatorAccount));
        setLogin(email, operatorName, true);
        return;
    }

    /* MÜŞTƏRİ */
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

    if (account.email?.toLowerCase() !== email || account.password !== password) {
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

    window.location.replace("index.html");
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
            localStorage.setItem("userPhoto", data.picture || "");
            localStorage.setItem("operator", "false");
            localStorage.removeItem("operatorEmail");
            window.location.replace("admin.html");
            return;
        }

        /* OPERATOR */
        if (Object.prototype.hasOwnProperty.call(operators, email)) {
            const key = accountKey(email);
            const operatorAccount = {
                name: data.name || "Operator",
                email: email,
                password: operators[email]
            };

            localStorage.setItem("account_" + key, JSON.stringify(operatorAccount));
            localStorage.setItem("login", "true");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userName", data.name || "Operator");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPhoto", data.picture || "");
            localStorage.setItem("operator", "true");
            localStorage.setItem("operatorEmail", email);
            window.location.replace("operator.html");
            return;
        }

        /* GOOGLE MÜŞTƏRİ */
        const key = accountKey(email);
        let saved = localStorage.getItem("account_" + key);

        if (!saved) {
            const account = {
                name: data.name || "Müştəri",
                email: email,
                password: ""
            };

            localStorage.setItem("account_" + key, JSON.stringify(account));
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
        window.location.replace("index.html");

    } catch (error) {
        console.error("Google giriş xətası:", error);
        alert("Google ilə giriş alınmadı. Səhifəni yenilə və yenidən yoxla.");
    }
}

/* HTML-DƏN ÇAĞIRILAN FUNKSİYALAR */
window.qeydiyyat = qeydiyyat;
window.login = login;
window.logout = logout;
window.handleCredentialResponse = handleCredentialResponse;
