start.onclick = () => {
  const aud = new Audio('/s/mp3_5m.mp3');
  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

  audioCtx.createMediaElementSource(aud);

  var analyser = audioCtx.createAnalyser();

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // Get a canvas defined with ID "oscilloscope"
  var canvas = document.getElementById("osc");
  var canvasCtx = canvas.getContext("2d");

  // draw an oscilloscope of the current audio source

  aud.play();
  draw();
  function draw() {
    console.log('d');

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * canvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

};