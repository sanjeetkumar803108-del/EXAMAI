import type { Express, Request, Response } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import xss from "xss";
import nodemailer from "nodemailer";

export const DEVELOPER_SUPPORT_EMAIL = "helpyou.ai.support@gmail.com";
const AI_REPORTS_FILE = path.join(process.cwd(), "data", "ai_reports_vault.json");

// Ensure data folder exists
if (!fs.existsSync(path.join(process.cwd(), "data"))) {
  try {
    fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  } catch (_) {}
}

let aiReportsVault: any[] = [];
try {
  if (fs.existsSync(AI_REPORTS_FILE)) {
    const raw = fs.readFileSync(AI_REPORTS_FILE, "utf-8");
    aiReportsVault = JSON.parse(raw);
    if (!Array.isArray(aiReportsVault)) aiReportsVault = [];
  }
} catch (e) {
  aiReportsVault = [];
}

export const saveAiReportsToDisk = () => {
  try {
    fs.writeFileSync(AI_REPORTS_FILE, JSON.stringify(aiReportsVault, null, 2), "utf-8");
  } catch (err) {
    console.warn("[AI Report Vault] Error saving to disk:", err);
  }
};

/**
 * Automatically dispatches the AI report email directly to the developer at helpyou.ai.support@gmail.com
 * Uses Nodemailer if SMTP is configured, and automatically uses FormSubmit AJAX relay as a zero-config fallback.
 */
export async function dispatchReportEmail(reportData: {
  id: string;
  reason: string;
  details: string;
  aiOutput: string;
  context: string;
  userEmail: string;
  userId: string;
  timestamp: string;
}): Promise<{ sent: boolean; method: string; error?: string }> {
  const { id, reason, details, aiOutput, context, userEmail, userId, timestamp } = reportData;

  const emailSubject = `🚨 [AP Exam AI Report] ${reason} - (${context})`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 22px; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold;">🚨 AP Exam - AI Content Report</h2>
        <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 13px;">Report ID: <strong>${id}</strong> | Timestamp: ${new Date(timestamp).toLocaleString()}</p>
      </div>
      <div style="padding: 24px; color: #18181b;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a; width: 140px;">Report Reason:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #dc2626; font-size: 15px;">${xss(reason)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Feature / Context:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #4338ca;">${xss(context)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Student Email:</td>
            <td style="padding: 10px 0; font-weight: 500;">${xss(userEmail || "Not provided by student")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f4f4f5;">
            <td style="padding: 10px 0; font-weight: bold; color: #71717a;">Student User ID:</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 12px; color: #52525b;">${xss(userId || "N/A")}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #71717a; vertical-align: top;">Student Explanation:</td>
            <td style="padding: 10px 0; background: #fef2f2; border-radius: 8px; padding: 12px; color: #991b1b; font-size: 14px; line-height: 1.5;">
              ${xss(details || "No additional comments provided by student.")}
            </td>
          </tr>
        </table>

        <h4 style="margin: 22px 0 10px 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.6px;">Reported AI Output:</h4>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; color: #334155; max-height: 380px; overflow-y: auto; white-space: pre-wrap; word-break: break-word;">
${xss(aiOutput)}
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f4f4f5; text-align: center; font-size: 12px; color: #a1a1aa;">
          This automated security & content review report was dispatched directly from the AP Exam System to ${DEVELOPER_SUPPORT_EMAIL}.
        </div>
      </div>
    </div>
  `;

  // 1. Try direct Nodemailer if SMTP configured in environment
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || (process.env.GMAIL_USER ? 'gmail' : undefined),
        host: process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : undefined),
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"AP Exam AI Safety" <${smtpUser}>`,
        to: DEVELOPER_SUPPORT_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        text: `AI Content Report: ${reason}\nContext: ${context}\nDetails: ${details}\nStudent: ${userEmail}\nAI Output:\n${aiOutput}`
      });

      console.log(`[AI Report] Email sent via SMTP to ${DEVELOPER_SUPPORT_EMAIL}`);
      return { sent: true, method: "smtp" };
    } catch (smtpErr: any) {
      console.warn("[AI Report] SMTP send failed, falling back to FormSubmit relay:", smtpErr?.message);
    }
  }

  // 2. Automated HTTPS Relay via FormSubmit directly to DEVELOPER_SUPPORT_EMAIL
  try {
    const relayResponse = await fetch(`https://formsubmit.co/ajax/${DEVELOPER_SUPPORT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: emailSubject,
        _template: "table",
        _captcha: "false",
        developer_email: DEVELOPER_SUPPORT_EMAIL,
        report_id: id,
        report_reason: reason,
        feature_context: context,
        student_feedback: details || "No extra comment",
        student_email: userEmail || "Anonymous student",
        student_user_id: userId || "N/A",
        reported_at: timestamp,
        ai_output_snippet: aiOutput.length > 3000 ? aiOutput.substring(0, 3000) + "... [truncated]" : aiOutput
      })
    });

    const relayResult: any = await relayResponse.json().catch(() => ({}));
    if (relayResponse.ok) {
      console.log(`[AI Report] Email successfully dispatched via FormSubmit to ${DEVELOPER_SUPPORT_EMAIL}`);
      return { sent: true, method: "formsubmit_relay" };
    } else {
      console.warn("[AI Report] FormSubmit relay response not ok:", relayResult);
      return { sent: false, method: "formsubmit_relay", error: JSON.stringify(relayResult) };
    }
  } catch (relayErr: any) {
    console.error("[AI Report] Email relay error:", relayErr?.message);
    return { sent: false, method: "failed", error: relayErr?.message };
  }
}

/**
 * Registers AI Content Report endpoints on Express
 */
export function registerReportAiRoutes(app: Express) {
  app.post("/api/report-ai-content", async (req: Request, res: Response) => {
    try {
      const { reason, details, aiOutput, context, userEmail, userId } = req.body || {};

      if (!reason || !aiOutput) {
        return res.status(400).json({ error: "Missing required fields: reason and aiOutput are mandatory." });
      }

      const reportId = `report_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
      const timestamp = new Date().toISOString();

      const reportRecord = {
        id: reportId,
        reason: String(reason).trim(),
        details: String(details || "").trim(),
        aiOutput: String(aiOutput).trim(),
        context: String(context || "General AI Output").trim(),
        userEmail: String(userEmail || "").trim(),
        userId: String(userId || "").trim(),
        timestamp,
        status: "pending_review",
        notifiedEmail: DEVELOPER_SUPPORT_EMAIL
      };

      // 1. Save to disk vault immediately
      aiReportsVault.unshift(reportRecord);
      if (aiReportsVault.length > 500) aiReportsVault.pop();
      saveAiReportsToDisk();
      console.log(`[AI Report] Saved report ${reportId} to disk vault. Total: ${aiReportsVault.length}`);

      // 2. Dispatch email to developer in background
      dispatchReportEmail(reportRecord).then(emailStatus => {
        console.log(`[AI Report ${reportId}] Email delivery status:`, emailStatus);
      }).catch(err => {
        console.error(`[AI Report ${reportId}] Background email dispatch error:`, err);
      });

      return res.json({
        success: true,
        reportId,
        message: `Report received. Notification automatically sent to ${DEVELOPER_SUPPORT_EMAIL}.`
      });
    } catch (err: any) {
      console.error("[AI Report] Endpoint error:", err);
      return res.status(500).json({ error: err.message || "Failed to process AI report" });
    }
  });

  // Admin endpoint to view reports
  app.get("/api/ai-reports", (_req: Request, res: Response) => {
    res.json({ success: true, count: aiReportsVault.length, reports: aiReportsVault });
  });
}
