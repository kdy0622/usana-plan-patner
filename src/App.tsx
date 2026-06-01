import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Milestone, 
  Calculator, 
  Scale, 
  BookOpen, 
  HelpCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";

// Components imports
import Header from "./components/Header";
import IntroTab from "./components/IntroTab";
import TourTab from "./components/TourTab";
import SimulatorTab from "./components/SimulatorTab";
import VsTab from "./components/VsTab";
import GlossaryTab from "./components/GlossaryTab";
import FaqTab from "./components/FaqTab";
import Footer from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("intro");
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    
    // Auto collapse after 3.2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "intro":
        return (
          <IntroTab 
            onStartTour={() => setActiveTab("steps")}
            onGoSimulator={() => setActiveTab("simulator")}
            onSwitchTab={(id) => setActiveTab(id)}
          />
        );
      case "steps":
        return <TourTab onShowToast={displayToast} />;
      case "simulator":
        return <SimulatorTab onShowToast={displayToast} />;
      case "vs":
        return <VsTab />;
      case "glossary":
        return <GlossaryTab />;
      case "faq":
        return <FaqTab />;
      default:
        return <IntroTab 
          onStartTour={() => setActiveTab("steps")}
          onGoSimulator={() => setActiveTab("simulator")}
          onSwitchTab={(id) => setActiveTab(id)}
        />;
    }
  };

  const tabItems = [
    { id: "intro", label: "소개 & 가치", icon: Sparkles, color: "text-amber-500" },
    { id: "steps", label: "보상플랜설명", icon: Milestone, color: "text-emerald-500" },
    { id: "simulator", label: "주급 시뮬레이션", icon: Calculator, color: "text-teal-500" },
    { id: "vs", label: "1BC vs 3bc", icon: Scale, color: "text-blue-500" },
    { id: "glossary", label: "보상 용어사전", icon: BookOpen, color: "text-indigo-500" },
    { id: "faq", label: "자주 묻는 질문", icon: HelpCircle, color: "text-purple-500" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased font-sans">
      
      {/* 프리미엄 헤더 */}
      <Header />

      {/* 스마트 가로형 탭 내비게이터 (모바일 그리드형, PC 라인형 결합) */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-20 z-30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-3 md:flex md:flex-row md:flex-wrap gap-2 md:space-x-1.5 justify-items-stretch">
            {tabItems.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 py-2.5 px-1 sm:px-4 rounded-xl font-black text-[11px] sm:text-sm transition-all duration-200 outline-none cursor-pointer ${
                    isActive
                      ? "bg-teal-700 text-white shadow-md shadow-teal-700/10 scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 shrink-0 ${isActive ? 'text-white' : tab.color}`} />
                  <span className="text-center">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 (모션 애니메이션 연동) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 푸터 */}
      <Footer onSwitchTab={handleTabChange} currentTab={activeTab} />

      {/* 실시간 알림 토스트 윈도우 */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-800/80 flex items-center space-x-3 max-w-sm"
          >
            <div className="bg-teal-500/15 p-2 rounded-xl border border-teal-500/25 shrink-0">
              <CheckCircle className="w-5 h-5 text-teal-400" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
