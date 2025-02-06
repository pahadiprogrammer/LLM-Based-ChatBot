"use client";

import { useState } from "react";
import axios from "axios";
import CopyButton from "../app/components/CopyButton"; // Import CopyButton component

export default function Home() {
  console.log("Component Rendered!"); // Check if the component renders

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("Submit Clicked!");
    setLoading(true); // Set loading state

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    console.log("API Key:", apiKey);

    if (!apiKey) {
      setResponse("API key is missing. Please check your environment variables.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending API Request...");
      const { data } = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "huggingfaceh4/zephyr-7b-beta:free",
          messages: [{ role: "user", content: question }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response Received:", data);
      setResponse(data.choices?.[0]?.message?.content || "No response received.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Failed to fetch AI response.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Chat</h1>
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
      {response && (
        <div className="mt-6 p-4 w-full max-w-lg border border-gray-600 bg-gray-800 rounded-lg shadow-lg">
          <p className="font-semibold text-blue-400">AI Response:</p>
          <p className="mt-2 text-gray-300">{response}</p>

          {/* Use CopyButton Component */}
          <CopyButton text={response} />
        </div>
      )}
    </div>
  );
}
