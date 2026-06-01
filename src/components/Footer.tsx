interface FooterProps {
  onSwitchTab: (tabId: string) => void;
  currentTab: string;
}

export default function Footer({ onSwitchTab, currentTab }: FooterProps) {
  const links = [
    { id: "intro", label: "🌱 소개 및 가치" },
    { id: "steps", label: "🔄 보상플랜설명" },
    { id: "simulator", label: "🎮 공유연결 시뮬레이션" },
    { id: "vs", label: "📊 1BC vs 3bc" },
    { id: "glossary", label: "📖 보상 용어사전" },
    { id: "faq", label: "❓ 자주 묻는 질문" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        
        {/* 가로형 빠른 탭 가이드 링크 */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3.5 text-sm sm:text-base font-extrabold text-slate-300">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onSwitchTab(link.id)}
              className={`hover:text-teal-400 transition-colors uppercase outline-none focus:outline-none cursor-pointer ${
                currentTab === link.id ? "text-teal-400" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* 회사 교육용 법적 디스크레이머 */}
        <div className="text-[11px] text-slate-500 leading-relaxed max-w-3xl mx-auto border-t border-slate-800/60 pt-8">
          본 가이드 어플리케이션은 유사나 브랜드를 정직하게 전달하고자 개별 독립 디스트리뷰터가 예비 가망파트너들의 올바른 마케팅 이해를 돕기 목적으로 기획·개발한 특수 제작 교육 솔루션입니다. 본 가이드에 수록된 모든 수당등은 예시를 든 것으로 해당 금액을 보장하는 것은 아님며 개별적인 노력에 따라 변동이 있음을 알려드립니다.
        </div>

        {/* 저작권 표시 기여 (by kdy) */}
        <div className="text-slate-500 text-xs sm:text-sm space-y-1 border-t border-slate-800/80 pt-6">
          <p>© 2026 USANA Independent Distributor Education Systems. All rights reserved.</p>
          <p className="font-extrabold text-teal-500 mt-1 uppercase tracking-wide">
            copyright : dreamon(by kdy)
          </p>
        </div>
      </div>
    </footer>
  );
}
