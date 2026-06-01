import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { compSteps } from "../data";

interface TourTabProps {
  onShowToast: (message: string) => void;
}

export default function TourTab({ onShowToast }: TourTabProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    if (currentIdx < compSteps.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleGoFirst = () => {
    setCurrentIdx(0);
    onShowToast("🔄 보상플랜 설명의 처음 첫단계로 복귀했습니다.");
  };

  const currentStep = compSteps[currentIdx];

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 바 */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            유사나 보상플랜 투어
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            각 단계를 차례대로 정독하면서 유사나만이 가진 공정하고 정직한 마케팅 룰의 진수를 배워보세요.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleGoFirst}
            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>처음단계로</span>
          </button>
          
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-800 p-2.5 sm:p-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all"
          >
            <ChevronLeft className="w-4 h-4 inline-block align-middle" />
            <span className="align-middle ml-1 hidden sm:inline">이전</span>
          </button>
          <span className="font-mono text-slate-800 font-black text-lg px-2 min-w-[70px] text-center">
            {currentIdx + 1} / {compSteps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIdx === compSteps.length - 1}
            className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:hover:bg-teal-600 text-white p-2.5 sm:p-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all"
          >
            <span className="align-middle mr-1 hidden sm:inline">다음</span>
            <ChevronRight className="w-4 h-4 inline-block align-middle" />
          </button>
        </div>
      </div>

      {/* 단계 설명 패널 */}
      <div className="bg-white border-2 border-teal-600/20 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <span className="text-teal-600 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider block bg-teal-50 text-center sm:text-left sm:bg-transparent py-1.5 sm:py-0 rounded-lg">
          🧬 USANA COMPENSATION RULE No.{currentStep.id}
        </span>
        
        {/* 애니메이션 트랜지션 효과 적용 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {currentStep.title}
            </h2>
            
            <p className="text-slate-800 leading-relaxed text-base sm:text-lg pt-1">
              {currentStep.desc}
            </p>

            {/* 고대비 윈윈 & 함정 비교 박스 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-3">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center text-emerald-950 font-black text-base sm:text-lg mb-3">
                  <div className="bg-emerald-500/10 p-1.5 rounded-lg mr-2 border border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>유사나 보상의 가치 포인트</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {currentStep.highlight}
                </p>
              </div>

              <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center text-rose-950 font-black text-base sm:text-lg mb-3">
                  <div className="bg-rose-500/10 p-1.5 rounded-lg mr-2 border border-rose-500/20">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                  </div>
                  <span>타사 보상의 숨겨진 애로사항</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {currentStep.pitfall}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 하단 제어 레일 */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100 mt-6 md:mt-8">
          <button
            onClick={handleGoFirst}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all text-center active:scale-95"
          >
            처음으로 돌아가기
          </button>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex-1 sm:flex-none bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-800 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all text-center active:scale-95 border border-slate-200"
            >
              이전 페이지
            </button>
            <button
              onClick={handleNext}
              disabled={currentIdx === compSteps.length - 1}
              className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all text-center active:scale-95"
            >
              다음 페이지
            </button>
          </div>
        </div>

        {/* 퀵 닷 네비게이터 */}
        <div className="pt-6 flex flex-wrap gap-2 justify-center border-t border-slate-100">
          {compSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentIdx(idx);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center ${
                currentIdx === idx
                  ? "bg-teal-600 text-white scale-110 shadow-md shadow-teal-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105"
              }`}
            >
              {step.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
