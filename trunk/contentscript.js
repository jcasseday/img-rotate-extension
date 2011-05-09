var selectedImage = null;
$("img", document.body).mousedown(function (event) {
    event.stopPropagation();
    switch (event.which) {
        case 3:
            selectedImage = $(this).get(0);
            break;
        default:
            break;
    }
});

chrome.extension.onRequest.addListener(onRequest);

function onRequest(request, sender, sendResponse) {
    var degree = getCurrentRotation(request.angle);
    selectedImage.style.webkitTransform = 'rotate(' + degree + 'deg)';
    sendResponse({}); // clean up.
}

function getCurrentRotation(angle) {
    var currentDegree = selectedImage.style['-webkit-transform'];
    if (currentDegree && currentDegree != "") {
        var start = currentDegree.indexOf('(');
        var end = currentDegree.indexOf('deg)');
        angle = parseInt(currentDegree.substring(start + 1, end)) + angle;
    }
    return angle;
}