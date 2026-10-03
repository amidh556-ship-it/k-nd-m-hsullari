function showPage(page){

    document.querySelectorAll(".page").forEach(function(el){
        el.classList.remove("active");
    });

    const selected = document.getElementById(page);

    if(selected){
        selected.classList.add("active");
    }

    /* Tarixçə açılıbsa yüklə */
    if(page === "history"){
        loadHistory();
    }

}


/* =========================
   TARİXÇƏ
========================= */

function loadHistory(){

    const list =
        document.getElementById("historyList");

    if(!list) return;


    const email =
        localStorage.getItem("userEmail");


    if(!email){

        list.innerHTML =
            "<p>Hesabına daxil olmalısan.</p>";

        return;

    }


    const key =
        email
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "_");


    let history = [];

    try{

        history =
            JSON.parse(
                localStorage.getItem(
                    "history_" + key
                )
            ) || [];

    }catch(error){

        history = [];

    }


    if(history.length === 0){

        list.innerHTML =
            "<p>Hələ tarixçə yoxdur.</p>";

        return;

    }


    list.innerHTML = "";


    history.forEach(function(item){

        const div =
            document.createElement("div");

        div.style.background = "#fff";
        div.style.padding = "10px";
        div.style.marginBottom = "8px";
        div.style.borderRadius = "10px";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "10px";
        div.style.cursor = "pointer";


        div.innerHTML = `

            <img
                src="${item.image || ""}"
                style="
                    width:70px;
                    height:70px;
                    object-fit:contain;
                    border-radius:8px;
                "
            >

            <div>

                <b>${item.name || "Məhsul"}</b>

                <br>

                <span>
                    ${item.price || ""} AZN
                </span>

            </div>

        `;


        div.onclick = function(){

            if(item.productId){

                window.location.href =
                    "al.html?id=" +
                    item.productId;

            }

        };


        list.appendChild(div);

    });

}


/* =========================
   SƏHİFƏ AÇILANDA
========================= */

window.onload = function(){

    let page =
        window.location.hash.replace("#","");


    if(page){

        showPage(page);

    }

};
