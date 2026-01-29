import { Settings, HelpCircle, ExternalLink } from "lucide-react";

const ExtensionFooter = () => {
  return (
    <footer className="px-6 py-4 border-t border-border bg-secondary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-3.5 h-3.5" />
            Configurações
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            Ajuda
          </button>
        </div>
        
        <a 
          href="#" 
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Documentação
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-[10px] text-center text-muted-foreground">
          SyncBridge v1.0.0 • Feito com ❤️ para desenvolvedores
        </p>
      </div>
    </footer>
  );
};

export default ExtensionFooter;
