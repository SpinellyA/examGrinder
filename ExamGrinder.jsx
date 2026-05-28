import { useState, useEffect, useRef } from "react";

// 1. Updated CSS with theme variables and light mode overrides
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  /* Default Dark Mode Theme Variables */
  --color-background-primary: #1e1e24;
  --color-background-secondary: #25252b;
  --color-background-tertiary: #121214;
  --color-background-info: #1b263b;
  --color-background-success: #143525;
  --color-background-danger: #3c1e1e;
  --color-background-warning: #332615;
  
  --color-text-primary: #e4e4e7;
  --color-text-secondary: #a1a1aa;
  --color-text-info: #60a5fa;
  --color-text-success: #4ade80;
  --color-text-danger: #f87171;
  --color-text-warning: #fbbf24;

  --color-border-primary: #52525b;
  --color-border-secondary: #3f3f46;
  --color-border-tertiary: #27272a;
  --color-border-info: #2563eb;
  --color-border-success: #166534;
  --color-border-danger: #991b1b;
  --color-border-warning: #854d0e;

  --border-radius-md: 6px;
  --border-radius-lg: 12px;
}

/* Light Mode Overrides */
.app.light {
  --color-background-primary: #ffffff;
  --color-background-secondary: #f4f4f5;
  --color-background-tertiary: #fafafa;
  --color-background-info: #eff6ff;
  --color-background-success: #f0fdf4;
  --color-background-danger: #fef2f2;
  --color-background-warning: #fefce8;

  --color-text-primary: #18181b;
  --color-text-secondary: #71717a;
  --color-text-info: #2563eb;
  --color-text-success: #166534;
  --color-text-danger: #991b1b;
  --color-text-warning: #854d0e;

  --color-border-primary: #a1a1aa;
  --color-border-secondary: #d4d4d8;
  --color-border-tertiary: #e4e4e7;
  --color-border-info: #93c5fd;
  --color-border-success: #bbf7d0;
  --color-border-danger: #fca5a5;
  --color-border-warning: #fef08a;
}

