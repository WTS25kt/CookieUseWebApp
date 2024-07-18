function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
document.addEventListener("DOMContentLoaded", function() {
    var savedOrder = getCookie('imageOrder');
    if (savedOrder) {
        var orderArray = savedOrder.split(',');
        var container = document.getElementById('imageContainer');
        orderArray.forEach(function(id) {
            var img = document.getElementById(id);
            if (img) {
                container.appendChild(img);
            }
        });
    }
});
function saveOrder() {
    var container = document.getElementById('imageContainer');
    var images = container.getElementsByTagName('img');
    var orderArray = [];
    for (var i = 0; i < images.length; i++) {
        orderArray.push(images[i].id);
    }
    setCookie('imageOrder', orderArray.join(','), 7);
}
// 例: ドラッグ＆ドロップのイベントリスナー
document.getElementById('imageContainer').addEventListener('drop', function(event) {
    // ドロップ処理
    saveOrder();
});