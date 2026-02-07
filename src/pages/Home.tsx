import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Shield, FileText, Search, BarChart3, FileCheck, MessageSquare, BookOpen, Clock, Database, Zap, Lock, Sparkles } from 'lucide-react'

// Floating Orb component for hero background
const FloatingOrb = ({
  size,
  color,
  delay = 0,
  duration = 10,
  initialX = 0,
  initialY = 0
}: {
  size: number
  color: string
  delay?: number
  duration?: number
  initialX?: number
  initialY?: number
}) => (
  <motion.div
    initial={{ x: initialX, y: initialY, scale: 0.8, opacity: 0 }}
    animate={{
      x: [initialX, initialX + 50, initialX - 30, initialX],
      y: [initialY, initialY - 60, initialY + 40, initialY],
      scale: [0.8, 1.1, 0.9, 0.8],
      opacity: [0.3, 0.5, 0.4, 0.3]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
    }}
  />
)


export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

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
    <div className="min-h-screen bg-[#f7f7f7] text-[#111] overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating orbs - softer colors for light theme */}
        <FloatingOrb size={600} color="rgba(99, 102, 241, 0.08)" initialX={-200} initialY={-100} delay={0} />
        <FloatingOrb size={400} color="rgba(16, 185, 129, 0.06)" initialX={800} initialY={200} delay={2} duration={12} />
        <FloatingOrb size={300} color="rgba(139, 92, 246, 0.07)" initialX={400} initialY={-50} delay={4} duration={8} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-8 py-6 lg:px-16 border-b border-[#e0e0e0] bg-white/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/logo_new.png"
              alt="Amdahl"
              className="h-10 w-auto"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
          </motion.div>
          <span className="text-lg font-bold tracking-tight uppercase">Amdahl</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-sm text-[#666] uppercase tracking-wide">
          <a href="#workflow" className="hover:text-[#111] transition-colors duration-300 relative group">
            Process
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#security" className="hover:text-[#111] transition-colors duration-300 relative group">
            Security
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#contact" className="hover:text-[#111] transition-colors duration-300 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Launching Soon Badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-[#111] text-white text-xs font-medium tracking-wider uppercase rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Launching Soon
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative z-10 px-8 lg:px-16 pt-20 lg:pt-32 pb-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-px bg-[#111]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666] flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Strategy Infrastructure
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight mb-8 uppercase">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  Built for
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block text-[#666]"
                >
                  government
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block"
                >
                  scale
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-[#666] leading-relaxed max-w-lg mb-12"
              >
                An AI-native strategy delivery system that transforms
                policy requests into consultant-grade outputs—deployed
                within your secure infrastructure.
              </motion.p>

              {/* Email signup */}
              <form onSubmit={handleSubmit} className="max-w-md">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#111]/10 to-[#666]/10 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@agency.gov"
                        className="relative flex-1 px-5 py-4 bg-white border-2 border-[#111] text-[#111] placeholder:text-[#999] focus:outline-none transition-all"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative px-6 py-4 bg-[#111] text-white font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#333] transition-colors"
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* First Draft Speed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-[#e0e0e0] group-hover:bg-[#111] transition-colors"
                          initial={{ height: 8 }}
                          animate={{ height: [8, 20, 32][i] }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        />
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
                      transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>

                {/* Your Cloud */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <Lock className="w-5 h-5 text-[#111]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <motion.div
                      className="w-32 h-32 border-4 border-[#111] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
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
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-[#111] flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <div className="w-6 h-0.5 bg-[#e0e0e0] group-hover:bg-[#111] transition-colors" />
                          <Check className="w-3 h-3 text-[#111]" />
                        </motion.div>
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
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
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
                      <motion.path
                        d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 5"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                      />
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
      </motion.section>

      {/* Features bar */}
      <section className="relative z-10 border-y-2 border-[#e0e0e0] bg-white">
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-3 divide-x-2 divide-[#e0e0e0]">
            {[
              { icon: FileText, label: 'Intelligent Processing' },
              { icon: Search, label: 'Deep Research' },
              { icon: Shield, label: 'Human Control' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="py-8 px-6 flex items-center gap-4 hover:bg-[#fafafa] transition-colors"
              >
                <item.icon className="w-6 h-6 text-[#111]" />
                <span className="text-sm font-medium uppercase tracking-wide">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
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

          {/* Workflow cards */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-[#e0e0e0]" style={{ transform: 'rotate(4.5deg)', transformOrigin: 'left center' }} />

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                  style={{ marginTop: `${i * 15}px` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, borderColor: '#111' }}
                    className="bg-white border-2 border-[#e0e0e0] transition-all duration-300 group"
                  >
                    <div className="p-4 border-b-2 border-[#e0e0e0] bg-[#fafafa]">
                      <span className="text-2xl font-bold tracking-tight">{step.phase}</span>
                    </div>
                    <div className="p-4">
                      <div className="w-10 h-10 bg-[#111] flex items-center justify-center mb-3">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold uppercase tracking-wide mb-1 text-sm">{step.label}</h4>
                      <p className="text-xs text-[#666]">{step.desc}</p>
                    </div>
                  </motion.div>

                  {/* Arrow connector */}
                  {i < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="hidden lg:flex absolute -right-1.5 top-[70px] z-10 items-center justify-center"
                      style={{ transform: 'translateX(50%)' }}
                    >
                      <div className="w-6 h-6 bg-[#111] rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
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
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#111]" />
                    </div>
                    <span className="text-[#ccc] uppercase tracking-wide text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Animated security visualization */}
              <div className="relative aspect-square flex items-center justify-center">
                {/* Animated rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/20"
                    style={{
                      width: `${100 - i * 20}%`,
                      height: `${100 - i * 20}%`,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.1 + i * 0.05, 0.3 + i * 0.05, 0.1 + i * 0.05]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  />
                ))}

                {/* Orbiting elements */}
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute w-3/4 h-3/4"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 right-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                </motion.div>

                {/* Center shield */}
                <motion.div
                  className="relative z-10 w-24 h-24 border-2 border-white bg-white/10 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 255, 255, 0.1)',
                      '0 0 40px rgba(255, 255, 255, 0.2)',
                      '0 0 20px rgba(255, 255, 255, 0.1)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="w-12 h-12 text-white" />
                </motion.div>

                {/* Labels */}
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 bg-white text-[#111] text-xs font-bold uppercase tracking-wider"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Encrypted
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 px-3 py-1 bg-white text-[#111] text-xs font-bold uppercase tracking-wider"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  Isolated
                </motion.div>
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
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111] text-white font-bold uppercase tracking-wider hover:bg-[#333] transition-colors"
            >
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </motion.a>
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
