/* Shared rendering helpers used across index.html, work.html, work-project.html,
   articles.html, article.html and reports.html. Requires data.js to be loaded first. */

/* ===== Animated placeholder visuals for work scroll frames ===== */
const FRAME_CONTENT = {
  fintech: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;" preserveAspectRatio="xMidYMid slice">
  <rect width="480" height="360" fill="#0D0D0B"/>
  <rect width="56" height="360" fill="#121210"/>
  <rect x="16" y="48" width="24" height="24" rx="3" fill="rgba(255,255,227,0.12)"/>
  <rect x="16" y="90" width="24" height="24" rx="3" fill="rgba(255,255,227,0.04)"/>
  <rect x="16" y="130" width="24" height="24" rx="3" fill="rgba(255,255,227,0.04)"/>
  <rect x="16" y="170" width="24" height="24" rx="3" fill="rgba(255,255,227,0.04)"/>
  <rect x="56" width="424" height="40" fill="#111110"/>
  <rect x="72" y="13" width="90" height="8" rx="2" fill="rgba(255,255,227,0.4)"/>
  <rect x="384" y="11" width="56" height="18" rx="2" fill="rgba(255,255,227,0.06)"/>
  <rect x="72" y="60" width="140" height="11" rx="2" fill="rgba(255,255,227,0.5)"/>
  <rect x="72" y="78" width="90" height="8" rx="2" fill="rgba(255,255,227,0.18)"/>
  <circle cx="378" cy="122" r="48" fill="none" stroke="rgba(255,255,227,0.06)" stroke-width="9"/>
  <circle cx="378" cy="122" r="48" fill="none" stroke="rgba(255,255,227,0.5)" stroke-width="9" stroke-dasharray="0 302" stroke-linecap="round" transform="rotate(-90 378 122)">
    <animate attributeName="stroke-dasharray" values="0 302;220 82" dur="1.4s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
  </circle>
  <text x="378" y="117" text-anchor="middle" fill="rgba(255,255,227,0.85)" font-size="22" font-weight="700" font-family="system-ui,sans-serif">74</text>
  <text x="378" y="133" text-anchor="middle" fill="rgba(255,255,227,0.3)" font-size="9" font-family="system-ui,sans-serif" letter-spacing="0.08em">RISK SCORE</text>
  <line x1="72" y1="200" x2="290" y2="200" stroke="rgba(255,255,227,0.05)" stroke-width="1"/>
  <line x1="72" y1="222" x2="290" y2="222" stroke="rgba(255,255,227,0.05)" stroke-width="1"/>
  <line x1="72" y1="244" x2="290" y2="244" stroke="rgba(255,255,227,0.05)" stroke-width="1"/>
  <rect x="86" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.18)"><animate attributeName="y" values="265;192;192" dur="0.7s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;73;73" dur="0.7s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <rect x="122" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.35)"><animate attributeName="y" values="265;220;220" dur="0.7s" begin="0.45s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;45;45" dur="0.7s" begin="0.45s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <rect x="158" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.52)"><animate attributeName="y" values="265;204;204" dur="0.7s" begin="0.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;61;61" dur="0.7s" begin="0.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <rect x="194" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.24)"><animate attributeName="y" values="265;232;232" dur="0.7s" begin="0.75s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;33;33" dur="0.7s" begin="0.75s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <rect x="230" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.42)"><animate attributeName="y" values="265;212;212" dur="0.7s" begin="0.9s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;53;53" dur="0.7s" begin="0.9s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <rect x="266" y="265" width="22" height="0" rx="1" fill="rgba(255,255,227,0.16)"><animate attributeName="y" values="265;246;246" dur="0.7s" begin="1.05s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/><animate attributeName="height" values="0;19;19" dur="0.7s" begin="1.05s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/></rect>
  <text x="97" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">DEVICE</text>
  <text x="133" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">VEL.</text>
  <text x="169" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">MERCH</text>
  <text x="205" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">LOC.</text>
  <text x="241" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">TIME</text>
  <text x="277" y="280" text-anchor="middle" fill="rgba(255,255,227,0.18)" font-size="7" font-family="system-ui,sans-serif">AMT.</text>
  <rect x="72" y="298" width="336" height="1" fill="rgba(255,255,227,0.06)"/>
  <rect x="72" y="312" width="80" height="7" rx="1" fill="rgba(255,255,227,0.22)"/>
  <rect x="362" y="308" width="46" height="14" rx="2" fill="rgba(111,227,140,0.12)"/>
  <rect x="72" y="330" width="100" height="7" rx="1" fill="rgba(255,255,227,0.14)"/>
  <rect x="362" y="326" width="46" height="14" rx="2" fill="rgba(255,255,227,0.05)"/>
