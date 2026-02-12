import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFY_EMAIL = 'aarav.mohanty23@gmail.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { email } = req.body || {}

    // Validate email
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
    }

    try {
        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            dateStyle: 'full',
            timeStyle: 'long',
        })

        await resend.emails.send({
            from: 'Amdahl Waitlist <onboarding@resend.dev>',
            to: NOTIFY_EMAIL,
            subject: `🚀 New Waitlist Signup: ${email}`,
            html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f7f7f7;">
          <div style="background: #111; color: white; padding: 24px 32px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
              New Waitlist Signup
            </h1>
          </div>
          <div style="background: white; border: 2px solid #e0e0e0; padding: 24px 32px;">
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">
              Email Address
            </p>
            <p style="margin: 0 0 24px 0; font-size: 18px; font-weight: 600; color: #111;">
              ${email}
            </p>
            <p style="margin: 0; font-size: 12px; color: #999;">
              Submitted on ${timestamp}
            </p>
          </div>
        </div>
      `,
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        console.error('Waitlist signup error:', error)
        return res.status(500).json({ error: 'Failed to process signup' })
    }
}
