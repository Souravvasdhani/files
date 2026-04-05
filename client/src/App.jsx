import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState("landing");
  const [showTos, setShowTos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otherNiche, setOtherNiche] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    platform: "", niche: "", follower_count: "",
    expected_rate: "", tos_accepted: false,
  });

  const niches = ["Fashion & Lifestyle","Tech & Gadgets","Food & Cooking","Travel","Fitness & Health","Beauty & Skincare","Gaming","Finance & Business","Education","Entertainment","Other"];
  const platforms = ["Instagram","YouTube","Twitter / X","LinkedIn","Moj","Josh","ShareChat","Multiple"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tos_accepted) { setError("Please accept the Terms of Service."); return; }
    setLoading(true);
    const finalNiche = form.niche === "Other" ? otherNiche : form.niche;
    try {
      const res = await fetch("https://influscout.onrender.com/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, niche: finalNiche }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setStep("success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const TOS = `INFLUSCOUT — INFLUENCER TERMS OF SERVICE
Last Updated: April 2025

1. ABOUT INFLUSCOUT
Influscout is a two-sided digital marketplace connecting content creators with brands for marketing collaborations. Influscout acts solely as a platform facilitator.

2. ELIGIBILITY
You must be at least 18 years of age, own the social media account you register with, and have genuine organic followers. No purchased or bot-generated followers allowed.

3. CAMPAIGN PARTICIPATION
Once you accept a Campaign, you must deliver agreed content within the agreed timeline. All content must comply with ASCI guidelines. Paid partnerships must be disclosed (#ad, #sponsored).

4. PAYMENTS & COMMISSION
Payments are processed through Influscout. A platform service fee applies per completed Campaign. You are solely responsible for all applicable taxes including GST and income tax.

5. PROHIBITED CONDUCT
No fake engagement metrics, no off-platform solicitation of brands, no defamatory or hateful content, no multiple accounts to manipulate ratings.

6. CONTENT OWNERSHIP
You retain copyright of original content. By publishing Campaign content, you grant the Brand a non-exclusive license to repurpose it for their marketing channels.

7. TERMINATION
Influscout may suspend or terminate your account for breach of these Terms or fraudulent activity.

8. GOVERNING LAW
These Terms are governed by the laws of India.

9. CONTACT
legal@influscout.com`;

  const s = {
    page: { fontFamily: "'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#fff" },
    nav: { display: "flex", justifyContent: "center", padding: "28px 20px" },
    logo: { fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.5px" },
    logoSpan: { color: "#f5c842" },
    wrap: { maxWidth: 480, margin: "0 auto", padding: "0 20px 80px" },
    hero: { textAlign: "center", padding: "50px 0" },
    badge: { display: "inline-block", background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.3)", borderRadius: 100, padding: "6px 16px", fontSize: "0.75rem", color: "#f5c842", letterSpacing: 1, textTransform: "uppercase", marginBottom: 28 },
    h1: { fontSize: "clamp(2.2rem,8vw,3.2rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 16 },
    gold: { color: "#f5c842" },
    sub: { color: "#888", lineHeight: 1.7, maxWidth: 340, margin: "0 auto 36px", fontSize: "0.95rem" },
    ctaBtn: { background: "#f5c842", color: "#0a0a0f", border: "none", padding: "15px 36px", borderRadius: 4, fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
    stats: { display: "flex", justifyContent: "center", gap: 40, marginTop: 52 },
    statNum: { fontSize: "1.7rem", fontWeight: 800, color: "#f5c842" },
    statLabel: { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 },
    divider: { height: 1, background: "rgba(245,200,66,0.15)", margin: "44px 0" },
    perk: { display: "flex", gap: 14, padding: 18, border: "1px solid rgba(245,200,66,0.15)", borderRadius: 8, background: "#111118", marginBottom: 14 },
    perkIcon: { fontSize: "1.3rem", flexShrink: 0 },
    perkTitle: { fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 },
    perkDesc: { fontSize: "0.82rem", color: "#888", lineHeight: 1.5 },
    backBtn: { background: "none", border: "1px solid rgba(245,200,66,0.2)", color: "#888", padding: "8px 16px", borderRadius: 4, fontSize: "0.82rem", cursor: "pointer", marginBottom: 28, display: "inline-block" },
    formTitle: { fontSize: "1.9rem", fontWeight: 800, letterSpacing: -1, marginBottom: 6 },
    formSub: { color: "#888", fontSize: "0.88rem", marginBottom: 28 },
    label: { display: "block", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, color: "#888", marginBottom: 7 },
    input: { width: "100%", background: "#111118", border: "1px solid rgba(245,200,66,0.15)", borderRadius: 6, padding: "12px 15px", color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13, marginBottom: 18 },
    group: { marginBottom: 18 },
    tosBox: { background: "#111118", border: "1px solid rgba(245,200,66,0.15)", borderRadius: 8, padding: 18, marginBottom: 18 },
    tosLink: { color: "#f5c842", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "0.82rem" },
    checkRow: { display: "flex", alignItems: "flex-start", gap: 12, marginTop: 14 },
    checkLabel: { fontSize: "0.84rem", color: "#ccc", lineHeight: 1.5, cursor: "pointer" },
    errBox: { background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: 6, padding: "11px 15px", color: "#ff6b6b", fontSize: "0.85rem", marginBottom: 16 },
    submitBtn: { width: "100%", background: "#f5c842", color: "#0a0a0f", border: "none", padding: 15, borderRadius: 6, fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginTop: 6 },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 },
    modal: { background: "#13131a", border: "1px solid rgba(245,200,66,0.2)", borderRadius: "12px 12px 0 0", width: "100%", maxWidth: 600, maxHeight: "80vh", display: "flex", flexDirection: "column" },
    modalHead: { padding: "18px 22px", borderBottom: "1px solid rgba(245,200,66,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" },
    closeBtn: { background: "none", border: "none", color: "#888", fontSize: "1.4rem", cursor: "pointer" },
    modalBody: { padding: 22, overflowY: "auto", flex: 1 },
    tosText: { fontSize: "0.82rem", color: "#aaa", lineHeight: 1.8, whiteSpace: "pre-wrap" },
    modalFoot: { padding: "14px 22px", borderTop: "1px solid rgba(245,200,66,0.15)" },
    acceptBtn: { width: "100%", background: "#f5c842", color: "#0a0a0f", border: "none", padding: 13, borderRadius: 6, fontWeight: 700, cursor: "pointer" },
    successWrap: { textAlign: "center", padding: "80px 0" },
    successIcon: { width: 70, height: 70, background: "rgba(245,200,66,0.1)", border: "2px solid #f5c842", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 28px" },
    successTitle: { fontSize: "2rem", fontWeight: 800, letterSpacing: -1, marginBottom: 10 },
    successSub: { color: "#888", lineHeight: 1.7 },
    successCard: { background: "#111118", border: "1px solid rgba(245,200,66,0.15)", borderRadius: 8, padding: 20, marginTop: 28, textAlign: "left" },
    successRow: { fontSize: "0.85rem", color: "#888", marginBottom: 8, display: "flex", gap: 10 },
  };

  return (
    <div style={s.page}>
      <div style={s.nav}><div style={s.logo}>influ<span style={s.logoSpan}>scout</span></div></div>

      {step === "landing" && (
        <div style={s.wrap}>
          <div style={s.hero}>
            <div style={s.badge}>Early Access Open</div>
            <h1 style={s.h1}>Get Paid to<br /><span style={s.gold}>Create.</span></h1>
            <p style={s.sub}>Influscout connects creators with brands that match your niche. No cold DMs. No chasing payments.</p>
            <button style={s.ctaBtn} onClick={() => setStep("form")}>Join as a Creator →</button>
            <div style={s.stats}>
              <div><div style={s.statNum}>500+</div><div style={s.statLabel}>Brands Waiting</div></div>
              <div><div style={s.statNum}>₹0</div><div style={s.statLabel}>To Join</div></div>
              <div><div style={s.statNum}>100%</div><div style={s.statLabel}>Secure Pay</div></div>
            </div>
          </div>
          <div style={s.divider} />
          {[
            { icon: "🎯", title: "Brand-Matched Campaigns", desc: "Get discovered by brands in your exact niche — fashion, tech, food, gaming, and more." },
            { icon: "🔒", title: "Escrow-Protected Payments", desc: "Payments are locked before you start. Released only after you deliver." },
            { icon: "📊", title: "Performance Dashboard", desc: "Track earnings, campaign history, and ratings in one place." },
            { icon: "⚡", title: "Early Access Perks", desc: "Waitlist creators get priority placement at launch." },
          ].map((p, i) => (
            <div style={s.perk} key={i}>
              <div style={s.perkIcon}>{p.icon}</div>
              <div><div style={s.perkTitle}>{p.title}</div><div style={s.perkDesc}>{p.desc}</div></div>
            </div>
          ))}
        </div>
      )}

      {step === "form" && (
        <div style={s.wrap}>
          <div style={{ paddingTop: 40 }}>
            <button style={s.backBtn} onClick={() => setStep("landing")}>← Back</button>
            <div style={s.formTitle}>Join the Waitlist</div>
            <div style={s.formSub}>Takes 2 minutes. Be first when we launch.</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={s.group}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div style={s.row}>
              <div>
                <label style={s.label}>Email</label>
                <input style={s.input} name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label style={s.label}>Phone</label>
                <input style={s.input} name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div style={s.row}>
              <div>
                <label style={s.label}>Platform</label>
                <select style={s.input} name="platform" value={form.platform} onChange={handleChange} required>
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={s.label}>Niche</label>
                <select style={s.input} name="niche" value={form.niche} onChange={handleChange} required>
                  <option value="">Select niche</option>
                  {niches.map(n => <option key={n}>{n}</option>)}
                </select>
                {form.niche === "Other" && (
                  <input
                    style={{ ...s.input, marginTop: 8 }}
                    placeholder="Describe your niche..."
                    value={otherNiche}
                    onChange={e => setOtherNiche(e.target.value)}
                    required
                  />
                )}
              </div>
            </div>
            <div style={s.row}>
              <div>
                <label style={s.label}>Followers</label>
                <input style={s.input} name="follower_count" type="number" placeholder="e.g. 12000" value={form.follower_count} onChange={handleChange} required />
              </div>
              <div>
                <label style={s.label}>Rate ₹/post</label>
                <input style={s.input} name="expected_rate" type="number" placeholder="e.g. 5000" value={form.expected_rate} onChange={handleChange} />
              </div>
            </div>
            <div style={s.tosBox}>
              <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: 10 }}>
                By joining you agree to Influscout's Influencer Terms of Service.
              </div>
              <button type="button" style={s.tosLink} onClick={() => setShowTos(true)}>Read full Terms of Service →</button>
              <div style={s.checkRow}>
                <input
                  type="checkbox"
                  id="tos"
                  name="tos_accepted"
                  checked={form.tos_accepted}
                  onChange={handleChange}
                  style={{ width: 20, height: 20, accentColor: "#f5c842", flexShrink: 0, marginTop: 2, cursor: "pointer" }}
                />
                <label htmlFor="tos" style={s.checkLabel}>
                  I have read and agree to the Influscout Influencer Terms of Service.
                </label>
              </div>
            </div>
            {error && <div style={s.errBox}>⚠ {error}</div>}
            <button type="submit" style={s.submitBtn} disabled={loading}>
              {loading ? "Submitting..." : "Join Influscout Waitlist →"}
            </button>
          </form>
        </div>
      )}

      {step === "success" && (
        <div style={s.wrap}>
          <div style={s.successWrap}>
            <div style={s.successIcon}>✓</div>
            <div style={s.successTitle}>You're on the list.</div>
            <p style={s.successSub}>We'll notify <strong>{form.email}</strong> when Influscout launches.</p>
            <div style={s.successCard}>
              <div style={s.successRow}>🎯 Platform: <strong>{form.platform}</strong></div>
              <div style={s.successRow}>📂 Niche: <strong>{form.niche === "Other" ? otherNiche : form.niche}</strong></div>
              <div style={s.successRow}>👥 Followers: <strong>{Number(form.follower_count).toLocaleString()}</strong></div>
              <div style={s.successRow}>✅ ToS accepted and recorded</div>
            </div>
          </div>
        </div>
      )}

      {showTos && (
        <div style={s.overlay} onClick={() => setShowTos(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHead}>
              <span style={{ fontWeight: 700 }}>Terms of Service</span>
              <button style={s.closeBtn} onClick={() => setShowTos(false)}>×</button>
            </div>
            <div style={s.modalBody}><div style={s.tosText}>{TOS}</div></div>
            <div style={s.modalFoot}>
              <button style={s.acceptBtn} onClick={() => { setForm(f => ({ ...f, tos_accepted: true })); setShowTos(false); }}>
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
