function selected(viewType) {
    let viewType1 = document.getElementById("viewType1");
    let viewType2 = document.getElementById("viewType2");
    let c_digi = document.getElementById("c_digi");
    let l_list = document.getElementById("l_list");
    if (viewType == 1) {
        viewType1.style = "";
        c_digi.classList.add("active");
        viewType2.style = "display: none;";
        l_list.classList.remove("active");
    } else {
        viewType1.style = "display: none;";
        c_digi.classList.remove("active");
        viewType2.style = "";
        l_list.classList.add("active");
    }
}

function queryPageBook(queryParams){
    window.location.href = './index.html?' + queryParams
}

let params = new URLSearchParams(location.search);
let [current, size,fictionType,fictionState] = [params.get('current'), params.get('size'), params.get('fictionType'), params.get('fictionState')];
if (current == null) {
    current = 1;
}
if (size == null) {
    size = 20;
}
if (fictionType == null) {
    fictionType = '';
}
if (fictionState == null) {
    fictionState = '';
}
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/page?current=` + current + "&size=" + size + "&fictionType=" + fictionType + "&fictionState=" + fictionState);
xmlHttpRequest.send();
xmlHttpRequest.onload = function () {
    let result = JSON.parse(xmlHttpRequest.response);
    if (result.code == 200) {
        let handle = handleMainCon();
        handle(result);
        let store_collist = handlestore_collist();
        store_collist(result);
        let indexpage = document.getElementById("indexpage");
        indexpage.innerText = "共" + result.data.pages + "页，当前" + result.data.current + "页";
        let buttonindex1 = document.createElement("button");
        buttonindex1.innerText = "上一页";
        buttonindex1.id = "previndex";
        let selectindex = document.createElement("select");
        selectindex.name = "fruit";
        selectindex.onchange = function () {
            let selectindexsize = selectindex.selectedIndex;
            let optionsize = document.getElementsByTagName("option")[selectindexsize].value;
            window.location.href = "./index.html?current=" + 1 + "&size=" + optionsize;
        }
        let optionindex1 = document.createElement("option");
        optionindex1.value = "20";
        if (size == 20) {
            optionindex1.selected = "true";
        }
        optionindex1.innerText = "20";
        let optionindex2 = document.createElement("option");
        optionindex2.value = "50";
        if (size == 50) {
            optionindex2.selected = "true";
        }
        optionindex2.innerText = "50";
        let optionindex3 = document.createElement("option");
        optionindex3.value = "100";
        if (size == 100) {
            optionindex3.selected = "true";
        }
        optionindex3.innerText = "100";
        let optionindex4 = document.createElement("option");
        optionindex4.value = "200";
        if (size == 200) {
            optionindex4.selected = "true";
        }
        optionindex4.innerText = "200";


        selectindex.appendChild(optionindex1);
        selectindex.appendChild(optionindex2);
        selectindex.appendChild(optionindex3);
        selectindex.appendChild(optionindex4);

        if (result.data.current == 1) {
            buttonindex1.disabled = "true";
        } else {
            buttonindex1.onclick = function () {
                let selectindexsize = selectindex.selectedIndex;
                let optionsize = document.getElementsByTagName("option")[selectindexsize].value;
                if (optionsize != size) {
                    current = 1;
                }
                window.location.href = "./index.html?current=" + (Number.parseInt(current) - 1) + "&size=" + optionsize;
            }
        }
        let buttonindex2 = document.createElement("button");
        buttonindex2.innerText = "下一页";
        buttonindex2.id = "nextindex";
        if (result.data.current == result.data.pages) {
            buttonindex2.disabled = "true";
        } else {
            buttonindex2.onclick = function () {
                let selectindexsize = selectindex.selectedIndex;
                let optionsize = document.getElementsByTagName("option")[selectindexsize].value;
                if (optionsize != size) {
                    current = 1;
                }
                window.location.href = "./index.html?current=" + (Number.parseInt(current) + 1) + "&size=" + optionsize;
            }
        }
        indexpage.appendChild(buttonindex1);
        indexpage.appendChild(selectindex);
        indexpage.appendChild(buttonindex2);

    }
}


function handleMainCon() {
    function mainCon(result) {
        let mainCon = document.getElementById("main_con");
        result.data.records.forEach(bookFictionHeader => {
            let li = document.createElement("li")

            let spankind = document.createElement("span");
            spankind.classList.add("kind");
            let akind = document.createElement("a");
            akind.innerText = "[" + bookFictionHeader.fictionType + "]";
            spankind.appendChild(akind);

            let spanbookname = document.createElement("span");
            spanbookname.classList.add("bookname");
            let abookname = document.createElement("a");
            // 跳转网页
            abookname.href = "./chapter/info.html?id=" + bookFictionHeader.id;
            abookname.innerText = bookFictionHeader.fictionName;
            spanbookname.appendChild(abookname);

            let spanchap = document.createElement("span");
            spanchap.classList.add("chap");
            let achap = document.createElement("a");
            achap.innerText = bookFictionHeader.newest;
            spanchap.appendChild(achap);

            let spanstatus = document.createElement("span");
            spanstatus.classList.add("status");
            spanstatus.innerText = bookFictionHeader.fictionState;

            let spannumber = document.createElement("span");
            spannumber.classList.add("count");
            spannumber.innerText = bookFictionHeader.number == null ? "未知" : bookFictionHeader.number;


            let spanauthor = document.createElement("span");
            spanauthor.classList.add("author");
            let aauthor = document.createElement("a");
            aauthor.href = "https://baike.baidu.com/item/" + bookFictionHeader.fictionAuthor;
            aauthor.innerText = bookFictionHeader.fictionAuthor;
            spanauthor.appendChild(aauthor);

            let spantime = document.createElement("span");
            spantime.classList.add("time");
            let time = getDateTime();
            spantime.innerText = time(bookFictionHeader.lastUpdateDate);

            li.appendChild(spankind);
            li.appendChild(spanbookname);
            li.appendChild(spanchap);
            li.appendChild(spanstatus);
            li.appendChild(spannumber);
            li.appendChild(spanauthor);
            li.appendChild(spantime);
            mainCon.appendChild(li);
        });
    }
    return mainCon;
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

function handlestore_collist() {
    function store_collist(result) {
        let viewType1 = document.getElementById("viewType1");
        result.data.records.forEach(bookFictionHeader => {
            let divbookboxFl = document.createElement("div");
            divbookboxFl.classList.add("bookbox");
            if (result.data.total == 0) {
                divbookboxFl.classList.add("fr");
            } else {
                divbookboxFl.classList.add("fl");
            }
            let divdotline = document.createElement("div");
            if (result.data.total == 0) {
                divdotline.classList.add("dotline");
            }

            let divbookimg = document.createElement("div");
            divbookimg.classList.add("bookimg");
            let abookimg = document.createElement("a");
            // 小说章节界面链接
            abookimg.href = "./chapter/info.html?id=" + bookFictionHeader.id;
            let imgbookimg = document.createElement("img");
            imgbookimg.src = bookFictionHeader.imageUrl;
            imgbookimg.alt = bookFictionHeader.fictionName;
            abookimg.appendChild(imgbookimg);
            divbookimg.appendChild(abookimg);


            let divbookinfo = document.createElement("div");
            divbookinfo.classList.add("bookinfo");

            let divbookname = document.createElement("div");
            divbookname.classList.add("bookname");
            let abookname = document.createElement("a");
            // 小说章节界面链接
            abookname.href = "./chapter/info.html?id=" + bookFictionHeader.id;
            abookname.innerText = bookFictionHeader.fictionName;
            divbookname.appendChild(abookname);


            let divbookilnk = document.createElement("div");
            divbookilnk.classList.add("bookilnk");
            let aauthor = document.createElement("a");
            aauthor.innerText = bookFictionHeader.fictionAuthor;
            let atype = document.createElement("a");
            atype.innerText = bookFictionHeader.fictionType;
            let spanstate = document.createElement("span");
            spanstate.innerText = bookFictionHeader.fictionState;
            let spanTime = document.createElement("span");
            let time = getDateTime();
            spanTime.innerText = time(bookFictionHeader.lastUpdateDate);
            divbookilnk.appendChild(aauthor);
            divbookilnk.append("|");
            divbookilnk.appendChild(atype);
            divbookilnk.append("|");
            divbookilnk.appendChild(spanstate);
            divbookilnk.append("|");
            divbookilnk.appendChild(spanTime);

            let divbookintro = document.createElement("div");
            divbookintro.className = "bookintro";
            divbookintro.innerHTML = bookFictionHeader.fictionIntroduce;

            let divbookupdate = document.createElement("div");
            divbookupdate.className = "bookupdate";
            divbookupdate.innerText = bookFictionHeader.newest;

            divbookinfo.appendChild(divbookname);
            divbookinfo.appendChild(divbookilnk);
            divbookinfo.appendChild(divbookintro);
            divbookinfo.appendChild(divbookupdate);

            // 封面
            divbookboxFl.appendChild(divbookimg);
            // 详情
            divbookboxFl.appendChild(divbookinfo);
            // viewType1.appendChild(divdotline);
            viewType1.appendChild(divbookboxFl);
        });
    }
    return store_collist;
}