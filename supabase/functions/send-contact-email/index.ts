import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

/**
 * Supabase Edge Function: Send Contact Email via Resend
 * This function triggers whenever a new message is added to your database.
 */

const RESEND_API_KEY = "re_FVeMbZfo_NXFTv4T953pjpYsZafFr8NNq"
const TO_EMAIL = "yrohitprasad45@gmail.com" // Your Gmail

serve(async (req) => {
  try {
    // Get the new database record from the webhook payload
    const payload = await req.json()
    const { record } = payload
    
    if (!record) {
      return new Response(JSON.stringify({ error: "No record found" }), { status: 400 })
    }

    const { name, email, message } = record

    console.log(`Sending email for: ${name} <${email}>`)

    // Send via Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: `🚀 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00D6FF;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${message}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Sent via your AI Portfolio Supabase Edge Function.</p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log("Resend Response:", data)

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error("Error in Edge Function:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
