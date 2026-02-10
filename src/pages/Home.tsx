import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Check, Shield, FileText, Search, BarChart3, FileCheck, BookOpen, Clock, Database, Zap, Lock, Sparkles, Menu, X, TrendingUp } from 'lucide-react'
import { useRef } from 'react'

// Amdahl's Law speedup curve data generator
const amdahlSpeedup = (p: number, n: number) => 1 / ((1 - p) + p / n)

const generateCurvePoints = (p: number, maxN: number, steps: number) => {
  const points: { x: number; y: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const n = 1 + (maxN - 1) * (i / steps)
    const s = amdahlSpeedup(p, n)
    points.push({ x: n, y: s })
  }
  return points
}

const curvesConfig = [
  { p: 0.5, label: '50%', color: '#d1d5db' },
  { p: 0.75, label: '75%', color: '#9ca3af' },
  { p: 0.9, label: '90%', color: '#6b7280' },
  { p: 0.95, label: '95%', color: '#111' },
]

const CHART_W = 520
const CHART_H = 320
const PADDING = { top: 30, right: 75, bottom: 50, left: 80 }
const PLOT_W = CHART_W - PADDING.left - PADDING.right
const PLOT_H = CHART_H - PADDING.top - PADDING.bottom
const MAX_N = 64
const MAX_S = 20

const toSvgX = (n: number) => PADDING.left + ((n - 1) / (MAX_N - 1)) * PLOT_W
const toSvgY = (s: number) => PADDING.top + PLOT_H - ((s - 1) / (MAX_S - 1)) * PLOT_H

