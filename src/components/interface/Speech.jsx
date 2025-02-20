import { useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Speech = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      setAudioURL(URL.createObjectURL(audioBlob));
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Hello!</h1>
      <p className="text-gray-400">Please explain this word</p>

      {/* Display transcript */}
      <div className="mt-4 p-4 bg-gray-800 rounded-xl w-64 text-center">
        {transcript || "Press mic and start speaking..."}
      </div>

      {/* Buttons for voice commands */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={listening ? stopListening : startListening}
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
        >
          🎙️
        </button>

        <button
          onClick={recording ? stopRecording : startRecording}
          className={`p-2 rounded-full ${
            recording ? "bg-red-500" : "bg-green-500"
          } hover:opacity-75`}
        >
          {recording ? "⏹️" : "🔴"}
        </button>
      </div>

      {/* Audio playback */}
      {audioURL && <audio className="mt-4" controls src={audioURL}></audio>}
    </div>
  );
};

export default Speech;
