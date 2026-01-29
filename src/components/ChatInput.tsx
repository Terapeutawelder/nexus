import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      setMessage("");
      
      // Simular resposta
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Sincronização iniciada! Aguarde enquanto processamos sua solicitação.", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-6 py-4 border-t border-border bg-secondary/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">Pronto para enviar</span>
        <button 
          onClick={handleClearChat}
          className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
        >
          Limpar Chat
        </button>
      </div>
      
      {messages.length > 0 && (
        <div className="mb-3 max-h-32 overflow-y-auto space-y-2 scrollbar-thin">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`text-xs p-2 rounded-lg ${
                msg.isUser 
                  ? "bg-primary/20 text-foreground ml-4" 
                  : "bg-secondary text-muted-foreground mr-4"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-secondary/50 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
          <Paperclip className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua instrução..."
            className="w-full h-10 px-4 rounded-xl bg-secondary/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        
        <Button 
          onClick={handleSend}
          disabled={!message.trim()}
          className="h-10 px-4 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-colors disabled:opacity-50"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