</svg>`,

  health: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;" preserveAspectRatio="xMidYMid slice">
  <rect width="480" height="360" fill="#090E0C"/>
  <rect width="480" height="40" fill="#0C1310"/>
  <rect x="16" y="14" width="110" height="8" rx="2" fill="rgba(255,255,227,0.38)"/>
  <rect x="390" y="11" width="74" height="18" rx="9" fill="rgba(111,227,140,0.08)" stroke="rgba(111,227,140,0.18)" stroke-width="1"/>
  <circle cx="402" cy="20" r="3" fill="#6FE38C"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
  <text x="410" y="24" fill="rgba(111,227,140,0.75)" font-size="7" font-family="system-ui,sans-serif" letter-spacing="0.07em">LIVE</text>
  <rect x="16" y="55" width="140" height="58" rx="3" fill="rgba(111,227,140,0.05)" stroke="rgba(111,227,140,0.14)" stroke-width="1"/>
  <rect x="28" y="68" width="48" height="8" rx="2" fill="rgba(111,227,140,0.55)"/>
  <rect x="28" y="83" width="80" height="6" rx="2" fill="rgba(255,255,227,0.25)"/>
  <rect x="28" y="94" width="60" height="6" rx="2" fill="rgba(255,255,227,0.1)"/>
  <rect x="170" y="55" width="140" height="58" rx="3" fill="rgba(255,200,100,0.05)" stroke="rgba(255,200,100,0.14)" stroke-width="1"/>
  <rect x="182" y="68" width="62" height="8" rx="2" fill="rgba(255,200,100,0.5)"/>
  <rect x="182" y="83" width="80" height="6" rx="2" fill="rgba(255,255,227,0.22)"/>
  <rect x="182" y="94" width="50" height="6" rx="2" fill="rgba(255,255,227,0.08)"/>
  <rect x="324" y="55" width="140" height="58" rx="3" fill="rgba(255,90,90,0.04)" stroke="rgba(255,90,90,0.12)" stroke-width="1"/>
  <rect x="336" y="68" width="38" height="8" rx="2" fill="rgba(255,90,90,0.42)"/>
  <rect x="336" y="83" width="70" height="6" rx="2" fill="rgba(255,255,227,0.22)"/>
  <rect x="336" y="94" width="52" height="6" rx="2" fill="rgba(255,255,227,0.08)"/>
  <rect x="16" y="130" width="90" height="9" rx="2" fill="rgba(255,255,227,0.28)"/>
  <line x1="16" y1="200" x2="464" y2="200" stroke="rgba(255,255,227,0.04)" stroke-width="1" stroke-dasharray="4 4"/>
  <polyline points="16,200 46,200 56,168 66,232 76,200 100,200 114,154 124,246 134,200 158,200 168,180 178,220 200,200 258,200 274,185 286,215 300,200 338,200 350,174 360,226 370,200 408,200 420,180 430,220 448,200 464,200" fill="none" stroke="rgba(111,227,140,0.65)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="800" stroke-dashoffset="800">
    <animate attributeName="stroke-dashoffset" values="800;0" dur="2s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
  </polyline>
  <rect x="16" y="244" width="448" height="1" fill="rgba(255,255,227,0.07)"/>
  <circle cx="30" cy="264" r="6" fill="rgba(111,227,140,0.25)" stroke="rgba(111,227,140,0.4)" stroke-width="1"/>
  <rect x="44" y="258" width="82" height="7" rx="2" fill="rgba(255,255,227,0.38)"/>
  <rect x="44" y="269" width="52" height="6" rx="2" fill="rgba(255,255,227,0.14)"/>
  <rect x="384" y="254" width="64" height="18" rx="2" fill="rgba(111,227,140,0.1)"/>
  <text x="416" y="267" text-anchor="middle" fill="rgba(111,227,140,0.65)" font-size="8" font-family="system-ui,sans-serif">HIGH</text>
  <rect x="16" y="284" width="448" height="1" fill="rgba(255,255,227,0.05)"/>
  <circle cx="30" cy="304" r="6" fill="rgba(255,200,100,0.25)" stroke="rgba(255,200,100,0.35)" stroke-width="1"/>
  <rect x="44" y="298" width="92" height="7" rx="2" fill="rgba(255,255,227,0.28)"/>
  <rect x="44" y="309" width="62" height="6" rx="2" fill="rgba(255,255,227,0.1)"/>
  <rect x="384" y="294" width="64" height="18" rx="2" fill="rgba(255,200,100,0.08)"/>
  <text x="416" y="307" text-anchor="middle" fill="rgba(255,200,100,0.6)" font-size="8" font-family="system-ui,sans-serif">MED</text>
  <rect x="16" y="324" width="448" height="1" fill="rgba(255,255,227,0.05)"/>
  <circle cx="30" cy="344" r="6" fill="rgba(255,255,227,0.06)" stroke="rgba(255,255,227,0.12)" stroke-width="1"/>
  <rect x="44" y="338" width="72" height="7" rx="2" fill="rgba(255,255,227,0.2)"/>
  <rect x="44" y="349" width="50" height="6" rx="2" fill="rgba(255,255,227,0.08)"/>
  <rect x="384" y="334" width="64" height="18" rx="2" fill="rgba(255,255,227,0.04)"/>
  <text x="416" y="347" text-anchor="middle" fill="rgba(255,255,227,0.25)" font-size="8" font-family="system-ui,sans-serif">LOW</text>
</svg>`,

  robotics: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;" preserveAspectRatio="xMidYMid slice">
  <rect width="480" height="360" fill="#09090D"/>
  <rect width="480" height="40" fill="#0C0C12"/>
  <rect x="16" y="14" width="120" height="8" rx="2" fill="rgba(255,255,227,0.38)"/>
  <rect x="388" y="10" width="76" height="20" rx="10" fill="rgba(111,227,140,0.08)" stroke="rgba(111,227,140,0.18)" stroke-width="1"/>
  <circle cx="400" cy="20" r="3" fill="#6FE38C"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <text x="408" y="24" fill="rgba(111,227,140,0.75)" font-size="7" font-family="system-ui,sans-serif" letter-spacing="0.07em">LIVE</text>
  <g stroke="rgba(255,255,227,0.035)" stroke-width="1">
    <line x1="0" y1="80" x2="310" y2="80"/><line x1="0" y1="120" x2="310" y2="120"/>
    <line x1="0" y1="160" x2="310" y2="160"/><line x1="0" y1="200" x2="310" y2="200"/>
    <line x1="0" y1="240" x2="310" y2="240"/><line x1="0" y1="280" x2="310" y2="280"/>
    <line x1="0" y1="320" x2="310" y2="320"/>
    <line x1="40" y1="40" x2="40" y2="360"/><line x1="80" y1="40" x2="80" y2="360"/>
    <line x1="120" y1="40" x2="120" y2="360"/><line x1="160" y1="40" x2="160" y2="360"/>
    <line x1="200" y1="40" x2="200" y2="360"/><line x1="240" y1="40" x2="240" y2="360"/>
    <line x1="280" y1="40" x2="280" y2="360"/>
  </g>
  <path d="M80,104 L160,184 L240,144 L200,264" fill="none" stroke="rgba(255,255,227,0.1)" stroke-width="1" stroke-dasharray="5 4"/>
  <path d="M280,84 L240,144 L160,184" fill="none" stroke="rgba(255,255,227,0.07)" stroke-width="1" stroke-dasharray="5 4"/>
  <circle cx="80" cy="104" r="12" fill="rgba(111,227,140,0.08)"><animate attributeName="r" values="12;17;12" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.5;1" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="80" cy="104" r="5" fill="#6FE38C"/>
  <circle cx="160" cy="184" r="12" fill="rgba(111,227,140,0.08)"><animate attributeName="r" values="12;17;12" dur="2.5s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.5;1" dur="2.5s" begin="0.4s" repeatCount="indefinite"/></circle>
  <circle cx="160" cy="184" r="5" fill="#6FE38C"/>
  <circle cx="240" cy="144" r="12" fill="rgba(111,227,140,0.08)"><animate attributeName="r" values="12;17;12" dur="1.9s" begin="0.8s" repeatCount="indefinite"/></circle>
  <circle cx="240" cy="144" r="5" fill="#6FE38C"/>
  <circle cx="200" cy="264" r="12" fill="rgba(255,200,100,0.1)"><animate attributeName="r" values="12;18;12" dur="1.3s" repeatCount="indefinite"/></circle>
  <circle cx="200" cy="264" r="5" fill="rgba(255,200,100,0.9)"/>
  <circle cx="280" cy="84" r="13" fill="rgba(255,90,90,0.1)"><animate attributeName="r" values="13;20;13" dur="1s" repeatCount="indefinite"/></circle>
  <circle cx="280" cy="84" r="5" fill="rgba(255,90,90,0.9)"/>
  <rect x="320" y="40" width="160" height="320" fill="rgba(255,255,227,0.015)"/>
  <line x1="320" y1="40" x2="320" y2="360" stroke="rgba(255,255,227,0.07)" stroke-width="1"/>
  <rect x="332" y="56" width="136" height="8" rx="2" fill="rgba(255,255,227,0.24)"/>
  <rect x="332" y="76" width="136" height="38" rx="2" fill="rgba(111,227,140,0.04)" stroke="rgba(111,227,140,0.1)" stroke-width="1"/>
  <circle cx="346" cy="95" r="5" fill="#6FE38C"/>
  <rect x="358" y="89" width="62" height="7" rx="1" fill="rgba(255,255,227,0.3)"/>
  <rect x="358" y="100" width="42" height="5" rx="1" fill="rgba(255,255,227,0.12)"/>
  <rect x="332" y="120" width="136" height="38" rx="2" fill="rgba(255,255,227,0.02)"/>
  <circle cx="346" cy="139" r="5" fill="#6FE38C"/>
  <rect x="358" y="133" width="52" height="7" rx="1" fill="rgba(255,255,227,0.24)"/>
  <rect x="358" y="144" width="40" height="5" rx="1" fill="rgba(255,255,227,0.09)"/>
  <rect x="332" y="164" width="136" height="38" rx="2" fill="rgba(255,200,100,0.04)" stroke="rgba(255,200,100,0.1)" stroke-width="1"/>
  <circle cx="346" cy="183" r="5" fill="rgba(255,200,100,0.9)"/>
  <rect x="358" y="177" width="72" height="7" rx="1" fill="rgba(255,255,227,0.24)"/>
  <rect x="358" y="188" width="50" height="5" rx="1" fill="rgba(255,255,227,0.09)"/>
  <rect x="332" y="208" width="136" height="38" rx="2" fill="rgba(255,90,90,0.06)" stroke="rgba(255,90,90,0.14)" stroke-width="1"/>
  <circle cx="346" cy="227" r="5" fill="rgba(255,90,90,0.9)"/>
  <rect x="358" y="221" width="56" height="7" rx="1" fill="rgba(255,255,227,0.24)"/>
  <rect x="358" y="232" width="82" height="5" rx="1" fill="rgba(255,90,90,0.28)"/>
  <rect x="332" y="252" width="136" height="38" rx="2" fill="rgba(255,255,227,0.02)"/>
  <circle cx="346" cy="271" r="5" fill="rgba(255,255,227,0.1)" stroke="rgba(255,255,227,0.2)" stroke-width="1"/>
  <rect x="358" y="265" width="48" height="7" rx="1" fill="rgba(255,255,227,0.18)"/>
  <rect x="358" y="276" width="38" height="5" rx="1" fill="rgba(255,255,227,0.07)"/>
