window.onload = (event) => {
    var video = document.getElementById('video');
    var errorDiv = document.getElementById('error');
    var mediaSelector = document.getElementById('media');

    function errorMsg(msg, error) {
        errorDiv.innerHTML += '<p>' + msg + '</p>';
        if (typeof error !== 'undefined') {
            console.error(error);
        }
    }

    function clearErrorMsg() {
        errorDiv.innerHTML = '';
    }

    function catchConstraintsError(error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
            constraints.video.height.exact + ' px is not supported by your device.');
        } else if (error.name === 'PermissionDeniedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
        }
        errorMsg('getUserMedia error: ' + error.name, error);
    }

    function refreshMediaList() {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices.enumerateDevices().then(function(mediaDevices) {
                mediaDevices.forEach(function(device) {
                    console.log(device.kind + ": " + device.label + " id=" + device.deviceId);
                    if (device.kind === "videoinput") {
                        let option = document.createElement("option");
                        option.text = device.label;
                        option.value = device.deviceId;
                        mediaSelector.add(option);
                    }
                });
            });
        }
    }

    function changeMediaDisplay(event) {
        clearErrorMsg();
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {deviceId: mediaSelector.value}
            }).then(function(stream) {
                var videoTracks = stream.getVideoTracks();
                console.log("Using video device: "+videoTracks[0].label);
                stream.onremovetrack = function() {
                    console.log('Stream ended');
                };
                window.stream = stream;
                video.srcObject = stream;
            }).catch(catchConstraintsError);
        }
    }

    refreshMediaList();
    changeMediaDisplay();
    mediaSelector.onchange = changeMediaDisplay;
}
