import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, X, HelpCircle } from "lucide-react";
import { glossaryData } from "../data";

export default function GlossaryTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGlossary = glossaryData.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 타이틀 및 검색 패널 */}
      <div className="bg-white border border-slate-200 p-5 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              유사나 보상플랜 초보자 용어사전
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">
            유사나 보상플랜에 자주 사용되는 전문 비즈니스 핵심 용어를 초보자 눈높이에 맞춰 쉽게 정리했습니다.
          </p>
        </div>

        {/* 검색 인풋 */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="알고 싶은 용어나 단어를 검색하세요..."
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

      {/* 목록 렌더링 */}
      {filteredGlossary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout animate-fade-in">
            {filteredGlossary.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.4) }}
                key={item.term}
                className="bg-white border border-slate-200/90 hover:border-teal-300 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow transition-all space-y-2 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-6 bg-teal-500 rounded-sm block"></span>
                  <h3 className="font-black text-lg text-teal-800 tracking-tight group-hover:text-teal-600 transition-colors">
                    {item.term}
                  </h3>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-1">
                  {item.meaning}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl p-12 text-center text-slate-400 font-medium text-sm">
          ❌ '{searchQuery}'에 매칭되는 전문 용어가 존재하지 않습니다. 다시 입력해 주세요!
        </div>
      )}
    </div>
  );
}
