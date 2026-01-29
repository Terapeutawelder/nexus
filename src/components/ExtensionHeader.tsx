import { Github, Zap, RefreshCw } from "lucide-react";

const ExtensionHeader = () => {
  return (
    <header className="relative px-6 py-5 border-b border-border">
      <div className="absolute inset-0 gradient-dark opacity-50" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <RefreshCw className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary animate-glow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Sync<span className="text-primary">Bridge</span>
            </h1>
            <p className="text-xs text-muted-foreground">Lovable ↔ GitHub ↔ Antigravity</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Conectado</span>
          </div>
        </div>
      </div>
      
      {/* Integration icons */}
      <div className="relative flex items-center justify-center gap-4 mt-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border">
          <div className="w-6 h-6 rounded-md bg-lovable/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-lovable" />
          </div>
          <span className="text-xs font-medium text-foreground">Lovable</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-gradient-to-r from-lovable to-github" />
          <RefreshCw className="w-4 h-4 text-muted-foreground mx-1" />
          <div className="w-8 h-0.5 bg-gradient-to-r from-github to-antigravity" />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border">
          <div className="w-6 h-6 rounded-md bg-github/10 flex items-center justify-center">
            <Github className="w-4 h-4 text-github" />
          </div>
          <span className="text-xs font-medium text-foreground">GitHub</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-gradient-to-r from-github to-antigravity" />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border">
          <div className="w-6 h-6 rounded-md bg-antigravity/20 flex items-center justify-center">
            <span className="text-sm font-bold text-antigravity">G</span>
          </div>
          <span className="text-xs font-medium text-foreground">Antigravity</span>
        </div>
      </div>
    </header>
  );
};

export default ExtensionHeader;
