var domEl = null;
if (document.body.childElementCount === 1) {
    domEl = $(document.images[0]).get(0);
} else {
    $("img", document.body).mousedown(function (e) {
        e.stopPropagation();
        switch (e.which) {
            case 3:
                domEl = $(this).get(0);
                break;
            default:
                break;
        }
    });
}

chrome.extension.onRequest.addListener(onRequest);

function onRequest(request, sender, sendResponse) {
    var ang = getCurrentRotation(request.angle);
    $(domEl).rotate({angle:ang});
    sendResponse({}); // clean up.
}

function getCurrentRotation(angle) {
    var current = domEl.style['-webkit-transform'];
    if (current && current != "") {
        var beg = current.indexOf('(');
        var end = current.indexOf('deg)');
        angle = parseInt(current.substring(beg + 1, end)) + angle;
    }
    return angle;
}