.app{font-family:'JetBrains Mono',monospace;background:var(--color-background-tertiary);min-height:100vh;color:var(--color-text-primary);transition: background 0.2s ease, color 0.2s ease;}
.screen{max-width:740px;margin:0 auto;padding:28px 16px 60px;animation:fadeUp .2s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.card{background:var(--color-background-primary);border:.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:20px;margin-bottom:12px}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--border-radius-md);border:.5px solid var(--color-border-secondary);background:transparent;color:var(--color-text-primary);font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;cursor:pointer;transition:background .1s,transform .1s;white-space:nowrap}
.btn:hover{background:var(--color-background-secondary)}
.btn:active{transform:scale(.98)}
.btn-primary{background:var(--color-text-primary);color:var(--color-background-primary);border-color:transparent}
.btn-primary:hover{opacity:.85;background:var(--color-text-primary)}
.btn-ghost{border-color:transparent;color:var(--color-text-secondary)}
.btn-ghost:hover{color:var(--color-text-primary);background:var(--color-background-secondary)}
.choice{width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border-radius:var(--border-radius-md);border:.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);color:var(--color-text-primary);font-family:'JetBrains Mono',monospace;font-size:13px;cursor:pointer;transition:border-color .1s,background .1s;line-height:1.5}
.choice:hover:not([disabled]){border-color:var(--color-border-primary);background:var(--color-background-primary)}
.choice[disabled]{cursor:default}
.choice.correct{border-color:var(--color-border-success)!important;background:var(--color-background-success)!important;color:var(--color-text-success)!important}
.choice.wrong{border-color:var(--color-border-danger)!important;background:var(--color-background-danger)!important;color:var(--color-text-danger)!important}
.choice.dimmed{opacity:.3}
.tag{display:inline-flex;align-items:center;padding:4px 10px;border-radius:var(--border-radius-md);font-size:11px;font-weight:500;cursor:pointer;border:.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);color:var(--color-text-secondary);transition:all .1s;user-select:none}
.tag:hover{border-color:var(--color-border-secondary);color:var(--color-text-primary)}
.tag.on{background:var(--color-background-info);color:var(--color-text-info);border-color:var(--color-border-info)}
.pt{height:3px;background:var(--color-background-secondary);border-radius:2px;overflow:hidden;margin-bottom:18px}
.pf{height:100%;background:var(--color-text-primary);border-radius:2px;transition:width .35s ease}
.lbl{font-size:10px;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;font-weight:500}
.tg{display:flex;flex-wrap:wrap;gap:6px}
.div{height:.5px;background:var(--color-border-tertiary);margin:16px 0}
.toggle{display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:var(--color-text-secondary);user-select:none}
.ttrack{width:32px;height:18px;border-radius:9px;background:var(--color-background-secondary);border:.5px solid var(--color-border-secondary);position:relative;transition:background .2s,border-color .2s;flex-shrink:0}
.ttrack.on{background:var(--color-text-primary);border-color:var(--color-text-primary)}
.tthumb{position:absolute;width:12px;height:12px;border-radius:6px;background:var(--color-background-primary);top:2px;left:2px;transition:left .2s}
.ttrack.on .tthumb{left:16px}
.pill{display:inline-flex;align-items:center;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
.pill-w{background:var(--color-background-info);color:var(--color-text-info)}
.pill-t{background:var(--color-background-success);color:var(--color-text-success)}
.qtext{font-family:'Lora',serif;font-size:16px;line-height:1.85;color:var(--color-text-primary);margin:12px 0 20px;white-space:pre-wrap}
.exp{padding:14px 16px;margin-top:12px;border-left:2px solid var(--color-border-warning);border-radius:0 var(--border-radius-md) var(--border-radius-md) 0;background:var(--color-background-warning);font-size:13px;line-height:1.7;animation:fadeUp .15s ease}
.stat{padding:12px 16px;background:var(--color-background-secondary);border-radius:var(--border-radius-md);text-align:center}
.sn{font-size:22px;font-weight:700}
.sl{font-size:10px;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
.inp{background:var(--color-background-secondary);border:.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md);color:var(--color-text-primary);padding:6px 10px;font-family:'JetBrains Mono',monospace;font-size:13px;width:72px}
.inp:focus{outline:none;border-color:var(--color-border-primary)}
.dz{border:1.5px dashed var(--color-border-secondary);border-radius:var(--border-radius-lg);padding:60px 32px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.dz:hover,.dz.drag{border-color:var(--color-border-primary);background:var(--color-background-secondary)}
.fb{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--border-radius-md);margin-top:12px;font-size:13px;font-weight:500;animation:fadeUp .15s ease}
.fb-ok{background:var(--color-background-success);color:var(--color-text-success)}
.fb-no{background:var(--color-background-danger);color:var(--color-text-danger)}
.ri{padding:12px 16px;margin-bottom:8px;border-left:2px solid transparent;border-radius:0 var(--border-radius-md) var(--border-radius-md) 0;font-size:12px}
.ri-ok{border-left-color:var(--color-border-success);background:var(--color-background-success)}
.ri-no{border-left-color:var(--color-border-danger);background:var(--color-background-danger)}
.row{display:flex;align-items:center;gap:8px}
.rsb{display:flex;align-items:center;justify-content:space-between}
.col{display:flex;flex-direction:column;gap:12px}
.gs{display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:8px}
.ml{margin-left:auto}
.tc{text-align:center}
.ts{font-size:13px}
.tx{font-size:11px}
.tm{color:var(--color-text-secondary)}
.td{color:var(--color-text-danger)}
.tg2{color:var(--color-text-success)}
.tw{color:var(--color-text-warning)}
`;

const injectStyles = () => {
  if (document.getElementById("eg-css")) return;
  const s = document.createElement("style");
  s.id = "eg-css";
  s.textContent = CSS;
  document.head.appendChild(s);
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const SKQ = "egv3_questions";
const SKP = "egv3_progress";
const SKT = "egv3_theme"; // New Theme Storage Key

const safeGet = async (k) => {
  try { const r = await window.storage.get(k); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
};
const safeSet = async (k, v) => {
  try { await window.storage.set(k, JSON.stringify(v)); } catch {}
};

function Toggle({ on, onChange, label }) {
  return (
    <label className="toggle" onClick={() => onChange(!on)}>
      <div className={`ttrack ${on ? "on" : ""}`}><div className="tthumb" /></div>
      <span>{label}</span>
    </label>
  );
}

// 2. Updated Header to include a light/dark mini theme button
function Header({ right, theme, onToggleTheme }) {
  return (
    <div className="rsb" style={{ marginBottom: 24 }}>
      <div className="row">
        <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-.02em" }}>ExamGrinder</span>
        <span className="tx tm" style={{ marginLeft: 6 }}>repetition → mastery</span>
        <button 
          className="btn btn-ghost" 
          style={{ padding: "4px 8px", marginLeft: 4 }} 
          onClick={onToggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          <i className={`ti ti-${theme === "dark" ? "sun" : "moon"}`} style={{ fontSize: 14 }} aria-hidden="true" />
        </button>
      </div>
      {right}
    </div>
  );
}

function ImportScreen({ onImport, theme, onToggleTheme }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  const read = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (e) => {
      try { const d = JSON.parse(e.target.result); onImport(d.questions ?? d); }
      catch { alert("Could not parse JSON. Check the file format."); }
    };
    r.readAsText(file);
  };
  return (
    <div className="screen" style={{ paddingTop: 48 }}>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <div className="card">
        <div
          className={`dz ${drag ? "drag" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); read(e.dataTransfer.files[0]); }}
          onClick={() => ref.current.click()}
        >
          <i className="ti ti-file-upload" style={{ fontSize: 40, color: "var(--color-text-secondary)" }} aria-hidden="true" />
          <p className="ts" style={{ marginTop: 14, color: "var(--color-text-secondary)" }}>
            Drop <strong>questions.json</strong> here, or click to browse
          </p>
          <p className="tx tm" style={{ marginTop: 6 }}>
            {"{ questions: [{ id, week, topic, question, choices[], answer, explanation }] }"}
          </p>
        </div>
        <input ref={ref} type="file" accept=".json" style={{ display: "none" }} onChange={(e) => read(e.target.files[0])} />
      </div>
      <p className="tx tm tc" style={{ marginTop: 12 }}>
        Your data is saved locally — just import once and you're set.
      </p>
    </div>
  );
}

