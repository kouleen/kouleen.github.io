let presence1 = document.getElementById("presence1");
let addShelf = document.getElementById("add-shelf");
let readbook = document.getElementById("readbook");
let book_fiction_line = document.getElementById("book_fiction_line");
let id = location.search.replace(/[^\d]/g, "");
const xmlHttpRequest = new XMLHttpRequest();
let reload = function load() {
    if (sessionStorage.getItem("token") == null) {
        presence1.style = "display: none";
        addShelf.style = "";
        let signintoken = document.getElementById("signintoken");
        signintoken.style = "";
        let logintoken = document.getElementById("logintoken");
        logintoken.style = "";
        book_fiction_line.href = "./list.html?id=" + id;
        readbook.href = "./read.html?id=" + id + "&sort=" + 0;
        viewdetails();
    } else {
        let logouttoken = document.getElementById("logouttoken");
        let shelftoken = document.getElementById("shelftoken");
        logouttoken.style = "padding-left: 18px;";
        shelftoken.style = "";
        xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/shelf/` + id + "?t=" + Math.random(), true);
        xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token") == null ? "" : sessionStorage.getItem("token"));
        xmlHttpRequest.send();
        xmlHttpRequest.onload = function () {
            let result = JSON.parse(xmlHttpRequest.response);
            if (result.code == 200) {
                book_fiction_line.href = "./list.html?id=" + result.data.hid;
                readbook.href = "./read.html?id=" + result.data.hid + "&sort=" + result.data.sort;
                readbook.target = "_self";
                presence1.style = "";
                addShelf.style = "display: none";
            }else{
                book_fiction_line.href = "./list.html?id=" + id;
                readbook.href = "./read.html?id=" + id + "&sort=" + 0;
                readbook.target = "_self";
                presence1.style = "display: none";
                addShelf.style = "";
            }
            viewdetails();
        }
    }
}
let viewdetails = function viewdetail() {
    xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/add/view/` + id + "?t=" + Math.random(), true);
    xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
    xmlHttpRequest.send();
    xmlHttpRequest.onload = function () {
        let result = JSON.parse(xmlHttpRequest.response);
        if (result.code == 200) {
            xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/detail/` + id + "?t=" + Math.random(), true);
            xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*")
            xmlHttpRequest.send();
            xmlHttpRequest.onload = function () {
                let result = JSON.parse(xmlHttpRequest.response);
                if (result.code == 200) {
                    let bookimgsrcalt = document.getElementById("bookimgsrcalt");
                    let divfictionName = document.getElementById("divfictionName");
                    let atype = document.getElementById("atype");
                    let astate = document.getElementById("astate");
                    let inumber = document.getElementById("inumber");
                    let iviews = document.getElementById("iviews");
                    let pbrief = document.getElementById("pbrief");
                    let anewest = document.getElementById("anewest");
                    let aauthor = document.getElementById("aauthor");
                    bookimgsrcalt.src = result.data.imageUrl;
                    bookimgsrcalt.alt = result.data.fictionName;
                    divfictionName.innerText = result.data.fictionName;
                    astate.innerText = result.data.fictionState;
                    atype.innerText = result.data.fictionType;
                    inumber.innerText = result.data.wordCount == null ? "0" : result.data.wordCount;
                    iviews.innerText = result.data.views;
                    pbrief.innerHTML = result.data.fictionIntroduce;
                    anewest.innerText = result.data.newest;
                    aauthor.innerText = result.data.fictionAuthor;
                    addShelf.setAttribute("name", result.data.id);
                }
            }
        }
    }
}
const data = {
    id: id
}
reload();
addShelf.onclick = function () {
    xmlHttpRequest.open('post', `https://www.kouleen.cn/v2/book/fiction/add/shelf` + "?t=" + Math.random(), true);
    xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token") == null ? "" : sessionStorage.getItem("token"));
    xmlHttpRequest.send(JSON.stringify(data));
    xmlHttpRequest.onload = function () {
        let result = JSON.parse(xmlHttpRequest.response);
        if (result.code == 200) {
            window.location.href = result.data;
        }
    }
}