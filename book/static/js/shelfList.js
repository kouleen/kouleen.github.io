let loads = reload();
loads();
function reload() {
    function load() {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/list/shelf` + "?t=" + Math.random(), true);
        xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token"));
        xmlHttpRequest.send();
        xmlHttpRequest.onload = function () {
            let result = JSON.parse(xmlHttpRequest.response);
            if (result.code == 200) {
                let no_books_available = document.getElementById("no_books_available");
                if (result.data.length == 0) {
                    no_books_available.style = "text-align: center";
                    no_books_available.innerText = "暂无书籍";
                } else {
                    let bookFictionShelfList = document.getElementById("bookFictionShelfList");
                    result.data.forEach(bookFictionShelf => {
                        let divbookbox = document.createElement("div");
                        divbookbox.classList.add("bookbox");
                        if (result.data.length == 0) {
                            divbookbox.classList.add("fr");
                        } else {
                            divbookbox.classList.add("fl");
                        }

                        let divbookimg = document.createElement("div");
                        divbookimg.classList.add("bookimg");

                        let abookimg = document.createElement("a");
                        abookimg.href = "../chapter/info.html?id=" + bookFictionShelf.hid;

                        let imgbookimg = document.createElement("img");
                        imgbookimg.src = bookFictionShelf.bookFictionHeader.imageUrl;
                        imgbookimg.alt = bookFictionShelf.bookFictionHeader.fictionName;
                        abookimg.appendChild(imgbookimg);
                        divbookimg.appendChild(abookimg);

                        let divbookinfo = document.createElement("div");
                        divbookinfo.classList.add("bookinfo");

                        let divbookname = document.createElement("div");
                        divbookname.classList.add("bookname");

                        let abookname = document.createElement("a");
                        abookname.href = "../chapter/info.html?id=" + bookFictionShelf.hid;
                        abookname.innerText = bookFictionShelf.bookFictionHeader.fictionName;
                        divbookname.appendChild(abookname);

                        let divbookilnk = document.createElement("div");
                        divbookilnk.classList.add("bookilnk");
                        let abookilnk1 = document.createElement("a");
                        abookilnk1.innerText = bookFictionShelf.bookFictionHeader.fictionAuthor;
                        let abookilnk2 = document.createElement("a");
                        abookilnk2.innerText = bookFictionShelf.bookFictionHeader.fictionType;
                        let spanbookilnk1 = document.createElement("span");
                        spanbookilnk1.innerHTML = bookFictionShelf.bookFictionHeader.fictionState + "&nbsp;|&nbsp;";
                        let spanbookilnk2 = document.createElement("span");
                        spanbookilnk2.innerHTML = "更新时间&nbsp;&nbsp;" + bookFictionShelf.bookFictionHeader.lastUpdateDate;
                        divbookilnk.appendChild(abookilnk1);
                        divbookilnk.appendChild(abookilnk2);
                        divbookilnk.appendChild(spanbookilnk1);
                        divbookilnk.appendChild(spanbookilnk2);

                        let divbookintro = document.createElement("div");
                        divbookintro.classList.add("bookintro");
                        divbookintro.innerHTML = bookFictionShelf.bookFictionHeader.fictionIntroduce;

                        let divbookupdate = document.createElement("div");
                        divbookupdate.classList.add("bookupdate");
                        let abookupdate1 = document.createElement("a");
                        abookupdate1.classList.add("fl");
                        abookupdate1.innerText = bookFictionShelf.bookFictionHeader.newest;
                        let spanbookupdate = document.createElement("span");
                        spanbookupdate.classList.add("rank_d_b_time");
                        let abookupdate2 = document.createElement("a");
                        abookupdate2.href = "../chapter/read.html?id=" + bookFictionShelf.hid + "&sort=" + bookFictionShelf.sort;
                        let buttonbookupdate = document.createElement("button");
                        buttonbookupdate.classList.add("layui-btn");
                        buttonbookupdate.classList.add("layui-btn-xs");
                        buttonbookupdate.type = "button";
                        buttonbookupdate.innerText = "继续阅读";
                        abookupdate2.appendChild(buttonbookupdate);
                        let buttonbookupdate1 = document.createElement("button");
                        buttonbookupdate1.classList.add("layui-btn");
                        buttonbookupdate1.classList.add("layui-btn-xs");
                        buttonbookupdate1.classList.add("layui-btn-danger");
                        buttonbookupdate1.type = "button";
                        buttonbookupdate1.innerText = "移出书架";
                        buttonbookupdate1.onclick = function deleteShelfs() {
                            console.log(bookFictionShelf.id);
                            xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/delete/shelf/` + bookFictionShelf.hid + "?t=" + Math.random(), true);
                            xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
                            xmlHttpRequest.setRequestHeader("token", sessionStorage.getItem("token"));
                            xmlHttpRequest.send();
                            xmlHttpRequest.onload = function () {
                                let result = JSON.parse(xmlHttpRequest.response);
                                if (result.code == 200) {
                                    window.location.href = "shelf.html";
                                }
                            }
                        };
                        let divdotline = document.createElement("div");
                        if (result.data.length == 0) {
                            divdotline.classList.add("dotline");
                        }

                        divbookupdate.appendChild(abookupdate1);
                        divbookupdate.appendChild(spanbookupdate);
                        divbookupdate.appendChild(abookupdate2);
                        divbookupdate.appendChild(buttonbookupdate1);

                        divbookinfo.appendChild(divbookname);
                        divbookinfo.appendChild(divbookilnk);
                        divbookinfo.appendChild(divbookintro);
                        divbookinfo.appendChild(divbookupdate);

                        divbookbox.appendChild(divbookimg);
                        divbookbox.appendChild(divbookinfo);

                        bookFictionShelfList.appendChild(divbookbox);
                        bookFictionShelfList.appendChild(divdotline);
                    });
                }
            }
        }
    }
    return load;
}

