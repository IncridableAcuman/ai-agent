import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Har doim eng oxirgi xabarga skrol qilish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://ai-agent-server-d596.onrender.com/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: userMessage.text,
      });

      const rawData = await response.json();
      
      // Groq javob formatidan faqat matnni ajratib olish (JSON parsing)
      const aiText = rawData.choices?.[0]?.message?.content || "Kechirasiz, javob olishda xatolik bo'ldi.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'ai', text: "Server bilan bog'lanishda xatolik yuz berdi." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 p-4 flex items-center gap-3 bg-slate-900/50 backdrop-blur">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg">Groq AI Chat</h1>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Llama-3 model orqali ishlaydi (Ultra tezkor)
          </p>
        </div>
      </header>

      {/* Messages Box */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <Bot size={48} className="mb-4 text-slate-600 animate-bounce" />
            <p className="text-lg font-semibold">Salom! Men Groq AI assistentiman.</p>
            <p className="text-sm max-w-xs">Istalgan savolingizni bering, bir zumda javob qaytaraman.</p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`p-2 rounded-lg shrink-0 self-end ${msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user' 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="p-2 rounded-lg bg-slate-800 self-end">
              <Bot size={18} />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin text-emerald-400" size={16} />
              <span className="text-slate-400 text-sm">Groq o'ylamoqda...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Form */}
      <footer className="p-4 border-t border-slate-800 bg-slate-900/50">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xabarni yozing..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
