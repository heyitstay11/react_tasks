import { useRef, useState } from "react";
import { instruments } from "./data/instruments.json";
import Card from "./components/Card";
import Loader from "./components/Loader";

function App() {
  const audioContext = useRef(new AudioContext());
  /**
   * @type {React.MutableRefObject<AudioBufferSourceNode>}
   */
  const sourceNode = useRef(null);
  /**
   * @type {React.MutableRefObject<AnalyserNode>}
   */
  const analyser = useRef(null);
  /**
   * @type {React.MutableRefObject<HTMLCanvasElement>}
   */
  const canvasRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStop = () => {
    if (sourceNode.current) {
      sourceNode.current.stop(0);
      setIsPlaying(false);
    }
  };

  const handlePlay = async (file) => {
    if (sourceNode.current) {
      sourceNode.current.stop(0);
    }
    setIsLoading(true);
    try {
      // fetch and play
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.current.decodeAudioData(
        arrayBuffer
      );
      sourceNode.current = audioContext.current.createBufferSource();
      sourceNode.current.buffer = audioBuffer;
      analyser.current = audioContext.current.createAnalyser();
      sourceNode.current.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);
      sourceNode.current.start(0);

      // visulization
      analyser.current.fftSize = 128;
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const barWidth = canvasRef.current.width / bufferLength;
      let x = 0;

      const animate = () => {
        x = 0;
        const canvasContext = canvasRef.current.getContext("2d");
        canvasContext.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        analyser.current.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          canvasContext.fillStyle = "green";
          const barHeight = dataArray[i];
          canvasContext.fillRect(
            x,
            canvasRef.current.height - barHeight,
            barWidth,
            barHeight
          );
          x += barWidth;
        }
        requestAnimationFrame(animate);
      };
      setIsPlaying(true);
      animate();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="title">Musical Instruments</h1>
      <div className="container">
        {isPlaying && (
          <div className="btn-container">
            <button onClick={handleStop} className="stop-btn">
              Stop Audio
            </button>
          </div>
        )}
        {isLoading && <Loader />}
        <canvas
          width={800}
          height={300}
          className={`canvas ${isPlaying ? "active" : "not-active"}`}
          ref={canvasRef}
        ></canvas>

        <main className="grid">
          {instruments.map((instrument, index) => {
            return (
              <Card
                key={index}
                instrument={instrument}
                handlePlay={handlePlay}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
