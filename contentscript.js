var domEl = null;
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

chrome.extension.onRequest.addListener(onRequest);

function onRequest(request, sender, sendResponse) {
    var ang = getCurrentRotation(domEl);
    $(domEl).rotate({angle:ang});
    sendResponse({}); // clean up.
}

function getCurrentRotation(domElement) {
    var angle = 90;
    var current = domElement.style['-webkit-transform'];
    if (current) {
        var beg = current.indexOf('(');
        var end = current.indexOf('deg)');
        angle = angle + parseInt(current.substring(beg + 1, end));
    }
    return angle;
}