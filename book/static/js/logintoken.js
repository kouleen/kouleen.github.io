if (sessionStorage.getItem("token") != null) {
    let logouttoken = document.getElementById("logouttoken");
    let shelftoken = document.getElementById("shelftoken");
    logouttoken.style = "padding-left: 18px;";
    shelftoken.style = "";
} else {
    let signintoken = document.getElementById("signintoken");
    signintoken.style = "";
    let logintoken = document.getElementById("logintoken");
    logintoken.style = "";
}