import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Search, X } from "lucide-react";
import { faqData } from "../data";

export default function FaqTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // Set first FAQ open by default

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* FAQ 인트로 패드 */}
      <div className="bg-white border border-slate-200 p-5 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              자주 묻는 질문과 답변 (FAQ 15선)
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">
            네트워크 비즈니스를 검토 중인 예비 파트너님들이 가장 날카롭고 궁금해하시는 질문들만 철저히 골라내어 정직히 작성하였습니다.
          </p>
        </div>

        {/* 검색 인풋 */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="궁금한 실전 질문 키워드 입력..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white text-slate-800 text-sm px-4 py-3 pl-10 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FAQ 카드형 아코디언 매핑 */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                key={faq.q}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-none hover:shadow-sm"
              >
                {/* 헤더 */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-start gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="inline-block bg-teal-50 text-teal-800 font-black text-[10px] px-2.5 py-1 rounded-md mb-1 uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 pr-1 leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-100 p-1.5 rounded-xl shrink-0 mt-1"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </motion.div>
                </button>

                {/* 바디 (애니메이션 탑재) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100/60 flex gap-3">
                        <span className="w-1 bg-teal-500 rounded-sm shrink-0 block self-stretch"></span>
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-1 pt-1">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl p-12 text-center text-slate-400 font-medium text-sm">
          ❌ 검색어 '{searchQuery}'를 포함하는 현명한 질문 답변이 존재하지 않습니다.
        </div>
      )}
    </div>
  );
}
