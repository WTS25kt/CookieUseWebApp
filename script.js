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
    var cookieConsent = getCookie('cookieConsent');
    if (!cookieConsent) {
        document.getElementById('cookieConsent').style.display = 'block';
    } else if (cookieConsent === 'accepted') {
        initializeImageOrder();
    }

    document.getElementById('acceptCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 30);
        document.getElementById('cookieConsent').style.display = 'none';
        initializeImageOrder();
    });

    document.getElementById('rejectCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'rejected', 30);
        document.getElementById('cookieConsent').style.display = 'none';
    });

    function initializeImageOrder() {
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

        var images = document.querySelectorAll('#imageContainer img');
        images.forEach(function(img) {
            img.addEventListener('click', function() {
                var container = document.getElementById('imageContainer');
                container.appendChild(img);
                saveOrder();
            });
        });
    }

    function saveOrder() {
        var container = document.getElementById('imageContainer');
        var images = container.getElementsByTagName('img');
        var orderArray = [];
        for (var i = 0; i < images.length; i++) {
            orderArray.push(images[i].id);
        }
        setCookie('imageOrder', orderArray.join(','), 7);
    }
});