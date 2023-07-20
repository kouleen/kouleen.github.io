let xhr = new XMLHttpRequest();
xhr.open('get', `https://www.kouleen.cn/v1/system/message/ip/address`);
xhr.send();
xhr.onload = function () {
    let result = JSON.parse(xhr.response);
    if (result.code == 200) {
        console.log(result);
        xhr.open('get', `https://qifu-api.baidubce.com/ip/geo/v1/district?ip=` + result.data);
        xhr.send();
        xhr.onload = function () {
            let result = JSON.parse(xhr.response);
            console.log(result);
            let ipaddress = document.getElementById("ipaddress");
            ipaddress.innerText = "您的IP：" + (result.ip == undefined ? "未知" : result.ip);
            let ipnode = document.getElementById("ipnode");
            ipnode.innerText = "您的节点：" + (result.data.owner == "" ? "未知" : result.data.owner);
            let ipposition = document.getElementById("ipposition");
            ipposition.innerText = "您的位置：" + (result.data.continent == "" ? "未知" : result.data.continent + result.data.country + result.data.prov + result.data.city + result.data.district);
        }
    }
}