const AmdahlChart = () => {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Build the filled area path for the 95% curve
  const fillPoints = generateCurvePoints(0.95, MAX_N, 80)
  const fillD =
    fillPoints
      .map((pt, i) => {
        const x = toSvgX(pt.x)
        const y = toSvgY(Math.min(pt.y, MAX_S))
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ') +
    ` L${toSvgX(MAX_N)},${toSvgY(1)} L${toSvgX(1)},${toSvgY(1)} Z`

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="w-full h-auto"
      style={{ maxWidth: 580 }}
    >
      {/* Subtle fill under 95% curve */}
      <motion.path
        d={fillD}
        fill="#111"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Grid lines */}
      {[1, 5, 10, 15, 20].map((s) => (
        <g key={`grid-${s}`}>
          <line
            x1={PADDING.left}
            y1={toSvgY(s)}
            x2={PADDING.left + PLOT_W}
            y2={toSvgY(s)}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray={s === 1 ? '0' : '4 4'}
          />
          <text
            x={PADDING.left - 12}
            y={toSvgY(s) + 4}
            textAnchor="end"
            className="fill-[#999]"
            style={{ fontSize: 11, fontFamily: 'Inter, sans-serif' }}
          >
            {s}x
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {[1, 16, 32, 48, 64].map((n) => (
        <text
          key={`xlabel-${n}`}
          x={toSvgX(n)}
          y={PADDING.top + PLOT_H + 24}
          textAnchor="middle"
          className="fill-[#999]"
          style={{ fontSize: 11, fontFamily: 'Inter, sans-serif' }}
        >
          {n === 1 ? '1' : `${n}`}
        </text>
      ))}

      {/* X-axis label */}
      <text
        x={PADDING.left + PLOT_W / 2}
        y={CHART_H - 4}
        textAnchor="middle"
        className="fill-[#666]"
        style={{ fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
      >
        Resources Added
      </text>

      {/* Y-axis label */}
      <text
        x={0}
        y={0}
        textAnchor="middle"
        className="fill-[#666]"
        style={{ fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        transform={`translate(20, ${PADDING.top + PLOT_H / 2}) rotate(-90)`}
      >
        Speedup
      </text>

      {/* X axis line */}
      <line
        x1={PADDING.left}
        y1={PADDING.top + PLOT_H}
        x2={PADDING.left + PLOT_W}
        y2={PADDING.top + PLOT_H}
        stroke="#ccc"
        strokeWidth={1.5}
      />
      {/* Y axis line */}
      <line
        x1={PADDING.left}
        y1={PADDING.top}
        x2={PADDING.left}
        y2={PADDING.top + PLOT_H}
        stroke="#ccc"
        strokeWidth={1.5}
      />

      {/* Curves */}
      {curvesConfig.map((curve) => {
        const points = generateCurvePoints(curve.p, MAX_N, 80)
        const d = points
          .map((pt, i) => {
            const x = toSvgX(pt.x)
            const y = toSvgY(Math.min(pt.y, MAX_S))
            return `${i === 0 ? 'M' : 'L'}${x},${y}`
          })
          .join(' ')
        const lastPt = points[points.length - 1]
        const labelX = toSvgX(lastPt.x) + 8
        const labelY = toSvgY(Math.min(lastPt.y, MAX_S))

        return (
          <g key={curve.label}>
            <motion.path
              d={d}
              fill="none"
              stroke={curve.color}
              strokeWidth={curve.p === 0.95 ? 3 : 2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.8, delay: curve.p * 0.5, ease: 'easeOut' }}
            />
            <motion.text
              x={labelX}
              y={labelY + 4}
              style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: curve.p === 0.95 ? 700 : 500 }}
              className={curve.p === 0.95 ? 'fill-[#111]' : 'fill-[#999]'}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: curve.p * 0.5 + 1.5 }}
            >
              {curve.label}
            </motion.text>
          </g>
        )
      })}
    </svg>
  )
}

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    { phase: '01', label: 'INTAKE', desc: 'Capture your request', icon: FileText },
    { phase: '02', label: 'GATHER', desc: 'Pull internal documents', icon: Database },
    { phase: '03', label: 'RESEARCH', desc: 'Find authoritative sources', icon: BookOpen },
    { phase: '04', label: 'SYNTHESIZE', desc: 'Merge context & data', icon: BarChart3 },
    { phase: '05', label: 'DRAFT', desc: 'Generate deliverable', icon: FileCheck },
    { phase: '06', label: 'REVIEW', desc: 'Human validation', icon: Shield }
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
        className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 lg:px-16 border-b border-[#e0e0e0] bg-white/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/logo_new.png"
              alt="Amdahl"
              className="h-8 sm:h-10 w-auto"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
          </motion.div>
          <span className="text-base sm:text-lg font-bold tracking-tight uppercase">Amdahl</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-sm text-[#666] uppercase tracking-wide">
          <a href="#workflow" className="hover:text-[#111] transition-colors duration-300 relative group">
            Process
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#why-amdahl" className="hover:text-[#111] transition-colors duration-300 relative group">
            Why Amdahl
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

        <div className="flex items-center gap-3">
          {/* Launching Soon Badge - hidden on very small screens */}
          <motion.div
            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#111] text-white text-xs font-medium tracking-wider uppercase rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Launching Soon
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[57px] sm:top-[73px] left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#e0e0e0] overflow-hidden"
          >
            <div className="flex flex-col py-4 px-4 space-y-4">
              <a
                href="#workflow"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-lg"
              >
                Process
              </a>
              <a
                href="#why-amdahl"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-lg"
              >
                Why Amdahl
              </a>
              <a
                href="#security"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-lg"
              >
                Security
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-lg"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative z-10 px-4 sm:px-8 lg:px-16 pt-12 sm:pt-20 lg:pt-32 pb-16 sm:pb-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
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
                  Automating redundant government paperwork with AI
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight mb-6 sm:mb-8 uppercase">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  Strategy
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block text-[#666]"
                >
                  workflows
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block"
                >
                  automated
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-[#666] leading-relaxed max-w-lg mb-8 sm:mb-12"
              >
                Turn expensive consulting deliverables into on-demand software.
                Citation-backed reports from your internal documents and authoritative sources—available 24/7.
              </motion.p>

              {/* Email signup */}
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#111]/10 to-[#666]/10 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@agency.gov"
                        className="relative flex-1 px-3 sm:px-5 py-3 sm:py-4 bg-white border-2 border-[#111] text-[#111] placeholder:text-[#999] focus:outline-none transition-all text-sm sm:text-base"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative px-4 sm:px-6 py-3 sm:py-4 bg-[#111] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-sm sm:text-base"
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
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-3 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#111] flex items-center justify-center">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                    <div className="text-xl sm:text-3xl font-bold tracking-tight">&lt;2 Hrs</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666] mt-1">First Draft</div>
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-3 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#111] flex items-center justify-center">
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#111]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <motion.div
                      className="w-32 h-32 border-4 border-[#111] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-bold tracking-tight">Your</div>
                    <div className="text-xl sm:text-3xl font-bold tracking-tight text-[#666]">Cloud</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666] mt-1">Secure Connections</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02, borderColor: '#111' }}
                  className="aspect-square bg-white border-2 border-[#e0e0e0] p-3 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#111] flex items-center justify-center">
                      <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                    <div className="text-xl sm:text-3xl font-bold tracking-tight">Full</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#666] mt-1">Audit Trail</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square bg-[#111] border-2 border-[#111] p-3 sm:p-6 flex flex-col justify-between hover:bg-[#222] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#111]" />
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
                    <div className="text-xl sm:text-3xl font-bold tracking-tight text-white">24/7</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#888] mt-1">Always Active</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features bar */}
      <section className="relative z-10 border-y-2 border-[#e0e0e0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#e0e0e0]">
            {[
              { icon: FileText, label: 'Financial Forecasts' },
              { icon: Search, label: 'Performance Analysis' },
              { icon: Shield, label: 'Citation-Backed' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="py-4 sm:py-8 px-4 sm:px-6 flex items-center gap-3 sm:gap-4 hover:bg-[#fafafa] transition-colors"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#111] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="relative z-10 px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 sm:w-12 h-px bg-[#111]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666]">Process</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase">
              How it works
            </h2>
          </motion.div>

          {/* Workflow cards */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-[#e0e0e0]" style={{ transform: 'rotate(4.5deg)', transformOrigin: 'left center' }} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
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

      {/* Why Amdahl — Amdahl's Law Section */}
      <section id="why-amdahl" className="relative z-10 px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-white border-t-2 border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 sm:w-12 h-px bg-[#111]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666]">Our Namesake</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase">
              Why Amdahl
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#fafafa] border-2 border-[#e0e0e0] p-4 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#111]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666]">Amdahl's Law</span>
              </div>
              <AmdahlChart />
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {curvesConfig.map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <div className="w-5 h-0.5" style={{ background: c.color }} />
                    <span className="text-[11px] text-[#666] font-medium">{c.label} parallelizable</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Explanation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 uppercase">
                The bottleneck defines your speed
              </h3>
              <p className="text-base sm:text-lg text-[#666] leading-relaxed mb-6">
                Amdahl's Law is a simple idea: no matter how many people or tools you add, the overall speed of any process is limited by its slowest, most repetitive bottleneck.
              </p>
              <p className="text-base sm:text-lg text-[#666] leading-relaxed mb-6">
                In government, that bottleneck is clear. Agencies spend thousands of hours assembling the same types of reports every cycle: financial forecasts, performance analyses, retention reviews. The work is critical, but the process is repetitive.
              </p>
              <p className="text-base sm:text-lg text-[#111] leading-relaxed font-semibold mb-8">
                Amdahl removes that bottleneck. We automate the repetitive so your team can focus on what actually requires human judgment: strategy, decisions, and impact.
              </p>

              <div className="space-y-4">
                {[
                  'Same deliverables, fraction of the time',
                  'AI handles the repeatable; humans handle the strategic',
                  'Every output citation-backed and auditable'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-5 h-5 bg-[#111] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#666] uppercase tracking-wide text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 bg-[#111] text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-white" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#888]">Security</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 uppercase">
                Fortress-grade
                <br />infrastructure
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#888] leading-relaxed mb-6 sm:mb-8">
                Deployed on Azure Government and AWS GovCloud.
                Zero external dependencies. Complete data sovereignty.
              </p>
              <div className="space-y-4">
                {[
                  'Azure Government & AWS GovCloud',
                  'Secure API integrations',
                  'Every output citation-backed',
                  'Human review before delivery'
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
              <div className="relative aspect-square flex items-center justify-center max-w-[300px] sm:max-w-none mx-auto">
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
      <section className="relative z-10 px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b-2 border-[#e0e0e0]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase mb-2">
                Stop outsourcing
              </h2>
              <p className="text-sm sm:text-base text-[#666]">
                Get consultant-quality deliverables on demand.
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
      <footer id="contact" className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <img
              src="/logo_new.png"
              alt="Amdahl"
              className="h-6 sm:h-8 w-auto"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
            <span className="font-bold uppercase tracking-wide text-sm sm:text-base">Amdahl</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#666] uppercase tracking-wide">
            <a href="mailto:contact@amdahl.app" className="hover:text-[#111] transition-colors">contact@amdahl.app</a>
            <a href="/privacy" className="hover:text-[#111] transition-colors">Privacy</a>
          </div>
          <div className="text-xs sm:text-sm text-[#666]">
            © {new Date().getFullYear()} Amdahl
          </div>
        </div>
      </footer>
    </div>
  )
}
