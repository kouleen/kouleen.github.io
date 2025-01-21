let params = new URLSearchParams(location.search);
let [fictionName, fictionAuthor,current, size] = [params.get('fictionName'), params.get('fictionAuthor'),params.get('current'), params.get('size')];
let xmlHttpRequest = new XMLHttpRequest();
if (current == null) {
    current = 1;
}
if (size == null) {
    size = 20;
}
xmlHttpRequest.open('get', `https://www.kouleen.cn/v2/book/fiction/page?current=` + current + "&size=" + size + "&fictionName=" + fictionName + "&fictionAuthor=" + fictionAuthor);
xmlHttpRequest.send();
xmlHttpRequest.onload = function(){
    let result = JSON.parse(xmlHttpRequest.response);
    if (result.code == 200) {
        let search_tabdev = document.getElementById("search-tabdev");
        search_tabdev.classList.add("search-tab");
        result.data.records.forEach(bookFictionHeader => {
            let clearfixdiv = document.createElement("div");
            clearfixdiv.classList.add("search-result-list");
            clearfixdiv.classList.add("clearfix");

            let imgboxdiv = document.createElement("div");
            imgboxdiv.classList.add("imgbox");
            imgboxdiv.classList.add("fl");
            imgboxdiv.classList.add("se-result-book");

            let amgbox = document.createElement("a");
            amgbox.href = "../chapter/info.html?id=" + bookFictionHeader.id;
            let imgmgbox = document.createElement("img");
            imgmgbox.src = bookFictionHeader.imageUrl;
            imgmgbox.alt = bookFictionHeader.fictionName;
            imgmgbox.style = "width: 100px; height: 132px";
            amgbox.appendChild(imgmgbox);
            imgboxdiv.appendChild(amgbox);

            let se_result_infosdiv = document.createElement("div");
            se_result_infosdiv.classList.add("fl");
            se_result_infosdiv.classList.add("se-result-infos");

            let h2se_result_infosdiv = document.createElement("h2");
            h2se_result_infosdiv.classList.add("tit");

            let ah2se_result_infosdiv = document.createElement("a");
            ah2se_result_infosdiv.href = "../chapter/info.html?id=" + bookFictionHeader.id;

            let fontah2se_result_infosdiv = document.createElement("font");
            // fontah2se_result_infosdiv.color = "RED";
            fontah2se_result_infosdiv.innerText = bookFictionHeader.fictionName;
            ah2se_result_infosdiv.appendChild(fontah2se_result_infosdiv);
            h2se_result_infosdiv.appendChild(ah2se_result_infosdiv);

            let divbookinfo = document.createElement("div");
            divbookinfo.classList.add("bookinfo");

            let adivbookinfoauthor = document.createElement("a");
            adivbookinfoauthor.innerText = bookFictionHeader.fictionAuthor;
            let emdivbookinfo1 = document.createElement("em");
            emdivbookinfo1.innerText = "|";
            let adivbookinfostype = document.createElement("a");
            adivbookinfostype.innerText = bookFictionHeader.fictionType;
            let emdivbookinfo2 = document.createElement("em");
            emdivbookinfo2.innerText = "|";
            let adivbookinfostate = document.createElement("a");
            adivbookinfostate.innerText = bookFictionHeader.fictionState;
            let emdivbookinfo3 = document.createElement("em");
            emdivbookinfo3.innerText = "|";
            let spandivbookinfowordCount = document.createElement("span");
            spandivbookinfowordCount.innerText = bookFictionHeader.wordCount + "字";

            let pfont = document.createElement("p");
            let pfontfont = document.createElement("font");
            // pfontfont.color = "RED";
            pfontfont.innerHTML = bookFictionHeader.fictionIntroduce;
            pfont.appendChild(pfontfont);

            let divtype = document.createElement("div");
            divtype.classList.add("key-word");
            divtype.innerText = "关键词：" + bookFictionHeader.fictionType;

            divbookinfo.appendChild(adivbookinfoauthor);
            divbookinfo.appendChild(emdivbookinfo1);
            divbookinfo.appendChild(adivbookinfostype);
            divbookinfo.appendChild(emdivbookinfo2);
            divbookinfo.appendChild(adivbookinfostate);
            divbookinfo.appendChild(emdivbookinfo3);
            divbookinfo.appendChild(spandivbookinfowordCount);
            divbookinfo.appendChild(pfont);
            divbookinfo.appendChild(divtype);


            se_result_infosdiv.appendChild(h2se_result_infosdiv);
            se_result_infosdiv.appendChild(divbookinfo);
            se_result_infosdiv.appendChild(pfont);
            se_result_infosdiv.appendChild(divtype);

            let divbtn = document.createElement("div");
            divbtn.classList.add("btn");

            let abtn = document.createElement("a");
            abtn.classList.add("bkinfo");
            abtn.href = "../chapter/read.html?id=" + bookFictionHeader.id + "&sort=" + 0;
            abtn.innerText = "书籍详情";
            divbtn.appendChild(abtn);
            
            clearfixdiv.appendChild(imgboxdiv);
            clearfixdiv.appendChild(se_result_infosdiv);
            clearfixdiv.appendChild(divbtn);

            search_tabdev.appendChild(clearfixdiv);
        });



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
            window.location.href = "./search.html?current=" + 1 + "&size=" + optionsize + "&fictionName=" + fictionName + "&fictionAuthor=" + fictionAuthor;
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