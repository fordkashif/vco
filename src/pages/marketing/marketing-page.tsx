import "@/styles/marketing.css"
import type { ReactNode } from "react"

// ── SVG Icons ─────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8h15M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function MemberIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 12V9.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V12" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="12" width="16" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="14" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 8h6M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 16V4M3 16h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 13l3-4 3 2 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5.5" y="2.5" width="9" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="14.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

// ── Feature data ───────────────────────────────────────────────────────
type FeatItem = { num: string; name: ReactNode; desc: string; icon: ReactNode }

const featData: FeatItem[] = [
  {
    num: "[01]",
    name: <>Booking<br />&amp; <span className="it">scheduling</span></>,
    desc: "Real-time calendar across bays, technicians, and mobile routes. Smart slotting prevents over-booking, customers self-serve through web or app.",
    icon: <CalendarIcon />,
  },
  {
    num: "[02]",
    name: <>Membership<br /><span className="it">engine</span></>,
    desc: "Unlimited wash plans, tiered detailing, fleet contracts. Pause, upgrade, downgrade, renew. Churn is forecasted — not discovered.",
    icon: <MemberIcon />,
  },
  {
    num: "[03]",
    name: <>Vehicle<br /><span className="it">record layer</span></>,
    desc: "Every car carries its history with it: services, conditions, photos, preferences. Technicians walk up knowing the vehicle before they meet the owner.",
    icon: <CarIcon />,
  },
  {
    num: "[04]",
    name: <>Technician<br /><span className="it">workflow</span></>,
    desc: "Per-service checklists, before/after photos, condition notes, and live progress. Quality becomes auditable.",
    icon: <ClipboardIcon />,
  },
  {
    num: "[05]",
    name: <>Operations<br /><span className="it">intelligence</span></>,
    desc: "Bay utilization, technician productivity, service duration variance, upsell conversion — measured per location, per day, per shift.",
    icon: <ChartIcon />,
  },
  {
    num: "[06]",
    name: <>Customer<br /><span className="it">experience</span></>,
    desc: "A modern app for the people whose cars you care for. Booking, live status, memberships, history, loyalty — feels like an Apple product.",
    icon: <PhoneIcon />,
  },
]

// ── Marquee items (doubled for seamless loop) ─────────────────────────
const MARQ_ITEMS = [
  "Run vehicle care like an operating system",
  null,
  "Bookings · Memberships · Dispatch · Vehicles",
  null,
  "412 locations · 1.84M vehicles on record",
  null,
  "Membership-first by design",
  null,
  "Built for operators, not hobbyists",
  null,
]
const marqDoubled = [...MARQ_ITEMS, ...MARQ_ITEMS]

