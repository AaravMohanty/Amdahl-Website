import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Shield, FileText, Search, BarChart3, FileCheck, ChevronRight } from 'lucide-react'

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
    { phase: '01', label: 'INTAKE', desc: 'Request monitoring', icon: FileText },
    { phase: '02', label: 'CLARIFY', desc: 'Requirements gathering', icon: Search },
    { phase: '03', label: 'RESEARCH', desc: 'Document analysis', icon: Search },
    { phase: '04', label: 'SYNTHESIZE', desc: 'Output generation', icon: BarChart3 },
    { phase: '05', label: 'DELIVER', desc: 'Human approval', icon: FileCheck }
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
          <img src="/Logo.png" alt="Amdahl" className="h-10 w-auto" />
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
                {[
                  { value: '60%', label: 'Faster' },
                  { value: '100%', label: 'Sovereign' },
                  { value: 'Full', label: 'Audit' },
                  { value: '24/7', label: 'Active' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-end hover:border-[#111] transition-colors"
                  >
                    <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-[#666] mt-2">{stat.label}</div>
                  </motion.div>
                ))}
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
              Five-stage pipeline
            </h2>
          </motion.div>

          {/* Stepped workflow */}
          <div className="relative">
            <div className="grid md:grid-cols-5 gap-4">
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
            <img src="/Logo.png" alt="Amdahl" className="h-8 w-auto" />
            <span className="font-bold uppercase tracking-wide">Amdahl</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-[#666] uppercase tracking-wide">
            <a href="mailto:contact@amdahl.ai" className="hover:text-[#111] transition-colors">contact@amdahl.ai</a>
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
