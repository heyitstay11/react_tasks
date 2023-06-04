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
      sourceNode.current.connect(audioContext.current.destination);
      sourceNode.current.start(0);
      setIsPlaying(true);
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
        {isLoading && <Loader />}
        {isPlaying && (
          <div className="btn-container">
            <button onClick={handleStop} className="stop-btn">
              Stop Audio
            </button>
          </div>
        )}

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
