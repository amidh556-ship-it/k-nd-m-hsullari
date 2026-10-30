const wrapper = document.querySelector(".wrapper");
const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");

/* FIREBASE */
let auth;
let db;
let firebaseHazir = false;

const firebaseHazirOl = (async function () {
    try {
        const { initializeApp, getApps } =
            await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");

        const {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            updateProfile,
            sendPasswordResetEmail
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");

        const {
            getDatabase,
            ref,
            set
        } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");

        const config = {
            apiKey: "AIzaSyBDKe-57avB_Oajvq7PemHcl4LIxIv0ziY",
            authDomain: "kendmehsullari-6a53d.firebaseapp.com",
            databaseURL: "https://kendmehsullari-6a53d-default-rtdb.firebaseio.com",
            projectId: "kendmehsullari-6a53d",
            storageBucket: "kendmehsullari-6a53d.firebasestorage.app",
            messagingSenderId: "551607499773",
            appId: "1:551607499773:web:a84aa63dc5b55c38687794"
        };

        const app = getApps().length
            ? getApps()[0]
            : initializeApp(config);

        auth = getAuth(app);
        db = getDatabase(app);
        firebaseHazir = true;

        return {
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            updateProfile,
            sendPasswordResetEmail,
            ref,
            set
        };

    } catch (error) {
        console.error("Firebase xətası:", error);
        throw error;
    }
})();

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
        window.location.href = "https://amidh556-ship-it.github.io/k-nd-m-hsullari/operator.html";
    } else {
        localStorage.removeItem("operatorEmail");
        window.location.href = "./index.html";
    }
}

/* QEYDİYYAT */
async function qeydiyyat(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Bütün xanaları doldur.");
        return;
    }

    if (password.length < 6) {
        alert("Parol ən azı 6 simvol olmalıdır.");
        return;
    }

    try {
        const f = await firebaseHazirOl;

        const result = await f.createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await f.updateProfile(result.user, {
            displayName: name
        });

        await f.set(
            f.ref(db, "users/" + result.user.uid),
            {
                name: name,
                email: email,
                createdAt: Date.now()
            }
        );

        setLogin(email, name, false);

    } catch (error) {
        console.error(error);

        if (error.code === "auth/email-already-in-use") {
            alert("Bu Gmail artıq qeydiyyatdan keçib.");
        } else if (error.code === "auth/weak-password") {
            alert("Parol ən azı 6 simvol olmalıdır.");
        } else {
            alert("Qeydiyyat xətası: " + error.message);
        }
    }
}

/* İDARƏÇİ VƏ OPERATOR HESABLARI */
const ADMIN_EMAIL = "amidh365@gmail.com";
const operators = {
    "ttik66006@gmail.com": "a1m2i3d42006",
    "ttiktok66006@gmail.com": "a1m2i3d42006",
    "amallizad72@gmail.com": "amal2005"
};

/* EMAIL VƏ PAROL İLƏ GİRİŞ */
async function login(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Email və parolu daxil et.");
        return;
    }

    /* İDARƏÇİ */
    if (email === ADMIN_EMAIL) {
        alert("İdarəçi hesabı hələ köhnə giriş sistemindədir. Köhnə giriş məlumatlarını təhlükəsizləşdirməliyik.");
        return;
    }

    /* OPERATOR */
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

    /* MÜŞTƏRİ */
    try {
        const f = await firebaseHazirOl;

        const result = await f.signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = result.user;

        localStorage.setItem("login", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.displayName || "Müştəri");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("operator", "false");

        window.location.href = "./index.html";

    } catch (error) {
        console.error(error);
        alert("Email və ya parol səhvdir, yaxud Firebase hesabı yoxdur.");
    }
}

/* PAROLU UNUTDUM */
async function forgotPassword() {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();

    if (!email) {
        alert("Əvvəlcə emailini yaz.");
        return;
    }

    try {
        const f = await firebaseHazirOl;
        await f.sendPasswordResetEmail(auth, email);
        alert("Parolun bərpası üçün email göndərildi.");
    } catch (error) {
        alert("Email göndərilmədi: " + error.message);
    }
}

/* ÇIXIŞ */
async function logout() {
    try {
        const { signOut } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
        );

        if (auth) await signOut(auth);
    } catch (error) {
        console.error(error);
    }

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

/* GOOGLE GİRİŞİ — HƏLƏ KÖHNƏ SİSTEM */
function handleCredentialResponse(response) {
    alert("Google girişi hələ əvvəlki sistemdədir. Onu da Firebase-ə ayrıca keçirəcəyik.");
}

/* HTML-DƏN ÇAĞIRILAN FUNKSİYALAR */
window.qeydiyyat = qeydiyyat;
window.login = login;
window.logout = logout;
window.forgotPassword = forgotPassword;
window.handleCredentialResponse = handleCredentialResponse;
