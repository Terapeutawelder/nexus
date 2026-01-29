import { useState } from "react";
import ExtensionHeader from "@/components/ExtensionHeader";
import SyncStatus from "@/components/SyncStatus";
import ExtensionFooter from "@/components/ExtensionFooter";
import SettingsScreen from "@/components/SettingsScreen";
import ChatInput from "@/components/ChatInput";

const planLimits: Record<string, number> = {
  free: 5,
  pro: 250,
  plus: 500,
  premium: 1000,
};

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [usedMessages, setUsedMessages] = useState(3);
  const [isActivated, setIsActivated] = useState(true); // License activated state

  const totalMessages = planLimits[selectedPlan];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-dark">
      {/* Extension popup container */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
        {showSettings ? (
          <SettingsScreen 
            onClose={() => setShowSettings(false)} 
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            usedMessages={usedMessages}
            isActivated={isActivated}
            onActivate={setIsActivated}
          />
        ) : (
          <>
            <ExtensionHeader />
            <SyncStatus usedMessages={usedMessages} totalMessages={totalMessages} />
            <ChatInput />
            <ExtensionFooter onSettingsClick={() => setShowSettings(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
