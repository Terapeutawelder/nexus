import logo from "@/assets/logo.png";

const ExtensionHeader = () => {
  return (
    <header className="relative px-6 py-4 border-b border-border">
      <div className="relative flex items-center justify-center gap-3">
        <img src={logo} alt="Nexus Logo" className="w-10 h-10 object-contain" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary tracking-tight">
            Nexus
          </h1>
          <p className="text-xs text-muted-foreground">Sincronização Inteligente</p>
        </div>
      </div>
    </header>
  );
};

export default ExtensionHeader;