</svg>`,

  logistics: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;" preserveAspectRatio="xMidYMid slice">
  <rect width="480" height="360" fill="#0C0B09"/>
  <rect width="480" height="40" fill="#100F0D"/>
  <rect x="16" y="14" width="126" height="8" rx="2" fill="rgba(255,255,227,0.4)"/>
  <rect x="16" y="55" width="104" height="56" rx="3" fill="rgba(255,255,227,0.025)" stroke="rgba(255,255,227,0.09)" stroke-width="1"/>
  <rect x="28" y="69" width="44" height="9" rx="2" fill="rgba(255,255,227,0.55)"/>
  <rect x="28" y="84" width="64" height="6" rx="2" fill="rgba(255,255,227,0.18)"/>
  <rect x="28" y="94" width="52" height="6" rx="2" fill="rgba(111,227,140,0.35)"/>
  <rect x="132" y="55" width="104" height="56" rx="3" fill="rgba(255,255,227,0.025)" stroke="rgba(255,255,227,0.09)" stroke-width="1"/>
  <rect x="144" y="69" width="52" height="9" rx="2" fill="rgba(255,255,227,0.48)"/>
  <rect x="144" y="84" width="64" height="6" rx="2" fill="rgba(255,255,227,0.18)"/>
  <rect x="144" y="94" width="42" height="6" rx="2" fill="rgba(255,200,100,0.35)"/>
  <rect x="248" y="55" width="104" height="56" rx="3" fill="rgba(255,255,227,0.025)" stroke="rgba(255,255,227,0.09)" stroke-width="1"/>
  <rect x="260" y="69" width="48" height="9" rx="2" fill="rgba(255,255,227,0.42)"/>
  <rect x="260" y="84" width="64" height="6" rx="2" fill="rgba(255,255,227,0.18)"/>
  <rect x="260" y="94" width="52" height="6" rx="2" fill="rgba(255,255,227,0.14)"/>
  <rect x="16" y="124" width="88" height="9" rx="2" fill="rgba(255,255,227,0.3)"/>
  <g stroke="rgba(255,255,227,0.045)" stroke-width="1">
    <line x1="16" y1="160" x2="464" y2="160"/>
    <line x1="16" y1="200" x2="464" y2="200"/>
    <line x1="16" y1="240" x2="464" y2="240"/>
    <line x1="16" y1="280" x2="464" y2="280"/>
  </g>
  <polygon points="16,260 80,242 150,228 220,238 290,218 360,202 430,196 464,192 464,228 430,234 360,244 290,258 220,272 150,264 80,275 16,288" fill="rgba(255,255,227,0.035)"/>
  <line x1="290" y1="140" x2="290" y2="295" stroke="rgba(255,255,227,0.14)" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="296" y="150" fill="rgba(255,255,227,0.28)" font-size="8" font-family="system-ui,sans-serif" letter-spacing="0.06em">FORECAST</text>
  <polyline points="16,265 80,248 150,236 220,245 290,228 360,214 430,207 464,204" fill="none" stroke="rgba(255,255,227,0.7)" stroke-width="1.8" stroke-linejoin="round" stroke-dasharray="600" stroke-dashoffset="600">
    <animate attributeName="stroke-dashoffset" values="600;0" dur="1.8s" begin="0.3s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
  </polyline>
  <polyline points="16,265 80,248 150,236 220,245 290,228" fill="none" stroke="rgba(255,255,227,0.18)" stroke-width="1" stroke-dasharray="4 4" stroke-linejoin="round"/>
  <text x="16" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 18</text>
  <text x="78" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 19</text>
  <text x="146" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 20</text>
  <text x="216" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 21</text>
  <text x="284" y="306" fill="rgba(255,255,227,0.28)" font-size="8" font-family="system-ui,sans-serif">WK 22</text>
  <text x="352" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 23</text>
  <text x="420" y="306" fill="rgba(255,255,227,0.18)" font-size="8" font-family="system-ui,sans-serif">WK 24</text>
  <rect x="16" y="318" width="448" height="1" fill="rgba(255,255,227,0.06)"/>
  <text x="16" y="337" fill="rgba(255,255,227,0.22)" font-size="8" font-family="system-ui,sans-serif" letter-spacing="0.04em">3 ANOMALIES RANKED</text>
  <rect x="298" y="324" width="82" height="18" rx="2" fill="rgba(255,200,100,0.08)" stroke="rgba(255,200,100,0.18)" stroke-width="1"/>
  <text x="339" y="337" text-anchor="middle" fill="rgba(255,200,100,0.65)" font-size="8" font-family="system-ui,sans-serif">REVIEW →</text>
</svg>`
};

