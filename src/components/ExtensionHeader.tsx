import logo from "@/assets/logo.png";

const ExtensionHeader = () => {
  return (
    <header className="relative px-6 py-5 border-b border-border">
      <div className="absolute inset-0 gradient-dark opacity-50" />
      
      <div className="relative flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <img src={logo} alt="Nexus Verder Logo" className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary animate-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Nexus Verder
            </h1>
            <p className="text-xs text-muted-foreground">Sincronização Inteligente</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">Conectado</span>
        </div>
      </div>
    </header>
  );
};

export default ExtensionHeader;
