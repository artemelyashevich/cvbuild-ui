'use client'

import Link from "next/link"
import { ArrowRight, Sparkles, MessageSquare, LayoutTemplate, FileDown } from "lucide-react"
import {LayoutHeader} from "@/widgets";

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans pt-24">
        <LayoutHeader />
        {/* ===== Hero ===== */}
        <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 text-center space-y-10">

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
            Резюме,
            <br />
            которое получает
            <br />
            <span className="relative inline-block mt-4">
            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10" />
            <span className="relative px-6 text-black">
              офферы
            </span>
          </span>
          </h1>

          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Пройдите AI-интервью и получите профессиональное,
            структурированное и ATS-friendly резюме за 10 минут.
          </p>

          <div className="flex justify-center gap-6 pt-6">

            <Link
                href="/builder/stage/welcome"
                className="
              group
              bg-[#D6FF00]
              text-black
              px-12
              h-16
              rounded-[2rem]
              font-black
              uppercase
              tracking-widest
              text-sm
              flex
              items-center
              gap-3
              transition-all
              hover:brightness-105
            "
            >
              Начать бесплатно
              <div className="bg-black text-[#D6FF00] rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </Link>

            <Link
                href="#how"
                className="
              border
              border-zinc-200
              bg-white
              px-12
              h-16
              rounded-[2rem]
              font-bold
              uppercase
              tracking-widest
              text-sm
              flex
              items-center
              transition-all
              hover:border-black
            "
            >
              Как это работает
            </Link>

          </div>
        </section>

        {/* ===== Features ===== */}
        <section id="how" className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "AI Интервью",
                desc: "Бот задаёт правильные вопросы и помогает раскрыть ваш опыт."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Умная генерация",
                desc: "Профессиональные формулировки, адаптация под ATS."
              },
              {
                icon: <LayoutTemplate className="w-6 h-6" />,
                title: "Современный дизайн",
                desc: "Минималистичные шаблоны без перегруза."
              },
              {
                icon: <FileDown className="w-6 h-6" />,
                title: "Экспорт",
                desc: "Готовый PDF для отправки рекрутеру."
              }
            ].map((item, i) => (
                <div
                    key={i}
                    className="
                relative
                border border-zinc-100
                bg-zinc-50/50
                rounded-[2.5rem]
                p-10
                hover:bg-white
                hover:border-black
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                group
              "
                >

                  <div className="absolute -right-4 -bottom-10 text-[8rem] font-black text-zinc-100 group-hover:text-zinc-50 transition-colors pointer-events-none">
                    0{i + 1}
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="
                  w-14 h-14
                  rounded-2xl
                  bg-white
                  shadow-sm
                  flex items-center justify-center
                  group-hover:bg-[#D6FF00]
                  group-hover:scale-110
                  transition-all
                ">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 mt-2 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                </div>
            ))}

          </div>

        </section>

        {/* ===== Value Section ===== */}
        <section className="bg-zinc-900 text-white py-28 px-6 text-center">

          <div className="max-w-3xl mx-auto space-y-8">

            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Не тратьте часы на
              <br />
              форматирование
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Сфокусируйтесь на опыте. AI сделает структуру,
              улучшит формулировки и подготовит документ
              для автоматических систем отбора.
            </p>

            <Link
                href="/builder/stage/welcome"
                className="
              inline-flex
              items-center
              justify-center
              bg-[#D6FF00]
              text-black
              h-16
              px-12
              rounded-[2rem]
              font-black
              uppercase
              tracking-widest
              text-sm
              transition-all
              hover:brightness-110
            "
            >
              Попробовать сейчас
            </Link>

          </div>

        </section>

        {/* ===== Footer ===== */}
        <footer className="py-12 text-center text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
          © {new Date().getFullYear()} AI Resume Builder
        </footer>

      </div>
  )
}
