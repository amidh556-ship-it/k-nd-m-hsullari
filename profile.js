function showPage(page){

document.querySelectorAll(".page").forEach(function(el){
el.classList.remove("active");
});

document.getElementById(page).classList.add("active");

}

window.onload = function(){

let page = window.location.hash.replace("#","");

if(page){
showPage(page);
}

}