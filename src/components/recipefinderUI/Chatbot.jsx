import { useState } from "react";

export default function ChatBot() {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = { role: "user", text: message };
        setChat(prev => [...prev, userMessage]);
        setLoading(true);

        try {

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `You are a cooking assistant. Answer cooking questions.\n\nQuestion: ${message}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();

            const text =
                data?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?.split("\n")
                    .slice(0, 6)
                    .join("\n") || "No response";

            const botMessage = { role: "bot", text };

            setChat(prev => [...prev, botMessage]);

        } catch (error) {
            console.error(error);
        }

        setLoading(false);

        setMessage("");
    };

    return (

        <div className="fixed bottom-4 right-4 w-full max-w-xs sm:max-w-xs md:mb-10 md:max-w-md sm:mb-5 bg-orange-200 shadow-xl rounded-xl p-4 flex flex-col">

            <div className=" flex-1 max-h-64 sm:max-h-72 overflow-y-auto mb-3 p-2 space-y-2">

                {chat.map((msg, i) => (
                    <div
                        key={i}
                        className={msg.role === "user" ? "text-right" : "text-left"}
                    >
                        <span className="bg-gray-100 px-3 py-2 rounded-lg inline-block whitespace-pre-line text-sm leading-relaxed break-words">
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
                    className="border p-2 flex-1 rounded w-full sm:w-auto"
                />

                <button
                    onClick={sendMessage}
                    className="bg-orange-500 text-white px-3 py-2 rounded w-full sm:w-auto"
                >
                    Send
                </button>

            </div>

        </div>
    );
}