// ── Marketing Page ────────────────────────────────────────────────────
export function MarketingPage() {
  return (
    <div className="vco-mkt" style={{ background: "var(--background)" }}>

      {/* NAV */}
      <nav className="vco-nav">
        <div className="vco-wrap vco-nav-inner">
          <a className="vco-brand" href="#">
            <span className="vco-brand-mark">◆</span>
            <span>Vehicle Care OS</span>
          </a>
          <div className="vco-nav-links">
            <a href="#platform">Platform</a>
            <a href="#operations">Operations</a>
            <a href="#membership">Memberships</a>
            <a href="#pricing">Pricing</a>
            <a href="#customers">Customers</a>
          </div>
          <a className="vco-nav-cta" href="#cta">
            <span className="vco-nav-dot" />
            Book a demo
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="vco-hero">
        <div className="vco-wrap">
          <div className="vco-eyebrow">
            <span className="vco-pulse" />
            <span>VCO / 2026 · The Operating System for Vehicle Care</span>
          </div>

          <h1 className="vco-h1">
            Run vehicle<br />
            care with <span className="it">operational</span><br />
            precision<span style={{ color: "var(--accent)" }}>.</span>
          </h1>

          <div className="vco-hero-sub-row">
            <p className="vco-hero-sub">
              VCO unifies bookings, memberships, technicians, payments, and customer
              experience into one platform — built for car wash chains, premium
              detailers, and mobile operators who think in{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--foreground)" }}>
                recurring revenue
              </em>.
            </p>
            <div className="vco-hero-actions">
              <a className="vco-btn vco-btn-primary" href="#cta">
                Book a demo <span className="arr">↗</span>
              </a>
              <a className="vco-btn" href="#platform">See the platform</a>
            </div>
          </div>

          <div className="vco-hero-meta">
            <div><div className="vco-meta-lbl">Locations live</div><div className="vco-meta-val">412<span className="u">+</span></div></div>
            <div><div className="vco-meta-lbl">Vehicles on record</div><div className="vco-meta-val">1.84<span className="u">M</span></div></div>
            <div><div className="vco-meta-lbl">Member retention</div><div className="vco-meta-val">94<span className="u">%</span></div></div>
            <div><div className="vco-meta-lbl">Avg. bay utilization</div><div className="vco-meta-val">+38<span className="u">%</span></div></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="vco-marq">
        <div className="vco-marq-track">
          {marqDoubled.map((item, i) =>
            item === null
              ? <span key={i} className="vco-marq-item"><span className="star">◆</span></span>
              : <span key={i} className="vco-marq-item">{item}</span>
          )}
        </div>
      </div>

      {/* PLATFORM — numbered feature rows */}
      <section id="platform" className="vco-section">
        <div className="vco-wrap">
          <div className="vco-sec-head">
            <div>
              <div className="vco-sec-tag">
                <span className="idx">[01]</span><span className="line" /><span>Platform</span>
              </div>
              <h2 className="vco-sec-title">One system,<br /><span className="it">every workflow.</span></h2>
            </div>
            <p className="vco-sec-desc">
              Most vehicle care businesses run on six tools held together by spreadsheets and group chats.
              VCO replaces the stack — booking, payments, memberships, dispatch, vehicle records, and analytics —
              with a single operational fabric.
            </p>
          </div>

          <div className="vco-feat-stack">
            {featData.map((f) => (
              <div key={f.num} className="vco-feat-row">
                <div className="vco-feat-num">{f.num}</div>
                <div className="vco-feat-name">{f.name}</div>
                <div className="vco-feat-desc">{f.desc}</div>
                <div className="vco-feat-icon">{f.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS — three product surface mocks */}
      <section id="operations" className="vco-showcase">
        <div className="vco-wrap">
          <div className="vco-sec-head">
            <div>
              <div className="vco-sec-tag">
                <span className="idx">[02]</span><span className="line" /><span>Inside the OS</span>
              </div>
              <h2 className="vco-sec-title">Three surfaces.<br /><span className="it">One operation.</span></h2>
            </div>
            <p className="vco-sec-desc">
              Customers tap. Operators orchestrate. Technicians execute. VCO renders the same vehicle,
              appointment, and membership across all three roles — in real time, with no copy-paste.
            </p>
          </div>

          <div className="vco-showcase-grid">

            {/* ── Phone: Customer ── */}
            <div className="vco-phone">
              <div className="vco-phone-screen">
                <div className="vco-phone-notch" />
                <div className="vco-phone-status">
                  <span>9:41</span>
                  <span>● ● ● ●</span>
                </div>
                <div className="vco-phone-body">
                  <div>
                    <div className="vco-phone-sub">Good morning, Maya</div>
                    <div className="vco-phone-h">Your <span className="it">Signature</span><br />wash is in progress</div>
                  </div>
                  <div className="vco-phone-card">
                    <div className="vco-phone-status-bar">
                      <div className="vco-phone-stat-l">
                        <span className="vco-phone-dot" />
                        <span>In service · Bay 03</span>
                      </div>
                      <span className="vco-phone-eta">ETA 14 min</span>
                    </div>
                    <div className="vco-phone-steps">
                      <div className="vco-phone-step done"><span className="pip" />Pre-rinse &amp; foam</div>
                      <div className="vco-phone-step done"><span className="pip" />Hand wash</div>
                      <div className="vco-phone-step now"><span className="pip" />Wheel &amp; tire detail</div>
                      <div className="vco-phone-step pending"><span className="pip" />Hand dry &amp; finish</div>
                      <div className="vco-phone-step pending"><span className="pip" />Interior wipe-down</div>
                    </div>
                  </div>
                  <div className="vco-phone-veh">
                    <div className="img" />
                    <div>
                      <div className="m">2024 Range Rover Sport</div>
                      <div className="p">PLATE · 8KRQ-422 · SANTORINI BLACK</div>
                    </div>
                  </div>
                  <div className="vco-phone-cta">
                    <span>Add Ceramic Coat · $89</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Operator dashboard ── */}
            <div className="vco-dash">
              <div className="vco-dash-chrome">
                <div className="lights"><span /><span /><span /></div>
                <div className="url">vco.app / <b>chelsea-flagship</b> / dispatch</div>
              </div>
              <div className="vco-dash-body">
                <aside className="vco-dash-side">
                  <div className="grp">Today</div>
                  <a className="on" href="#">Dispatch <span className="ct">28</span></a>
                  <a href="#">Calendar <span className="ct">142</span></a>
                  <a href="#">Members <span className="ct">3.1k</span></a>
                  <div className="grp">Operate</div>
                  <a href="#">Vehicles</a>
                  <a href="#">Technicians</a>
                  <a href="#">Inventory</a>
                  <div className="grp">Grow</div>
                  <a href="#">Memberships</a>
                  <a href="#">Loyalty</a>
                  <a href="#">Reports</a>
                </aside>
                <div className="vco-dash-main">
                  <div className="vco-dash-top">
                    <div className="vco-dash-h">Dispatch — <span className="it">Tuesday</span></div>
                    <div className="vco-dash-search">
                      <span>Search vehicle, member, plate…</span>
                      <kbd>⌘K</kbd>
                    </div>
                  </div>
                  <div className="vco-dash-kpis">
                    <div className="vco-kpi"><div className="lbl">Revenue today</div><div className="v">$8,420</div><div className="d up">↑ 12% vs last Tue</div></div>
                    <div className="vco-kpi"><div className="lbl">Bay utilization</div><div className="v">87%</div><div className="d up">↑ 4 pts</div></div>
                    <div className="vco-kpi"><div className="lbl">New members</div><div className="v">17</div><div className="d">↑ 3 vs avg</div></div>
                    <div className="vco-kpi"><div className="lbl">Avg ticket</div><div className="v">$61</div><div className="d">— stable</div></div>
                  </div>
                  <div className="vco-dash-cal">
                    <div className="vco-cal-times">
                      <span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span>
                    </div>
                    <div className="vco-cal-grid">
                      <div className="vco-cal-event"     style={{ top: 6,   height: 36 }}><span>Signature wash · Bay 03</span><span className="who">M. Okafor · LR Sport</span></div>
                      <div className="vco-cal-event alt" style={{ top: 50,  height: 42 }}><span>Full detail · Bay 01</span><span className="who">D. Vega · BMW M3</span></div>
                      <div className="vco-cal-event"     style={{ top: 100, height: 56 }}><span>Ceramic coat · Bay 04</span><span className="who">A. Choi · Tesla Y</span></div>
                      <div className="vco-cal-event alt" style={{ top: 162, height: 32 }}><span>Mobile — 22 Park Ln</span><span className="who">T. Reyes · Porsche 911</span></div>
                      <div className="vco-cal-event"     style={{ top: 200, height: 26 }}><span>Express · Bay 02</span><span className="who">J. Singh · Audi Q5</span></div>
                    </div>
                  </div>
                  <div className="vco-dash-bottom">
                    <div className="vco-panel">
                      <div className="ttl"><span>Revenue · last 7 days</span><span className="more">view ↗</span></div>
                      <div className="vco-bars">
                        <div className="col" style={{ height: "42%" }} />
                        <div className="col" style={{ height: "58%" }} />
                        <div className="col" style={{ height: "51%" }} />
                        <div className="col" style={{ height: "72%" }} />
                        <div className="col hi" style={{ height: "88%" }} />
                        <div className="col" style={{ height: "64%" }} />
                        <div className="col" style={{ height: "76%" }} />
                      </div>
                      <div className="vco-bars-x">
                        <span>W</span><span>T</span><span>F</span><span>S</span><span>S</span><span>M</span><span>T</span>
                      </div>
                    </div>
                    <div className="vco-panel">
                      <div className="ttl"><span>Technicians on shift</span><span className="more">5 active</span></div>
                      <div className="vco-roster">
                        <div className="vco-tech"><div className="av">MO</div><div><div className="n">Marcus O.</div><div className="s">Bay 03 · 4 jobs</div></div><div className="st">ACTIVE</div></div>
                        <div className="vco-tech"><div className="av">DV</div><div><div className="n">Dani V.</div><div className="s">Bay 01 · 3 jobs</div></div><div className="st">ACTIVE</div></div>
                        <div className="vco-tech"><div className="av">AC</div><div><div className="n">Ana C.</div><div className="s">Bay 04 · 2 jobs</div></div><div className="st">ACTIVE</div></div>
                        <div className="vco-tech"><div className="av">TR</div><div><div className="n">Tomás R.</div><div className="s">Mobile · 5 stops</div></div><div className="st busy">ON ROUTE</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Tablet: Technician ── */}
            <div className="vco-tablet">
              <div className="vco-tablet-screen">
                <div className="vco-tablet-top">
                  <div>
                    <div className="role">Job 02 · 11:42</div>
                    <div className="nm">Bay 03 — Marcus O.</div>
                  </div>
                  <div className="av">MO</div>
                </div>
                <div className="vco-tablet-body">
                  <div className="vco-tablet-job">
                    <div className="car">Signature <span className="it">Wash</span></div>
                    <div className="meta">2024 RANGE ROVER SPORT · 8KRQ-422</div>
                  </div>
                  <div className="vco-check">
                    <div className="row done"><span className="box" />Pre-rinse &amp; foam soak</div>
                    <div className="row done"><span className="box" />Hand wash · pH neutral</div>
                    <div className="row done"><span className="box" />Wheel &amp; tire dressing</div>
                    <div className="row"><span className="box" />Hand dry · soft microfiber</div>
                    <div className="row"><span className="box" />Interior wipe-down</div>
                    <div className="row"><span className="box" />Glass · streak check</div>
                  </div>
                  <div>
                    <div className="role" style={{ marginBottom: 6 }}>Photos · 2 of 4</div>
                    <div className="vco-photos">
                      <div className="vco-photo"><span className="lbl">Before · Front</span></div>
                      <div className="vco-photo"><span className="lbl">Before · Wheels</span></div>
                      <div className="vco-photo add">＋</div>
                      <div className="vco-photo add">＋</div>
                    </div>
                  </div>
                  <div className="vco-tablet-cta">
                    <span>Mark complete</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="vco-showcase-caps">
            <div className="vco-cap"><span className="idx">[A]</span><span>Customer app — live service tracking</span></div>
            <div className="vco-cap"><span className="idx">[B]</span><span>Operator dashboard — dispatch &amp; revenue intelligence</span></div>
            <div className="vco-cap"><span className="idx">[C]</span><span>Technician tablet — checklist, photos, notes</span></div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP STORY */}
      <section id="membership" className="vco-section">
        <div className="vco-wrap">
          <div className="vco-sec-head">
            <div>
              <div className="vco-sec-tag">
                <span className="idx">[03]</span><span className="line" /><span>Recurring revenue</span>
              </div>
              <h2 className="vco-sec-title">Memberships<br />are <span className="it">the moat.</span></h2>
            </div>
            <p className="vco-sec-desc">
              A single car wash is a transaction. A membership is a relationship that
              compounds. VCO is built membership-first — every booking, every photo,
              every preference reinforces retention.
            </p>
          </div>

          <div className="vco-story-grid">
            <div className="vco-story-card">
              <div className="ttl">A single member, <span className="it">across a year.</span></div>
              <div className="vco-ledger">
                <div className="vco-ledger-row">
                  <span>Unlimited Plus · $39/mo</span><span className="pl">12 cycles</span><span className="v pos">+ $468.00</span>
                </div>
                <div className="vco-ledger-row">
                  <span>Ceramic coat upgrades</span><span className="pl">2 add-ons</span><span className="v pos">+ $178.00</span>
                </div>
                <div className="vco-ledger-row">
                  <span>Interior deep clean</span><span className="pl">3 visits</span><span className="v pos">+ $267.00</span>
                </div>
                <div className="vco-ledger-row">
                  <span>Loyalty rewards redeemed</span><span className="pl">apr / sep</span><span className="v neg">– $30.00</span>
                </div>
                <div className="vco-ledger-row">
                  <span>Referral credit</span><span className="pl">1 friend</span><span className="v pos">+ $25.00</span>
                </div>
              </div>
              <div className="vco-ledger-total">
                <span className="l">Member LTV · yr 01</span>
                <span className="n"><span className="it">$908</span></span>
              </div>
            </div>

            <div className="vco-story-text">
              <div className="vco-story-tag">VS. THE OLD WAY</div>
              <h3 className="vco-story-h">
                A walk-in is <span className="it">$24.</span><br />
                A member is <span className="it">$908.</span><br />
                And they came back.
              </h3>
              <p className="vco-story-p">
                VCO surfaces every lever — pause requests, downgrade signals, dormancy patterns —
                before they become cancellations. Operators don't react to churn. They route around it.
              </p>
              <p className="vco-story-p">
                Pause, upgrade, downgrade, renew. Add a vehicle to the plan. Share with a partner.
                Switch locations. All native, all self-serve, all measured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIG METRICS */}
      <section className="vco-metrics" id="customers">
        <div className="vco-wrap">
          <div className="vco-sec-head">
            <div>
              <div className="vco-sec-tag">
                <span className="idx">[04]</span><span className="line" /><span>Field results</span>
              </div>
              <h2 className="vco-sec-title">What operators see<br />in the <span className="it">first 90 days.</span></h2>
            </div>
            <p className="vco-sec-desc">
              Numbers from VCO operators across multi-location chains, premium detailing
              studios, and mobile fleets — measured against their prior stack.
            </p>
          </div>
        </div>
        <div className="vco-wrap">
          <div className="vco-metrics-row">
            <div className="vco-metric">
              <div className="top"><span className="ix">[01]</span><span>Membership growth</span></div>
              <div className="big">+62<span className="u">%</span></div>
              <div className="desc">Average increase in active recurring members within the first 90 days of switching to VCO.</div>
            </div>
            <div className="vco-metric">
              <div className="top"><span className="ix">[02]</span><span>Time per booking</span></div>
              <div className="big"><span className="it">37s</span></div>
              <div className="desc">Median customer booking time on mobile — from open to confirmed appointment.</div>
            </div>
            <div className="vco-metric">
              <div className="top"><span className="ix">[03]</span><span>Operator tools replaced</span></div>
              <div className="big">7<span className="u">×</span></div>
              <div className="desc">Average number of point tools (booking, payments, CRM, SMS, sheets…) consolidated into VCO.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="vco-section">
        <div className="vco-wrap">
          <div className="vco-sec-head">
            <div>
              <div className="vco-sec-tag">
                <span className="idx">[05]</span><span className="line" /><span>Pricing</span>
              </div>
              <h2 className="vco-sec-title">Priced like<br /><span className="it">a partner.</span></h2>
            </div>
            <p className="vco-sec-desc">
              Pay per location, scale on volume. All plans include the customer app,
              operator dashboard, and technician tools — pricing reflects scope, not surface area.
            </p>
          </div>

          <div className="vco-pricing-grid">
            <div className="vco-price-card">
              <div className="vco-price-name">Starter</div>
              <div className="vco-price-num"><span className="c">$</span>149<span className="pm">/ location / mo</span></div>
              <p className="vco-price-desc">For single-location operators ready to professionalize bookings, memberships, and service tracking.</p>
              <ul className="vco-price-feat">
                <li>Customer app + booking</li>
                <li>Unlimited memberships</li>
                <li>Technician workflow</li>
                <li>Daily revenue reports</li>
                <li>Email support</li>
              </ul>
              <span className="vco-price-btn">Start with Starter</span>
            </div>

            <div className="vco-price-card featured">
              <div className="vco-price-name">Growth</div>
              <div className="vco-price-num"><span className="c">$</span><span className="it">349</span><span className="pm">/ location / mo</span></div>
              <p className="vco-price-desc">For multi-location chains running memberships, mobile service, and operational reporting in earnest.</p>
              <ul className="vco-price-feat">
                <li>Everything in Starter</li>
                <li>Multi-location dispatch</li>
                <li>Mobile-service routing</li>
                <li>Operations intelligence</li>
                <li>CRM, loyalty &amp; referrals</li>
                <li>Priority support</li>
              </ul>
              <span className="vco-price-btn">Talk to sales</span>
            </div>

            <div className="vco-price-card">
              <div className="vco-price-name">Enterprise</div>
              <div className="vco-price-num"><span className="it">Custom</span></div>
              <p className="vco-price-desc">For chains, fleets, and dealerships. SLA-backed, with white-label, API access, and migration support.</p>
              <ul className="vco-price-feat">
                <li>Everything in Growth</li>
                <li>Fleet &amp; commercial accounts</li>
                <li>White-label customer app</li>
                <li>SSO, audit, custom roles</li>
                <li>Dedicated success team</li>
                <li>99.99% uptime SLA</li>
              </ul>
              <span className="vco-price-btn">Contact us</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="vco-cta" id="cta">
        <div className="vco-wrap vco-cta-inner">
          <div className="vco-eyebrow">
            <span className="vco-pulse" />
            <span>Ready when you are</span>
          </div>
          <h2 className="vco-cta-h">
            Run your business<br />like an <span className="it">operating system.</span>
          </h2>
          <p className="vco-cta-p">
            30-minute walkthrough with a real operator. We'll map your current stack, model
            your member economics, and show you VCO end-to-end.
          </p>
          <div className="vco-hero-actions">
            <a className="vco-btn vco-btn-primary" href="#">Book a demo <span className="arr">↗</span></a>
            <a className="vco-btn" href="#">Talk to sales</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vco-footer">
        <div className="vco-wrap">
          <div className="vco-foot-grid">
            <div className="vco-foot-brand">
              <div className="h"><span className="it">Vehicle</span> Care OS</div>
              <p className="p">The operating system for car wash, detailing, and mobile vehicle care businesses.</p>
            </div>
            <div>
              <h4>Platform</h4>
              <ul><li><a href="#">Booking</a></li><li><a href="#">Memberships</a></li><li><a href="#">Operations</a></li><li><a href="#">Customer app</a></li></ul>
            </div>
            <div>
              <h4>Solutions</h4>
              <ul><li><a href="#">Car wash chains</a></li><li><a href="#">Detailing studios</a></li><li><a href="#">Mobile operators</a></li><li><a href="#">Fleets &amp; dealerships</a></li></ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Customers</a></li><li><a href="#">Press</a></li></ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul><li><a href="#">Docs</a></li><li><a href="#">Changelog</a></li><li><a href="#">Status</a></li><li><a href="#">Contact</a></li></ul>
            </div>
          </div>
          <div className="vco-foot-bottom">
            <span>© 2026 Vehicle Care OS</span>
            <span>v.2026.05 — built for operators</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
