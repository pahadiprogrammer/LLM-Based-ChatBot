"use client";

import { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

// Define props type for CopyButton
interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
    >
      {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
    </button>
  );
}
