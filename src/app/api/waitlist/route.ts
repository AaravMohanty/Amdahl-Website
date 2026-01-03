import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // MOCK STORAGE: In production, send to database or EMS (Resend/SendGrid)
        // Checking for WAITLIST_ENDPOINT env var as requested
        const externalEndpoint = process.env.WAITLIST_ENDPOINT;

        if (externalEndpoint) {
            try {
                await fetch(externalEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
            } catch (e) {
                console.error("Failed to post to external waitlist:", e);
                // Fallback to success for user experience even if backend fails
            }
        } else {
            console.log(`[WAITLIST] New submission: ${email}`);
        }

        return NextResponse.json({ success: true, message: "Added to waitlist" });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
