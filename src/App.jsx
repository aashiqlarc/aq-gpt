import { useState } from "react"
import { getAnswers } from "./GeminiConnect"

function App() {

const [question,setQuestion] = useState("");
const [messages, setMessages] = useState([]);
async function handleSubmit(e) {
  e.preventDefault();
  if (!question.trim()) return;
  const userMessage = { role: "user", text: question };
  setMessages((prev) => [...prev, userMessage]);
  setQuestion("");
  const answers = await getAnswers(question);
  console.log(answers);
  const botReply = {
    role: "bot",
    text: answers,
  };
  setTimeout(() => {
    setMessages((prev) => [...prev, botReply]);
  }, 1000);
}
  return (
    <>
<div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Area (empty placeholder) */}
      <div className="flex-1 overflow-y-auto p-4">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 flex items-center gap-2 border-t"
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
    </>
  )
}

export default App
