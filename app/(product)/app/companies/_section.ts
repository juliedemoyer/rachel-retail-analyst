export const sectionHtml: string = String.raw`  <div class="page">
    <div class="page-header">
      <div>
        <div class="eyebrow">Companies</div>
        <h1>50+ consumer &amp; retail companies, watched closely.</h1>
        <p style="color:var(--text-mid);margin-top:.25rem">Click any card to open the full profile, scores, vendor stack, and every source cited.</p>
      </div>
      <div style="display:flex;gap:.5rem;align-items:flex-start;padding-top:.25rem">
        <button class="filter-pill active" style="font-weight:600">All (50)</button>
        <a class="filter-pill" href="/app/priority" style="text-decoration:none">Priority (4)</a>
      </div>
    </div>

    <p style="font-size:12px;color:var(--text-dim);margin-bottom:.75rem">★ marks companies on your priority watchlist. Toggle priority using the star button on any company card or profile.</p>
    <div class="filters" style="align-items:center;gap:.75rem">
      <input class="search-input" placeholder="Search companies…" type="text">
      <select class="filter-select" id="filter-quadrant-select">
        <option value="all">AI Quadrant</option>
        <option value="performer">Performer</option>
        <option value="narrative_led">Narrative-led</option>
        <option value="silent">Silent Builder</option>
        <option value="not_visible">Not yet visible</option>
        <option value="native">AI Native</option>
      </select>
      <select class="filter-select" id="filter-sector-select">
        <option value="all">Category</option>
        <option value="grocery">Grocery</option>
        <option value="luxury">Luxury &amp; Beauty</option>
        <option value="apparel">Apparel &amp; Home</option>
        <option value="cpg">CPG / FMCG</option>
        <option value="ecommerce">E-commerce</option>
        <option value="sports">Sports &amp; Outdoor</option>
      </select>
    </div>

    <div style="display:flex;gap:1.5rem;align-items:flex-start;margin-top:.5rem">
      <div style="flex:1;min-width:0">
    <div class="companies-grid" id="companies-grid">

      <!-- AB InBev -->
      <a class="company-card" href="/app/companies/ab-inbev" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">AB InBev</span>
          <span class="c-meta">CPG/FMCG · Belgium 🇧🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure IoT</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-27 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Brewing process optimisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">IoT sensors + Azure ML optimising fermentation yields across 200+ breweries</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Revenue management <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-driven pricing and promotion optimisation across 50+ markets</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>$57.5B</strong> (+2.7%)<br>Op margin: <strong>28.3%</strong><br>Employees: <strong>150K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">World's largest brewer. Deeply data-driven culture. Azure IoT for production. 150K employees across brewery + logistics.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Adidas -->
      <a class="company-card" href="/app/companies/adidas" data-sector="apparel" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Adidas</span>
          <span class="c-meta">Sports &amp; Outdoor · Germany 🇩🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (partial)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">AWS (partial)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-04 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Membership platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Data-driven loyalty platform. 500M+ members targeted. AI for personalisation</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">D2C e-commerce <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">Digital-first strategy with growing direct-to-consumer share</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€23.7B</strong> (+11.3%)<br>Op margin: <strong>8.8%</strong><br>Employees: <strong>59K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Turnaround under Bjørn Gulden succeeding. +11% growth. Multi-cloud (Azure + AWS). DTC push creates AI opportunity.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Ahold Delhaize -->
      <a class="company-card" href="/app/companies/ahold-delhaize" data-sector="grocery" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Ahold Delhaize</span>
          <span class="c-meta">Grocery &amp; Hypermarket · Netherlands 🇳🇱</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.5</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">GCP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">EPAM</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Flybuy</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-05-06 · Q1 2026</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AH bakery AI (dynamic pricing + waste prediction) <span style="font-size:10px;color:var(--text-dim);font-weight:400">· ops</span></div>
            <div class="cc-use-case-desc"><strong>815,000 kg bread waste reduction H2 2025.</strong> First named-tool-with-named-metric in EMEA grocery on the watchlist.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">My AH Assistant + 100K employee AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">GenAI shopping + Scan &amp; Kook + Steijn chatbot on Azure OpenAI. 100,000+ AH staff using employee AI assistant for product/pricing/stock queries.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Bol Spot &amp; Shop + Marty robots + Flybuy <span style="font-size:10px;color:var(--text-dim);font-weight:400">· ops</span></div>
            <div class="cc-use-case-desc">Visual search on Bol. Marty shelf-scan in 200+ Stop &amp; Shop. Flybuy AI curbside across all 6 US banners.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · Q1 2026</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€22.3B</strong> (+3.5% organic, missed cons.)<br>Op margin: <strong>4.0%</strong> (+0.2pt, beat)<br>EPS: <strong>€0.62</strong> (+8.9% c/FX, beat)<br>Employees: <strong>414K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">CEO succession 6 May: Thierry Garnier (Kingfisher CEO, ex-Carrefour) nominated to replace Frans Muller in 2027. Microsoft/Azure customer at Kingfisher; potential vendor mix shift to watch.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Arla Foods -->
      <a class="company-card" href="/app/companies/arla" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Arla Foods</span>
          <span class="c-meta">CPG/FMCG · Denmark 🇩🇰</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-03 · FY2025 annual performance report</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Milk quality AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Computer vision and sensor-based quality control across dairy processing plants</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Farmer data platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure-based platform for milk price forecasting and sustainability reporting to 9,400 farmer-owners</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€13.8B</strong> (+5%)<br>Op margin: <strong>4%</strong><br>Employees: <strong>22K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Danish-UK-German farmer cooperative. Arla, Lurpak, Castello, Puck. 9,400 farmer-owners. ~€13.8B revenue. Azure mentioned in sustainability tech stack. Strong data platform for cooperative model. Limited public AI case study. all inferred from cooperative reporting.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- ASOS -->
      <a class="company-card" href="/app/companies/asos" data-sector="ecommerce" data-quadrant="not_visible" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">ASOS</span>
          <span class="c-meta">E-commerce · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill" style="background:var(--surface-2);color:var(--text-mid);border-color:var(--border-strong)">Not yet visible · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 17 Apr 2026 · H1 FY26</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Style-match recommendation</div>
            <div class="cc-use-case-desc">Personalised outfit suggestions in app. Low-signal: referenced as "AI-assisted" without specifics in H1 FY26 results.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Returns fraud detection (pilot)</div>
            <div class="cc-use-case-desc">ML-based returns abuse flagging. Mentioned in passing in H1 commentary. Not confirmed at scale.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1 FY2026</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£1.4B</strong> (-5.2% YoY)<br>Gross margin: <strong>38.2%</strong> · Op margin: <strong>-1.8%</strong><br>Employees: <strong>3.3K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Profitability crisis dominates the agenda. AI investment is discretionary and deferred. On the watchlist as a cautionary benchmark. 5yr Azure deal renewed 2022, tech-first culture in pockets, but execution capacity is thin.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Barilla -->
      <a class="company-card" href="/app/companies/barilla" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Barilla</span>
          <span class="c-meta">CPG/FMCG · Italy 🇮🇹</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (estimated)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated ~2025-06 · FY2024 annual report</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Demand forecasting and ingredient sourcing optimisation for pasta and sauces manufacturing</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2024</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€4B</strong> (+3.5%)<br>Op margin: <strong>9%</strong><br>Employees: <strong>8.7K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">World's largest pasta maker. Barilla, Academia Barilla, Mulino Bianco, Harry's. Private Italian family group. ~€4B revenue. Sustainability and Made in Italy positioning. Limited public tech disclosures.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Beiersdorf -->
      <a class="company-card" href="/app/companies/beiersdorf" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Beiersdorf</span>
          <span class="c-meta">CPG/FMCG · Germany 🇩🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-26 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Consumer insights AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for consumer sentiment analysis and product innovation pipeline (Nivea, Eucerin)</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Marketing personalisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-driven content and campaign generation across digital channels</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€9.7B</strong> (+5.2%)<br>Op margin: <strong>14%</strong><br>Employees: <strong>22K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Skincare-focused CPG. Nivea (#1 global skincare brand), Eucerin, La Prairie, Hansaplast. C.A.R.E.+ strategy explicitly names AI as growth lever. Azure OpenAI rollout announced 2024.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Burberry -->
      <a class="company-card" href="/app/companies/burberry" data-sector="luxury" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Burberry</span>
          <span class="c-meta">Luxury &amp; Beauty · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-05-14 · FY2024/25 preliminary + annual report</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Clienteling tools <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Digital clienteling across flagship stores. in-flight modernisation</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2024/25</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£2.5B</strong> (-17%)<br>Op margin: <strong>1.5%</strong><br>Employees: <strong>9K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Only UK-listed luxury house. fills a gap vs LVMH/Kering/Richemont. Under turnaround (Joshua Schulman CEO). AI maturity lower than continental peers.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Campari Group -->
      <a class="company-card" href="/app/companies/campari" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Campari Group</span>
          <span class="c-meta">CPG/FMCG · Italy 🇮🇹</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-10 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Digital marketing AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-powered campaign optimisation and consumer insight across Aperol, Campari, Wild Turkey portfolio</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Revenue management <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure-based price-pack architecture and trade promotion optimisation</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€2.7B</strong> (-0.6%)<br>Op margin: <strong>22%</strong><br>Employees: <strong>6.5K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Italian spirits house. Aperol, Campari, Wild Turkey, Grand Marnier, Espolòn. Microsoft stack confirmed via M365 and Azure workloads. Direct peer to Diageo and Pernod Ricard. Under cost pressure in 2025 with organic growth softening.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Carlsberg -->
      <a class="company-card" href="/app/companies/carlsberg" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Carlsberg</span>
          <span class="c-meta">CPG/FMCG · Denmark 🇩🇰</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-12 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">SAIL'27 AI platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure-based AI platform supporting route-to-market, trade promotion, and supply chain under SAIL'27 strategy</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Commercial AI assistant <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI deployed to field sales and key account management teams</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€9.4B</strong> (+1.2%)<br>Op margin: <strong>16.5%</strong><br>Employees: <strong>40K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Third-largest global brewer. Carlsberg, Kronenbourg 1664, Tuborg, San Miguel (licence). SAIL'27 strategy explicitly names AI/data as pillar. Published Microsoft case study on Azure AI. Direct peer to Heineken and AB InBev.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Carrefour -->
      <a class="company-card" href="/app/companies/carrefour" data-sector="grocery" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Carrefour</span>
          <span class="c-meta">Grocery · France 🇫🇷</span>
          <span class="priority-toggle is-priority">★ Priority account</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill perf">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Google Cloud</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Mistral AI</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">OpenAI</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-19 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Hopla (in-store GenAI assistant)</div>
            <div class="cc-use-case-desc">Customer-facing AI built on Mistral. Live in France. First EMEA grocery GenAI consumer product.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI procurement and margin optimisation</div>
            <div class="cc-use-case-desc">Google Cloud ML for buying decisions across 30 countries. Named in FY2025 results release.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€94.1B</strong> (+1.8% organic)<br>Gross margin: <strong>21.1%</strong> · Op margin: <strong>3.1%</strong><br>Employees: <strong>340K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Sovereign-AI first posture. Chose Mistral (French) deliberately for Hopla. Google Cloud is the ops backbone. Structurally resistant to Microsoft given GCP depth. Low op margin limits discretionary AI spend.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Colruyt Group -->
      <a class="company-card" href="/app/companies/colruyt" data-sector="grocery" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Colruyt Group</span>
          <span class="c-meta">Grocery &amp; Hypermarket · Belgium 🇧🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-12-04 · H1 FY2025/26 (Apr–Sep 2025)</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Algorithmic pricing engine <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Proprietary AI pricing system guarantees Colruyt stores are always the cheapest in their market. automated price monitoring across 100k+ SKUs, updated daily. Core competitive moat since the 1980s.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure + Databricks demand forecasting across Colruyt, Bio-Planet, and OKay formats</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€9.8B</strong> (+4.5%)<br>Op margin: <strong>3.8%</strong><br>Employees: <strong>32K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Belgium's largest retailer. Colruyt (600+ stores), OKay, Bio-Planet, Collect&amp;Go (online). Family-controlled (Colruyt family ~60%). The algorithmic pricing guarantee ('lowest price or we refund the difference') has been AI-powered since the 1980s. one of Europe's oldest retail AI stories. Azure confirmed for modern data platform. Interesting competitive-intel account given the pricing-AI moat.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Danone -->
      <a class="company-card" href="/app/companies/danone" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Danone</span>
          <span class="c-meta">CPG/FMCG · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Microsoft Fabric</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-20 · FY2025 + Q1 2026</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Demand forecasting <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure ML-based demand planning across dairy and specialised nutrition</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Gen-AI R&amp;D assistant <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI tooling for product R&amp;D and regulatory workflows</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€27.4B</strong> (+4.3%)<br>Op margin: <strong>13%</strong><br>Employees: <strong>90K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">France's #2 food giant. Renew Danone strategy is productivity + AI-led. Mixed cloud but Microsoft-leaning on productivity and AI workloads.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Decathlon -->
      <a class="company-card" href="/app/companies/decathlon" data-sector="sports" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Decathlon</span>
          <span class="c-meta">Sports &amp; Outdoor · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill perf">Performer · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (partial, estimated)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 (likely)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">RFID platform</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated  · ⚠️ None. HTML-only on sustainability.decathlon.com</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">RFID inventory tracking <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">In-store RFID for real-time stock visibility across 1,700+ stores</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Sustainable supply chain <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">Data-driven sustainability tracking aligned with CSRD requirements</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · ⚠️</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€16.1B</strong> (+4.8%)<br>Op margin: <strong>5.5%</strong><br>Employees: <strong>101K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Private company. 101K employees, 1,700+ stores. Strong innovation and sustainability culture. Greenfield for all vendors.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Diageo -->
      <a class="company-card" href="/app/companies/diageo" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Diageo</span>
          <span class="c-meta">CPG/FMCG · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (likely)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Google Ads</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-04 · H1 FY26 + FY25 annual</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Marketing mix modelling <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">AI-driven marketing spend optimisation across 200+ brands in 180+ markets</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">D2C platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">Growing direct-to-consumer channel with data-driven personalisation</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£15.5B</strong> (-1.4%)<br>Op margin: <strong>27.5%</strong><br>Employees: <strong>30K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Premium spirits (Johnnie Walker, Guinness, Tanqueray). Marketing-driven and data-rich. D2C ambition growing.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Essity -->
      <a class="company-card" href="/app/companies/essity" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Essity</span>
          <span class="c-meta">CPG/FMCG · Sweden 🇸🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-04 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Copilot for frontline workers <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">M365 Copilot + Teams deployed to factory and field-sales teams across 150 countries</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Dynamics 365 Supply Chain + Azure ML for tissue and hygiene demand planning</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€13.1B</strong> (+2%)<br>Op margin: <strong>11%</strong><br>Employees: <strong>48K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Swedish hygiene and health company. Tena, Tork, Leukoplast, Jobst, Libresse/Bodyform. Demerged from SCA 2017. One of the more Microsoft-deep CPG companies on the watchlist: Dynamics 365 confirmed (rare for CPG), M365 Copilot broad rollout, Azure AI for supply chain.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Estée Lauder -->
      <a class="company-card" href="/app/companies/estee-lauder" data-sector="luxury" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Estée Lauder</span>
          <span class="c-meta">Luxury &amp; Beauty · US (EMEA ops) 🇺🇸</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Internal AI tools</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-03 · Q2 FY26</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">GenAI ecosystem <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">M365 Copilot rollout for speed-to-market on product launches. publicly cited by Microsoft</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Consumer insights AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">NLP on social media and reviews to drive product development</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · Q2</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>$15.9B</strong> (-2.3%)<br>Op margin: <strong>8.1%</strong><br>Employees: <strong>62K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Building GenAI ecosystem with Copilot. Under margin pressure. AI seen as efficiency lever. Publicly cited by Microsoft.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Ferrero -->
      <a class="company-card" href="/app/companies/ferrero" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Ferrero</span>
          <span class="c-meta">CPG/FMCG · Italy 🇮🇹</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (estimated)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Microsoft 365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-11-01 · FY2024/25 (ended Aug 2025)</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Manufacturing quality AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Computer vision for confectionery quality control at scale (Nutella, Kinder, Ferrero Rocher)</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2024/25</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€17.2B</strong> (+5.5%)<br>Op margin: <strong>9%</strong><br>Employees: <strong>47K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Private Italian family company. Nutella, Kinder, Ferrero Rocher, Tic Tac, Raffaello. Limited public tech disclosures. SAP is likely ERP backbone; Azure presence inferred from M365 and SAP-on-Azure patterns in Italian manufacturing. FY ends August.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Fnac Darty -->
      <a class="company-card" href="/app/companies/fnac-darty" data-sector="ecommerce" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Fnac Darty</span>
          <span class="c-meta">E-commerce · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-03 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">After-sales AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-powered repair diagnostics and after-sales routing across Darty's 600+ French stores. largest after-sales network in France</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Product recommendations <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for personalised product discovery across fnac.com and darty.com</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€7.8B</strong> (-1.5%)<br>Op margin: <strong>2.5%</strong><br>Employees: <strong>25K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">French electronics and culture retailer. Fnac (books, tech, music) + Darty (appliances). Merged 2016. 900+ stores across FR/BE/PT/CH. Under revenue pressure from Amazon but AI-led after-sales is a real differentiator. Darty's after-sales network is its moat.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- H&M -->
      <a class="company-card" href="/app/companies/hm" data-sector="apparel" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">H&amp;M</span>
          <span class="c-meta">Apparel · Sweden 🇸🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Google Cloud</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 27 Mar 2026 · Q1 2026</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI demand planning (pilot)</div>
            <div class="cc-use-case-desc">Google Cloud Vertex AI pilot for seasonal stock allocation. Named Q4 2025 earnings, not yet full rollout.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Sustainability-AI: material traceability</div>
            <div class="cc-use-case-desc">ML-based supply chain traceability for CSRD compliance. Confirmed in 2025 sustainability report.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>SEK 236B</strong> (+0.1%)<br>Gross margin: <strong>52.0%</strong> · Op margin: <strong>6.2%</strong><br>Employees: <strong>107K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Quiet builder. Low investor AI rhetoric vs. real tooling in production. Revenue flat, op margin recovering. Shein pressure is the defining commercial threat. AI spend capacity limited vs. Inditex.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Haleon -->
      <a class="company-card" href="/app/companies/haleon" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Haleon</span>
          <span class="c-meta">CPG/FMCG · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-05 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Consumer AI insight <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI deployed for consumer sentiment, brand health monitoring, and marketing copy generation (Sensodyne, Voltaren, Panadol)</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain analytics <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">GCP-based demand sensing and inventory optimisation</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£10.8B</strong> (+3.5%)<br>Op margin: <strong>20%</strong><br>Employees: <strong>22K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Demerged from GSK in 2022. Consumer healthcare. Sensodyne, Voltaren, Panadol, Advil, Centrum. Dual cloud (Azure + GCP). One of few EMEA CPG companies with confirmed Google Cloud workloads. £10.8B revenue, premium margins for the sector.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Heineken -->
      <a class="company-card" href="/app/companies/heineken" data-sector="cpg" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Heineken</span>
          <span class="c-meta">CPG/FMCG · Netherlands 🇳🇱</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Databricks</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-11 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">EverGreen data platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Global Azure + Databricks data platform, backbone of commercial AI</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Gen-AI assistant for sales reps <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI copilot for field sales in on-trade channels</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€28.75B</strong> (+1.6% organic)<br>Op margin: <strong>15.2%</strong><br>Employees: <strong>85K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Published Microsoft reference customer. Multi-year cloud migration largely on Azure. Competitor to AB InBev. EverGreen strategy is data-led.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- HelloFresh -->
      <a class="company-card" href="/app/companies/hellofresh" data-sector="cpg" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">HelloFresh</span>
          <span class="c-meta">CPG / FMCG · Germany 🇩🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 5.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">GCP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Vertex AI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">BigQuery</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-11 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Recipe personalisation engine <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">ML-driven weekly menu recommendations across 8M+ active customers. GCP Vertex AI backbone, personalising from 100+ recipe options per market</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Logistics + fulfilment AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">Real-time route optimisation and fulfilment demand forecasting across 100+ distribution centres globally on GCP</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Churn prediction <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">BigQuery ML models predicting customer churn and triggering retention offers. central to HelloFresh's profitability recovery strategy</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€6.5B</strong> (-5.2%)<br>Op margin: <strong>2.8%</strong><br>Employees: <strong>18K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">German meal-kit pioneer. HelloFresh, Green Chef, EveryPlate, Factor (US), Chefs Plate. GCP-primary and AI-native from founding. Only meal-kit account on the watchlist and the strongest Google Cloud reference in EMEA e-commerce. Revenue declining from 2022 peak (€7.6B) as pandemic tailwinds unwound; profitability recovery is the 2025/26 narrative.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Henkel -->
      <a class="company-card" href="/app/companies/henkel" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Henkel</span>
          <span class="c-meta">CPG/FMCG · Germany 🇩🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP on Azure</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-05 · FY2025 full year + Q4 2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Demand forecasting and logistics optimisation across adhesives and consumer goods divisions via Azure ML</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Copilot for R&amp;D <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">M365 Copilot deployed to R&amp;D and marketing teams for formulation workflows</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€21.6B</strong> (+2.8%)<br>Op margin: <strong>13.5%</strong><br>Employees: <strong>79K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Dual-division structure (Adhesives + Consumer Brands). SAP on Azure is the ERP backbone. M365 Copilot rollout confirmed 2024. Persil, Schwarzkopf, Fa brands. EMEA-heavy revenue.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Hermès -->
      <a class="company-card" href="/app/companies/hermes" data-sector="luxury" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Hermès</span>
          <span class="c-meta">Luxury &amp; Beauty · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-12 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Artisan quality tracking <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-powered production monitoring across 52 French ateliers. tracking leather quality, stitch consistency, and craft anomalies without replacing human artisans</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Client intelligence <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure-based client analytics for personalised clienteling across 300+ stores. respects Hermès privacy-first posture</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€14.7B</strong> (+7%)<br>Op margin: <strong>42%</strong><br>Employees: <strong>23K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">French ultra-luxury house. Birkin, Kelly, Constance, silk scarves, Hermès Home. Family-controlled (Hermès family ~66%). Highest operating margins in luxury at 42%+. AI posture is deliberately conservative: used to protect craft, not to scale or replace artisans. Direct peer to LVMH and Kering but with fundamentally different AI philosophy.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- IKEA / Ingka -->
      <a class="company-card" href="/app/companies/ikea" data-sector="apparel" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">IKEA / Ingka</span>
          <span class="c-meta">Apparel &amp; Home · Sweden 🇸🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Dynamics 365</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-10 · FY2025 (annual only)</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain optimisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Dynamics 365 for end-to-end supply chain visibility</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Sustainability analytics <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">CSRD-aligned carbon tracking across value chain</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€47.6B</strong> (+3.9%)<br>Op margin: <strong>7.2%</strong><br>Employees: <strong>177K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Private company (Ingka Group). Strong sustainability focus aligns with CSRD requirements. Digital transformation ongoing.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Inditex -->
      <a class="company-card" href="/app/companies/inditex" data-sector="apparel" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Inditex</span>
          <span class="c-meta">Apparel · Spain 🇪🇸</span>
          <span class="priority-toggle is-priority">★ Priority account</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Zara Try-On</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Proprietary RFID</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Internal data platform</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 13 Mar 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Zara Try-On (synthetic avatar fitting)</div>
            <div class="cc-use-case-desc">Live in 43 markets since Dec 2025. 7M+ customer sessions. AI creates a fit avatar from user photos. Flagship consumer GenAI deployment in European apparel.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">RFID + data platform foundation</div>
            <div class="cc-use-case-desc">100% of Zara garments tagged over a decade. CEO quote FY2025: "we built the foundations first, now we can deploy AI securely and at scale."</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">€2.3B FY2026 capex: tech integration</div>
            <div class="cc-use-case-desc">Ordinary capex earmarked for technological integration + online platforms. Multi-year build phase, not a promotional AI cycle.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€39.9B</strong> (+3.2% · +7% cc)<br>Gross margin: <strong>58.3%</strong> · EBIT margin: <strong>20.1%</strong><br>Net cash: <strong>€11.0B</strong><br>5,460 stores · 214 markets</div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">Not named FY2025</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span style="font-size:10px;color:var(--text-dim)">Not named FY2025</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Silent Builder, textbook. CEO barely mentions AI until directly asked, but Try-On is shipping at global scale. No named hyperscaler in FY2025 IR: Inditex likely runs on internal platforms. Hardest account to penetrate on vendor logos, easiest to engage on use case.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Jeronimo Martins -->
      <a class="company-card" href="/app/companies/jeronimo-martins" data-sector="grocery" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Jeronimo Martins</span>
          <span class="c-meta">Grocery &amp; Hypermarket · Portugal 🇵🇹</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP on Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-26 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Biedronka price intelligence <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure ML for dynamic pricing and competitive price monitoring across Biedronka's 3,400+ Polish stores. pricing AI is central to market leadership</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain forecasting <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">SAP on Azure + Databricks demand forecasting across fresh food and private label across Poland, Portugal, and Colombia</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€29.1B</strong> (+9.5%)<br>Op margin: <strong>5.2%</strong><br>Employees: <strong>120K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Portuguese family-controlled retailer. Biedronka (Poland's #1 grocer, 3,400+ stores), Pingo Doce (Portugal), Ara (Colombia). €29B revenue makes it one of the largest EMEA grocers by revenue, yet massively undertracked by UK/FR-focused retail analysts. Azure + SAP confirmed. The Poland angle is strategically interesting. Eastern Europe's largest food retailer.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Kering -->
      <a class="company-card" href="/app/companies/kering" data-sector="luxury" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Kering</span>
          <span class="c-meta">Luxury · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.5</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Salesforce</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 12 Feb 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Gucci virtual try-on</div>
            <div class="cc-use-case-desc">AR/AI try-on for accessories. Confirmed in Gucci brand press 2025. Consumer-facing, app + web.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI client advisement (Bottega Veneta)</div>
            <div class="cc-use-case-desc">GenAI client relationship tool for SA in-store. Pilot, Salesforce Einstein base. Not yet group-wide.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€17.2B</strong> (-12% organic)<br>Gross margin: <strong>71.3%</strong> · Op margin: <strong>14.8%</strong><br>Employees: <strong>49K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Revenue down 12% (Gucci downturn). Pierre Houlès appointed Chief Data, AI &amp; IT Officer to ExCom Mar 2026: first named AI seat at board level. Buying signal. Under new CEO Luca de Meo (from Renault).</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Kingfisher -->
      <a class="company-card" href="/app/companies/kingfisher" data-sector="apparel" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Kingfisher</span>
          <span class="c-meta">Apparel &amp; Home · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-25 · FY2025/26 full year (ended Jan 2026)</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Store colleague Copilot <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">M365 Copilot deployed to 78k store staff across B&amp;Q, Castorama, Brico Dépôt. product lookup, stock queries, customer service assistance</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Pricing &amp; demand AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure ML for dynamic pricing and seasonal demand forecasting across 1,400+ stores in 8 countries</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025/26</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£12.7B</strong> (+1.2%)<br>Op margin: <strong>5.8%</strong><br>Employees: <strong>78K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Europe's largest DIY and home improvement retailer. B&amp;Q (UK), Castorama (FR/PL), Brico Dépôt (FR/ES/PT), Screwfix (UK). 1,400+ stores across 8 countries. Named Microsoft reference customer for M365 Copilot frontline worker deployment. Fills the home improvement white space on the watchlist.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- L'Oréal -->
      <a class="company-card" href="/app/companies/loreal" data-sector="luxury" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">L'Oréal</span>
          <span class="c-meta">Luxury/Beauty · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill perf">Performer · 4.5</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 11 Feb 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Beauty Genius (consumer GenAI diagnostics)</div>
            <div class="cc-use-case-desc">Live in 14 markets on Azure OpenAI. Target 25 markets by end-2026. Named at Brandstorm 2026.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">ModiFace AR try-on</div>
            <div class="cc-use-case-desc">In-store and app, 30+ brands, 90M+ sessions/year. Acquired 2018, now a platform licensed to competitors.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI-powered formulation R&D</div>
            <div class="cc-use-case-desc">ML models predicting ingredient efficacy. Named in FY2025 annual, §Innovation p.34.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€41.2B</strong> (+5.6%)<br>Gross margin: <strong>74.1%</strong> · Op margin: <strong>20.0%</strong><br>Employees: <strong>90K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Best-in-class AI narrative. CDMO Humberto Moneró owns the investor story. Beauty Genius is the clearest consumer-facing GenAI product in EMEA retail. 5yr Microsoft enterprise deal confirmed 2024.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Lavazza -->
      <a class="company-card" href="/app/companies/lavazza" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Lavazza</span>
          <span class="c-meta">CPG/FMCG · Italy 🇮🇹</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (estimated)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated ~2026-04 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Consumer personalisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-driven coffee subscription and D2C recommendation engine across lavazza.com</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€2.7B</strong> (+4%)<br>Op margin: <strong>10%</strong><br>Employees: <strong>5.2K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Italian family-owned coffee group. Lavazza, Carte Noire, Kicking Horse. ~€2.7B revenue. Sustainability + premiumisation strategy. Limited public tech disclosures. SAP ERP backbone; Azure inferred from M365 and Italian enterprise patterns.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- LEGO Group -->
      <a class="company-card" href="/app/companies/lego" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">LEGO Group</span>
          <span class="c-meta">CPG/FMCG · Denmark 🇩🇰</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-04 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI-powered play experiences <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI integration into digital play products and LEGO Ideas platform for generative content</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Supply chain optimisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Databricks + Azure ML for demand forecasting across 140k SKUs globally</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>DKK9.9B</strong> (+13%)<br>Op margin: <strong>28%</strong><br>Employees: <strong>28K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Private Danish toy giant. world's largest toy company by revenue. Responsible AI use is a core brand value (child safety). Azure and M365 Copilot confirmed 2024. Digital/physical play convergence is strategic direction. Classifying as CPG (mass consumer product, not retail-led).</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Lotus Bakeries -->
      <a class="company-card" href="/app/companies/lotus-bakeries" data-sector="cpg" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Lotus Bakeries</span>
          <span class="c-meta">CPG/FMCG · Belgium 🇧🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-20 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Demand forecasting <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure ML-based demand planning and production scheduling across Biscoff, Lotus, Dinosaurus and natural snacks portfolio</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Innovation acceleration <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for NPD pipeline. flavour extension and format ideation for Biscoff global expansion</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€3.2B</strong> (+8.5%)<br>Op margin: <strong>17%</strong><br>Employees: <strong>3.9K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Belgian family-controlled biscuit and snacking company. Biscoff (global cult brand), Lotus, Dinosaurus, Annas, nākd, TREK, Urban Fruit. Premium growth story: Biscoff spread and biscuit global rollout driving double-digit growth. Small but profitable. One of the more surprising Microsoft reference accounts. Dynamics 365 confirmed for a company this size.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- LVMH -->
      <a class="company-card" href="/app/companies/lvmh" data-sector="luxury" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">LVMH</span>
          <span class="c-meta">Luxury · France 🇫🇷</span>
          <span class="priority-toggle is-priority">★ Priority account</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Google Cloud</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 13 Apr 2026 · Q1 2026</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">GenAI creative ideation (Dior)</div>
            <div class="cc-use-case-desc">Internal platform for design teams on Azure OpenAI. Confirmed in FY2025 annual.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Inventory forecasting (Louis Vuitton × Google)</div>
            <div class="cc-use-case-desc">3-year ML program on Vertex AI. Named in Q3 2025 earnings call and Google Cloud case study.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">GenAI shopping assistant (Sephora)</div>
            <div class="cc-use-case-desc">Consumer-facing, launched Oct 2025, live in France, UK, US. Built on Salesforce Einstein + Writer.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025 baseline</div>
          <div style="font-size:12px;margin-bottom:.5rem;line-height:1.8">Revenue: <strong>€84.7B</strong> (-1.3% reported, +2.1% organic)<br>Op margin: <strong>23.1%</strong> · Op profit: <strong>€19.6B</strong><br>Employees: <strong>213K</strong></div>
          <div style="font-size:11px;color:var(--green);margin-bottom:.75rem">Q1 2026: €20.3B revenue, +3% organic (13 Apr)</div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Quiet-build posture. Arnault won't make AI the story publicly. Multi-cloud across Google (ML) and Azure (GenAI). Watch Sephora DACH expansion in 2026.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Mango -->
      <a class="company-card" href="/app/companies/mango" data-sector="apparel" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Mango</span>
          <span class="c-meta">Apparel &amp; Home · Spain 🇪🇸</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated ~2026-04 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI fashion design <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for trend forecasting and AI-assisted product design. Mango published one of the first fashion-AI use cases in EMEA in 2024</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">D2C personalisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure ML for personalised product recommendations across mango.com. D2C is &gt;30% of revenue and growing</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€3.8B</strong> (+14%)<br>Op margin: <strong>9%</strong><br>Employees: <strong>16K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Spanish family-owned fast-fashion retailer. Mango, Mango Man, Violeta, Mango Kids. 2,700+ stores in 120 countries, 30%+ revenue from online. Published Azure OpenAI for fashion design and trend forecasting in 2024. one of the more distinctive AI stories in EMEA apparel. Private (Andic family). Direct peer to Inditex but smaller, more design-led, and faster-moving on AI disclosure.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Marks &amp; Spencer -->
      <a class="company-card" href="/app/companies/marks-spencer" data-sector="apparel" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Marks &amp; Spencer</span>
          <span class="c-meta">Apparel &amp; Home · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Microsoft Fabric</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-11-05 · H1 FY25/26 + FY25 annual</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Sparks loyalty AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Personalised food &amp; clothing recommendations via Azure OpenAI</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Store operations AI <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">M365 Copilot for store managers, Fabric-based analytics platform</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£13.8B</strong> (+9%)<br>Op margin: <strong>5.8%</strong><br>Employees: <strong>64K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Public Microsoft strategic partnership announced 2023, deepened 2024. Flagship UK retail AI reference. Sparks programme is central data asset.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Nespresso -->
      <a class="company-card" href="/app/companies/nespresso" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Nespresso</span>
          <span class="c-meta">CPG/FMCG · Switzerland 🇨🇭</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Dynamics 365 Customer Service</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Nespresso mobile app</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated  · N/A. consolidated in Nestlé</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Customer service transformation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Dynamics 365 powering omnichannel customer service for D2C</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Digital D2C platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Mobile app driving increased basket value and purchase frequency</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · N/A</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€6.5B</strong> (+5.3%)<br>Op margin: <strong>9.1%</strong><br>Employees: <strong>14K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Dynamics CS showcase. Premium D2C brand. Vertuo driving growth. Digital transformation a key enabler.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Nestlé -->
      <a class="company-card" href="/app/companies/nestle" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Nestlé</span>
          <span class="c-meta">CPG · Switzerland 🇨🇭</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Microsoft 365</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-20 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">NesGPT (internal CPG LLM)</div>
            <div class="cc-use-case-desc">Proprietary LLM for brand and category management. 30,000+ employee rollout confirmed FY2025.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI recipe and product development</div>
            <div class="cc-use-case-desc">ML-assisted R&D pipeline. Named at investor day 2025. Reduced time-to-market on 3 Nespresso SKUs.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>CHF 91.4B</strong> (+2.2% organic)<br>Gross margin: <strong>47.9%</strong> · Op margin: <strong>17.2%</strong><br>Employees: <strong>277K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Deep Microsoft relationship confirmed via NesGPT on Azure. Rhetoric outpaces confirmed production tool count. Largest CPG by revenue on the watchlist. Strong financial capacity to accelerate.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Ocado -->
      <a class="company-card" href="/app/companies/ocado" data-sector="grocery" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Ocado</span>
          <span class="c-meta">Grocery/Tech · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 5.0</span></span>
          <span class="c-score-row" style="font-size:11px;color:var(--text-dim)">AI is the core business model</span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">AWS</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Proprietary robotics</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Ocado Intelligent Automation</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 28 Jan 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Automated fulfilment (OIA platform)</div>
            <div class="cc-use-case-desc">Robotic picking + ML routing in Customer Fulfilment Centres. Licensed to Kroger, Coles, Morrisons. This IS the product.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Dynamic route optimisation</div>
            <div class="cc-use-case-desc">ML-based last-mile routing across UK. Proprietary, not a vendor product. Central to Ocado Logistics P&L.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI-powered demand prediction (grocery)</div>
            <div class="cc-use-case-desc">ML demand model underpinning the Ocado.com range of 50K+ SKUs. Built internally over 10+ years.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£3.2B</strong> (+12.1%)<br>Gross margin: <strong>31.4%</strong> · Op margin: <strong>-2.9%</strong><br>Employees: <strong>18K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>AWS</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-notes">The only AI-native on the list. Robotics and ML are not a layer on top of retail: they are the licensed product sold to other grocers. Operationally loss-making but the tech platform is the investment thesis.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- On Running -->
      <a class="company-card" href="/app/companies/on-running" data-sector="sports" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">On Running</span>
          <span class="c-meta">Sports &amp; Outdoor · Switzerland 🇨🇭</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">AWS (primary)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (partial)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Databricks</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-05-12 · Q1 2026</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Design AI integration <span style="font-size:10px;color:var(--text-dim);font-weight:400">· confirmed</span></div>
            <div class="cc-use-case-desc">AI now impacts innovation and design workflows: team tests more virtual options with smaller physical teams. CEO Hoffman Q1 2026 call</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">D2C personalisation + demand planning <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">ML recommendations on-running.com + Databricks S&amp;OP. DTC CHF 322M (+16.4%), 39% of revenue</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · Q1 2026</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>CHF 831.9M</strong> (+14.5%)<br>Gross margin: <strong>64.2%</strong><br>EBITDA margin: <strong>21.0%</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Fastest-growing premium sports brand. Swiss-HQ, US-listed (NYSE). AWS-primary infra but M365 + Databricks on data. Direct peer to Adidas/Nike premium segment.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Pernod Ricard -->
      <a class="company-card" href="/app/companies/pernod-ricard" data-sector="cpg" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Pernod Ricard</span>
          <span class="c-meta">CPG/FMCG · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Databricks</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02 · H1 FY26 + Q3 FY26</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Matrix AI platform <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Internal AI platform powering sales, marketing, procurement. built on Azure</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Generative marketing <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for creative and content generation across brand portfolio</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€10.96B</strong> (-3.0% organic)<br>Op margin: <strong>26.9%</strong><br>Employees: <strong>18.2K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">None</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Direct Diageo peer. Strong Microsoft partnership. published case study on Matrix AI platform. Marketing and commercial AI are strategic priorities.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Puig -->
      <a class="company-card" href="/app/companies/puig" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Puig</span>
          <span class="c-meta">CPG/FMCG · Spain 🇪🇸</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">SAP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Salesforce</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-03-06 · FY2025 full year</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Fragrance personalisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">AI-driven fragrance recommendation engine for Carolina Herrera and Rabanne D2C channels</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€4.3B</strong> (+11%)<br>Op margin: <strong>16%</strong><br>Employees: <strong>12K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Spanish prestige beauty and fashion house. Carolina Herrera, Rabanne, Nina Ricci, Jean Paul Gaultier, Byredo, Dr. Barbara Sturm. IPO'd on BME (Barcelona) in 2024. Limited public tech disclosures post-IPO. Azure inferred from SAP-on-Azure and M365 ecosystem.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Reckitt -->
      <a class="company-card" href="/app/companies/reckitt" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Reckitt</span>
          <span class="c-meta">CPG/FMCG · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 (likely)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (partial)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Google Cloud (partial)</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-02-11 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Digital transformation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">New CEO Kris Licht driving company-wide digital/data transformation</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Consumer health insights <span style="font-size:10px;color:var(--text-dim);font-weight:400">· none</span></div>
            <div class="cc-use-case-desc">NLP and ML for consumer insights in health &amp; hygiene categories</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£14.1B</strong> (-0.8%)<br>Op margin: <strong>22.7%</strong><br>Employees: <strong>43K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">New CEO driving transformation. Revenue under pressure. CDO/Data leadership opportunity. Multiple clouds in play.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Richemont -->
      <a class="company-card" href="/app/companies/richemont" data-sector="luxury" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Richemont</span>
          <span class="c-meta">Luxury &amp; Beauty · Switzerland 🇨🇭</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 2.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 (likely)</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure (partial)</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2026-01-15 (Q3) · FY2025 annual + H1 FY26 + Q3 FY26</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">E-commerce platform (YNAP era) <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Digital luxury commerce. now in flux post-YNAP divestiture</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Clienteling tools <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Estimated: CRM-based VIP management across Cartier, Van Cleef boutiques</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€21.4B</strong> (+4.1%)<br>Op margin: <strong>18.9%</strong><br>Employees: <strong>39K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Owns Cartier, Van Cleef, IWC, Montblanc. YNAP divestiture creates cloud strategy reset moment.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Sainsbury's -->
      <a class="company-card" href="/app/companies/sainsburys" data-sector="grocery" data-quadrant="silent" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Sainsbury's</span>
          <span class="c-meta">Grocery &amp; Hypermarket · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill silent">Silent Builder · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">GCP</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Microsoft 365</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Dynamics (legacy)</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-11-06 · H1 FY25/26 + FY25/26 aide-memoire</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Nectar360 personalisation <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">Loyalty-driven personalised pricing and promotions across Sainsbury's + Argos</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Argos search &amp; discovery <span style="font-size:10px;color:var(--text-dim);font-weight:400">· google</span></div>
            <div class="cc-use-case-desc">ML-powered search across non-food catalogue</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£32.8B</strong> (+3.1%)<br>Op margin: <strong>3.1%</strong><br>Employees: <strong>148K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Second UK grocer after Tesco. Historically GCP-leaning on data and AI, M365 on productivity. Nectar360 is key first-party data asset.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Sodexo -->
      <a class="company-card" href="/app/companies/sodexo" data-sector="grocery" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Sodexo</span>
          <span class="c-meta">Grocery · France 🇫🇷</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill performer">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure OpenAI</span><span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">M365 Copilot</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 2025-04-10 · H1 FY2025 (Feb 2025)</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Copilot for 422k employees <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">One of the largest M365 Copilot deployments globally. rolled out to corporate, catering, and facilities teams across 45 countries</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Menu intelligence <span style="font-size:10px;color:var(--text-dim);font-weight:400">· microsoft</span></div>
            <div class="cc-use-case-desc">Azure OpenAI for menu personalisation, nutritional optimisation, and food waste reduction across B&amp;I and healthcare catering</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · H1</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€23.8B</strong> (+7.4%)<br>Op margin: <strong>4.5%</strong><br>Employees: <strong>422K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Signalled</span></div><div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">World's second-largest food services and FM company (behind Compass). 422k employees, 45 countries. Pluxee (benefits/vouchers) spun off 2024. FY ends August 31. One of the largest M365 Copilot enterprise deployments in the world. flagship Microsoft reference for the services sector. Strategic focus on AI for menu, sustainability, and workforce.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Tesco -->
      <a class="company-card" href="/app/companies/tesco" data-sector="grocery" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Tesco</span>
          <span class="c-meta">Grocery · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill perf">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Azure Foundry</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Databricks</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">GCP</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 10 Apr 2026 · FY25/26</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Personalised offers (Clubcard AI)</div>
            <div class="cc-use-case-desc">20M+ household dataset drives AI-personalised promotions. Named in FY25/26 strategic update.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI demand forecasting</div>
            <div class="cc-use-case-desc">Replacing legacy planning tools. Databricks ML layer confirmed Q4 2025. Waste reduction cited.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Distribution centre optimisation</div>
            <div class="cc-use-case-desc">Azure AI Foundry-based routing and slot prediction across UK DC network. Named in IR day 2025.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY25/26</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>£68.2B</strong> (+3.8%)<br>Gross margin: <strong>8.1%</strong> · Op margin: <strong>4.6%</strong><br>Employees: <strong>345K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">UK grocery leader with 20M+ Clubcard households. The data asset is the moat. CDIO Ken Towle runs a genuine tech organisation. AI spend accelerated materially in FY25 per capex disclosure.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Unilever -->
      <a class="company-card" href="/app/companies/unilever" data-sector="cpg" data-quadrant="narrative_led" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Unilever</span>
          <span class="c-meta">CPG · UK 🇬🇧</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill narrative">Narrative-led · 3.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg"></div><div class="seg"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">"AI Age" framing</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Consumer LLM partners</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Agentic shopping</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 12 Feb 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">"Fit for the AI Age" organisation shift</div>
            <div class="cc-use-case-desc">CEO Fernando Fernandez FY2025: "deploying AI to supercharge demand generation, partnering with consumer-facing LLMs, working with retailers on agentic shopping models."</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Hyper-targeted marketing content</div>
            <div class="cc-use-case-desc">BMI at 16.1% of turnover (highest in a decade, +300bps over 4 yrs). AI framed as the lever, but no specific tool, platform, or ROI number disclosed.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Agentic shopping pilots with retailers</div>
            <div class="cc-use-case-desc">Most advanced agentic-commerce language from a European CPG in FY2025. No named retailer partner yet.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€50.5B</strong> (-3.8% rpt · +3.5% USG)<br>Gross margin: <strong>46.9%</strong> · UOM: <strong>20.0%</strong><br>FCF <strong>€5.9B</strong> · ROIC <strong>19%</strong><br>30 Power Brands (78% of turnover)</div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span style="font-size:10px;color:var(--text-dim)">Not named FY2025</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span style="font-size:10px;color:var(--text-dim)">Not named FY2025</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Narrative-led pattern. CEO puts AI, LLMs, and agentic shopping centre-stage in FY2025 close, but the deck names no vendor, no tool, no ROI. CAGNY (Feb 16) is the next disclosure event on the calendar.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

      <!-- Zalando -->
      <a class="company-card" href="/app/companies/zalando" data-sector="ecommerce" data-quadrant="performer" style="cursor:pointer">
        <div class="cc-left">
          <span class="c-name">Zalando</span>
          <span class="c-meta">E-commerce · Germany 🇩🇪</span>
          <span class="priority-toggle">☆ Add to priority</span>
          <span class="c-score-row" style="margin-top:.35rem"><span class="score-pill perf">Performer · 4.0</span></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Rhetoric</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <span class="c-score-row"><span style="font-size:11px;color:var(--text-mid);width:60px">Production</span><div class="mini-bar"><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg on"></div><div class="seg"></div></div></span>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">AWS</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">GCP</span>
            <span class="source-chip" style="margin:0;font-size:10px;padding:.15rem .4rem">Proprietary ML</span>
          </div>
          <span style="font-size:10px;color:var(--text-dim);margin-top:auto">Updated 28 Feb 2026 · FY2025</span>
        </div>
        <div class="cc-mid">
          <div class="cc-section-label">Use cases &amp; value</div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Size recommendation model</div>
            <div class="cc-use-case-desc">Proprietary ML reducing returns. €400M+ return-cost saving potential cited in investor day 2025.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">AI fashion assistant (Zircle)</div>
            <div class="cc-use-case-desc">GenAI styling recommendations in app. Confirmed Q3 2025 earnings. 45M active customers targeted.</div>
          </div>
          <div class="cc-use-case">
            <div class="cc-use-case-name">Logistics routing AI</div>
            <div class="cc-use-case-desc">ML-based parcel routing across 10 European markets. Named in annual report p.18.</div>
          </div>
        </div>
        <div class="cc-right">
          <div class="cc-section-label">Financials · FY2025</div>
          <div style="font-size:12px;margin-bottom:.75rem;line-height:1.8">Revenue: <strong>€11.0B</strong> (+5.0%)<br>Gross margin: <strong>41.8%</strong> · Op margin: <strong>4.1%</strong><br>Employees: <strong>16K</strong></div>
          <div class="cc-section-label">Vendor relationships</div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-gc"></span>Google Cloud</span><span class="evidence-tier confirmed" style="font-size:9.5px;padding:.1rem .35rem">Confirmed</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-ms"></span>Microsoft</span><span class="evidence-tier estimated" style="font-size:9.5px;padding:.1rem .35rem">Estimated</span></div>
          <div class="cc-vendor-row"><span class="cc-vendor-name"><span class="cc-dot cc-dot-an"></span>Anthropic</span><span style="font-size:10px;color:var(--text-dim)">None</span></div>
          <div class="cc-notes">Tech-culture company first, retailer second. Active GitHub org (500+ ML repos). CTO-led AI investment. Returns reduction is the clearest ROI narrative in the sector.</div>
          <div class="cc-view-link">View full profile →</div>
        </div>
      </a>

<!-- RACHEL_GENERATED_38 -->
<div id="companies-approved"></div>
    </div>
      </div>
      <div style="width:196px;flex-shrink:0;position:sticky;top:80px;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:.85rem 1rem;font-size:12px;line-height:1.55;color:var(--text-mid)">
        <div><strong style="font-family:var(--font-display);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text);display:block;margin-bottom:.2rem">Rhetoric (1-5)</strong>Board-level AI narrative warmth. Scored from earnings calls and investor decks.</div>
        <div style="border-top:1px solid var(--border);padding-top:.6rem;margin-top:.6rem"><strong style="font-family:var(--font-display);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text);display:block;margin-bottom:.2rem">Production (0-5+)</strong>AI tools confirmed in-production. Counted from earnings and press releases.</div>
        <div style="border-top:1px solid var(--border);padding-top:.6rem;margin-top:.6rem"><strong style="font-family:var(--font-display);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text);display:block;margin-bottom:.2rem">Composite</strong>(Rhetoric + Production) / 2. Used for ranking only. The quadrant is the primary read.</div>
      </div>
    </div>
  </div>
`;
