import ExtensionHeader from "@/components/ExtensionHeader";
import LicenseKeyInput from "@/components/LicenseKeyInput";
import SyncStatus from "@/components/SyncStatus";
import PricingPlans from "@/components/PricingPlans";
import ExtensionFooter from "@/components/ExtensionFooter";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-dark">
      {/* Extension popup container */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <ExtensionHeader />
        <LicenseKeyInput />
        <SyncStatus />
        <PricingPlans />
        <ExtensionFooter />
      </div>
    </div>
  );
};

export default Index;
