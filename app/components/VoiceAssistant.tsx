import React, {
  useState
} from "react";

export function VoiceAssistant() {

  const [
    listening,
    setListening
  ] = useState(false);

  const [
    transcript,
    setTranscript
  ] = useState("");

  const startListening =
    () => {

      const SpeechRecognition =
        (
          window as any
        ).SpeechRecognition ||

        (
          window as any
        ).webkitSpeechRecognition;

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-IN";

      recognition.start();

      setListening(true);

      recognition.onresult =
        (event: any) => {

          const text =
            event.results[0][0]
              .transcript;

          setTranscript(text);

          setListening(false);

          // SIMPLE COMMANDS
          if (
            text.includes("wallet")
          ) {

            alert(
              "Opening wallet..."
            );
          }

          if (
            text.includes("orders")
          ) {

            alert(
              "Showing orders..."
            );
          }

          if (
            text.includes("product")
          ) {

            alert(
              "Opening products..."
            );
          }
        };

      recognition.onerror =
        () => {

          setListening(false);

          alert(
            "Voice recognition failed"
          );
        };
    };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Voice Assistant 🎤
      </h2>

      {/* BUTTON */}
      <button
        onClick={
          startListening
        }
        className={`px-5 py-3 rounded-xl text-white ${
          listening
            ? "bg-red-500"
            : "bg-green-600"
        }`}
      >
        {listening
          ? "Listening..."
          : "Start Voice"}
      </button>

      {/* TRANSCRIPT */}
      {transcript && (

        <div className="mt-5 bg-green-100 p-4 rounded-xl">

          <h3 className="text-xl font-bold text-green-700">
            You Said:
          </h3>

          <p className="mt-2 text-lg">
            {transcript}
          </p>

        </div>

      )}

    </div>
  );
}