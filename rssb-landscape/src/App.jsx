import { useState, useEffect, useCallback } from "react";
import pragmatexLogo from "./assets/Pragmatex Logo White - strap.svg";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://covaqywyfjjdegxbytwo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdmFxeXd5ZmpqZGVneGJ5dHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDg1ODAsImV4cCI6MjA4ODk4NDU4MH0.2VymaiGoUnVv6DJYxPJ-3An7ZjEmEh3Q2swtBp3cr30";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const USE_CASES = [
  { id: 1, label: "Low adhesion detection", category: "org", function: "operational", dimension: "efficiency" },
  { id: 2, label: "Automated track defect recognition", category: "org", function: "operational", dimension: "efficiency" },
  { id: 3, label: "Automated conflict detection for traffic management", category: "org", function: "operational", dimension: "efficiency" },
  { id: 4, label: "Engineers using AI to assist with programming", category: "org", function: "operational", dimension: "efficiency" },
  { id: 5, label: "Abnormal loads decision-making", category: "org", function: "operational", dimension: "efficiency" },
  { id: 6, label: "Enhanced network capability timetabling", category: "org", function: "operational", dimension: "efficiency" },
  { id: 7, label: "Asset data assurance and enrichment", category: "org", function: "operational", dimension: "efficiency" },
  { id: 8, label: "Using AI for risk modelling", category: "org", function: "operational", dimension: "efficiency" },
  { id: 9, label: "Data extraction from asset inspection reports", category: "org", function: "operational", dimension: "efficiency" },
  { id: 10, label: "Automated welding and track alignment", category: "org", function: "operational", dimension: "improve" },
  { id: 11, label: "Optimised disruption management and comms", category: "big", function: "operational", dimension: "improve" },
  { id: 12, label: "Automated level crossing object detection", category: "org", function: "operational", dimension: "improve" },
  { id: 13, label: "Train dispatch through image analysis", category: "big", function: "operational", dimension: "improve" },
  { id: 14, label: "Real-time weather predictions", category: "big", function: "operational", dimension: "improve" },
  { id: 15, label: "Automated rerouting of trains during disruption", category: "org", function: "operational", dimension: "improve" },
  { id: 16, label: "Automated vegetation monitoring", category: "org", function: "operational", dimension: "improve" },
  { id: 17, label: "Automated obstacle detection on the line", category: "big", function: "operational", dimension: "improve" },
  { id: 18, label: "Improved fleet servicing and delivery planning", category: "org", function: "operational", dimension: "improve" },
  { id: 19, label: "Optimised timetable recovery", category: "big", function: "operational", dimension: "improve" },
  { id: 20, label: "Predictive maintenance using historical and live data", category: "big", function: "operational", dimension: "improve" },
  { id: 21, label: "Enhanced delay incident management", category: "big", function: "operational", dimension: "improve" },
  { id: 22, label: "Enhanced overhead line monitoring", category: "big", function: "operational", dimension: "improve" },
  { id: 23, label: "Monitoring track condition through vehicle ride", category: "big", function: "operational", dimension: "improve" },
  { id: 24, label: "Advanced disruption prediction", category: "big", function: "operational", dimension: "improve" },
  { id: 25, label: "Optimised resource planning for possession work", category: "org", function: "operational", dimension: "improve" },
  { id: 26, label: "Enhanced shift planning", category: "big", function: "operational", dimension: "improve" },
  { id: 27, label: "Customised journey announcements", category: "big", function: "operational", dimension: "improve" },
  { id: 28, label: "Improved human behaviour analysis", category: "big", function: "operational", dimension: "new" },
  { id: 29, label: "Robotic maintenance", category: "org", function: "operational", dimension: "new" },
  { id: 30, label: "Optimised traction capacity", category: "big", function: "operational", dimension: "new" },
  { id: 31, label: "Measuring passenger flow during disruption", category: "big", function: "operational", dimension: "new" },
  { id: 32, label: "Automated trespass detection", category: "big", function: "operational", dimension: "new" },
  { id: 33, label: "Computer vision for train inspection", category: "org", function: "operational", dimension: "new" },
  { id: 34, label: "Using AI to reduce computational power requirements", category: "org", function: "operational", dimension: "new" },
  { id: 35, label: "Use of AI in CDAS", category: "big", function: "operational", dimension: "new" },
  { id: 36, label: "Data extraction from ops logs and incident reports", category: "org", function: "operational", dimension: "new" },
  { id: 37, label: "Integrated multimodal journey planning", category: "big", function: "operational", dimension: "new" },
  { id: 38, label: "Personalised travel advice", category: "big", function: "operational", dimension: "new" },
  { id: 39, label: "Real-time crowd management with AI announcements", category: "big", function: "operational", dimension: "new" },
  { id: 40, label: "Advanced fleet analytics", category: "org", function: "operational", dimension: "new" },
  { id: 41, label: "Cyber security improvements", category: "org", function: "business", dimension: "efficiency" },
  { id: 42, label: "Automated identification of standards conflicts", category: "big", function: "business", dimension: "efficiency" },
  { id: 43, label: "Improved revenue and demand modelling", category: "big", function: "business", dimension: "efficiency" },
  { id: 44, label: "Optimised capital delivery planning and assurance", category: "org", function: "business", dimension: "efficiency" },
  { id: 45, label: "Recruitment assistance", category: "org", function: "business", dimension: "efficiency" },
  { id: 46, label: "Enhanced fraud analysis", category: "org", function: "business", dimension: "efficiency" },
  { id: 47, label: "Optimised comparison of supplier costs", category: "big", function: "business", dimension: "efficiency" },
  { id: 48, label: "Non-rail specific asset defect prioritisation", category: "org", function: "business", dimension: "improve" },
  { id: 49, label: "Improving training for ops roles using AI decisions", category: "big", function: "business", dimension: "improve" },
  { id: 50, label: "AI insights to support digitalised driver forms", category: "big", function: "business", dimension: "improve" },
  { id: 51, label: "Interactive customer advice with chatbots", category: "big", function: "business", dimension: "improve" },
  { id: 52, label: "Automated conflict resolution in standards processes", category: "org", function: "business", dimension: "new" },
];

