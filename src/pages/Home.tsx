import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Shield, FileText, Search, BarChart3, FileCheck, ChevronRight, MessageSquare, BookOpen, Clock, Database, Zap, Lock } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const workflowSteps = [
    { phase: '01', label: 'INTAKE', desc: 'Intelligent request capture', icon: FileText },
    { phase: '02', label: 'CLARIFY', desc: 'Context & scope refinement', icon: MessageSquare },
    { phase: '03', label: 'RESEARCH', desc: 'Deep document analysis', icon: BookOpen },
    { phase: '04', label: 'SYNTHESIZE', desc: 'Strategic synthesis', icon: BarChart3 },
    { phase: '05', label: 'ANALYZE', desc: 'Data-driven insights', icon: Search },
    { phase: '06', label: 'DELIVER', desc: 'Human-validated output', icon: FileCheck }
  ]

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111]">
      {/* Architectural grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-8 py-6 lg:px-16 border-b border-[#e0e0e0]"
      >
        <div className="flex items-center gap-3">
          <img
            src="/logo_new.png"
            alt="Amdahl"
            className="h-10 w-auto"
            style={{ filter: 'invert(1) brightness(0)' }}
          />
          <span className="text-lg font-bold tracking-tight uppercase">Amdahl</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-sm text-[#666] uppercase tracking-wide">
          <a href="#workflow" className="hover:text-[#111] transition-colors">Process</a>
          <a href="#security" className="hover:text-[#111] transition-colors">Security</a>
          <a href="#contact" className="hover:text-[#111] transition-colors">Contact</a>
        </div>

        {/* Launching Soon Badge - New Design */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white text-xs font-medium tracking-wider uppercase rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Launching Soon
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 lg:px-16 pt-20 lg:pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#111]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666]">
                  Strategy Infrastructure
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight mb-8 uppercase">
                Built for
                <br />
                <span className="text-[#666]">government</span>
                <br />
                scale
              </h1>

              <p className="text-xl text-[#666] leading-relaxed max-w-lg mb-12">
                An AI-native strategy delivery system that transforms
                policy requests into consultant-grade outputs—deployed
                within your secure infrastructure.
              </p>

              {/* Email signup */}
              <form onSubmit={handleSubmit} className="max-w-md">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0 }}
                      className="flex"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@agency.gov"
                        className="flex-1 px-5 py-4 bg-white border-2 border-[#111] text-[#111] placeholder:text-[#999] focus:outline-none transition-all"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 bg-[#111] text-white font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#333] transition-colors"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Join
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 px-5 py-4 bg-[#111] text-white"
                    >
                      <Check className="w-5 h-5" />
                      <span className="font-medium uppercase tracking-wide">Confirmed</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Right column - Metrics grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* First Draft Speed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between hover:border-[#111] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-8 bg-[#e0e0e0] group-hover:bg-[#111] transition-colors" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight">&lt;2 Hrs</div>
                    <div className="text-xs uppercase tracking-wider text-[#666] mt-1">First Draft</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e0e0e0]">
                    <motion.div
                      className="h-full bg-[#111]"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>

                {/* Your Cloud */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between hover:border-[#111] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <Lock className="w-5 h-5 text-[#111]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="w-32 h-32 border-4 border-[#111] rounded-full" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight">Your</div>
                    <div className="text-3xl font-bold tracking-tight text-[#666]">Cloud</div>
                    <div className="text-xs uppercase tracking-wider text-[#666] mt-1">Zero External APIs</div>
                  </div>
                </motion.div>

                {/* Full Audit */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between hover:border-[#111] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="w-6 h-0.5 bg-[#e0e0e0] group-hover:bg-[#111] transition-colors" style={{ transitionDelay: `${i * 50}ms` }} />
                          <Check className="w-3 h-3 text-[#111]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight">Full</div>
                    <div className="text-xs uppercase tracking-wider text-[#666] mt-1">Audit Trail</div>
                  </div>
                </motion.div>

                {/* 24/7 Active */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="aspect-square bg-[#111] border-2 border-[#111] p-6 flex flex-col justify-between hover:bg-[#222] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#111]" />
                    </div>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="absolute bottom-8 right-6 opacity-10">
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                      <path d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 5" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">24/7</div>
                    <div className="text-xs uppercase tracking-wider text-[#888] mt-1">Always Active</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="relative z-10 border-y-2 border-[#e0e0e0] bg-white">
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-3 divide-x-2 divide-[#e0e0e0]">
            {[
              { icon: FileText, label: 'Intelligent Processing' },
              { icon: Search, label: 'Deep Research' },
              { icon: Shield, label: 'Human Control' }
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-8 px-6 flex items-center gap-4"
              >
                <item.icon className="w-6 h-6 text-[#111]" />
                <span className="text-sm font-medium uppercase tracking-wide">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section - Stepped blocks */}
      <section id="workflow" className="relative z-10 px-8 lg:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#111]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666]">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
              Six-stage pipeline
            </h2>
          </motion.div>

          {/* Stepped workflow */}
          <div className="relative">
            {/* Connection line (visible on desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-[#e0e0e0]" style={{ transform: 'rotate(4.5deg)', transformOrigin: 'left center' }} />

            <div className="grid md:grid-cols-6 gap-3">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                  style={{ marginTop: `${i * 20}px` }}
                >
                  {/* Arrow connector between steps */}
                  {i < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="hidden md:flex absolute -right-2 top-[70px] z-10 items-center justify-center"
                      style={{ transform: 'translateX(50%)' }}
                    >
                      <div className="w-8 h-8 bg-[#111] rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}

                  {/* Mobile arrow (between stacked cards) */}
                  {i < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.15 }}
                      className="md:hidden flex justify-center py-4"
                    >
                      <div className="w-8 h-8 bg-[#111] rounded-full flex items-center justify-center rotate-90">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-white border-2 border-[#e0e0e0] hover:border-[#111] transition-colors">
                    <div className="p-6 border-b-2 border-[#e0e0e0] bg-[#fafafa]">
                      <span className="text-3xl font-bold tracking-tight">{step.phase}</span>
                    </div>
                    <div className="p-6">
                      <div className="w-10 h-10 bg-[#111] flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold uppercase tracking-wide mb-1">{step.label}</h4>
                      <p className="text-sm text-[#666]">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section - Dark with layered blocks */}
      <section id="security" className="relative z-10 bg-[#111] text-white py-24 lg:py-32 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-white" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#888]">Security</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase">
                Fortress-grade
                <br />infrastructure
              </h2>
              <p className="text-xl text-[#888] leading-relaxed mb-8">
                Deployed entirely within your Microsoft 365 and Azure environment.
                Zero external dependencies. Complete data sovereignty.
              </p>
              <div className="space-y-4">
                {[
                  'FedRAMP-aligned architecture',
                  'Zero external API calls',
                  'Complete audit trail',
                  'Human approval gates'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-white" />
                    <span className="text-[#ccc] uppercase tracking-wide text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Layered blocks visualization */}
              <div className="relative aspect-square">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 border-2 border-white/20 bg-white/5"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute inset-4 border-2 border-white/30 bg-white/5"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute inset-8 border-2 border-white/40 bg-white/5"
                />
                <div className="absolute inset-12 border-2 border-white bg-white/10 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-white" />
                </div>

                {/* Labels */}
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-white text-[#111] text-xs font-bold uppercase tracking-wider">
                  Encrypted
                </div>
                <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-white text-[#111] text-xs font-bold uppercase tracking-wider">
                  Isolated
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 lg:px-16 py-24 border-b-2 border-[#e0e0e0]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-2">
                Ready to build?
              </h2>
              <p className="text-[#666]">
                Join government leaders on the early access list.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111] text-white font-bold uppercase tracking-wider hover:bg-[#333] transition-colors"
            >
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 px-8 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo_new.png"
              alt="Amdahl"
              className="h-8 w-auto"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
            <span className="font-bold uppercase tracking-wide">Amdahl</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-[#666] uppercase tracking-wide">
            <a href="mailto:contact@amdahl.app" className="hover:text-[#111] transition-colors">contact@amdahl.app</a>
            <a href="/privacy" className="hover:text-[#111] transition-colors">Privacy</a>
          </div>
          <div className="text-sm text-[#666]">
            © {new Date().getFullYear()} Amdahl
          </div>
        </div>
      </footer>
    </div>
  )
}