/* ===== Image path encoding ===== */
function encodeImagePath(path) {
  if (!path) return '';
  return path.replace(/ /g, '%20');
}

/* ===== Project section rendering ===== */
function renderSectionHTML(sec) {
  switch (sec.type) {
    case 'fullwidth':
      return `<div class="proj-section proj-section--fullwidth">
        <img src="${encodeImagePath(sec.image)}" alt="${escapeHTML(sec.alt || '')}" loading="lazy">
      </div>`;

    case 'split': {
      const imgCol = `<div class="proj-split__image"><img src="${encodeImagePath(sec.image)}" alt="${escapeHTML(sec.alt || '')}" loading="lazy"></div>`;
      const txtCol = `<div class="proj-split__text">
        ${sec.eyebrow ? `<span class="proj-split__eyebrow">${escapeHTML(sec.eyebrow)}</span>` : ''}
        ${sec.heading ? `<h2 class="proj-split__heading">${escapeHTML(sec.heading)}</h2>` : ''}
        ${sec.body ? `<p class="proj-split__body">${escapeHTML(sec.body)}</p>` : ''}
      </div>`;
      const content = sec.flip ? txtCol + imgCol : imgCol + txtCol;
      return `<div class="proj-section proj-section--split${sec.flip ? ' is-flipped' : ''}">${content}</div>`;
    }

    case 'slider': {
      const slides = sec.slides || [];
      const firstCaption = slides[0] ? escapeHTML(slides[0].caption || '') : '';
      return `<div class="proj-section proj-section--slider">
        <div class="proj-slider__header">
          ${sec.label ? `<span class="proj-slider__label">${escapeHTML(sec.label)}</span>` : '<span></span>'}
          <span class="proj-slider__progress">01 / ${String(slides.length).padStart(2, '0')}</span>
        </div>
        <div class="proj-slider__track">
          ${slides.map((s, i) => `<div class="proj-slider__slide" data-caption="${escapeHTML(s.caption || '')}" data-index="${i}">
            <img src="${encodeImagePath(s.image)}" alt="${escapeHTML(s.caption || '')}" loading="${i === 0 ? 'eager' : 'lazy'}">
          </div>`).join('')}
        </div>
        <div class="proj-slider__footer">
          <button class="proj-slider__btn proj-slider__btn--prev" aria-label="Previous slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="proj-slider__btn proj-slider__btn--next" aria-label="Next slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="proj-slider__caption">${firstCaption}</span>
        </div>
      </div>`;
    }

    case 'grid': {
      const images = sec.images || [];
      const cols = sec.cols || 2;
      return `<div class="proj-section proj-section--grid">
        <div class="proj-grid proj-grid--${cols}col">
          ${images.map((img) => `<div class="proj-grid__item">
            <img src="${encodeImagePath(img.image)}" alt="${escapeHTML(img.alt || '')}" loading="lazy">
          </div>`).join('')}
        </div>
      </div>`;
    }

    default: return '';
  }
}

