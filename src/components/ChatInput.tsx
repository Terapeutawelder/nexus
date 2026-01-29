import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Send, X } from "lucide-react";
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
    <motion.div 
      className="px-6 py-4 border-t border-border bg-secondary/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">Pronto para enviar</span>
        {messages.length > 0 && (
          <motion.button 
            onClick={handleClearChat}
            className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-3 h-3" />
            Limpar Chat
          </motion.button>
        )}
      </div>
      
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div 
            className="mb-3 max-h-32 overflow-y-auto space-y-2 scrollbar-thin"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {messages.map((msg, index) => (
              <motion.div 
                key={index} 
                className={`text-xs p-2 rounded-lg ${
                  msg.isUser 
                    ? "bg-primary/20 text-foreground ml-4" 
                    : "bg-secondary text-muted-foreground mr-4"
                }`}
                initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center gap-2">
        <motion.button 
          className="w-10 h-10 rounded-xl bg-secondary/50 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Paperclip className="w-4 h-4 text-muted-foreground" />
        </motion.button>
        
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
          className="h-10 px-4 rounded-xl gradient-primary text-primary-foreground font-medium transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4 mr-1" />
          Enviar
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatInput;
