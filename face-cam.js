run();
async function run() {
    const video = document.querySelector('video');
    if (!video) {
        console.error('No video element found');
        return;
    }

    const devices = await navigator
        .mediaDevices
        .enumerateDevices()
        .catch((e) => void console.error(e) || [])
        .then((devices) => devices.filter((device) => device.kind === 'videoinput'));

    if (!devices.length) {
        console.error('No video devices found');
        return;
    }

    console.log('Found video devices:', devices);

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error(err);
        });
}
