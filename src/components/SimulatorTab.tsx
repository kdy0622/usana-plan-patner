import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, RefreshCw, Plus, Heart, Sparkles, TrendingUp, HelpCircle, Calculator, ExternalLink } from "lucide-react";
import { productList } from "../data";

interface SimulatorTabProps {
  onShowToast: (message: string) => void;
}

export default function SimulatorTab({ onShowToast }: SimulatorTabProps) {
  // Line values
  const [lineA, setLineA] = useState(0);
  const [lineB, setLineB] = useState(0);
  const [lineC, setLineC] = useState(0);
  const [lineD, setLineD] = useState(0);

  const filteredProducts = productList;

  const handleAddPoints = (line: "A" | "B" | "C" | "D", amount: number, label: string) => {
    let lineName = "";
    if (line === "A") {
      setLineA(prev => prev + amount);
      lineName = "A라인 (가족)";
    } else if (line === "B") {
      setLineB(prev => prev + amount);
      lineName = "B라인 (직장)";
    } else if (line === "C") {
      setLineC(prev => prev + amount);
      lineName = "C라인 (지인)";
    } else if (line === "D") {
      setLineD(prev => prev + amount);
      lineName = "D라인 (친구)";
    }
    onShowToast(`✨ ${lineName}에 ${label} (${amount}P) 점수가 실시간 적립·공유되었습니다!`);
  };

  const handleReset = () => {
    setLineA(0);
    setLineB(0);
    setLineC(0);
    setLineD(0);
    onShowToast("🔄 모든 실시간 적립 점수가 0으로 완벽 초기화되었습니다.");
  };

  // BC2 aggregates line A and B
  const bc2Left = lineA;
  const bc2Right = lineB;
  const bc2Lesser = Math.min(bc2Left, bc2Right);
  const bc2CP = (bc2Left >= 125 && bc2Right >= 125) ? bc2Lesser * 0.20 : 0;
  const bc2Formula = (bc2Left >= 125 && bc2Right >= 125) 
    ? `소실적 ${bc2Lesser}P × 20%` 
    : "125P 미만으로 이월";

  // BC3 aggregates line C and D
  const bc3Left = lineC;
  const bc3Right = lineD;
  const bc3Lesser = Math.min(bc3Left, bc3Right);
  const bc3CP = (bc3Left >= 125 && bc3Right >= 125) ? bc3Lesser * 0.20 : 0;
  const bc3Formula = (bc3Left >= 125 && bc3Right >= 125) 
    ? `소실적 ${bc3Lesser}P × 20%` 
    : "125P 미만으로 이월";

  // BC1 aggregates entire BC2 and BC3
  const bc1Left = lineA + lineB;
  const bc1Right = lineC + lineD;
  const bc1Lesser = Math.min(bc1Left, bc1Right);
  const bc1CP = (bc1Left >= 125 && bc1Right >= 125) ? bc1Lesser * 0.20 : 0;
  const bc1Formula = (bc1Left >= 125 && bc1Right >= 125) 
    ? `소실적 ${bc1Lesser}P × 20%` 
    : "125P 미만으로 이월";

  const totalCP = bc1CP + bc2CP + bc3CP;
  const totalPay = totalCP * 1150;

  return (
    <div className="space-y-6">
      {/* 가이드 패널 */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-6 h-6 text-teal-600" />
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            주급 시뮬레이션
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-850 active:scale-95 transition-all text-white px-5 py-3 rounded-2xl text-sm font-extrabold focus:outline-none"
          >
            <RefreshCw className="w-4 h-4" />
            <span>시뮬레이터 점수 0으로 리셋</span>
          </button>
          
          <div className="text-slate-500 font-medium text-xs sm:text-sm">
            💡 환산 수당 공식: (모든 내 가게 정산 CP 합산) × 고정환율 1,150원
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 왼쪽 피커 영역 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/95 p-5 rounded-3xl shadow-sm space-y-5">
            <div className="space-y-1">
              <h3 className="font-black text-lg sm:text-xl text-slate-900">
                🛒 실시간 제품 선택기
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                아래 제품들을 라인별 버튼으로 구매하여 점수 상승 결과를 즉시 확인해 보세요.
              </p>
            </div>

            {/* 제품 카드 목록 */}
            <div className="grid grid-cols-1 gap-3.5 max-h-[480px] overflow-y-auto pr-2 no-scrollbar border-t border-slate-100 pt-3">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={prod.name}
                    className="bg-slate-50 border border-slate-200/85 p-3.5 rounded-2xl flex flex-col justify-between space-y-3 shadow-none hover:shadow-sm"
                  >
                    <div>
                      <span className="font-extrabold text-slate-900 text-[13px] sm:text-sm block leading-snug">
                        {prod.name} 구매실적 : +{prod.p}p
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-dashed border-slate-200">
                      <button
                        onClick={() => handleAddPoints("A", prod.p, prod.name)}
                        className="bg-white hover:bg-teal-50 active:scale-95 transition text-slate-800 text-[11px] py-1.5 rounded-lg border border-slate-200/80 font-extrabold hover:border-teal-300 shadow-sm flex items-center justify-center"
                      >
                        A라인(가족) <span className="text-teal-600 text-sm sm:text-base font-black ml-1 scale-110 select-none animate-pulse">+</span>
                      </button>
                      <button
                        onClick={() => handleAddPoints("B", prod.p, prod.name)}
                        className="bg-white hover:bg-teal-50 active:scale-95 transition text-slate-800 text-[11px] py-1.5 rounded-lg border border-slate-200/80 font-extrabold hover:border-teal-300 shadow-sm flex items-center justify-center"
                      >
                        B라인(직장) <span className="text-teal-600 text-sm sm:text-base font-black ml-1 scale-110 select-none animate-pulse">+</span>
                      </button>
                      <button
                        onClick={() => handleAddPoints("C", prod.p, prod.name)}
                        className="bg-white hover:bg-teal-50 active:scale-95 transition text-slate-800 text-[11px] py-1.5 rounded-lg border border-slate-200/80 font-extrabold hover:border-teal-300 shadow-sm flex items-center justify-center"
                      >
                        C라인(지인) <span className="text-teal-600 text-sm sm:text-base font-black ml-1 scale-110 select-none animate-pulse">+</span>
                      </button>
                      <button
                        onClick={() => handleAddPoints("D", prod.p, prod.name)}
                        className="bg-white hover:bg-teal-50 active:scale-95 transition text-slate-800 text-[11px] py-1.5 rounded-lg border border-slate-200/80 font-extrabold hover:border-teal-300 shadow-sm flex items-center justify-center"
                      >
                        D라인(친구) <span className="text-teal-600 text-sm sm:text-base font-black ml-1 scale-110 select-none animate-pulse">+</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-xs">직관적 원터치 미세 테스팅 툴:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleAddPoints("A", 100, "100P 추가")}
                  className="bg-slate-100 hover:bg-teal-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-black tracking-tight transition-colors text-slate-700"
                >
                  A +100
                </button>
                <button
                  onClick={() => handleAddPoints("B", 100, "100P 추가")}
                  className="bg-slate-100 hover:bg-teal-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-black tracking-tight transition-colors text-slate-700"
                >
                  B +100
                </button>
                <button
                  onClick={() => handleAddPoints("C", 100, "100P 추가")}
                  className="bg-slate-100 hover:bg-teal-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-black tracking-tight transition-colors text-slate-700"
                >
                  C +100
                </button>
                <button
                  onClick={() => handleAddPoints("D", 100, "100P 추가")}
                  className="bg-slate-100 hover:bg-teal-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-black tracking-tight transition-colors text-slate-700"
                >
                  D +100
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 결과판 및 다이어그램 */}
        <div className="lg:col-span-7 space-y-6">
          {/* 주급 명세서 영수증 */}
          <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 space-y-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-lg sm:text-xl text-teal-400">
                📊 수당 계산 결과
              </h3>
            </div>

            {/* 가게별 기여 수당 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-extrabold block">1번 가게 (BC1) 수당</span>
                <div className="flex flex-wrap items-baseline justify-between mt-3 gap-2">
                  <span className={`text-[11px] font-medium leading-none ${bc1CP > 0 ? 'text-teal-300' : 'text-slate-400'}`}>
                    {bc1Formula}
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-400 leading-none">
                    {bc1CP.toFixed(1)} CP
                  </span>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-extrabold block">2번 가게 (BC2) 수당</span>
                <div className="flex flex-wrap items-baseline justify-between mt-3 gap-2">
                  <span className={`text-[11px] font-medium leading-none ${bc2CP > 0 ? 'text-teal-300' : 'text-slate-400'}`}>
                    {bc2Formula}
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-400 leading-none">
                    {bc2CP.toFixed(1)} CP
                  </span>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-extrabold block">3번 가게 (BC3) 수당</span>
                <div className="flex flex-wrap items-baseline justify-between mt-3 gap-2">
                  <span className={`text-[11px] font-medium leading-none ${bc3CP > 0 ? 'text-teal-300' : 'text-slate-400'}`}>
                    {bc3Formula}
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-400 leading-none">
                    {bc3CP.toFixed(1)} CP
                  </span>
                </div>
              </div>
            </div>

            {/* 종합 계산 */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div>
                <span className="text-slate-400 text-xs font-bold block">정산 후원 수당 총합</span>
                <span className="font-mono font-black text-xl text-teal-300">
                  {totalCP.toFixed(1)} CP
                </span>
              </div>
              <div className="sm:text-right bg-slate-900/50 p-4 rounded-2xl border border-white/15">
                <span className="text-teal-400 text-xs font-black block">예상 주급 (원화 환산)</span>
                <span className="font-black text-2xl sm:text-3xl text-emerald-300">
                  {totalPay.toLocaleString()} 원
                </span>
              </div>
            </div>
          </div>

          {/* 3BC 계보 다이어그램 */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-3xl flex flex-col items-center relative w-full h-[410px] sm:h-[480px] md:h-[500px] max-w-[620px] mx-auto shadow-sm select-none">
            <h4 className="font-black text-slate-850 text-xs sm:text-sm md:text-base mb-1 relative z-20 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm mt-1 shrink-0">
              🔗 각 BC(가게)별 공유점수 누계
            </h4>

            {/* Tree Area wrapper under the title */}
            <div className="relative w-full flex-grow mt-2">
              {/* 물리 연결 고품질 반응형 SVG */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <svg className="w-full h-full" style={{ zIndex: 0 }} viewBox="0 0 600 500" fill="none" preserveAspectRatio="none">
                  {/* Lines with high contrast colors */}
                  {/* BC1 TO BC2 */}
                  <line x1="300" y1="75" x2="132" y2="240" stroke="#0f766e" strokeWidth="2" strokeDasharray="5 4" />
                  {/* BC1 TO BC3 */}
                  <line x1="300" y1="75" x2="468" y2="240" stroke="#0f766e" strokeWidth="2" strokeDasharray="5 4" />
                  {/* BC2 TO A */}
                  <line x1="132" y1="240" x2="60" y2="410" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* BC2 TO B */}
                  <line x1="132" y1="240" x2="204" y2="410" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* BC3 TO C */}
                  <line x1="468" y1="240" x2="396" y2="410" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4 3" />
                  {/* BC3 TO D */}
                  <line x1="468" y1="240" x2="540" y2="410" stroke="#5b21b6" strokeWidth="1.5" strokeDasharray="4 3" />
                </svg>
              </div>

              {/* 구조 콘텐츠 노출 */}
              <div className="absolute inset-0 w-full h-full z-10">
              {/* TOP: BC1 */}
              <div 
                className="absolute bg-slate-950 text-white rounded-xl sm:rounded-2xl p-1.5 sm:p-4 text-center shadow-md border border-slate-800"
                style={{
                  left: "50%",
                  top: "15%",
                  transform: "translate(-50%, -50%)",
                  width: "36%",
                  maxWidth: "210px"
                }}
              >
                <span className="text-[7px] sm:text-[10px] text-teal-400 font-extrabold block uppercase tracking-wide">
                  나의 최상위 본점
                </span>
                <span className="font-extrabold text-[10px] sm:text-base leading-none">나 BC1</span>
                
                <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-1 sm:mt-2 pt-1 border-t border-slate-800 text-[8px] sm:text-xs">
                  <div className="border-r border-slate-800">
                    <span className="block text-slate-400 text-[7px] sm:text-[10px]">좌측 실적</span>
                    <span className="font-mono font-bold text-teal-300 text-[9px] sm:text-sm">
                      {bc1Left} P
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[7px] sm:text-[10px]">우측 실적</span>
                    <span className="font-mono font-bold text-teal-300 text-[9px] sm:text-sm">
                      {bc1Right} P
                    </span>
                  </div>
                </div>
              </div>

              {/* MID LEFT: BC2 */}
              <div 
                className="absolute bg-slate-900 text-white rounded-xl sm:rounded-2xl p-1.5 sm:p-3 text-center shadow-sm border border-slate-800 flex flex-col"
                style={{
                  left: "22%",
                  top: "48%",
                  transform: "translate(-50%, -50%)",
                  width: "32%",
                  maxWidth: "160px"
                }}
              >
                <span className="text-[7px] sm:text-[10px] text-sky-450 font-black block uppercase tracking-wide">
                  2번 지점 가게
                </span>
                <span className="font-extrabold text-[9px] sm:text-sm leading-none">나 BC2</span>

                <div className="grid grid-cols-2 gap-0.5 sm:gap-1 mt-1 sm:mt-2 pt-1 border-t border-slate-800 text-[7px] sm:text-[11px]">
                  <div className="border-r border-slate-800">
                    <span className="block text-slate-400 text-[7px]">L(가족)</span>
                    <span className="font-mono font-bold text-sky-300 text-[8px] sm:text-xs">{bc2Left} P</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[7px]">R(직장)</span>
                    <span className="font-mono font-bold text-sky-300 text-[8px] sm:text-xs">{bc2Right} P</span>
                  </div>
                </div>
              </div>

              {/* MID RIGHT: BC3 */}
              <div 
                className="absolute bg-slate-900 text-white rounded-xl sm:rounded-2xl p-1.5 sm:p-3 text-center shadow-sm border border-slate-800 flex flex-col"
                style={{
                  left: "78%",
                  top: "48%",
                  transform: "translate(-50%, -50%)",
                  width: "32%",
                  maxWidth: "160px"
                }}
              >
                <span className="text-[7px] sm:text-[10px] text-indigo-405 font-black block uppercase tracking-wide">
                  3번 지점 가게
                </span>
                <span className="font-extrabold text-[9px] sm:text-sm leading-none">나 BC3</span>

                <div className="grid grid-cols-2 gap-0.5 sm:gap-1 mt-1 sm:mt-2 pt-1 border-t border-slate-800 text-[7px] sm:text-[11px]">
                  <div className="border-r border-slate-800">
                    <span className="block text-slate-400 text-[7px]">L(지인)</span>
                    <span className="font-mono font-bold text-indigo-300 text-[8px] sm:text-xs">{bc3Left} P</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[7px]">R(친구)</span>
                    <span className="font-mono font-bold text-indigo-300 text-[8px] sm:text-xs">{bc3Right} P</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM A */}
              <div 
                className="absolute bg-teal-50/90 border border-teal-200 p-1 sm:p-2 rounded-xl shadow-sm text-center"
                style={{
                  left: "10%",
                  top: "82%",
                  transform: "translate(-50%, -50%)",
                  width: "20%",
                  maxWidth: "110px"
                }}
              >
                <span className="text-[6px] sm:text-[10px] text-teal-850 font-black block leading-none truncate">
                  A (가족)
                </span>
                <span className="font-mono font-black text-slate-900 text-[8px] sm:text-sm mt-0.5 sm:mt-1 block">
                  {lineA} P
                </span>
              </div>

              {/* BOTTOM B */}
              <div 
                className="absolute bg-sky-50/90 border border-sky-200 p-1 sm:p-2 rounded-xl shadow-sm text-center"
                style={{
                  left: "34%",
                  top: "82%",
                  transform: "translate(-50%, -50%)",
                  width: "20%",
                  maxWidth: "110px"
                }}
              >
                <span className="text-[6px] sm:text-[10px] text-sky-850 font-black block leading-none truncate">
                  B (직장)
                </span>
                <span className="font-mono font-black text-slate-900 text-[8px] sm:text-sm mt-0.5 sm:mt-1 block">
                  {lineB} P
                </span>
              </div>

              {/* BOTTOM C */}
              <div 
                className="absolute bg-indigo-50/90 border border-indigo-200 p-1 sm:p-2 rounded-xl shadow-sm text-center"
                style={{
                  left: "66%",
                  top: "82%",
                  transform: "translate(-50%, -50%)",
                  width: "20%",
                  maxWidth: "110px"
                }}
              >
                <span className="text-[6px] sm:text-[10px] text-indigo-850 font-black block leading-none truncate">
                  C (지인)
                </span>
                <span className="font-mono font-black text-slate-900 text-[8px] sm:text-sm mt-0.5 sm:mt-1 block">
                  {lineC} P
                </span>
              </div>

              {/* BOTTOM D */}
              <div 
                className="absolute bg-purple-55/90 border border-purple-200 p-1 sm:p-2 rounded-xl shadow-sm text-center"
                style={{
                  left: "90%",
                  top: "82%",
                  transform: "translate(-50%, -50%)",
                  width: "20%",
                  maxWidth: "110px"
                }}
              >
                <span className="text-[6px] sm:text-[10px] text-purple-855 font-black block leading-none truncate">
                  D (친구)
                </span>
                <span className="font-mono font-black text-slate-900 text-[8px] sm:text-sm mt-0.5 sm:mt-1 block">
                  {lineD} P
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 빠른 서비스 배너 추가 */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 border border-teal-200 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-slate-800">
          <div className="bg-teal-700 text-white p-2.5 rounded-xl shrink-0 shadow-sm shadow-teal-700/10">
            <Calculator className="w-5 h-5 text-teal-150" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-905 leading-snug">
              장바구니 간편계산기 & 유사나 제품보기
            </h3>
            <p className="text-slate-500 text-[11px] sm:text-xs">
              실제 웹서비스로 연결되는 모바일 전용 간편 계산기 및 유사나 제품의 특징과 성분 효능 등을 알아볼 수 있는 페이지입니다.(유사나Q)
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="https://www.usanaq.com/mobile/calc/usana_calc.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-250 text-slate-800 hover:text-teal-700 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-teal-600" />
            <span>간편계산기 이동</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-450" />
          </a>
          <a
            href="https://www.usanaq.com/mobile/order_new/order_step01_gallery.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-md shadow-teal-600/10 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-teal-200 fill-teal-100/20" />
            <span>유사나 제품보기</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-100" />
          </a>
        </div>
      </div>
    </div>
  );
}
