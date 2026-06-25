import { useState } from "react";
import { useSelector } from "react-redux";

export default function ChatBot() {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

     const state = {
    theme: { isLight: true }
  }

  const isLight = useSelector((state) => {
    console.log(state);
    return state.theme.isLight
  })

    const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setChat(prev => [...prev, userMessage]);
    setLoading(true);

    try {
        const response = await fetch(
            "http://localhost:5000/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            }
        );

        const data = await response.json();

        setChat(prev => [
            ...prev,
            {
                role: "bot",
                text: data.reply,
            },
        ]);

    } catch (error) {
        console.error("Chat Error:", error);

        setChat(prev => [
            ...prev,
            {
                role: "bot",
                text: "Sorry, something went wrong.",
            },
        ]);
    } finally {
        setLoading(false);
        setMessage("");
    }
};

    return (

        <div className={`fixed bottom-4 right-4 w-full max-w-xs sm:max-w-xs md:mb-10 md:max-w-md sm:mb-5 ${isLight ?"bg-orange-200 ":"bg-slate-700"}  shadow-xl rounded-xl p-4 flex flex-col`}>

            <div className=" flex-1 max-h-64 sm:max-h-72 overflow-y-auto mb-3 p-2 space-y-2">

                {chat.map((msg, i) => (
                    <div
                        key={i}
                        className={msg.role === "user" ? "text-right" : "text-left"}
                    >
                        <span className={`${isLight?"bg-white text-slate-600 font-poppins":"bg-slate-600 text-white font-poppins"} px-3 py-2 rounded-lg inline-block whitespace-pre-line text-sm leading-relaxed break-words`}>
                            {msg.text}
                        </span>
                    </div>
                ))}

                {loading && (
                    <div className="text-left">
                        <span className="bg-gray-100 px-3 py-2 rounded-lg inline-block">
                            wait a mint 😁  <span className="animate-bounce">...</span>
                        </span>
                    </div>
                )}

            </div>

            <div className="flex flex-col sm:flex-row gap-2">

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask cooking question..."
                    className=" p-2 flex-1 font-poppins rounded w-full sm:w-auto"
                />

                <button
                    onClick={sendMessage}
                    className="bg-orange-500 font-poppins text-white px-3 py-2 rounded w-full sm:w-auto"
                >
                    Send
                </button>

            </div>

        </div>
    );
}