function HomeScreen({ questions, progress, onStart, onReset, theme, onToggleTheme }) {
  const weeks = [...new Set(questions.map(q => q.week))].sort((a, b) => {
    const n = s => parseInt(s.match(/\d+/)?.[0] ?? 0);
    return n(a) - n(b);
  });
  const topics = [...new Set(questions.map(q => q.topic))].sort();

  const [sw, setSw] = useState([]);
  const [st, setSt] = useState([]);
  const [doShuffle, setDoShuffle] = useState(true);
  const [shuffleC, setShuffleC] = useState(true);
  const [countStr, setCountStr] = useState("");
  const [wrongOnly, setWrongOnly] = useState(false);

  const pool = questions
    .filter(q => !sw.length || sw.includes(q.week))
    .filter(q => !st.length || st.includes(q.topic))
    .filter(q => !wrongOnly || (progress[q.id]?.wrong ?? 0) > 0);

  const qCount = Math.min(countStr ? (parseInt(countStr) || pool.length) : pool.length, pool.length);
  const pta = Object.values(progress).reduce((s, p) => s + p.attempts, 0);
  const ptc = Object.values(progress).reduce((s, p) => s + p.correct, 0);
  const mastered = Object.values(progress).filter(p => p.attempts >= 2 && p.correct / p.attempts >= 0.8).length;
  const weak = Object.values(progress).filter(p => (p.wrong ?? 0) > 0).length;

  const tog = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <div className="screen">
      <Header 
        theme={theme} 
        onToggleTheme={onToggleTheme}
        right={
          <button className="btn btn-ghost" onClick={onReset}>
            <i className="ti ti-upload" aria-hidden="true" /> Import new file
          </button>
        } 
      />

      {pta > 0 && (
        <div className="gs" style={{ marginBottom: 14 }}>
          <div className="stat"><div className="sn">{pta}</div><div className="sl">Attempts</div></div>
          <div className="stat"><div className="sn tg2">{Math.round((ptc / pta) * 100)}%</div><div className="sl">Accuracy</div></div>
          <div className="stat"><div className="sn" style={{ color: "var(--color-text-info)" }}>{mastered}</div><div className="sl">Mastered</div></div>
          <div className="stat"><div className="sn td">{weak}</div><div className="sl">Needs work</div></div>
        </div>
      )}

      <div className="card">
        <div className="lbl">Filter by week</div>
        <div className="tg">
          {weeks.map(w => (
            <span key={w} className={`tag ${sw.includes(w) ? "on" : ""}`} onClick={() => tog(sw, setSw, w)}>{w}</span>
          ))}
        </div>
        <div className="div" />
        <div className="lbl">Filter by topic</div>
        <div className="tg">
          {topics.map(t => (
            <span key={t} className={`tag ${st.includes(t) ? "on" : ""}`} onClick={() => tog(st, setSt, t)}>{t}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="lbl">Settings</div>
        <div className="col">
          <Toggle on={doShuffle} onChange={setDoShuffle} label="Shuffle question order" />
          <Toggle on={shuffleC} onChange={setShuffleC} label="Shuffle answer choices" />
          <Toggle on={wrongOnly} onChange={setWrongOnly} label="Previously wrong answers only" />
          <div className="row">
            <span className="ts tm">Question limit</span>
            <input className="inp" type="number" min={1} max={pool.length}
              placeholder={`${pool.length}`} value={countStr}
              onChange={e => setCountStr(e.target.value)} />
            <span className="tx tm">{pool.length} available</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <button
          className="btn btn-primary"
          style={{ padding: "12px 32px", fontSize: 13 }}
          disabled={pool.length === 0}
          onClick={() => onStart({ sw, st, doShuffle, shuffleC, count: qCount, wrongOnly })}
        >
          Begin {qCount} question{qCount !== 1 ? "s" : ""}
          <i className="ti ti-arrow-right" aria-hidden="true" />
        </button>
      </div>
      {pool.length === 0 && (
        <p className="tx tm tc" style={{ marginTop: 8 }}>No questions match the current filters.</p>
      )}
    </div>
  );
}

function QuizScreen({ qs, idx, progress, onAnswer, selected, showExp, onToggleExp, onNext, onQuit, shuffleC, theme, onToggleTheme }) {
  const q = qs[idx];
  const total = qs.length;
  const answered = selected !== null;
  const correct = selected === q?.answer;
  const qp = progress[q?.id];
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (!q) return;
    setChoices(shuffleC ? shuffle(q.choices) : q.choices);
  }, [q?.id]);

  if (!q) return null;

  return (
    <div className="screen">
      <Header 
        theme={theme} 
        onToggleTheme={onToggleTheme}
        right={
          <button className="btn btn-ghost" style={{ color: "var(--color-text-danger)" }} onClick={onQuit}>
            <i className="ti ti-x" aria-hidden="true" /> Quit
          </button>
        } 
      />

      <div className="pt">
        <div className="pf" style={{ width: `${(idx / total) * 100}%` }} />
      </div>

      <div className="rsb" style={{ marginBottom: 18 }}>
        <span className="tx tm">Question <strong style={{ color: "var(--color-text-primary)" }}>{idx + 1}</strong> / {total}</span>
        {qp && qp.attempts > 0 && (
          <span className="tx tm">Past: {qp.correct}/{qp.attempts} correct</span>
        )}
      </div>

      <div className="card" key={q.id} style={{ animation: "fadeUp .2s ease" }}>
        <div className="row" style={{ gap: 6, marginBottom: 10 }}>
          <span className="pill pill-w">{q.week}</span>
          <span className="pill pill-t">{q.topic}</span>
        </div>

        <div className="qtext">{q.question}</div>

        {choices.map((c, i) => {
          let cls = "choice";
          if (answered) {
            if (c === q.answer) cls += " correct";
            else if (c === selected) cls += " wrong";
            else cls += " dimmed";
          }
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => !answered && onAnswer(c)}>
              <span style={{ opacity: 0.45, marginRight: 10, fontSize: 11 }}>{String.fromCharCode(65 + i)}.</span>
              {c}
            </button>
          );
        })}

        {answered && (
          <div style={{ animation: "fadeUp .15s ease" }}>
            <div className={`fb ${correct ? "fb-ok" : "fb-no"}`}>
              <i className={`ti ti-${correct ? "check" : "x"}`} aria-hidden="true" />
              <span>{correct ? "Correct!" : `Correct answer: ${q.answer}`}</span>
              <button className="btn btn-ghost ml" style={{ fontSize: 11, padding: "4px 10px" }} onClick={onToggleExp}>
                {showExp ? "Hide" : "Explain"}
              </button>
            </div>

            {showExp && q.explanation && (
              <div className="exp">{q.explanation}</div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button className="btn btn-primary" onClick={onNext}>
                {idx + 1 >= total ? "See results" : "Next"}
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsScreen({ answers, onRetry, onHome, theme, onToggleTheme }) {
  const correct = answers.filter(a => a.isCorrect).length;
  const total = answers.length;
  const pct = Math.round((correct / total) * 100);
  const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
  const gc = pct >= 80 ? "var(--color-text-success)" : pct >= 60 ? "var(--color-text-warning)" : "var(--color-text-danger)";
  const [filter, setFilter] = useState("wrong");
  const wrongCount = answers.filter(a => !a.isCorrect).length;
  const shown = answers.filter(a => filter === "all" ? true : filter === "wrong" ? !a.isCorrect : a.isCorrect);

  return (
    <div className="screen">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <div className="card tc" style={{ padding: "36px 24px", marginBottom: 16 }}>
        <div className="tx tm" style={{ textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>
          Session complete
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontSize: 36, fontWeight: 700, color: gc }}>{grade}</span>
        </div>
        <p className="ts tm" style={{ marginTop: 8, marginBottom: 24 }}>
          {correct} correct out of {total} questions
        </p>
        <div className="row" style={{ justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          <button className="btn btn-primary" onClick={onRetry}>
            <i className="ti ti-refresh" aria-hidden="true" /> Retry same set
          </button>
          <button className="btn" onClick={onHome}>
            <i className="ti ti-home" aria-hidden="true" /> Back to home
          </button>
        </div>
      </div>

      <div className="row" style={{ gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {[["wrong", `Wrong (${wrongCount})`], ["correct", `Correct (${correct})`], ["all", `All (${total})`]].map(([k, label]) => (
          <button key={k} className={`btn ${filter === k ? "btn-primary" : ""}`}
            style={{ fontSize: 11 }} onClick={() => setFilter(k)}>{label}</button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="tx tm tc" style={{ marginTop: 16 }}>Nothing to show here.</p>
      )}

      {shown.map((a, i) => (
        <div key={i} className={`ri ${a.isCorrect ? "ri-ok" : "ri-no"}`}>
          <div className="row" style={{ gap: 6, marginBottom: 8 }}>
            <span className="pill pill-w">{a.question.week}</span>
            <span className="pill pill-t">{a.question.topic}</span>
          </div>
          <p className="ts" style={{ lineHeight: 1.6, marginBottom: 6, whiteSpace: "pre-wrap" }}>{a.question.question}</p>
          {!a.isCorrect ? (
            <>
              <p className="tx td">✗ You answered: {a.selected}</p>
              <p className="tx tg2">✓ Correct: {a.question.answer}</p>
              {a.question.explanation && (
                <p className="tx tm" style={{ marginTop: 6, lineHeight: 1.6 }}>{a.question.explanation}</p>
              )}
            </>
          ) : (
            <p className="tx tg2">✓ {a.question.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ExamGrinder() {
  useEffect(() => { injectStyles(); }, []);

  const [questions, setQuestions] = useState(null);
  const [screen, setScreen] = useState("import");
  const [quizQs, setQuizQs] = useState([]);
  const [quizSettings, setQuizSettings] = useState({});
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState({});
  
  // 3. Setup Theme Hooks (Defaults to dark mode layout)
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    (async () => {
      const q = await safeGet(SKQ);
      if (q) { setQuestions(q); setScreen("home"); }
      const p = await safeGet(SKP);
      if (p) setProgress(p);
      const t = await safeGet(SKT);
      if (t) setTheme(t);
    })();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    await safeSet(SKT, nextTheme);
  };

  const handleImport = async (qs) => {
    setQuestions(qs);
    setScreen("home");
    await safeSet(SKQ, qs);
  };

  const startQuiz = (settings) => {
    let pool = [...(questions ?? [])];
    if (settings.sw.length) pool = pool.filter(q => settings.sw.includes(q.week));
    if (settings.st.length) pool = pool.filter(q => settings.st.includes(q.topic));
    if (settings.wrongOnly) pool = pool.filter(q => (progress[q.id]?.wrong ?? 0) > 0);
    if (settings.doShuffle) pool = shuffle(pool);
    pool = pool.slice(0, settings.count);
    setQuizQs(pool);
    setQuizSettings(settings);
    setIdx(0);
    setSelected(null);
    setShowExp(false);
    setAnswers([]);
    setScreen("quiz");
  };

  const handleAnswer = async (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    const q = quizQs[idx];
    const isCorrect = choice === q.answer;
    setAnswers(a => [...a, { question: q, selected: choice, isCorrect }]);
    const np = { ...progress };
    if (!np[q.id]) np[q.id] = { attempts: 0, correct: 0, wrong: 0 };
    np[q.id].attempts++;
    isCorrect ? np[q.id].correct++ : np[q.id].wrong++;
    setProgress(np);
    await safeSet(SKP, np);
  };

  const handleNext = () => {
    if (idx + 1 >= quizQs.length) { setScreen("results"); return; }
    setIdx(i => i + 1);
    setSelected(null);
    setShowExp(false);
  };

  const handleRetry = () => {
    const pool = quizSettings.doShuffle ? shuffle([...quizQs]) : [...quizQs];
    setQuizQs(pool);
    setIdx(0);
    setSelected(null);
    setShowExp(false);
    setAnswers([]);
    setScreen("quiz");
  };

  // 4. Pass class details down safely
  return (
    <div className={`app ${theme}`}>
      {screen === "import" && <ImportScreen onImport={handleImport} theme={theme} onToggleTheme={toggleTheme} />}
      {screen === "home" && questions && (
        <HomeScreen questions={questions} progress={progress}
          onStart={startQuiz} onReset={() => setScreen("import")} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {screen === "quiz" && (
        <QuizScreen qs={quizQs} idx={idx} progress={progress}
          onAnswer={handleAnswer} selected={selected}
          showExp={showExp} onToggleExp={() => setShowExp(s => !s)}
          onNext={handleNext} onQuit={() => setScreen("home")}
          shuffleC={quizSettings.shuffleC} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {screen === "results" && (
        <ResultsScreen answers={answers} onRetry={handleRetry} onHome={() => setScreen("home")} theme={theme} onToggleTheme={toggleTheme} />
      )}
    </div>
  );
}