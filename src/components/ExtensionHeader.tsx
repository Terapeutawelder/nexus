import { motion } from "framer-motion";
import logo from "@/assets/logo-new.png";

const ExtensionHeader = () => {
  return (
    <motion.header 
      className="relative px-6 py-4 border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center justify-center gap-3">
        <motion.img 
          src={logo} 
          alt="Nexus Logo" 
          className="w-12 h-12 object-contain rounded-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Nexus
          </h1>
          <p className="text-xs text-muted-foreground">Sincronização Inteligente</p>
        </div>
      </div>
    </motion.header>
  );
};

export default ExtensionHeader;