function initProjectSliders() {
  document.querySelectorAll('.proj-section--slider').forEach((section) => {
    const track = section.querySelector('.proj-slider__track');
    const slides = track ? [...track.querySelectorAll('.proj-slider__slide')] : [];
    if (!slides.length) return;
    const prevBtn = section.querySelector('.proj-slider__btn--prev');
    const nextBtn = section.querySelector('.proj-slider__btn--next');
    const captionEl = section.querySelector('.proj-slider__caption');
    const progressEl = section.querySelector('.proj-slider__progress');
    let current = 0;
    const goTo = (n) => {
      current = (n + slides.length) % slides.length;
      track.scrollTo({ left: slides[current].offsetLeft, behavior: 'smooth' });
      if (captionEl) captionEl.textContent = slides[current].dataset.caption || '';
      if (progressEl) progressEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / (track.clientWidth || 1));
      if (idx !== current && idx >= 0 && idx < slides.length) {
        current = idx;
        if (captionEl) captionEl.textContent = slides[current].dataset.caption || '';
        if (progressEl) progressEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
    }, { passive: true });
  });
}

/* ===== Work scroll: cinematic immersive homepage showcase ===== */
function renderWorkScroll(container, projects) {
  if (!container) return;
  const stage = container.querySelector('.work-scroll__stage');
  const chaptersEl = container.querySelector('.work-scroll__chapters');
  if (!stage || !chaptersEl) return;

  stage.innerHTML = projects.map((p, i) => {
    const frameInner = p.coverImage
      ? `<img src="${escapeHTML(p.coverImage)}" alt="${escapeHTML(p.client)}" style="width:100%;height:100%;object-fit:cover;display:block;">`
      : (FRAME_CONTENT[p.visual] || FRAME_CONTENT.fintech);
    return `<div class="work-frame${i === 0 ? ' is-active' : ''}" data-frame="${i}">
      <div class="work-frame__asset">${frameInner}</div>
    </div>`;
  }).join('') + `
    <div class="work-scroll__stage-footer">
      <div class="work-scroll__dots">
        ${projects.map((_, i) => `<button class="work-scroll__dot${i === 0 ? ' is-active' : ''}" data-dot="${i}" aria-label="Go to project ${i + 1}"></button>`).join('')}
      </div>
      <span class="work-scroll__counter" id="workScrollCounter">01 / 0${projects.length}</span>
    </div>`;

  chaptersEl.innerHTML = projects.map((p, i) => {
    const subtitle = p.title.includes(' — ') ? p.title.split(' — ').slice(1).join(' — ') : p.title;
    return `<a class="work-chapter${i === 0 ? ' is-active' : ''}"
        href="/work/${p.slug}"
        data-index="${i}"
        data-visual="${escapeHTML(p.visual)}">
      <span class="work-chapter__client">${String(i + 1).padStart(2, '0')} / ${escapeHTML(p.client)}</span>
      <h3 class="work-chapter__title">${escapeHTML(subtitle)}</h3>
      <p class="work-chapter__summary">${escapeHTML(p.summary)}</p>
      <div class="work-chapter__chips">
        ${chipsHTML(p.categories)}
        ${p.active ? '<span class="chip-active"><span class="chip-active__dot"></span>Active</span>' : ''}
      </div>
      <span class="work-chapter__cta">View case study ${ARROW_SVG}</span>
    </a>`;
  }).join('');
}

