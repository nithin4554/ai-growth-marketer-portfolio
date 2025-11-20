import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateTerminalResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Terminal as TerminalIcon, Send, Minimize2, Maximize2, X } from 'lucide-react';
import { SOCIALS } from '../constants';

// Typewriter Effect Component
const Typewriter: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 15); // Speed of typing
    return () => clearInterval(timer);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'system', content: 'Nithin_Personnel_File v2.4.0 loading...' },
    { role: 'system', content: 'Decrypting candidate history...' },
    { role: 'assistant', content: 'Access Granted. I am Nithin\'s Interview Assistant. Ask me about my skills, experience, or why you should hire me.' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isThinking]);

  // Focus input on click
  const focusInput = () => inputRef.current?.focus();

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response: ChatMessage;

    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cleanCmd === 'call' || cleanCmd === 'hire') {
      response = { 
        role: 'assistant', 
        content: 'Opening Interview Scheduler. Standby...', 
        type: 'action',
        actionLabel: 'SCHEDULE_INTERVIEW',
        actionUrl: SOCIALS.calendar
      };
    } else if (cleanCmd === 'email' || cleanCmd === 'contact') {
      response = { 
        role: 'assistant', 
        content: 'Retrieving contact protocols...',
        type: 'action',
        actionLabel: `EMAIL: ${SOCIALS.email}`,
        actionUrl: `mailto:${SOCIALS.email}`
      };
    } else if (cleanCmd === 'resume' || cleanCmd === 'cv') {
      response = { 
        role: 'assistant', 
        content: 'Accessing personnel file...',
        type: 'action',
        actionLabel: 'DOWNLOAD_RESUME',
        actionUrl: SOCIALS.linkedin
      };
    } else if (cleanCmd === 'help') {
      response = {
        role: 'assistant',
        content: 'COMMANDS: [hire] [resume] [email]. OR ASK: "What is your expected salary?" or "Describe your last role."'
      };
    } else {
      // Use Gemini
      setIsThinking(true);
      const aiText = await generateTerminalResponse(cmd);
      setIsThinking(false);
      response = { role: 'assistant', content: aiText };
    }

    setHistory(prev => [...prev, response]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    await handleCommand(userMsg.content);
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-mono mt-12 relative group" onClick={focusInput}>
       {/* Decorational Border Glow */}
       <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-900 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-tilt"></div>
       
       <div className="relative bg-black border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <TerminalIcon size={14} className="text-green-500" />
              <span className="font-bold">root@nithin-interview-bot:~</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-600">
               <Minimize2 size={12} className="hover:text-white cursor-pointer"/>
               <Maximize2 size={12} className="hover:text-white cursor-pointer"/>
               <X size={12} className="hover:text-red-500 cursor-pointer"/>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 h-[400px] overflow-y-auto space-y-4 text-sm md:text-base scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black font-bold">
            {history.map((msg, idx) => (
              <div key={idx} className={`break-words flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] ${msg.role === 'user' ? 'text-white bg-zinc-900/50 px-3 py-1 rounded-l-lg border-r-2 border-green-500' : 'text-green-400'}`}>
                    {msg.role !== 'user' && <span className="mr-2 opacity-50 select-none">{'>'}</span>}
                    
                    {/* Only typewrite the last assistant message to avoid re-typing history */}
                    {msg.role === 'assistant' && idx === history.length - 1 ? (
                        <Typewriter text={msg.content} />
                    ) : (
                        <span>{msg.content}</span>
                    )}
                </div>
                
                {msg.type === 'action' && (
                   <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                    className="mt-2"
                   >
                     <a 
                      href={msg.actionUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-all cursor-pointer text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                     >
                       [{msg.actionLabel}]
                     </a>
                   </motion.div>
                )}
              </div>
            ))}
            
            {isThinking && (
               <div className="text-green-400 animate-pulse flex items-center gap-2">
                 <span className="opacity-50">{'>'}</span>
                 GENERATING_ANSWER...
                 <span className="w-2 h-4 bg-green-500 inline-block animate-blink"></span>
               </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center gap-3">
            <span className="text-green-500 font-bold animate-pulse">{'>_'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none text-white font-mono focus:ring-0 outline-none placeholder-zinc-700 font-bold"
              placeholder="Type 'resume', 'hire', or ask a question..."
              autoFocus
              autoComplete="off"
            />
            <button type="submit" className="text-zinc-500 hover:text-green-400 transition-colors">
              <Send size={18} />
            </button>
          </form>
       </div>
    </div>
  );
};

export default Terminal;