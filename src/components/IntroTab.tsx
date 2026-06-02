import { motion } from "motion/react";
import { Sparkles, Sliders, ArrowRight, BookOpen, Users, HelpCircle, CheckCircle, ExternalLink } from "lucide-react";

interface IntroTabProps {
  onStartTour: () => void;
  onGoSimulator: () => void;
  onSwitchTab: (tabId: string) => void;
}

export default function IntroTab({ onStartTour, onGoSimulator, onSwitchTab }: IntroTabProps) {
  return (
    <div className="space-y-6">
      {/* 오프닝 배너 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-slate-800"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-transparent to-transparent opacity-60"></div>
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="inline-flex items-center space-x-1 bg-teal-500/10 text-teal-300 font-extrabold text-[10px] sm:text-xs px-3 py-1.5 rounded-full border border-teal-500/20">
            <Sparkles className="w-3 h-3 text-teal-400 animate-pulse" />
            <span>초보자 맞춤형 팩트 가이드</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight sm:leading-tight">
            평범한 소비 습관이 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400 bg-300% animate-gradient">
              평생 마르지 않는 수당 자산으로!
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            거창한 영업 없이 내가 먹던 보충제와 스킨케어를 고품격 <strong className="text-teal-300">유사나</strong> 스마트 브랜드로 체인지하여 건강을 챙기고, 그 혜택을 나누어 소득을 쌓는 일입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={onStartTour}
              className="group bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>🚀 보상플랜 비밀 투어</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onGoSimulator}
              className="bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-700 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <Sliders className="w-4 h-4 text-teal-400" />
              <span>🎮 주급 시뮬레이터</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 핵심 비전 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-4"
      >
        <div className="flex items-center space-x-2.5">
          <div className="bg-teal-50 p-2 rounded-xl border border-teal-100">
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            가치 있는 정보 연결과 상생의 무한 수당 원리
          </h2>
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          맛집을 알리듯 가치 있는 소비에 대한 정보를 주변에 심플하게 연결해 보세요. 유사나는 전 세계 <strong className="text-slate-800">100% 무제한 중복 누적</strong>으로 하부 실적 점수가 모두 공유되는 진정한 상생 공유 시스템입니다.
        </p>

        {/* 4개 라인 설명 */}
        <div className="bg-gradient-to-br from-slate-50 to-teal-50/20 rounded-2xl p-4 sm:p-6 border border-teal-100/50 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-teal-900 flex items-center space-x-1.5">
            <span>🧬 내 비즈니스의 4대 라이프 라인</span>
          </h3>
          <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
            복잡한 다중 구도가 아닌, 예를 들어 <strong>가족(A), 직장(B), 지인(C), 친구(D)</strong> 이렇게 4개의 소중한 관계의 사람들을 상호 밀착 라인으로 끈끈하게 도우며 성장하는 고도의 안정형 팀 비즈니스 구조입니다.
          </p>
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-teal-100 text-xs sm:text-sm flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-teal-950 font-extrabold text-[11px] sm:text-xs">
              각 가게(BC)가 완성(맥스아웃)되면 추가 매장(추가 BC)이 무제한 제공되어, 수당 상한선 장벽 없이 수억 대의 자산 소득으로 무한 확장됩니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
            <div className="bg-white p-2.5 rounded-xl border border-teal-50 text-center font-bold text-slate-800 text-[10px] sm:text-xs shadow-sm">
              <span className="text-teal-600 block text-[9px] font-extrabold mb-0.5">LINE A</span>
              가족 (BC2 좌측)
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-teal-50 text-center font-bold text-slate-800 text-[10px] sm:text-xs shadow-sm">
              <span className="text-teal-600 block text-[9px] font-extrabold mb-0.5">LINE B</span>
              직장 (BC2 우측)
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-teal-50 text-center font-bold text-slate-800 text-[10px] sm:text-xs shadow-sm">
              <span className="text-teal-600 block text-[9px] font-extrabold mb-0.5">LINE C</span>
              지인 (BC3 좌측)
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-teal-50 text-center font-bold text-slate-800 text-[10px] sm:text-xs shadow-sm">
              <span className="text-teal-600 block text-[9px] font-extrabold mb-0.5">LINE D</span>
              친구 (BC3 우측)
            </div>
          </div>
        </div>
      </motion.div>

      {/* 공식 홍보 브로셔 & 가이드북 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-gradient-to-br from-slate-50 to-teal-50/30 border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4"
      >
        <div className="flex items-center space-x-2">
          <div className="bg-teal-700 text-white p-2 rounded-xl shrink-0 shadow-sm shadow-teal-700/10">
            <BookOpen className="w-4 h-4 text-teal-100" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
              📖 공식 가이드북 & 회사소개서 온라인 북
            </h3>
            <p className="text-slate-500 text-[10px] sm:text-xs">
              모바일에 최적화되어 편하게 넘겨볼 수 있는 플립북 서비스입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://issuu.com/usanakorea/docs/_18b387dc56d8e8"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white hover:bg-teal-50/10 border border-slate-200 p-3 rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="text-xl sm:text-2xl shrink-0">📘</span>
              <div className="min-w-0">
                <span className="font-black text-slate-800 text-[11px] sm:text-xs block group-hover:text-teal-700 transition-colors">
                  유사나 전제품 가이드북
                </span>
                <span className="text-slate-400 text-[9px] sm:text-[10px] block truncate">영양 성분 & 가격 상세 안내</span>
              </div>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg text-slate-400 shrink-0">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://issuu.com/usanakorea/docs/_26e9a6d47b782c"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white hover:bg-emerald-50/10 border border-slate-200 p-3 rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="text-xl sm:text-2xl shrink-0">🏢</span>
              <div className="min-w-0">
                <span className="font-black text-slate-800 text-[11px] sm:text-xs block group-hover:text-emerald-700 transition-colors">
                  유사나 회사소개서
                </span>
                <span className="text-slate-400 text-[9px] sm:text-[10px] block truncate">설립 이념과 우수한 비전 소개</span>
              </div>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-lg text-slate-400 shrink-0">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </motion.div>

      {/* 필수 추천 링크 배너 (공식 제휴 채널) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <a
          href="https://www.usana.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white hover:bg-teal-50/10 border border-slate-200 hover:border-teal-300 p-4 rounded-2xl shadow-sm text-center transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <span className="text-3xl block mb-1 group-hover:scale-105 transition-transform">🌐</span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">유사나 공식 홈</h4>
            <p className="text-slate-500 text-[10px] sm:text-xs mt-1 leading-normal">
              글로벌 뉴트리션 선두 기업 유사나 헬스사이언스 공식 브랜드 페이지입니다.
            </p>
          </div>
          <span className="text-teal-600 font-extrabold text-[10px] sm:text-xs mt-2.5 inline-block group-hover:translate-x-0.5 transition-transform">
            웹사이트 방문하기 →
          </span>
        </a>

        <a
          href="https://www.youtube.com/@usanakorea"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white hover:bg-sky-50/10 border border-slate-200 hover:border-sky-300 p-4 rounded-2xl shadow-sm text-center transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <span className="text-3xl block mb-1 group-hover:scale-105 transition-transform">📺</span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">공식 유튜브 채널</h4>
            <p className="text-slate-500 text-[10px] sm:text-xs mt-1 leading-normal">
              뉴트리션 분석, 국가대표 선수 인터뷰 및 유용한 제품 정보 가이드 영상입니다.
            </p>
          </div>
          <span className="text-sky-600 font-extrabold text-[10px] sm:text-xs mt-2.5 inline-block group-hover:translate-x-0.5 transition-transform">
            공식 인터뷰 시청하기 →
          </span>
        </a>

        <a
          href="https://youtu.be/JNvWRdPQzXc?si=hxTCcStV2tgim5g6"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white hover:bg-amber-50/10 border border-slate-200 hover:border-amber-300 p-4 rounded-2xl shadow-sm text-center transition-all flex flex-col justify-between cursor-pointer"
        >
          <div>
            <span className="text-3xl block mb-1 group-hover:scale-105 transition-transform">🎬</span>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">보상플랜 간단 영상</h4>
            <p className="text-slate-500 text-[10px] sm:text-xs mt-1 leading-normal">
              쉽고 빠르게 흐름과 강점을 파악할 수 있는 핵심 보상플랜 가이드 설명 영상입니다.
            </p>
          </div>
          <span className="text-amber-600 font-extrabold text-[10px] sm:text-xs mt-2.5 inline-block group-hover:translate-x-0.5 transition-transform">
            가이드 영상 시청하기 →
          </span>
        </a>
      </motion.div>
    </div>
  );
}
