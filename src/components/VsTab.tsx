import { motion } from "motion/react";
import { Check, ShieldAlert, Award, AlertCircle, Sparkles } from "lucide-react";

export default function VsTab() {
  return (
    <div className="space-y-8">
      {/* 핵심 앤서 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-2 border-teal-500 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5"
      >
        <span className="inline-flex items-center space-x-1 bg-teal-100 text-teal-800 font-extrabold text-xs px-3.5 py-1.5 rounded-full">
          <Award className="w-4 h-4 text-teal-700" />
          <span>성공전략 인사이트</span>
        </span>
        
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          가게 1개(1BC) vs 가게 3개(3BC) <br />
          <span className="text-teal-600">수익 극대화 비율 2배 격차 원리</span>
        </h2>
        
        <p className="text-slate-705 text-base sm:text-lg leading-relaxed">
          처음 가입 시 브랜드 체인지 수준에 따라 하나의 가게만 열거나, 세 개의 가게(BC)를 동시에 구축하여 사업을 시작할 수 있습니다. 동일한 매출 및 팀 볼륨이 발생할 시 3BC 구조는 수당이 더블로 복합 합산되기에 1BC에 비해 수령 주급 수당이 <strong>정확히 2배 이상의 차이</strong>가 생깁니다.
        </p>
      </motion.div>

      {/* 2대 포지션 대조 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1BC 포지션 */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm"
        >
          <span className="bg-slate-100 text-slate-700 font-black text-xs px-4 py-1.5 rounded-full inline-block">
            1BC 스타터 포지션
          </span>
          <h3 className="text-xl font-black text-slate-900">1번 매장 한 개만 소유했을 때</h3>
          
          <p className="text-slate-600 text-sm leading-relaxed">
            매달 평소 수준의 기본 영양 보충제나 기초 세안제를 브랜드 체인지(약 25만 원 / 100P 상당)할 때 자격이 유지되며, 좌우 오직 두 줄기로만 비즈니스가 뻗어 나갑니다.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 text-sm text-slate-700">
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
              <p><strong>구축 가능 핵심 라인:</strong> 단 2개 라인만 확장 가능</p>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
              <p><strong>수당 산출 기준:</strong> 1번 매장의 소실적 기준으로만 1회 정산</p>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-0.5" />
              <p><strong>소득 효율성 평가:</strong> 3BC 대비 수당 지급 및 활용 기본 1배형</p>
            </div>
          </div>
        </motion.div>

        {/* 3BC 포지션 */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border-2 border-teal-500/80 p-6 sm:p-8 rounded-3xl space-y-5 shadow-md shadow-teal-600/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-teal-500 text-slate-950 px-4 py-1 text-[11px] font-black tracking-wide rounded-bl-xl uppercase">
            RECOMMENDED
          </div>
          
          <span className="bg-teal-600 text-white font-black text-xs px-4 py-1.5 rounded-full inline-block">
            3BC 프로 비즈니스 포지션
          </span>
          <h3 className="text-xl font-black text-slate-900">처음부터 매장 3개를 소유했을 때</h3>
          
          <p className="text-slate-600 text-sm leading-relaxed">
            해독 다이어트 세트나 가족 구성원 전체 건강 케어 솔루션(약 50만 원 / 200P 상당)으로 브랜드 체인지를 시작할 때 회사로부터 무상으로 3BC 자격을 획득합니다.
          </p>

          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-3 text-sm text-slate-800">
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
              <p><strong>구축 가능 핵심 라인:</strong> 가족, 직장, 지인, 친구 총 4개 라인 확장</p>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
              <p>
                <strong>수당 산출 방식:</strong> 2번과 3번 정산 후, 1번 가게로 매출이 고스란히 이중 합산 공유(실시간 <strong>중복 인정 정산 2배</strong>)
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
              <p><strong>수익 배가 원칙:</strong> 동일한 팀 매출 기여 대비 수당 수령액 2배 보장</p>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
              <p>
                <strong>무한 확장성:</strong> 가게 완성(맥스아웃) 시마다 신규 추가BC를 2개씩 평생 무상 제공받아 무한 확장 가능
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 요약 비전 배너 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-4 border border-slate-800 relative z-10 overflow-hidden"
      >
        <div className="flex items-center space-x-2 text-teal-400 font-extrabold text-base sm:text-lg">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <span>왜 다들 처음부터 3BC를 선택할까요?</span>
        </div>
        <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
          비즈니스가 본 궤도에 올라 파트너들이 많아지고 조직이 아래로 깊이 형성되면, 나중에 마음을 바꾸더라도 기형성된 회원 배치를 3BC 구조로 재배치하는 것은 시스템 규정상 절대 불가능합니다. 
          똑같은 시간 동안 제품을 나누고 공부하며 전달했는데 수당의 크기가 수백만 원씩 영구적으로 절반이나 깎여서 나온다면 평생 아쉬운 결정이 될 것입니다. 따라서 진정한 플랜 B 자산 소득의 기반은 <strong>3BC 구조</strong>로 시작하는 것이 현명한 첩경입니다.
        </p>
      </motion.div>
    </div>
  );
}
