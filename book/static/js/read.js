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
let time = getDateTime();
let params = new URLSearchParams(location.search);
let [id, sort] = [params.get('id'), params.get('sort')];
let sorts = Number.parseInt(sort);
const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/content/` + id + "/" + sort + "?t=" + Math.random(), true);
xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
if (sessionStorage.getItem("token") != null) {
    xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token"));
}
xmlHttpRequest.send();
xmlHttpRequest.onload = function () {
    let result = JSON.parse(xmlHttpRequest.response);
    if (result.code == 200) {
        let pcontent = document.getElementById("pcontent");
        let fiction_id = document.getElementById("fiction_id");
        let inputsort = document.getElementById("sort");
        let divchapterTitle = document.getElementById("divchapterTitle");
        let spancreateDate = document.getElementById("spancreateDate");
        let reader_lnkbtn = document.getElementById("reader_lnkbtn");
        let chap_btnbox_list = document.getElementById("chap_btnbox_list");

        let previous_page = document.getElementById("previous_page");
        let next_page = document.getElementById("next_page");
        pcontent.innerHTML = result.data.content;
        divchapterTitle.innerText = result.data.bookFictionLine.title;
        spancreateDate.innerText = result.data.lastUpdateDate;
        reader_lnkbtn.href = "./list.html?id=" + result.data.bookFictionLine.hid;
        chap_btnbox_list.href = "./list.html?id=" + result.data.bookFictionLine.hid;
        previous_page.href = "./read.html?id=" + id + "&sort=" + (sorts - 1);
        next_page.href = "./read.html?id=" + id + "&sort=" + (sorts + 1);
        fiction_id.value = id;
        inputsort.value = sort;
    }
}
document.onkeydown = function (e) {
    e = window.event || e;
    sorts = Number.parseInt(sorts);
    sort = sorts;
    switch (e.keyCode) {
        case 37: //左键
            if(sorts > 0){
                window.location.href = "./read.html?id=" + id + "&sort=" + (sorts - 1);
            }
            break;
        case 39: //右键
            window.location.href = "./read.html?id=" + id + "&sort=" + (sorts + 1);
            break;
        default:
            break;
    }
}

//监听页面的滚动
window.onscroll = function () {

    //scrollTop是滚动条滚动时，距离顶部的距离
    //为了保证兼容性，这里取两个值，哪个有值取哪一个
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    if (scrollHeight - (scrollTop + windowHeight) <= 1000) {
        //到了这个就可以进行业务逻辑加载后台数据了
        xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/content/` + id + "/" + (Number.parseInt(sort) + 1) + "?t=" + Math.random(), true);
        xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        if (sessionStorage.getItem("token") != null) {
            xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token"));
        }
        xmlHttpRequest.send();
        xmlHttpRequest.onload = function () {
            let result = JSON.parse(xmlHttpRequest.response);
            if (result.code == 200) {
                sort = Number.parseInt(sort) + 1;
                let rft_1 = document.getElementById("rft_1");
            
                let reader_box = document.createElement("div");
                reader_box.classList.add("reader_box");

                let divmarker = document.createElement("div");
                divmarker.classList.add("marker");

                reader_box.appendChild(divmarker);

                let divtitle = document.createElement("div");
                divtitle.classList.add("title");
                let diviconbox = document.createElement("div");
                diviconbox.classList.add("iconbox");
                let emiconbox = document.createElement("em");
                diviconbox.appendChild(emiconbox);

                let divtitle_txtbox = document.createElement("div");
                divtitle_txtbox.classList.add("title_txtbox");
                divtitle_txtbox.innerText = result.data.bookFictionLine.title;
                divtitle.appendChild(diviconbox);
                divtitle.appendChild(divtitle_txtbox);

                reader_box.appendChild(divtitle);

                let divbookinfo = document.createElement("div");
                divbookinfo.classList.add("bookinfo");
                divbookinfo.append("更新时间：");
                let spanbookinfo = document.createElement("span");
                spanbookinfo.innerText = result.data.lastUpdateDate;
                let abookinfo = document.createElement("a");
                abookinfo.classList.add("reader_lnkbtn");
                abookinfo.href = "./list.html?id=" + result.data.bookFictionLine.hid;
                abookinfo.innerText = "目录";
                divbookinfo.appendChild(spanbookinfo);
                divbookinfo.appendChild(abookinfo);
                
                reader_box.appendChild(divbookinfo);

                let divreader_line = document.createElement("div");
                divreader_line.classList.add("reader_line");

                reader_box.appendChild(divreader_line);

                let divcontent = document.createElement("div");
                divcontent.classList.add("content");
                divcontent.itemprop = "acticleBody";
                let pacticleBody = document.createElement("p");
                pacticleBody.innerHTML = result.data.content;
                divcontent.appendChild(pacticleBody);

                reader_box.appendChild(divcontent);

                rft_1.appendChild(reader_box);


                let fiction_id = document.getElementById("fiction_id");
                let inputsort = document.getElementById("sort");
                let reader_lnkbtn = document.getElementById("reader_lnkbtn");
                let chap_btnbox_list = document.getElementById("chap_btnbox_list");

                let previous_page = document.getElementById("previous_page");
                let next_page = document.getElementById("next_page");
                reader_lnkbtn.href = "./list.html?id=" + result.data.bookFictionLine.hid;
                chap_btnbox_list.href = "./list.html?id=" + result.data.bookFictionLine.hid;
                previous_page.href = "./read.html?id=" + id + "&sort=" + (sort - 1);
                next_page.href = "./read.html?id=" + id + "&sort=" + (sort + 1);
                fiction_id.value = id;
                inputsort.value = sort;
                sorts = sort;
            }
        }
    }
}