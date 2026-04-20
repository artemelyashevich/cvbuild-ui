'use client'

import Link from "next/link"
import { ArrowRight, Sparkles, MessageSquare, LayoutTemplate, FileDown, CheckCircle2, Zap, Shield, Star, ChevronRight, Globe, Clock, Award } from "lucide-react"
import { LayoutHeader } from "@/widgets"
import SmoothLink from "@/widgets/common/smooth-link"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-sans">
        <LayoutHeader />

        {/* ===== Hero Section ===== */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D6FF00]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className={`text-center space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D6FF00]/10 rounded-full">
                <Zap className="w-4 h-4 text-[#D6FF00]" />
                <span className="text-sm font-semibold text-black">AI-Powered Resume Builder</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto">
                Создайте резюме,
                <br />
                которое{" "}
                <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10" />
                <span className="relative px-4 text-black">
                  выделяется
                </span>
              </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Пройдите AI-интервью и получите профессиональное,
                структурированное и ATS-friendly резюме за 10 минут.
                <span className="font-semibold text-black"> Совершенно бесплатно.</span>
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                {[
                  { value: "10,000+", label: "Созданных резюме", icon: <FileDown className="w-4 h-4" /> },
                  { value: "98%", label: "Успешных кейсов", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { value: "5 мин", label: "Среднее время", icon: <Clock className="w-4 h-4" /> }
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-black">{stat.value}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        {stat.icon}
                        {stat.label}
                      </div>
                    </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Link
                    href="/builder/stage/welcome"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#D6FF00] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Начать бесплатно
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <SmoothLink href="#how">
                  <div className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer">
                    Как это работает
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </div>
                </SmoothLink>
              </div>

              {/* Trust badges */}
              <div className="pt-12">
                <p className="text-sm text-gray-400 mb-4">Доверяют компаниям:</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-50">
                  {["Google", "Microsoft", "Amazon", "Meta", "Tesla"].map((company) => (
                      <span key={company} className="text-sm font-semibold text-gray-600">{company}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Features Section ===== */}
        <section id="how" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Почему выбирают нас?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Инновационный подход к созданию резюме, который реально работает
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MessageSquare className="w-7 h-7" />,
                  title: "AI Интервью",
                  desc: "Бот задаёт правильные вопросы и помогает раскрыть ваш опыт наилучшим образом.",
                  color: "from-blue-500 to-cyan-500",
                  gradient: "bg-gradient-to-br from-blue-50 to-cyan-50"
                },
                {
                  icon: <Sparkles className="w-7 h-7" />,
                  title: "Умная генерация",
                  desc: "Профессиональные формулировки, адаптация под ATS и рекрутеров.",
                  color: "from-purple-500 to-pink-500",
                  gradient: "bg-gradient-to-br from-purple-50 to-pink-50"
                },
                {
                  icon: <LayoutTemplate className="w-7 h-7" />,
                  title: "Современный дизайн",
                  desc: "Минималистичные шаблоны без перегруза, которые привлекают внимание.",
                  color: "from-orange-500 to-red-500",
                  gradient: "bg-gradient-to-br from-orange-50 to-red-50"
                },
                {
                  icon: <FileDown className="w-7 h-7" />,
                  title: "Мгновенный экспорт",
                  desc: "Готовый PDF для отправки рекрутеру или печати в один клик.",
                  color: "from-green-500 to-emerald-500",
                  gradient: "bg-gradient-to-br from-green-50 to-emerald-50"
                }
              ].map((item, i) => (
                  <div
                      key={i}
                      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className={`${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <div className="text-gray-900">{item.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== How It Works ===== */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Как это работает?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Простой 3-шаговый процесс создания идеального резюме
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Проходите AI-интервью",
                  description: "Отвечайте на вопросы бота о вашем опыте и навыках. AI поможет структурировать мысли.",
                  icon: <MessageSquare className="w-8 h-8" />
                },
                {
                  step: "02",
                  title: "AI анализирует и улучшает",
                  description: "Наш алгоритм оптимизирует формулировки и адаптирует под требования ATS-систем.",
                  icon: <Sparkles className="w-8 h-8" />
                },
                {
                  step: "03",
                  title: "Скачиваете готовое резюме",
                  description: "Получайте профессиональное резюме в формате PDF, готовое к отправке.",
                  icon: <FileDown className="w-8 h-8" />
                }
              ].map((item, i) => (
                  <div key={i} className="relative text-center group">
                    <div className="text-8xl font-black text-gray-100 absolute -top-8 left-1/2 -translate-x-1/2">
                      {item.step}
                    </div>
                    <div className="relative pt-16">
                      <div className="w-20 h-20 bg-[#D6FF00]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <div className="text-black">{item.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    {i < 2 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 text-gray-300">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Value Proposition ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white py-28 px-6">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#D6FF00] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-[#D6FF00]" />
              <span className="text-sm font-semibold">Успех гарантирован</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Не тратьте часы на
              <br />
              форматирование
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Сфокусируйтесь на опыте. AI сделает структуру,
              улучшит формулировки и подготовит документ
              для автоматических систем отбора.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { text: "ATS-оптимизация", icon: <Shield className="w-5 h-5" /> },
                { text: "Профессиональные шаблоны", icon: <LayoutTemplate className="w-5 h-5" /> },
                { text: "Экспорт в PDF", icon: <FileDown className="w-5 h-5" /> }
              ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 text-gray-300">
                    {item.icon}
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
              ))}
            </div>

            <Link
                href="/builder/stage/welcome"
                className="inline-flex items-center justify-center bg-[#D6FF00] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Попробовать сейчас бесплатно
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <p className="text-sm text-gray-400 mt-6">
              Без регистрации и смс. Начинайте прямо сейчас!
            </p>
          </div>
        </section>

        {/* ===== Testimonials Section ===== */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Что говорят пользователи?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Уже 10,000+ человек нашли работу с нашими резюме
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Анна Смирнова",
                  role: "Product Manager",
                  text: "Получила оффер через 2 недели после использования сервиса! AI отлично помог структурировать опыт.",
                  rating: 5
                },
                {
                  name: "Дмитрий Козлов",
                  role: "Software Engineer",
                  text: "Лучший конструктор резюме. Формулировки стали профессиональнее, и рекрутеры начали активнее откликаться.",
                  rating: 5
                },
                {
                  name: "Елена Воронова",
                  role: "Marketing Director",
                  text: "Сэкономила кучу времени. Вместо 3 часов на составление - 10 минут с AI. Результат превзошел ожидания!",
                  rating: 5
                }
              ].map((testimonial, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 fill-[#D6FF00] text-[#D6FF00]" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Final CTA ===== */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-200">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Готовы начать карьеру мечты?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Присоединяйтесь к тысячам успешных кандидатов
              </p>
              <Link
                  href="/builder/stage/welcome"
                  className="inline-flex items-center justify-center bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl"
              >
                Создать резюме
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">AI Resume Builder</h3>
                <p className="text-gray-400 max-w-md">
                  Создайте резюме, которое выделит вас среди других кандидатов и поможет получить работу мечты.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Продукт</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-white transition">Возможности</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Цены</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Примеры</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Компания</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-white transition">О нас</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Блог</Link></li>
                  <li><Link href="#" className="hover:text-white transition">Контакты</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} AI Resume Builder. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}