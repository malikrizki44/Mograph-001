
const video = document.getElementById("video");
const bar = document.getElementById("bar");

let animationTimer;
let recording = false;

function playAnimation() {
    clearInterval(animationTimer);

    video.style.animation = "none";
    void video.offsetWidth;
    video.style.animation = "";

    bar.style.transition = "none";
    bar.style.width = "0%";

    setTimeout(() => {
        bar.style.transition = "width 10s linear";
        bar.style.width = "100%";
    }, 50);
}

async function recordVideo() {
    if (!video.captureStream) {
        alert("Browser tidak mendukung captureStream.");
        return;
    }

    const stream = video.captureStream(30);

    const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
    });

    const chunks = [];

    recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
        const blob = new Blob(chunks, {
            type: "video/webm"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "mograph-10-detik.webm";
        link.click();

        URL.revokeObjectURL(url);
    };

    playAnimation();

    recorder.start();

    setTimeout(() => {
        recorder.stop();
    }, 10000);
}