const ARROW_SVG = '<svg class="link-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13L13 3M5 3h8v8" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>';

const VISUAL_ICONS = {
  fintech: '<svg class="work-tile__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V9M10 19V4M16 19V12M22 19V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  health: '<svg class="work-tile__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12h4l2-5 4 10 3-7 2 4h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  robotics: '<svg class="work-tile__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  logistics: '<svg class="work-tile__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 18c3-8 6 4 9-3s6-3 9-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="3" cy="18" r="1.3" fill="currentColor"/><circle cx="21" cy="6" r="1.3" fill="currentColor"/></svg>'
};

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function pickRelated(array, slug, count) {
  const idx = array.findIndex((item) => item.slug === slug);
  const result = [];
  for (let i = 1; i <= array.length - 1 && result.length < count; i++) {
    result.push(array[(idx + i) % array.length]);
  }
  return result;
}

/* ===== Work tiles / showcase grid ===== */

function chipsHTML(categories) {
  return categories.map((c) => `<span class="chip">${escapeHTML(c)}</span>`).join('');
}

function workTileHTML(project, positionClass) {
  const activeChip = project.active
    ? '<span class="chip-active"><span class="chip-active__dot"></span>Active</span>'
    : '';
  const visualStyle = project.coverImage
    ? ` style="background-image:url('${escapeHTML(project.coverImage)}');background-size:cover;background-position:center;"`
    : '';
  const visualContent = project.coverImage ? '' : (VISUAL_ICONS[project.visual] || '');
  return `
    <a class="work-tile ${positionClass} reveal" href="/work/${project.slug}">
      <div class="work-tile__visual work-tile__visual--${project.visual}"${visualStyle}>${visualContent}</div>
      <div class="work-tile__scrim"></div>
      ${activeChip}
      <div class="work-tile__content">
        <div class="work-tile__chips">${chipsHTML(project.categories)}</div>
        <h3 class="work-tile__title">${escapeHTML(project.title)}</h3>
        <p class="work-tile__desc">${escapeHTML(project.summary)}</p>
        <span class="work-tile__cta">View case study ${ARROW_SVG}</span>
      </div>
    </a>`;
}

function workShowcaseGroupHTML(items) {
  const positions = ['work-tile--feature', 'work-tile--b', 'work-tile--c', 'work-tile--wide'];
  return `<div class="work-showcase">${items.map((p, i) => workTileHTML(p, positions[i] || '')).join('')}</div>`;
}

function renderWorkGrid(container, projects) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < projects.length; i += 4) {
    html += workShowcaseGroupHTML(projects.slice(i, i + 4));
  }
  container.innerHTML = html;
}

function compactProjectTileHTML(project) {
  const activeChip = project.active
    ? '<span class="chip-active"><span class="chip-active__dot"></span>Active</span>'
    : '';
  const visualStyle = project.coverImage
    ? ` style="background-image:url('${escapeHTML(project.coverImage)}');background-size:cover;background-position:center;"`
    : '';
  const visualContent = project.coverImage ? '' : (VISUAL_ICONS[project.visual] || '');
  return `
    <a class="work-tile work-tile--compact reveal" href="/work/${project.slug}">
      <div class="work-tile__visual work-tile__visual--${project.visual}"${visualStyle}>${visualContent}</div>
      <div class="work-tile__scrim"></div>
      ${activeChip}
      <div class="work-tile__content">
        <div class="work-tile__chips">${chipsHTML(project.categories.slice(0, 1))}</div>
        <h3 class="work-tile__title">${escapeHTML(project.title)}</h3>
        <span class="work-tile__cta">View case study ${ARROW_SVG}</span>
      </div>
    </a>`;
}

function renderMoreProjects(container, currentSlug) {
  if (!container) return;
  const related = pickRelated(PROJECTS, currentSlug, 3);
  container.innerHTML = `<div class="compact-grid">${related.map(compactProjectTileHTML).join('')}</div>`;
}

/* ===== Related block ===== */
/* items: [{ eyebrow, title, href, line }] */
function renderRelated(container, items) {
  if (!container || !items || items.length < 2) return;
  container.innerHTML = `
    <div class="related__items">
      ${items.map((item) => `
        <a class="related__card" href="${escapeHTML(item.href)}">
          <span class="related__card-eyebrow">${escapeHTML(item.eyebrow)}</span>
          <span class="related__card-title">${escapeHTML(item.title)}</span>
          <span class="related__card-line">${escapeHTML(item.line)}</span>
        </a>`).join('')}
    </div>`;
}

/* ===== Project detail page ===== */

