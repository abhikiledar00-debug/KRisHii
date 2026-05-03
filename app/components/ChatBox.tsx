import React, {
  useState
} from "react";

export function ChatBox() {

  const [
    messages,
    setMessages
  ] = useState<any[]>([]);

  const [
    input,
    setInput
  ] = useState("");

  // SEND MESSAGE
  const sendMessage =
    () => {

      if (!input.trim())
        return;

      const newMessage = {

        text: input,

        sender:
          "You"

      };

      setMessages([
        ...messages,
        newMessage
      ]);

      setInput("");
    };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Live Chat 💬
      </h2>

      {/* CHAT AREA */}
      <div className="h-80 overflow-y-auto bg-gray-100 rounded-xl p-4 mb-4">

        {messages.length === 0 && (

          <p className="text-gray-500">
            No messages yet
          </p>

        )}

        {messages.map(
          (msg, index) => (

            <div
              key={index}
              className="mb-3"
            >

              <div className="bg-blue-600 text-white px-4 py-2 rounded-xl inline-block">

                <strong>
                  {msg.sender}:
                </strong>
                {" "}
                {msg.text}

              </div>

            </div>

          )
        )}

      </div>

      {/* INPUT */}
      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          className="flex-1 border px-4 py-3 rounded-xl"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 rounded-xl"
        >
          Send
        </button>

      </div>

    </div>
  );
}