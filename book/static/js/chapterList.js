if (sessionStorage.getItem("token") == null) {
    let signintoken = document.getElementById("signintoken");
    signintoken.style = "";
    let logintoken = document.getElementById("logintoken");
    logintoken.style = "";
} else {
    let logouttoken = document.getElementById("logouttoken");
    let shelftoken = document.getElementById("shelftoken");
    logouttoken.style = "padding-left: 18px;";
    shelftoken.style = "";
}
let time = getDateTime();
let id = location.search.replace(/[^\d]/g, "");
const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/list/` + id + "?t=" + Math.random(), true);
xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
xmlHttpRequest.send();
xmlHttpRequest.onload = function () {
    let result = JSON.parse(xmlHttpRequest.response);
    if (result.code == 200) {
        let h1fictionName = document.getElementById("h1fictionName");
        let aauthor = document.getElementById("aauthor");
        let iTime = document.getElementById("iTime");
        let inewest = document.getElementById("inewest");
        let emsize = document.getElementById("emsize");
        let ulList = document.getElementById("ulList");
        emsize.innerText = "共" + result.data.length + "章";
        result.data.forEach(bookFictionLine => {
            h1fictionName.innerText = bookFictionLine.bookFictionHeader.fictionName;
            aauthor.innerText = bookFictionLine.bookFictionHeader.fictionAuthor;
            iTime.innerText = "更新时间：" + time(bookFictionLine.bookFictionHeader.lastUpdateDate);
            inewest.innerText = "最新章节：" + bookFictionLine.bookFictionHeader.newest;

            let liList = document.createElement("li");
            liList.classList.add("col-4")
            let achapterTitle = document.createElement("a")
            achapterTitle.innerText = bookFictionLine.title;
            achapterTitle.href = "./read.html?id=" + bookFictionLine.hid + "&sort=" + bookFictionLine.sort;
            liList.appendChild(achapterTitle);
            ulList.appendChild(liList);
        });
    }
}

function getDateTime() {
    function time(time) {
        let date = new Date(time);
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let dates = date.getDate();
        if (dates < 10) dates = "0" + dates;
        let hours = date.getHours();
        if (hours < 10) hours = "0" + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        return month + "-" + dates + " " + hours + ":" + minutes;
    }
    return time;
}