function renderProjectDetailPage() {
  const slug = getQueryParam('slug');
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  document.title = `${project.title} — Antiphono`;

  const hero = document.getElementById('projectHero');
  if (hero) {
    const activeChip = project.active
      ? '<span class="chip-active"><span class="chip-active__dot"></span>Active</span>'
      : '';
    const heroVisualStyle = project.coverImage
      ? ` style="background-image:url('${encodeImagePath(project.coverImage)}');background-size:cover;background-position:center top;"`
      : '';
    const heroVisualContent = project.coverImage ? '' : (VISUAL_ICONS[project.visual] || '');
    hero.innerHTML = `
      <div class="work-tile__visual work-tile__visual--${project.visual}"${heroVisualStyle}>${heroVisualContent}</div>
      <div class="work-tile__scrim"></div>
      ${activeChip}
      <div class="project-hero__content">
        <a class="project-hero__back" href="/work">&larr; All work</a>
        <div class="work-tile__chips">${chipsHTML(project.categories)}</div>
        <h1 class="project-hero__title">${escapeHTML(project.title)}</h1>
        <p class="project-hero__meta">${escapeHTML(project.client)}</p>
      </div>`;
  }

  const overview = document.getElementById('projectOverview');
  if (overview) {
    const deliverablesRow = project.deliverables
      ? `<li><span class="project-overview__meta-label">Deliverables</span>${escapeHTML(project.deliverables.join(', '))}</li>`
      : '';
    overview.innerHTML = `
      <div class="project-overview__text">
        ${project.overview.map((p) => `<p>${escapeHTML(p)}</p>`).join('')}
      </div>
      <ul class="project-overview__meta">
        <li><span class="project-overview__meta-label">Client</span>${escapeHTML(project.client)}</li>
        <li><span class="project-overview__meta-label">Discipline</span>${escapeHTML(project.categories.join(', '))}</li>
        ${deliverablesRow}
        <li><span class="project-overview__meta-label">Status</span>${project.active ? 'Active engagement' : 'Completed'}</li>
      </ul>`;
  }

  const gallery = document.getElementById('projectGallery');
  if (gallery) {
    gallery.innerHTML = (project.sections || []).map(renderSectionHTML).join('');
    initProjectSliders();
  }

  renderMoreProjects(document.getElementById('moreProjects'), project.slug);
}

/* ===== Articles ===== */

function articleRowHTML(article) {
  return `
    <article class="article-row" data-category="${escapeHTML(article.category)}">
      <div class="article-row__meta">
        <span class="article-row__date">${formatDate(article.date)}</span>
        <span class="article-row__cat">${escapeHTML(article.category)}</span>
      </div>
      <h3 class="article-row__title">${escapeHTML(article.title)}</h3>
      <a href="/article?slug=${encodeURIComponent(article.slug)}" class="article-row__link">Read &#8594;</a>
    </article>`;
}

function renderArticleList(container, articles) {
  if (!container) return;
  if (!articles.length) {
    container.innerHTML = '<p class="article-list__empty">Articles are on their way — check back soon.</p>';
    return;
  }
  container.innerHTML = articles.map(articleRowHTML).join('');
}

function setupArticleFilters(filterContainer, listContainer, articles) {
  if (!filterContainer || !listContainer) return;
  const data = articles || ARTICLES;
  if (!data.length) { filterContainer.style.display = 'none'; return; }
  const categories = ['All', ...new Set(data.map((a) => a.category))];
  filterContainer.innerHTML = categories
    .map((c, i) => `<button class="filter-chip${i === 0 ? ' is-active' : ''}" data-filter="${escapeHTML(c)}" type="button">${escapeHTML(c)}</button>`)
    .join('');
  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    filterContainer.querySelectorAll('.filter-chip').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    listContainer.querySelectorAll('.article-row').forEach((row) => {
      row.style.display = filter === 'All' || row.dataset.category === filter ? '' : 'none';
    });
  });
}

function renderRelatedArticles(container, currentSlug, articles) {
  if (!container) return;
  const data = articles || ARTICLES;
  const related = pickRelated(data, currentSlug, 3);
  container.innerHTML = related.map(articleRowHTML).join('');
}

function renderArticleDetailPage(articles) {
  const data = articles || ARTICLES;
  const slug = getQueryParam('slug');
  const article = data.find((a) => a.slug === slug) || data[0];
  if (!article) return;
  document.title = `${article.title} — Antiphono`;

  const hero = document.getElementById('articleHero');
  if (hero) {
    if (article.image) {
      hero.classList.add('article-hero--photo');
      hero.innerHTML = `
        <img class="article-hero__img" src="${escapeHTML(article.image)}" alt="">
        <div class="work-tile__scrim"></div>
        <div class="project-hero__content">
          <a class="project-hero__back" href="/articles">&larr; All articles</a>
          <div class="work-tile__chips"><span class="chip">${escapeHTML(article.category)}</span></div>
          <h1 class="project-hero__title">${escapeHTML(article.title)}</h1>
          <p class="project-hero__meta">${formatDate(article.date)}${article.author ? ' &middot; ' + escapeHTML(article.author) : ''}</p>
        </div>`;
    } else {
      const visual = article.visual || 'fintech';
      hero.innerHTML = `
        <div class="work-tile__visual work-tile__visual--${visual}">${VISUAL_ICONS[visual] || ''}</div>
        <div class="work-tile__scrim"></div>
        <div class="project-hero__content">
          <a class="project-hero__back" href="/articles">&larr; All articles</a>
          <div class="work-tile__chips"><span class="chip">${escapeHTML(article.category)}</span></div>
          <h1 class="project-hero__title">${escapeHTML(article.title)}</h1>
          <p class="project-hero__meta">${formatDate(article.date)}${article.author ? ' &middot; ' + escapeHTML(article.author) : ''}</p>
        </div>`;
    }
  }

  const body = document.getElementById('articleBody');
  if (body) {
    if (Array.isArray(article.body)) {
      body.innerHTML = article.body.map((p) => `<p>${escapeHTML(p)}</p>`).join('');
    } else {
      // RSS HTML content — render as-is
      body.innerHTML = article.body;
    }
  }

  renderRelatedArticles(document.getElementById('relatedArticles'), article.slug, data);
}

/* ===== Reports ===== */

