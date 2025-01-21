let path = getAbstractPath();
document.getElementById("commSearch").addEventListener("submit", (event) => {
    // 阻止表单默认的提交
    event.preventDefault();
    let searchfictionName = document.getElementById("searchfictionName").value;
    let pathurl = path();
    window.location.href = pathurl + "/index/search.html?fictionName=" + searchfictionName;
});

function getAbstractPath() {
    function getPath() {
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0, index + 1);
        return result;
    }
    return getPath;
}

