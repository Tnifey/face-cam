run();
async function run() {
    const video = document.querySelector('video');
    if (!video) {
        console.error('No video element found. Fault in the matrix.');
        return;
    }

    const devices = await navigator
        .mediaDevices
        .enumerateDevices()
        .catch((e) => void console.error(e) || [])
        .then((devices) => devices.filter((device) => device.kind === 'videoinput'));

    if (!devices?.length) {
        console.error('No video devices found');
        alert('No video devices found or permission denied.');
        return;
    }

    console.log('Found video devices:', devices);

    const select = document.createElement('select');
    select.classList.add('device-select');
    devices.forEach((device) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || device.deviceId;
        select.appendChild(option);
    });

    select.addEventListener('change', () => changeStreamDevice(select.value));

    if (devices.length > 1) {
        document.body.appendChild(select);
    } else {
        changeStreamDevice(devices[0].deviceId);
    }

    function changeStreamDevice(device) {
        console.log('Changing stream device to:', device);
        navigator.mediaDevices.getUserMedia({ video: { deviceId: device }, audio: false })
            .then(stream => {
                if (!video) return;
                video.srcObject = stream;
            })
            .catch(err => {
                console.error(err);
            });
    }
}