const SHARE_URL = "https://rssbaivote.vercel.app/";

const DIM_COLORS = {
  efficiency: { bg: "#0a2a1a", border: "#22c55e", text: "#4ade80", label: "Create Efficiency", accent: "#16a34a" },
  improve:    { bg: "#1a1a0a", border: "#f59e0b", text: "#fcd34d", label: "Improve Existing Capability", accent: "#d97706" },
  new:        { bg: "#0a1a2a", border: "#06b6d4", text: "#67e8f9", label: "Enabling New Capability", accent: "#0891b2" },
};

const CAT_COLORS = {
  org: { dot: "#94a3b8", label: "Organisation Use Case" },
  big: { dot: "#c084fc", label: "Big Opportunity for Rail" },
};

export default function App() {
  const [view, setView] = useState("landscape"); // landscape | results | gap | qr
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({});
  const [gaps, setGaps] = useState([]);
  const [gapText, setGapText] = useState("");
  const [gapDim, setGapDim] = useState("efficiency");
  const [gapFunc, setGapFunc] = useState("operational");
  const [gapSubmitted, setGapSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [filterDim, setFilterDim] = useState("all");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("use_case_id, vote_count");
      if (error) throw error;
      const voteMap = {};
      data.forEach(row => { voteMap[row.use_case_id] = row.vote_count; });
      setVotes(voteMap);
    } catch (e) {
      console.error("Failed to load votes:", e);
    }
    try {
      const gRes = await window.storage.get("rssb_gaps");
      if (gRes) setGaps(JSON.parse(gRes.value));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const toggleSelect = (id) => {
    if (submitted) return;
    if (selected.includes(id)) {
      setSelected(s => s.filter(x => x !== id));
    } else if (selected.length < 3) {
      setSelected(s => [...s, id]);
    }
  };

  const submitVotes = async () => {
    if (selected.length === 0) return;
    try {
      // Increment vote_count for each selected use case using Supabase RPC
      await Promise.all(selected.map(async (id) => {
        const { error } = await supabase.rpc("increment_vote", { row_use_case_id: id });
        if (error) throw error;
      }));
      // Reload votes from Supabase to reflect updated counts
      const { data, error } = await supabase
        .from("votes")
        .select("use_case_id, vote_count");
      if (error) throw error;
      const voteMap = {};
      data.forEach(row => { voteMap[row.use_case_id] = row.vote_count; });
      setVotes(voteMap);
      setSubmitted(true);
      setTimeout(() => setView("results"), 800);
    } catch (e) {
      console.error("Failed to submit votes:", e);
    }
  };

  const submitGap = async () => {
    if (!gapText.trim()) return;
    const newGap = { text: gapText.trim(), dim: gapDim, func: gapFunc, ts: Date.now() };
    const updated = [...gaps, newGap];
    try {
      await window.storage.set("rssb_gaps", JSON.stringify(updated), true);
      setGaps(updated);
      setGapText("");
      setGapSubmitted(true);
      setTimeout(() => setGapSubmitted(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const sortedUseCases = [...USE_CASES]
    .map(uc => ({ ...uc, voteCount: votes[uc.id] || 0 }))
    .sort((a, b) => b.voteCount - a.voteCount);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const maxVotes = Math.max(...Object.values(votes), 1);

  const filtered = filterDim === "all" ? USE_CASES : USE_CASES.filter(uc => uc.dimension === filterDim);

  const grouped = {};
  ["operational", "business"].forEach(fn => {
    ["efficiency", "improve", "new"].forEach(dim => {
      const key = `${fn}-${dim}`;
      grouped[key] = filtered.filter(uc => uc.function === fn && uc.dimension === dim);
    });
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a0f",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: "#e2e8f0",
      overflow: "auto",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f1923 0%, #0a1520 100%)",
        borderBottom: "1px solid #1e3a5f",
        padding: "16px 24px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={pragmatexLogo} alt="Pragmatex" style={{ height: 96, width: "auto" }} />
            <div style={{ width: 1, height: 44, background: "#1e3a5f" }} />
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#475569", textTransform: "uppercase", marginBottom: 3 }}>Landscape attributed to</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#60a5fa", textTransform: "uppercase", fontWeight: 700 }}>RSSB</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.03em", marginTop: 2, color: "#f1f5f9", lineHeight: 1.3 }}>
                RSSB's AI Rail Applications Landscape
              </div>
              <div style={{ fontSize: 12, color: "#3b82f6", fontWeight: 600, letterSpacing: "0.05em" }}>Have your say →</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "landscape", label: "🗺 Landscape" },
              { id: "results", label: "📊 Results" },
              { id: "gap", label: "💡 Suggest Gap" },
              { id: "qr", label: "📱 Share" },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setView(id)} style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 12, letterSpacing: "0.05em",
                border: view === id ? "1px solid #3b82f6" : "1px solid #1e3a5f",
                background: view === id ? "#1e3a5f" : "transparent",
                color: view === id ? "#93c5fd" : "#64748b",
                cursor: "pointer", transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 16px" }}>

        {/* LANDSCAPE VIEW */}
        {view === "landscape" && (
          <div>
            {/* Instructions */}
            <div style={{
              background: "linear-gradient(135deg, #0f1e2e, #0a1525)",
              border: "1px solid #1e3a5f",
              borderRadius: 10, padding: "14px 18px", marginBottom: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 15, color: "#93c5fd", fontWeight: 600, marginBottom: 4 }}>
                  Cast your votes — select your top 3 applications
                </div>
                <div style={{ fontSize: 13, color: "#475569" }}>
                  Click any application to select it. Choose up to 3, then submit your votes.
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>🏢 Org Use Case</span>
                  <span style={{ fontSize: 13, color: "#c084fc" }}>🚀 Big Opportunity</span>
                </div>
                <div style={{
                  background: selected.length === 3 ? "#1e3a5f" : "#0f1923",
                  border: `1px solid ${selected.length > 0 ? "#3b82f6" : "#1e3a5f"}`,
                  borderRadius: 8, padding: "8px 16px", display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontSize: 15, color: "#64748b" }}>
                    {submitted ? "✅ Votes submitted!" : `${selected.length} / 3 selected`}
                  </span>
                  {!submitted && (
                    <button onClick={submitVotes} disabled={selected.length === 0} style={{
                      background: selected.length > 0 ? "linear-gradient(135deg, #3b82f6, #06b6d4)" : "#1e293b",
                      color: selected.length > 0 ? "#fff" : "#334155",
                      border: "none", borderRadius: 6, padding: "8px 18px",
                      fontSize: 14, fontWeight: 700, cursor: selected.length > 0 ? "pointer" : "default",
                      letterSpacing: "0.05em", transition: "all 0.2s",
                    }}>SUBMIT →</button>
                  )}
                </div>
              </div>
            </div>

            {/* Dim filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {[["all", "#64748b", "All"], ["efficiency", "#4ade80", "Create Efficiency"], ["improve", "#fcd34d", "Improve Existing"], ["new", "#67e8f9", "Enabling New"]].map(([key, color, label]) => (
                <button key={key} onClick={() => setFilterDim(key)} style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: 13, letterSpacing: "0.05em",
                  border: `1px solid ${filterDim === key ? color : "#1e3a5f"}`,
                  background: filterDim === key ? `${color}20` : "transparent",
                  color: filterDim === key ? color : "#475569",
                  cursor: "pointer", transition: "all 0.15s",
                }}>{label}</button>
              ))}
            </div>

            {/* Grid */}
            {["operational", "business"].map(fn => (
              <div key={fn} style={{ marginBottom: 12 }}>
                {/* Function label */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                  paddingLeft: 4,
                }}>
                  <div style={{ width: 3, height: 20, background: fn === "operational" ? "#3b82f6" : "#8b5cf6", borderRadius: 2 }} />
                  <span style={{ fontSize: 13, letterSpacing: "0.15em", color: fn === "operational" ? "#60a5fa" : "#a78bfa", textTransform: "uppercase", fontWeight: 700 }}>
                    {fn === "operational" ? "Operational Railway" : "Business Support Functions"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {["efficiency", "improve", "new"].map(dim => {
                    const dc = DIM_COLORS[dim];
                    const items = grouped[`${fn}-${dim}`];
                    return (
                      <div key={dim} style={{
                        background: dc.bg,
                        border: `1px solid ${dc.border}30`,
                        borderTop: `2px solid ${dc.border}`,
                        borderRadius: 8, padding: 12, minHeight: 160,
                      }}>
                        <div style={{ fontSize: 12, letterSpacing: "0.12em", color: dc.text, textTransform: "uppercase", fontWeight: 700, marginBottom: 10, opacity: 0.9 }}>
                          {dc.label}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {items.map(uc => {
                            const isSelected = selected.includes(uc.id);
                            const isHovered = hoveredId === uc.id;
                            const voteCount = votes[uc.id] || 0;
                            return (
                              <div key={uc.id}
                                onClick={() => toggleSelect(uc.id)}
                                onMouseEnter={() => setHoveredId(uc.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                  padding: "8px 8px",
                                  borderRadius: 5,
                                  border: isSelected ? `1px solid ${dc.border}` : `1px solid transparent`,
                                  background: isSelected ? `${dc.border}18` : isHovered ? "#ffffff08" : "transparent",
                                  cursor: submitted ? "default" : "pointer",
                                  transition: "all 0.12s",
                                  display: "flex", alignItems: "flex-start", gap: 7,
                                }}
                              >
                                <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>
                                  {uc.category === "org" ? "🏢" : "🚀"}
                                </span>
                                <span style={{ fontSize: 13, color: isSelected ? "#f1f5f9" : "#94a3b8", lineHeight: 1.45, flex: 1 }}>
                                  {uc.label}
                                </span>
                                {isSelected && <span style={{ fontSize: 13, color: dc.text, flexShrink: 0 }}>✓</span>}
                                {voteCount > 0 && !isSelected && (
                                  <span style={{ fontSize: 11, color: "#475569", flexShrink: 0 }}>{voteCount}v</span>
                                )}
                              </div>
                            );
                          })}
                          {items.length === 0 && (
                            <div style={{ fontSize: 11, color: "#334155", fontStyle: "italic", padding: "8px 0" }}>No items in this segment</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTS VIEW */}
        {view === "results" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { label: "Total Votes Cast", value: totalVotes, color: "#3b82f6" },
                { label: "Gaps Suggested", value: gaps.length, color: "#c084fc" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  background: "#0a1520", border: `1px solid ${color}30`, borderRadius: 10,
                  padding: "16px 20px",
                }}>
                  <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Top voted */}
              <div style={{ background: "#0a1520", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                  📊 Vote Leaderboard
                </div>
                {loading ? (
                  <div style={{ color: "#334155", fontSize: 12 }}>Loading...</div>
                ) : sortedUseCases.filter(uc => uc.voteCount > 0).length === 0 ? (
                  <div style={{ color: "#334155", fontSize: 12 }}>No votes yet — be the first!</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {sortedUseCases.filter(uc => uc.voteCount > 0).slice(0, 15).map((uc, i) => {
                      const dc = DIM_COLORS[uc.dimension];
                      const pct = (uc.voteCount / maxVotes) * 100;
                      return (
                        <div key={uc.id} style={{ position: "relative" }}>
                          <div style={{
                            position: "absolute", top: 0, left: 0, height: "100%",
                            width: `${pct}%`, background: `${dc.border}18`, borderRadius: 4,
                            transition: "width 0.5s ease",
                          }} />
                          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "5px 8px" }}>
                            <span style={{ fontSize: 10, color: "#334155", width: 16, flexShrink: 0, textAlign: "right" }}>#{i + 1}</span>
                            <span style={{ fontSize: 11, flexShrink: 0 }}>{uc.category === "org" ? "🏢" : "🚀"}</span>
                            <span style={{ fontSize: 11, color: "#94a3b8", flex: 1, lineHeight: 1.3 }}>{uc.label}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: dc.text, flexShrink: 0 }}>{uc.voteCount}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Gaps submitted */}
              <div style={{ background: "#0a1520", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", color: "#c084fc", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                  💡 Suggested Gaps
                </div>
                {gaps.length === 0 ? (
                  <div style={{ color: "#334155", fontSize: 12 }}>No gaps suggested yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
                    {[...gaps].reverse().map((g, i) => {
                      const dc = DIM_COLORS[g.dim];
                      return (
                        <div key={i} style={{
                          background: "#0f1923", border: `1px solid ${dc.border}30`,
                          borderLeft: `3px solid ${dc.border}`, borderRadius: 6, padding: "8px 12px",
                        }}>
                          <div style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.4, marginBottom: 4 }}>{g.text}</div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ fontSize: 9, color: dc.text, background: `${dc.border}18`, padding: "2px 6px", borderRadius: 3 }}>{dc.label}</span>
                            <span style={{ fontSize: 9, color: g.func === "operational" ? "#60a5fa" : "#a78bfa", background: g.func === "operational" ? "#1e3a5f" : "#2e1a5f", padding: "2px 6px", borderRadius: 3 }}>
                              {g.func === "operational" ? "Operational" : "Business Support"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Dimension breakdown */}
            <div style={{ background: "#0a1520", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16, marginTop: 16 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", color: "#64748b", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                Votes by Capability Dimension
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {["efficiency", "improve", "new"].map(dim => {
                  const dc = DIM_COLORS[dim];
                  const dimVotes = USE_CASES.filter(uc => uc.dimension === dim).reduce((acc, uc) => acc + (votes[uc.id] || 0), 0);
                  const dimPct = totalVotes > 0 ? Math.round((dimVotes / totalVotes) * 100) : 0;
                  return (
                    <div key={dim} style={{ background: dc.bg, border: `1px solid ${dc.border}30`, borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: dc.text, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{dc.label}</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: dc.border }}>{dimPct}%</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>{dimVotes} votes</div>
                      <div style={{ height: 4, background: "#0f1923", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${dimPct}%`, background: dc.border, borderRadius: 2, transition: "width 0.5s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GAP SUGGESTION VIEW */}
        {view === "gap" && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ background: "#0a1520", border: "1px solid #1e3a5f", borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 14, letterSpacing: "0.1em", color: "#c084fc", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                💡 Suggest a Missing Application
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 24, lineHeight: 1.6 }}>
                Identify an AI application you feel is currently absent from the landscape. Your suggestion will appear in the Results panel for review.
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Describe the missing application *
                </label>
                <textarea
                  value={gapText}
                  onChange={e => setGapText(e.target.value)}
                  placeholder="e.g. AI-driven energy optimisation across the network using real-time demand data..."
                  rows={4}
                  style={{
                    width: "100%", background: "#050a0f", border: "1px solid #1e3a5f",
                    borderRadius: 8, padding: "12px 14px", color: "#e2e8f0",
                    fontSize: 12, fontFamily: "inherit", resize: "vertical",
                    outline: "none", boxSizing: "border-box", lineHeight: 1.6,
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    Railway Function
                  </label>
                  <select value={gapFunc} onChange={e => setGapFunc(e.target.value)} style={{
                    width: "100%", background: "#050a0f", border: "1px solid #1e3a5f",
                    borderRadius: 6, padding: "9px 12px", color: "#e2e8f0",
                    fontSize: 12, fontFamily: "inherit", outline: "none",
                  }}>
                    <option value="operational">Operational Railway</option>
                    <option value="business">Business Support Functions</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    Capability Dimension
                  </label>
                  <select value={gapDim} onChange={e => setGapDim(e.target.value)} style={{
                    width: "100%", background: "#050a0f", border: "1px solid #1e3a5f",
                    borderRadius: 6, padding: "9px 12px", color: "#e2e8f0",
                    fontSize: 12, fontFamily: "inherit", outline: "none",
                  }}>
                    <option value="efficiency">Create Efficiency</option>
                    <option value="improve">Improve Existing Capability</option>
                    <option value="new">Enabling New Capability</option>
                  </select>
                </div>
              </div>

              {gapSubmitted ? (
                <div style={{ background: "#0a2a1a", border: "1px solid #22c55e", borderRadius: 8, padding: "12px 16px", textAlign: "center", color: "#4ade80", fontSize: 13 }}>
                  ✅ Gap suggestion submitted — thank you!
                </div>
              ) : (
                <button onClick={submitGap} disabled={!gapText.trim()} style={{
                  width: "100%", padding: "12px 20px",
                  background: gapText.trim() ? "linear-gradient(135deg, #7c3aed, #c084fc)" : "#1e293b",
                  color: gapText.trim() ? "#fff" : "#334155",
                  border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700,
                  cursor: gapText.trim() ? "pointer" : "default",
                  letterSpacing: "0.08em", fontFamily: "inherit", transition: "all 0.2s",
                }}>
                  SUBMIT GAP SUGGESTION →
                </button>
              )}
            </div>

            {/* Recent gaps preview */}
            {gaps.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  Recent Suggestions ({gaps.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[...gaps].reverse().slice(0, 5).map((g, i) => {
                    const dc = DIM_COLORS[g.dim];
                    return (
                      <div key={i} style={{
                        background: "#0a1520", border: `1px solid ${dc.border}30`,
                        borderLeft: `3px solid ${dc.border}`, borderRadius: 6, padding: "10px 14px",
                      }}>
                        <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.4 }}>{g.text}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* QR VIEW */}
        {view === "qr" && (
          <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
            <div style={{ background: "#0a1520", border: "1px solid #1e3a5f", borderRadius: 14, padding: 36 }}>
              <div style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Share This Tool</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 24, lineHeight: 1.3 }}>
                Scan to Vote on<br />
                <span style={{ color: "#3b82f6" }}>RSSB's AI Rail Applications</span>
              </div>

              {/* QR Code */}
              <div style={{
                display: "inline-block", background: "#fff", padding: 16,
                borderRadius: 12, marginBottom: 24,
                boxShadow: "0 0 40px #3b82f640",
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(SHARE_URL)}&color=050a0f&bgcolor=ffffff&qzone=1&format=png`}
                  alt="QR Code"
                  width={220} height={220}
                  style={{ display: "block" }}
                />
              </div>

              <div style={{ fontSize: 11, color: "#334155", marginBottom: 20, lineHeight: 1.6 }}>
                To generate a QR code for your specific hosted URL,<br />
                update the <code style={{ color: "#7c3aed", background: "#1e1a2e", padding: "1px 5px", borderRadius: 3 }}>SHARE_URL</code> constant in the source code.
              </div>

              {/* Feature summary */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
                {[
                  { icon: "🗺", text: "Browse the full AI Applications Landscape" },
                  { icon: "🗳", text: "Vote for your top 3 priority applications" },
                  { icon: "💡", text: "Suggest missing gaps in the landscape" },
                  { icon: "📊", text: "View live aggregated results and leaderboard" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{
                    background: "#0f1923", border: "1px solid #1e3a5f", borderRadius: 7,
                    padding: "10px 14px", display: "flex", gap: 12, alignItems: "center",
                  }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 16px 32px", fontSize: 10, color: "#1e3a5f", letterSpacing: "0.1em" }}>
        A PRAGMATEX TOOL · RSSB'S AI RAIL APPLICATIONS LANDSCAPE · INNOVATION · TECHNOLOGY · STRATEGY · POLICY
      </div>
    </div>
  );
}

