"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Chào cậu! Tớ là Bé Na 🐍, hướng dẫn viên thổ địa của Thuồng Luồng Mini. Cậu muốn hỏi gì về Tuyên Quang không?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "Ôi lỗi mất rồi: " + (data.error || "Không rõ") }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Lỗi kết nối tới não bộ của Bé Na! Cậu thử lại sau nhé." }]);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="chatbot-trigger btn btn--primary"
        style={{
          position: "fixed",
          bottom: "calc(var(--mobile-nav-height) + 20px)",
          right: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          padding: 0,
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(244, 162, 97, 0.4)",
          zIndex: 99
        }}
        aria-label="Chat với Bé Na"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window card animate-slide-up"
          style={{
            position: "fixed",
            bottom: "calc(var(--mobile-nav-height) + 10px)",
            right: "10px",
            width: "calc(100vw - 20px)",
            maxWidth: "380px",
            height: "550px",
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            zIndex: 100,
            overflow: "hidden",
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
          }}
        >
          {/* Header */}
          <div style={{ 
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", 
            padding: "15px", 
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                🐍
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Bé Na</h3>
                <span style={{ fontSize: "0.8rem", opacity: 0.9 }}>Trợ lý du lịch Tuyên Quang</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", padding: "5px" }}>
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ 
            flex: 1, 
            padding: "15px", 
            overflowY: "auto", 
            background: "var(--color-background-alt)",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                display: "flex", 
                gap: "10px", 
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' 
              }}>
                <div style={{ 
                  width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                  background: msg.role === 'user' ? "var(--color-border)" : "var(--color-primary)",
                  color: msg.role === 'user' ? "var(--color-text)" : "white",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div style={{
                  background: msg.role === 'user' ? "var(--color-primary)" : "var(--color-background)",
                  color: msg.role === 'user' ? "white" : "var(--color-text)",
                  padding: "12px 16px",
                  borderRadius: "18px",
                  borderTopRightRadius: msg.role === 'user' ? "4px" : "18px",
                  borderTopLeftRadius: msg.role === 'bot' ? "4px" : "18px",
                  maxWidth: "75%",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  fontSize: "0.95rem",
                  lineHeight: "1.4"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={16} />
                </div>
                <div style={{ background: "var(--color-background)", padding: "12px 16px", borderRadius: "18px", borderTopLeftRadius: "4px", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span className="dot-typing"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "15px", background: "var(--color-background)", borderTop: "1px solid var(--color-border)" }}>
            <form onSubmit={handleSend} style={{ display: "flex", gap: "10px" }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Hỏi Bé Na đi cậu..." 
                disabled={isLoading}
                style={{ 
                  flex: 1, 
                  padding: "12px 16px", 
                  borderRadius: "var(--radius-full)", 
                  border: "1px solid var(--color-border)",
                  background: "var(--color-background-alt)",
                  color: "var(--color-text)",
                  outline: "none"
                }} 
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="btn btn--primary"
                style={{ width: "45px", height: "45px", borderRadius: "50%", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <Send size={18} style={{ marginLeft: "2px" }} />
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 769px) {
          .chatbot-trigger { bottom: 30px !important; right: 30px !important; }
          .chatbot-window { bottom: 100px !important; right: 30px !important; }
        }
        .dot-typing {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: var(--color-primary);
          animation: dot-typing 1s infinite linear;
        }
        .dot-typing::before, .dot-typing::after {
          content: '';
          position: absolute;
          top: 0;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: var(--color-primary);
          animation: dot-typing 1s infinite linear;
        }
        .dot-typing::before { left: -10px; animation-delay: 0s; }
        .dot-typing { animation-delay: 0.2s; }
        .dot-typing::after { left: 10px; animation-delay: 0.4s; }
        @keyframes dot-typing {
          0% { box-shadow: 0 0 0 0 var(--color-primary); }
          50% { box-shadow: 0 -4px 0 0 var(--color-primary); }
          100% { box-shadow: 0 0 0 0 var(--color-primary); }
        }
      `}} />
    </>
  );
}