function reportRowHTML(report) {
  return `
    <div class="report-download-row reveal">
      <span class="report-download-row__date">${escapeHTML(report.year)}</span>
      <div class="report-download-row__body">
        <h3 class="report-download-row__title">${escapeHTML(report.title)}</h3>
        <p class="report-download-row__abstract">${escapeHTML(report.abstract)}</p>
      </div>
      <a class="report-download-row__btn" href="${report.file}" download>
        Download PDF
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>`;
}

function renderReportList(container, reports) {
  if (!container) return;
  container.innerHTML = reports.map(reportRowHTML).join('');
}

/* ===== Case study gallery (work.html) ===== */

function formatCaseStudyYears(cs) {
  if (cs.yearEnd === 'present') return cs.yearStart + ' to present';
  if (!cs.yearEnd || cs.yearStart === cs.yearEnd) return String(cs.yearStart);
  return cs.yearStart + ' to ' + cs.yearEnd;
}

function caseStudyCardHTML(cs) {
  var displayName = cs.named ? cs.client : cs.sector;
  var years = formatCaseStudyYears(cs);
  var yearsClass = cs.yearEnd === 'present' ? 'cs-card__years cs-card__years--present' : 'cs-card__years';
  var mediaContent = cs.thumbnail
    ? '<img src="' + escapeHTML(cs.thumbnail) + '" alt="' + escapeHTML(displayName) + '" loading="lazy" width="800" height="450">'
    : '';
  var mediaStyle = cs.thumbnail ? ' style="background-image:url(\'' + escapeHTML(cs.thumbnail) + '\');background-size:cover;background-position:center;"' : '';
  return '<a class="cs-card" href="/work/' + escapeHTML(cs.slug) + '"'
    + ' data-services=\'' + JSON.stringify(cs.services).replace(/'/g, '&#39;') + '\''
    + ' data-sector="' + escapeHTML(cs.sector) + '">'
    + '<div class="cs-card__media"' + mediaStyle + '>' + mediaContent + '</div>'
    + '<div class="cs-card__body">'
    + '<div class="cs-card__header">'
    + '<span class="cs-card__client">' + escapeHTML(displayName) + '</span>'
    + '<span class="' + yearsClass + '">' + escapeHTML(years) + '</span>'
    + '</div>'
    + '<p class="cs-card__sector">' + escapeHTML(cs.sector) + '</p>'
    + '<div class="cs-card__chips">' + cs.services.map(function(s) { return '<span class="chip">' + escapeHTML(s) + '</span>'; }).join('') + '</div>'
    + '<span class="cs-card__cta">View case study ' + ARROW_SVG + '</span>'
    + '</div>'
    + '</a>';
}

function sortCaseStudies(items) {
  return items.slice().sort(function(a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    var aEnd = a.yearEnd === 'present' ? 9999 : (a.yearEnd || a.yearStart);
    var bEnd = b.yearEnd === 'present' ? 9999 : (b.yearEnd || b.yearStart);
    return bEnd - aEnd || b.yearStart - a.yearStart;
  });
}

function renderCaseStudyGallery(galleryEl, filterEl, statusEl, items) {
  if (!galleryEl || !items || !items.length) return;
  var sorted = sortCaseStudies(items);

  galleryEl.innerHTML = sorted.map(caseStudyCardHTML).join('');

  if (!filterEl) return;
  var allServices = [];
  sorted.forEach(function(cs) {
    cs.services.forEach(function(s) {
      if (allServices.indexOf(s) === -1) allServices.push(s);
    });
  });
  allServices.sort();

  var chips = ['<button class="filter-chip is-active" data-service="All" type="button" aria-current="true">All</button>'];
  allServices.forEach(function(s) {
    chips.push('<button class="filter-chip" data-service="' + escapeHTML(s) + '" type="button">' + escapeHTML(s) + '</button>');
  });
  filterEl.innerHTML = chips.join('');

  function applyFilter(selected) {
    var cards = galleryEl.querySelectorAll('.cs-card');
    var count = 0;
    cards.forEach(function(card) {
      var services = [];
      try { services = JSON.parse(card.dataset.services || '[]'); } catch (e) {}
      var show = selected === 'All' || services.indexOf(selected) !== -1;
      card.hidden = !show;
      if (show) count++;
    });
    if (statusEl) statusEl.textContent = selected === 'All' ? '' : count + ' case ' + (count === 1 ? 'study' : 'studies') + ' for ' + selected;
  }

  filterEl.addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-chip');
    if (!btn) return;
    filterEl.querySelectorAll('.filter-chip').forEach(function(b) {
      b.classList.remove('is-active');
      b.removeAttribute('aria-current');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-current', 'true');
    var selected = btn.dataset.service;
    var params = new URLSearchParams(window.location.search);
    if (selected === 'All') { params.delete('service'); } else { params.set('service', selected); }
    var qs = params.toString();
    history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
    applyFilter(selected);
  });

  var initService = new URLSearchParams(window.location.search).get('service');
  if (initService) {
    var activeBtn = null;
    filterEl.querySelectorAll('.filter-chip').forEach(function(b) {
      if (b.dataset.service === initService) activeBtn = b;
    });
    if (activeBtn) {
      filterEl.querySelector('.is-active').classList.remove('is-active');
      filterEl.querySelector('[aria-current]').removeAttribute('aria-current');
      activeBtn.classList.add('is-active');
      activeBtn.setAttribute('aria-current', 'true');
      applyFilter(initService);
    }
  }
}
