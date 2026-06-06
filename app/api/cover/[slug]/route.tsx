import { NextRequest, NextResponse } from 'next/server'

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
function pick<T>(arr: T[], n: number): T { return arr[Math.abs(n) % arr.length] }

function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function splitTitle(t: string, maxLen = 28): string[] {
  const parts = t.split(/\s*[\u2014\u2013]\s*/)
  if (parts.length >= 2 && parts[0].length <= maxLen + 6) return parts.slice(0,3).map(p => p.trim())
  const words = t.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w
    if (test.length > maxLen && cur) { lines.push(cur); cur = w; if (lines.length >= 2) break }
    else cur = test
  }
  if (cur && lines.length < 3) lines.push(cur)
  return lines.slice(0, 3)
}


function wrap(inner: string, accent: string, dark: string, label: string, title = ''): string {
  const _tLines = title ? splitTitle(title) : []
  const _tFs = _tLines.length > 2 ? 28 : 34
  const _tLh = _tFs + 14
  const _tPy = 450 - (_tLines.length * _tLh + 32)
  let _titlePanel = ''
  if (title && _tLines.length) {
    _titlePanel = `<rect x="0" y="${_tPy}" width="800" height="${450 - _tPy}" fill="${dark}" fill-opacity="0.92"/>`
    _titlePanel += `<rect x="60" y="${_tPy + 14}" width="60" height="3" fill="${accent}" fill-opacity="0.9"/>`
    _tLines.forEach((ln, i) => { _titlePanel += `<text x="60" y="${_tPy + 30 + i * _tLh}" font-family="system-ui,sans-serif" font-size="${_tFs}" font-weight="800" fill="#f1f5f9" letter-spacing="-0.3">${esc(ln)}</text>` })
  }
    const labelW = label.length * 9 + 30
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${dark}"/>
    <stop offset="100%" stop-color="#060812"/>
  </linearGradient>
</defs>
<rect width="800" height="450" fill="url(#bg)"/>
<circle cx="200" cy="180" r="280" fill="${accent}" fill-opacity="0.07"/>
<pattern id="gr" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="${accent}" stroke-opacity="0.05" stroke-width="1"/></pattern>
<rect width="800" height="450" fill="url(#gr)"/>
${inner}
<rect x="0" y="0" width="800" height="4" fill="${accent}"/>
<rect x="28" y="28" width="${labelW}" height="30" rx="15" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
<text x="42" y="47" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="${accent}">${label}</text>
<text x="770" y="432" font-family="system-ui,sans-serif" font-size="10" fill="${accent}" fill-opacity="0.25" text-anchor="end">ghlserviceprovider.com</text>
${_titlePanel}
</svg>`
}

function wrapSquare(inner: string, accent: string, dark: string, label: string, title = ''): string {
  const _sqLines = title ? splitTitle(title, 26) : []
  const _sqFs = _sqLines.length > 2 ? 38 : 46
  const _sqLh = _sqFs + 16
  const _sqStartY = Math.round((400 - _sqLines.length * _sqLh) / 2) + _sqFs
  let _sqTitle = ''
  if (title && _sqLines.length) {
    _sqTitle = `<rect x="50" y="${_sqStartY - _sqFs - 12}" width="80" height="4" fill="${accent}" fill-opacity="0.9"/>`
    _sqTitle += `<rect x="50" y="${_sqStartY - _sqFs - 12}" width="4" height="${_sqLines.length * _sqLh + 20}" fill="${accent}" fill-opacity="0.25"/>`
    _sqLines.forEach((ln, i) => { _sqTitle += `<text x="68" y="${_sqStartY + i * _sqLh}" font-family="system-ui,sans-serif" font-size="${_sqFs}" font-weight="800" fill="#f1f5f9" letter-spacing="-0.5">${esc(ln)}</text>` })
  }
  const _sqInner = title ? `<g opacity="0.18">${inner}</g>` : inner
    const labelW = label.length * 9 + 30
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${dark}"/>
    <stop offset="55%" stop-color="#060812"/>
    <stop offset="100%" stop-color="#060812"/>
  </linearGradient>
  <linearGradient id="fade" x1="0" y1="430" x2="0" y2="800" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#060812" stop-opacity="0"/>
    <stop offset="100%" stop-color="#060812" stop-opacity="1"/>
  </linearGradient>
</defs>
<rect width="800" height="800" fill="url(#bg)"/>
<circle cx="200" cy="180" r="280" fill="${accent}" fill-opacity="0.07"/>
<circle cx="600" cy="650" r="220" fill="${accent}" fill-opacity="0.04"/>
<pattern id="gr" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="${accent}" stroke-opacity="0.04" stroke-width="1"/></pattern>
<rect width="800" height="800" fill="url(#gr)"/>
${_sqInner}
<rect x="0" y="430" width="800" height="370" fill="url(#fade)"/>
${_sqTitle}
<line x1="80" y1="530" x2="720" y2="530" stroke="${accent}" stroke-opacity="0.08" stroke-width="1"/>
<circle cx="160" cy="610" r="32" fill="${accent}" fill-opacity="0.06" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>
<text x="160" y="615" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle">GHL</text>
<line x1="192" y1="610" x2="248" y2="610" stroke="${accent}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="280" cy="610" r="24" fill="${accent}" fill-opacity="0.06" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>
<text x="280" y="614" font-family="system-ui,sans-serif" font-size="9" fill="${accent}" text-anchor="middle">CRM</text>
<line x1="304" y1="610" x2="356" y2="610" stroke="${accent}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="388" cy="610" r="24" fill="${accent}" fill-opacity="0.06" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>
<text x="388" y="614" font-family="system-ui,sans-serif" font-size="9" fill="${accent}" text-anchor="middle">AI</text>
<line x1="412" y1="610" x2="464" y2="610" stroke="${accent}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="496" cy="610" r="24" fill="${accent}" fill-opacity="0.06" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>
<text x="496" y="614" font-family="system-ui,sans-serif" font-size="9" fill="${accent}" text-anchor="middle">SMS</text>
<line x1="520" y1="610" x2="572" y2="610" stroke="${accent}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4,3"/>
<circle cx="604" cy="610" r="24" fill="${accent}" fill-opacity="0.06" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>
<text x="604" y="614" font-family="system-ui,sans-serif" font-size="9" fill="${accent}" text-anchor="middle">Email</text>
<text x="400" y="710" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="${accent}" fill-opacity="0.5" text-anchor="middle">GoHighLevel System Built For Results</text>
<text x="400" y="735" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" fill-opacity="0.6" text-anchor="middle">ghlserviceprovider.com</text>
<rect x="0" y="0" width="800" height="4" fill="${accent}"/>
<rect x="28" y="28" width="${labelW}" height="30" rx="15" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
<text x="42" y="47" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="${accent}">${label}</text>
</svg>`
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const category = req.nextUrl.searchParams.get('c') || 'Automation'
  const square = req.nextUrl.searchParams.get('sq') === '1'
  const title = req.nextUrl.searchParams.get('t') || ''
  const wrapFn = square ? wrapSquare : wrap
  const h = hash(params.slug)
  const v = h % 4

  let svg = ''

  if (category === 'Troubleshooting') {
    const a = pick(['#0d9488','#14b8a6','#0f766e','#2dd4bf'], h)
    const codes = ['ERR_WORKFLOW_FAIL','SMS_NOT_DELIVERED','AUTH_EXPIRED','NULL_REFERENCE']
    const msgs  = ['500 Internal Server Error','422 Unprocessable','401 Unauthorized','Timeout Error']
    const fixes = ['Check trigger &amp; publish status','Complete A2P registration','Reconnect integration token','Verify DNS records']
    const code = codes[h % 4], msg = msgs[(h>>>3) % 4], fix = fixes[(h>>>5) % 4]
    const w1 = 250 + (h % 100), w2 = 200 + ((h>>>2) % 120), w3 = 220 + ((h>>>4) % 80)
    let inner = ''
    if (v === 0) {
      inner = '<rect x="160" y="70" width="480" height="310" rx="12" fill="#0c0c10" stroke="' + a + '" stroke-width="2" stroke-opacity="0.7"/>'
      inner += '<rect x="160" y="70" width="480" height="32" rx="12" fill="' + a + '" fill-opacity="0.12"/>'
      inner += '<circle cx="186" cy="86" r="6" fill="' + a + '"/><circle cx="206" cy="86" r="6" fill="#60a5fa" fill-opacity="0.5"/><circle cx="226" cy="86" r="6" fill="#334155"/>'
      inner += '<rect x="180" y="122" width="440" height="55" rx="8" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.5" stroke-width="1.5"/>'
      inner += '<text x="200" y="148" font-family="monospace" font-size="13" fill="' + a + '" font-weight="700">&#9888; ' + code + '</text>'
      inner += '<text x="200" y="167" font-family="monospace" font-size="11" fill="' + a + '" fill-opacity="0.8">' + msg + '</text>'
      inner += '<rect x="180" y="190" width="' + w1 + '" height="7" rx="3" fill="' + a + '" fill-opacity="0.2"/>'
      inner += '<rect x="180" y="204" width="' + w2 + '" height="6" rx="3" fill="#334155" fill-opacity="0.5"/>'
      inner += '<rect x="180" y="218" width="' + w3 + '" height="6" rx="3" fill="#334155" fill-opacity="0.4"/>'
      inner += '<rect x="180" y="246" width="240" height="34" rx="8" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-opacity="0.5" stroke-width="1"/>'
      inner += '<text x="198" y="268" font-family="monospace" font-size="10" fill="' + a + '">&#10003; FIX: ' + fix + '</text>'
      inner += '<rect x="60" y="145" width="80" height="28" rx="14" fill="' + a + '" fill-opacity="0.12" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="100" y="163" font-family="monospace" font-size="10" font-weight="700" fill="' + a + '" text-anchor="middle">ERROR</text>'
      inner += '<rect x="650" y="235" width="72" height="26" rx="13" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="686" y="252" font-family="system-ui" font-size="10" font-weight="700" fill="' + a + '" text-anchor="middle">FIXED &#10003;</text>'
    } else if (v === 1) {
      inner = '<rect x="80" y="60" width="640" height="330" rx="8" fill="#0c0c10" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.6"/>'
      inner += '<rect x="80" y="60" width="640" height="26" rx="8" fill="' + a + '" fill-opacity="0.08"/>'
      inner += '<text x="400" y="78" font-family="monospace" font-size="9" fill="' + a + '" fill-opacity="0.4" text-anchor="middle">GHL Debug Console</text>'
      inner += '<text x="104" y="115" font-family="monospace" font-size="12" fill="#94a3b8">$ ghl debug --account workspace</text>'
      inner += '<text x="104" y="142" font-family="monospace" font-size="12" fill="' + a + '">$ ghl workflow:check --status</text>'
      inner += '<text x="104" y="168" font-family="monospace" font-size="12" fill="' + a + '">&#10007; ' + code + ': ' + msg + '</text>'
      inner += '<text x="104" y="192" font-family="monospace" font-size="11" fill="#60a5fa">&#8594; ' + fix + '</text>'
      inner += '<rect x="104" y="212" width="' + w1 + '" height="6" rx="3" fill="' + a + '" fill-opacity="0.3"/>'
      inner += '<rect x="104" y="226" width="' + w2 + '" height="6" rx="3" fill="#334155" fill-opacity="0.5"/>'
      inner += '<rect x="104" y="240" width="' + w3 + '" height="6" rx="3" fill="#334155" fill-opacity="0.4"/>'
      inner += '<text x="104" y="308" font-family="monospace" font-size="12" fill="' + a + '">&#10003; Fix guide generated</text>'
      inner += '<text x="104" y="332" font-family="monospace" font-size="12" fill="' + a + '" fill-opacity="0.6">$ _</text>'
    } else if (v === 2) {
      inner = '<rect x="60" y="55" width="680" height="340" rx="14" fill="#0c0c10" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.5"/>'
      inner += '<rect x="60" y="55" width="680" height="42" rx="14" fill="' + a + '" fill-opacity="0.08"/>'
      inner += '<text x="88" y="82" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '">&#9888; GHL System Alerts</text>'
      inner += '<text x="680" y="82" font-family="system-ui" font-size="11" fill="#64748b" text-anchor="end">3 issues detected</text>'
      inner += '<rect x="76" y="110" width="648" height="65" rx="8" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1.5"/>'
      inner += '<rect x="76" y="110" width="4" height="65" fill="' + a + '"/>'
      inner += '<rect x="104" y="122" width="65" height="20" rx="10" fill="' + a + '" fill-opacity="0.2"/>'
      inner += '<text x="136" y="136" font-family="system-ui" font-size="9" font-weight="700" fill="' + a + '" text-anchor="middle">CRITICAL</text>'
      inner += '<text x="184" y="136" font-family="system-ui" font-size="12" font-weight="700" fill="#f1f5f9">' + code.replace('_',' ') + '</text>'
      inner += '<text x="184" y="154" font-family="system-ui" font-size="10" fill="#94a3b8">' + fix + '</text>'
      inner += '<rect x="590" y="124" width="124" height="28" rx="14" fill="' + a + '" fill-opacity="0.2"/>'
      inner += '<text x="652" y="142" font-family="system-ui" font-size="10" font-weight="700" fill="' + a + '" text-anchor="middle">View Fix &#8594;</text>'
      inner += '<rect x="76" y="188" width="648" height="52" rx="8" fill="#334155" fill-opacity="0.12"/>'
      inner += '<rect x="76" y="188" width="4" height="52" fill="#60a5fa"/>'
      inner += '<text x="104" y="213" font-family="system-ui" font-size="11" fill="#94a3b8">SMS delivery failing on some contacts</text>'
      inner += '<rect x="76" y="252" width="648" height="52" rx="8" fill="#334155" fill-opacity="0.08"/>'
      inner += '<rect x="76" y="252" width="4" height="52" fill="#06b6d4"/>'
      inner += '<text x="104" y="277" font-family="system-ui" font-size="11" fill="#94a3b8">Email open rates below baseline threshold</text>'
      inner += '<rect x="500" y="330" width="220" height="34" rx="8" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="610" y="352" font-family="system-ui" font-size="11" font-weight="700" fill="' + a + '" text-anchor="middle">&#10003; Step-by-step fix inside</text>'
    } else {
      inner = '<rect x="100" y="80" width="600" height="290" rx="14" fill="#0c0c10" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.5"/>'
      inner += '<text x="400" y="130" font-family="system-ui" font-size="14" fill="#94a3b8" text-anchor="middle">Most Common GHL Issue</text>'
      inner += '<text x="400" y="200" font-family="system-ui" font-size="80" font-weight="900" fill="' + a + '" text-anchor="middle">#1</text>'
      inner += '<text x="400" y="240" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">' + code.replace('_',' ') + '</text>'
      inner += '<rect x="150" y="270" width="500" height="40" rx="8" fill="' + a + '" fill-opacity="0.12" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="400" y="295" font-family="monospace" font-size="11" fill="' + a + '" text-anchor="middle">&#10003; ' + fix + '</text>'
      inner += '<text x="400" y="390" font-family="system-ui" font-size="13" fill="#64748b" text-anchor="middle">Complete fix guide with screenshots inside</text>'
    }
    svg = wrapFn(inner, a, '#001210', 'TROUBLESHOOTING', title)

  } else if (category === 'AI Automation') {
    const a = pick(['#22d3ee','#67e8f9','#06b6d4','#a5f3fc'], h)
    const statSets = [['47','Leads Qualified','8 Booked'],['156','Conversations','99.2% Uptime'],['89%','Show-Up Rate','42% Convert'],['2.1s','Avg Response','24/7 Active']]
    const [sv, sl, sl2] = statSets[h % 4]
    let inner = ''
    if (v === 0) {
      // Neural network layout
      inner = '<circle cx="400" cy="225" r="300" fill="' + a + '" fill-opacity="0.05"/>'
      inner += '<circle cx="140" cy="120" r="13" fill="none" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.5"/>'
      inner += '<circle cx="140" cy="180" r="13" fill="none" stroke="' + a + '" stroke-width="2" stroke-opacity="0.8"/>'
      inner += '<circle cx="140" cy="240" r="13" fill="none" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.5"/>'
      inner += '<circle cx="140" cy="300" r="13" fill="none" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.4"/>'
      inner += '<circle cx="290" cy="200" r="15" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-width="2.5"/>'
      inner += '<circle cx="440" cy="225" r="34" fill="' + a + '" fill-opacity="0.2" stroke="' + a + '" stroke-width="3"/>'
      inner += '<text x="440" y="231" font-family="system-ui" font-size="15" font-weight="900" fill="' + a + '" text-anchor="middle">AI</text>'
      inner += '<circle cx="580" cy="170" r="15" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-opacity="0.9"/>'
      inner += '<circle cx="580" cy="280" r="15" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-opacity="0.9"/>'
      inner += '<line x1="153" y1="180" x2="275" y2="200" stroke="' + a + '" stroke-opacity="0.2" stroke-width="1.5"/>'
      inner += '<line x1="305" y1="200" x2="406" y2="225" stroke="' + a + '" stroke-opacity="0.5" stroke-width="2"/>'
      inner += '<line x1="474" y1="225" x2="565" y2="170" stroke="#8b5cf6" stroke-opacity="0.5" stroke-width="2"/>'
      inner += '<line x1="474" y1="225" x2="565" y2="280" stroke="#8b5cf6" stroke-opacity="0.5" stroke-width="2"/>'
      inner += '<rect x="600" y="154" width="130" height="32" rx="16" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="665" y="174" font-family="system-ui" font-size="10" font-weight="700" fill="#c084fc" text-anchor="middle">Qualify Lead</text>'
      inner += '<rect x="600" y="263" width="130" height="32" rx="16" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="665" y="283" font-family="system-ui" font-size="10" font-weight="700" fill="#c084fc" text-anchor="middle">Book Appointment</text>'
      inner += '<rect x="30" y="345" width="160" height="72" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="110" y="376" font-family="system-ui" font-size="30" font-weight="900" fill="' + a + '" text-anchor="middle">' + sv + '</text>'
      inner += '<text x="110" y="398" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">' + sl + '</text>'
      inner += '<rect x="210" y="345" width="280" height="72" rx="10" fill="' + a + '" fill-opacity="0.05" stroke="' + a + '" stroke-opacity="0.2" stroke-width="1"/>'
      inner += '<text x="350" y="372" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + sl2 + ' &#183; No human action</text>'
      inner += '<text x="350" y="394" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">Runs 24/7 automatically</text>'
    } else if (v === 1) {
      // AI Chat interface
      const convos = [['New lead from Facebook','Qualifying now...','Appointment booked!'],['Missed call detected','Sending follow-up SMS','Reply received'],['Form submitted','AI scoring lead...','CRM updated — Hot Lead'],['Deal won trigger','Sending welcome email','Onboarding started']]
      const msgs = convos[h % 4]
      inner = '<rect x="80" y="55" width="360" height="340" rx="16" fill="#001520" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.6"/>'
      inner += '<rect x="80" y="55" width="360" height="44" rx="16" fill="' + a + '" fill-opacity="0.1"/>'
      inner += '<circle cx="112" cy="77" r="12" fill="' + a + '" fill-opacity="0.2" stroke="' + a + '" stroke-width="1.5"/>'
      inner += '<text x="112" y="82" font-family="system-ui" font-size="9" font-weight="900" fill="' + a + '" text-anchor="middle">AI</text>'
      inner += '<text x="136" y="72" font-family="system-ui" font-size="11" font-weight="700" fill="' + a + '">GHL AI Agent</text>'
      inner += '<text x="136" y="87" font-family="system-ui" font-size="9" fill="#10b981">&#9679; Online &#8212; responding in 2s</text>'
      inner += '<rect x="104" y="118" width="220" height="38" rx="8" fill="' + a + '" fill-opacity="0.12" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="115" y="141" font-family="system-ui" font-size="10" fill="' + a + '">' + msgs[0] + '</text>'
      inner += '<rect x="140" y="172" width="200" height="38" rx="8" fill="' + a + '" fill-opacity="0.2" stroke="' + a + '" stroke-opacity="0.5" stroke-width="1"/>'
      inner += '<text x="152" y="187" font-family="system-ui" font-size="10" fill="' + a + '">' + msgs[1] + '</text>'
      inner += '<circle cx="155" cy="200" r="3" fill="' + a + '" fill-opacity="0.7"/><circle cx="165" cy="200" r="3" fill="' + a + '" fill-opacity="0.5"/><circle cx="175" cy="200" r="3" fill="' + a + '" fill-opacity="0.3"/>'
      inner += '<rect x="104" y="226" width="220" height="38" rx="8" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="115" y="249" font-family="system-ui" font-size="10" fill="#34d399">&#10003; ' + msgs[2] + '</text>'
      inner += '<rect x="104" y="310" width="316" height="60" rx="8" fill="' + a + '" fill-opacity="0.06"/>'
      inner += '<text x="115" y="344" font-family="system-ui" font-size="10" fill="#64748b">Reply to lead...</text>'
      inner += '<rect x="370" y="320" width="40" height="28" rx="8" fill="' + a + '"/>'
      inner += '<text x="390" y="338" font-family="system-ui" font-size="11" fill="#000" text-anchor="middle">&#8593;</text>'
      inner += '<rect x="470" y="55" width="280" height="340" rx="16" fill="' + a + '" fill-opacity="0.06" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1.5"/>'
      inner += '<text x="610" y="100" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">AI Performance</text>'
      inner += '<text x="610" y="170" font-family="system-ui" font-size="52" font-weight="900" fill="' + a + '" text-anchor="middle">' + sv + '</text>'
      inner += '<text x="610" y="198" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">' + sl + '</text>'
      inner += '<line x1="490" y1="215" x2="730" y2="215" stroke="#334155" stroke-width="1"/>'
      inner += '<text x="610" y="252" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + sl2 + '</text>'
      inner += '<text x="610" y="310" font-family="system-ui" font-size="28" font-weight="900" fill="#10b981" text-anchor="middle">2.1s</text>'
      inner += '<text x="610" y="332" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Avg response time</text>'
      inner += '<text x="610" y="370" font-family="system-ui" font-size="10" fill="' + a + '" text-anchor="middle">Zero human intervention</text>'
    } else if (v === 2) {
      // Sequence timeline
      const seqs = [['Lead Captured','AI Scores Lead','SMS in 60s','Follow-up Day 3','Book Call'],['Missed Call','Instant Text-Back','Email Follow-up','Nurture Sequence','Close Deal'],['Form Submit','Tag Applied','Welcome Email','Product Tour','Upsell Trigger'],['Ad Click','Landing Page','Opt-in Capture','AI Qualify','Appointment Set']]
      const seq = seqs[h % 4]
      const seqColors = ['#06b6d4','#8b5cf6','#a78bfa','#3b82f6','#38bdf8']
      inner = '<text x="400" y="65" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">AI Automation Sequence</text>'
      for (let i = 0; i < 5; i++) {
        const x = 76 + i * 136, c = seqColors[i]
        inner += '<rect x="' + x + '" y="95" width="116" height="180" rx="10" fill="' + c + '" fill-opacity="0.08" stroke="' + c + '" stroke-opacity="0.4" stroke-width="1.5"/>'
        inner += '<circle cx="' + (x+58) + '" cy="135" r="22" fill="' + c + '" fill-opacity="0.15" stroke="' + c + '" stroke-width="2"/>'
        inner += '<text x="' + (x+58) + '" y="141" font-family="system-ui" font-size="16" font-weight="900" fill="' + c + '" text-anchor="middle">' + (i+1) + '</text>'
        const words = seq[i].split(' ')
        const l1 = words.slice(0,2).join(' ')
        const l2 = words.slice(2).join(' ')
        inner += '<text x="' + (x+58) + '" y="182" font-family="system-ui" font-size="10" font-weight="700" fill="' + c + '" text-anchor="middle">' + l1 + '</text>'
        if (l2) inner += '<text x="' + (x+58) + '" y="198" font-family="system-ui" font-size="9" fill="#94a3b8" text-anchor="middle">' + l2 + '</text>'
        if (i < 4) inner += '<text x="' + (x+120) + '" y="140" font-family="system-ui" font-size="18" fill="' + c + '" fill-opacity="0.6">&#8594;</text>'
      }
      inner += '<rect x="100" y="308" width="600" height="60" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<text x="400" y="336" font-family="system-ui" font-size="12" fill="#94a3b8" text-anchor="middle">Fully automated &#183; ' + sv + ' ' + sl + ' &#183; ' + sl2 + '</text>'
      inner += '<text x="400" y="356" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">Zero manual steps &#183; Runs 24/7</text>'
    } else {
      // ROI dashboard
      const roiStats = [['156','Active Sequences'],['$42k','Rev Attributed'],['89%','Show-Up Rate'],['0','Manual Tasks']]
      const rCols = ['#06b6d4','#10b981','#8b5cf6','#60a5fa']
      inner = '<text x="400" y="65" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">AI Automation ROI Dashboard</text>'
      for (let i = 0; i < 4; i++) {
        const col = i % 2, row = Math.floor(i / 2)
        const x = 80 + col * 340, y = 88 + row * 155, c = rCols[i]
        const [val, lbl] = roiStats[i]
        inner += '<rect x="' + x + '" y="' + y + '" width="300" height="120" rx="14" fill="' + c + '" fill-opacity="0.09" stroke="' + c + '" stroke-opacity="0.3" stroke-width="1.5"/>'
        inner += '<text x="' + (x+150) + '" y="' + (y+48) + '" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + lbl + '</text>'
        inner += '<text x="' + (x+150) + '" y="' + (y+92) + '" font-family="system-ui" font-size="48" font-weight="900" fill="' + c + '" text-anchor="middle">' + val + '</text>'
      }
      inner += '<rect x="220" y="402" width="360" height="34" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<text x="400" y="424" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">GoHighLevel AI &#183; Always On &#183; Full ROI Tracked</text>'
    }
    svg = wrapFn(inner, a, '#001520', 'AI AUTOMATION', title)

  } else if (category === 'Lead Generation' || category === 'Lead Recovery') {
    const isRecoveryEarly = category === 'Lead Recovery'
    const a = isRecoveryEarly ? pick(['#a855f7','#c084fc','#9333ea','#7c3aed'], h) : pick(['#6366f1','#818cf8','#a78bfa','#4f46e5'], h)
    const stats = [['47','23%','$8,360'],['83','31%','$12,480'],['29','28%','$6,960'],['124','35%','$18,600']]
    const [leads, close, rev] = stats[h % 4]
    const isRecovery = isRecoveryEarly
    const label = isRecovery ? 'LEAD RECOVERY' : 'LEAD GENERATION'
    let inner = ''
    if (v === 0) {
      // Funnel
      inner = '<polygon points="230,65 570,65 500,175 300,175" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-width="2" stroke-opacity="0.8"/>'
      inner += '<polygon points="300,187 500,187 455,285 345,285" fill="' + a + '" fill-opacity="0.16" stroke="' + a + '" stroke-width="2.5"/>'
      inner += '<polygon points="345,297 455,297 422,372 378,372" fill="' + a + '" fill-opacity="0.28" stroke="' + a + '" stroke-width="3"/>'
      inner += '<text x="400" y="130" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">' + (isRecovery ? 'DORMANT LEADS' : 'AWARENESS') + '</text>'
      inner += '<text x="400" y="242" font-family="system-ui" font-size="11" font-weight="700" fill="' + a + '" text-anchor="middle">QUALIFIED</text>'
      inner += '<text x="400" y="342" font-family="system-ui" font-size="10" font-weight="700" fill="' + a + '" text-anchor="middle">CLOSED</text>'
      inner += '<rect x="598" y="78" width="162" height="76" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="679" y="114" font-family="system-ui" font-size="30" font-weight="900" fill="' + a + '" text-anchor="middle">' + leads + '</text>'
      inner += '<text x="679" y="141" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Leads Today &#9650;' + close + '</text>'
      inner += '<rect x="598" y="168" width="162" height="76" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="679" y="204" font-family="system-ui" font-size="30" font-weight="900" fill="' + a + '" text-anchor="middle">' + rev + '</text>'
      inner += '<text x="679" y="230" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Monthly Revenue</text>'
      inner += '<rect x="30" y="168" width="162" height="76" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="111" y="204" font-family="system-ui" font-size="20" font-weight="900" fill="' + a + '" text-anchor="middle">&lt; 60 sec</text>'
      inner += '<text x="111" y="230" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Response Time</text>'
    } else if (v === 1) {
      // Dashboard metrics 4-box
      const mCols = ['#38bdf8','#06b6d4','#8b5cf6','#3b82f6']
      const mLabels = ['New Leads','Close Rate','Revenue','Response']
      const mVals = [leads, close, rev, '&lt;60s']
      inner = '<text x="400" y="65" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">' + (isRecovery ? 'Lead Recovery Dashboard' : 'Lead Generation Dashboard') + '</text>'
      for (let i = 0; i < 4; i++) {
        const col = i % 2, row = Math.floor(i / 2)
        const x = 80 + col * 340, y = 88 + row * 155, c = mCols[i]
        inner += '<rect x="' + x + '" y="' + y + '" width="300" height="120" rx="14" fill="' + c + '" fill-opacity="0.09" stroke="' + c + '" stroke-opacity="0.3" stroke-width="1.5"/>'
        inner += '<text x="' + (x+150) + '" y="' + (y+48) + '" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + mLabels[i] + '</text>'
        inner += '<text x="' + (x+150) + '" y="' + (y+92) + '" font-family="system-ui" font-size="42" font-weight="900" fill="' + c + '" text-anchor="middle">' + mVals[i] + '</text>'
      }
      inner += '<rect x="220" y="402" width="360" height="34" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<text x="400" y="424" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">GHL ' + (isRecovery ? 'Lead Recovery' : 'Lead Gen') + ' System &#183; Automated</text>'
    } else if (v === 2) {
      // SMS phone visual
      const smsSets = [['"Hi, saw you visited our page!"','Are you still looking for help?','Book a call: link.ghl.io/demo'],['"Following up on your inquiry"','We have a spot open this week','Claim it: link.ghl.io/book'],['"Don\'t miss your free audit!"','Only 3 spots left this month','Get yours: link.ghl.io/audit'],['"Your quote is ready to view"','Here is what we put together','Review: link.ghl.io/quote']]
      const sms = smsSets[h % 4]
      inner = '<rect x="270" y="45" width="260" height="360" rx="24" fill="#0a1a0d" stroke="' + a + '" stroke-width="2" stroke-opacity="0.7"/>'
      inner += '<rect x="270" y="45" width="260" height="40" rx="24" fill="' + a + '" fill-opacity="0.1"/>'
      inner += '<text x="400" y="96" font-family="system-ui" font-size="9" fill="#94a3b8" text-anchor="middle">Messages &#183; GHL AI</text>'
      inner += '<rect x="290" y="108" width="190" height="52" rx="10" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1"/>'
      inner += '<text x="302" y="127" font-family="system-ui" font-size="8" fill="' + a + '">' + sms[0] + '</text>'
      inner += '<text x="302" y="143" font-family="system-ui" font-size="8" fill="' + a + '">' + sms[1] + '</text>'
      inner += '<rect x="290" y="175" width="190" height="38" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="302" y="199" font-family="system-ui" font-size="8" fill="' + a + '">' + sms[2] + '</text>'
      inner += '<rect x="290" y="228" width="120" height="30" rx="10" fill="#10b981" fill-opacity="0.2"/>'
      inner += '<text x="302" y="247" font-family="system-ui" font-size="9" fill="#34d399">&#10003; Interested! When?</text>'
      inner += '<rect x="330" y="275" width="140" height="30" rx="10" fill="' + a + '" fill-opacity="0.2"/>'
      inner += '<text x="342" y="294" font-family="system-ui" font-size="9" fill="' + a + '">Sent booking link &#8594;</text>'
      inner += '<rect x="290" y="333" width="190" height="50" rx="8" fill="#10b981" fill-opacity="0.15"/>'
      inner += '<text x="385" y="357" font-family="system-ui" font-size="9" font-weight="700" fill="#34d399" text-anchor="middle">&#10003; Appointment Booked</text>'
      inner += '<text x="385" y="373" font-family="system-ui" font-size="8" fill="#64748b" text-anchor="middle">Automated in 2 minutes</text>'
      inner += '<rect x="44" y="90" width="195" height="90" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="141" y="133" font-family="system-ui" font-size="38" font-weight="900" fill="' + a + '" text-anchor="middle">' + leads + '</text>'
      inner += '<text x="141" y="168" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">' + (isRecovery ? 'Leads Recovered' : 'Leads Generated') + '</text>'
      inner += '<rect x="44" y="200" width="195" height="90" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="141" y="243" font-family="system-ui" font-size="38" font-weight="900" fill="' + a + '" text-anchor="middle">' + close + '</text>'
      inner += '<text x="141" y="278" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Close Rate</text>'
      inner += '<rect x="561" y="90" width="195" height="90" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="658" y="133" font-family="system-ui" font-size="38" font-weight="900" fill="' + a + '" text-anchor="middle">' + rev + '</text>'
      inner += '<text x="658" y="168" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Rev Added</text>'
      inner += '<rect x="561" y="200" width="195" height="90" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="658" y="243" font-family="system-ui" font-size="20" font-weight="900" fill="' + a + '" text-anchor="middle">&lt;60s</text>'
      inner += '<text x="658" y="278" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">First Response</text>'
    } else {
      // Before/After comparison
      const without = isRecovery
        ? ['Leads ignored after 1st touch','Manual re-engagement fails','No follow-up sequence','Data sits in spreadsheet','Lost revenue every month']
        : ['Manually chasing every lead','Spreadsheets &amp; missed follow-ups','No show-up reminders','Cold leads go cold forever','Revenue capped by your hours']
      const withGHL = isRecovery
        ? ['Re-engage in 60 seconds','Automated multi-touch sequence','Personalised SMS + email','CRM tracks every interaction','Revenue recovered on autopilot']
        : ['Instant lead response &lt; 60s','CRM auto-updated every time','Appointment reminders sent','Dormant leads re-engaged','Revenue grows while you sleep']
      inner = '<rect x="44" y="60" width="335" height="305" rx="14" fill="#001a0d" stroke="' + a + '" stroke-opacity="0.4" stroke-width="1.5"/>'
      inner += '<rect x="44" y="60" width="335" height="40" rx="14" fill="' + a + '" fill-opacity="0.08"/>'
      inner += '<text x="211" y="86" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">' + (isRecovery ? 'WITHOUT RECOVERY' : 'WITHOUT GHL') + '</text>'
      for (let i = 0; i < 5; i++) {
        inner += '<rect x="60" y="' + (115 + i * 44) + '" width="303" height="34" rx="8" fill="#334155" fill-opacity="0.1"/>'
        inner += '<text x="76" y="' + (137 + i * 44) + '" font-family="system-ui" font-size="10" fill="#64748b">&#10007; ' + without[i] + '</text>'
      }
      inner += '<rect x="421" y="60" width="335" height="305" rx="14" fill="#001a0d" stroke="' + a + '" stroke-opacity="0.6" stroke-width="2"/>'
      inner += '<rect x="421" y="60" width="335" height="40" rx="14" fill="' + a + '" fill-opacity="0.15"/>'
      inner += '<text x="588" y="86" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">' + (isRecovery ? 'WITH RECOVERY' : 'WITH GHL') + '</text>'
      for (let i = 0; i < 5; i++) {
        inner += '<rect x="437" y="' + (115 + i * 44) + '" width="303" height="34" rx="8" fill="#10b981" fill-opacity="0.06"/>'
        inner += '<text x="453" y="' + (137 + i * 44) + '" font-family="system-ui" font-size="10" fill="#34d399">&#10003; ' + withGHL[i] + '</text>'
      }
      inner += '<text x="400" y="392" font-family="system-ui" font-size="18" font-weight="900" fill="' + a + '" text-anchor="middle">' + rev + '/mo with GHL &#183; ' + close + ' close rate</text>'
    }
    svg = wrapFn(inner, a, isRecovery ? '#0d0520' : '#05051a', label, title)

  } else if (category === 'CRM & Pipeline') {
    const a = pick(['#3b82f6','#60a5fa','#2563eb','#93c5fd'], h)
    const totals = ['$24,600','$38,400','$17,200','$52,800']
    const total = totals[h % 4]
    let inner = ''
    if (v === 0) {
      const stageNames = ['New Lead','Contacted','Qualified','Proposed','Closed']
      const stageCols = ['#6366f1','#8b5cf6','#06b6d4','#38bdf8','#2dd4bf']
      const cardCounts = [3,2,2,1,1]
      for (let i = 0; i < 5; i++) {
        const x = 55 + i * 143, c = stageCols[i], cards = cardCounts[i]
        inner += '<rect x="' + x + '" y="65" width="128" height="38" rx="7" fill="' + c + '" fill-opacity="0.2" stroke="' + c + '" stroke-width="1.5" stroke-opacity="0.8"/>'
        inner += '<text x="' + (x+64) + '" y="89" font-family="system-ui" font-size="10" font-weight="700" fill="' + c + '" text-anchor="middle">' + stageNames[i] + '</text>'
        for (let j = 0; j < cards; j++) {
          const cy = 113 + j * 72, w1 = 50 + ((h >>> (j+2)) % 28), w2 = 35 + ((h >>> (j+3)) % 22)
          inner += '<rect x="' + (x+4) + '" y="' + cy + '" width="120" height="62" rx="6" fill="' + c + '" fill-opacity="0.08" stroke="' + c + '" stroke-opacity="0.3" stroke-width="1"/>'
          inner += '<rect x="' + (x+12) + '" y="' + (cy+8) + '" width="' + w1 + '" height="7" rx="3" fill="' + c + '" fill-opacity="0.5"/>'
          inner += '<rect x="' + (x+12) + '" y="' + (cy+21) + '" width="' + w2 + '" height="5" rx="2" fill="#334155" fill-opacity="0.5"/>'
        }
        if (i < 4) inner += '<text x="' + (x+132) + '" y="155" font-family="system-ui" font-size="16" fill="' + c + '" fill-opacity="0.6">&#8594;</text>'
      }
      inner += '<rect x="220" y="370" width="360" height="52" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1.5"/>'
      inner += '<text x="400" y="390" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Pipeline Value</text>'
      inner += '<text x="400" y="412" font-family="system-ui" font-size="24" font-weight="900" fill="' + a + '" text-anchor="middle">' + total + '</text>'
    } else if (v === 1) {
      const closeRates = ['28%','35%','41%','22%']
      const responses = ['47s','2m','90s','35s']
      const cr = closeRates[h % 4], rs = responses[(h>>>3) % 4]
      inner = '<rect x="80" y="70" width="640" height="310" rx="14" fill="#050518" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.5"/>'
      inner += '<text x="110" y="110" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '">&#128101; Contact Records &#8212; Today</text>'
      const contacts = [['Sarah M.','New Lead','Qualified &#8212; Follow up now'],['James R.','Contacted','Quote sent &#8212; day 3'],['Lisa K.','Appointment','Demo booked &#8212; 2pm'],['Tom W.','Qualified','Awaiting decision']]
      const contColors = ['#6366f1','#8b5cf6','#06b6d4','#60a5fa']
      for (let i = 0; i < 4; i++) {
        const cy = 130 + i * 56, [name, stage, note] = contacts[i], c = contColors[i]
        inner += '<rect x="100" y="' + cy + '" width="600" height="46" rx="8" fill="' + c + '" fill-opacity="0.08" stroke="' + c + '" stroke-opacity="0.25" stroke-width="1"/>'
        inner += '<circle cx="130" cy="' + (cy+23) + '" r="14" fill="' + c + '" fill-opacity="0.2" stroke="' + c + '" stroke-opacity="0.4" stroke-width="1"/>'
        inner += '<text x="130" y="' + (cy+28) + '" font-family="system-ui" font-size="10" font-weight="700" fill="' + c + '" text-anchor="middle">' + name.charAt(0) + '</text>'
        inner += '<text x="160" y="' + (cy+18) + '" font-family="system-ui" font-size="12" font-weight="700" fill="#f1f5f9">' + name + '</text>'
        inner += '<text x="160" y="' + (cy+34) + '" font-family="system-ui" font-size="10" fill="#94a3b8">' + note + '</text>'
        inner += '<rect x="550" y="' + (cy+10) + '" width="90" height="22" rx="11" fill="' + c + '" fill-opacity="0.15" stroke="' + c + '" stroke-opacity="0.4" stroke-width="1"/>'
        inner += '<text x="595" y="' + (cy+25) + '" font-family="system-ui" font-size="9" font-weight="700" fill="' + c + '" text-anchor="middle">' + stage + '</text>'
      }
      inner += '<rect x="100" y="368" width="180" height="55" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="190" y="392" font-family="system-ui" font-size="28" font-weight="900" fill="' + a + '" text-anchor="middle">' + cr + '</text>'
      inner += '<text x="190" y="413" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Close Rate</text>'
      inner += '<rect x="310" y="368" width="180" height="55" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="400" y="392" font-family="system-ui" font-size="28" font-weight="900" fill="' + a + '" text-anchor="middle">' + rs + '</text>'
      inner += '<text x="400" y="413" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Avg Response</text>'
      inner += '<rect x="520" y="368" width="180" height="55" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="610" y="392" font-family="system-ui" font-size="28" font-weight="900" fill="' + a + '" text-anchor="middle">' + total + '</text>'
      inner += '<text x="610" y="413" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Pipeline</text>'
    } else if (v === 2) {
      const pipelineData = [['New',85],['Contacted',68],['Qualified',52],['Proposed',38],['Closed',24]]
      const pipColors = ['#6366f1','#8b5cf6','#06b6d4','#38bdf8','#2dd4bf']
      inner = '<text x="400" y="70" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">Sales Pipeline Breakdown</text>'
      inner += '<line x1="80" y1="380" x2="720" y2="380" stroke="#334155" stroke-width="1.5"/>'
      for (let i = 0; i < 5; i++) {
        const [name, pct] = pipelineData[i], bh = (pct as number) * 2.8, x = 100 + i * 130, c = pipColors[i]
        inner += '<rect x="' + x + '" y="' + (380 - bh) + '" width="100" height="' + bh + '" rx="8" fill="' + c + '" fill-opacity="0.25" stroke="' + c + '" stroke-opacity="0.6" stroke-width="1.5"/>'
        inner += '<text x="' + (x+50) + '" y="' + (375 - bh) + '" font-family="system-ui" font-size="18" font-weight="900" fill="' + c + '" text-anchor="middle">' + pct + '%</text>'
        inner += '<text x="' + (x+50) + '" y="400" font-family="system-ui" font-size="11" font-weight="700" fill="' + c + '" text-anchor="middle">' + name + '</text>'
      }
      inner += '<rect x="220" y="418" width="360" height="26" rx="13" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      inner += '<text x="400" y="436" font-family="system-ui" font-size="11" fill="' + a + '" text-anchor="middle">Total Pipeline: ' + total + ' &#183; ' + ['28%','35%','41%','22%'][h%4] + ' Close Rate</text>'
    } else {
      const metrics = [['Active Leads','47'],['Conversion','28%'],['Pipeline',total],['Avg Deal','$4.2k']]
      const mCols = ['#6366f1','#8b5cf6','#06b6d4','#2dd4bf']
      inner = '<text x="400" y="65" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">CRM Dashboard Overview</text>'
      for (let i = 0; i < 4; i++) {
        const col = i % 2, row = Math.floor(i / 2)
        const x = 80 + col * 340, y = 90 + row * 150
        const [lbl, val] = metrics[i], c = mCols[i]
        inner += '<rect x="' + x + '" y="' + y + '" width="300" height="120" rx="14" fill="' + c + '" fill-opacity="0.08" stroke="' + c + '" stroke-opacity="0.3" stroke-width="1.5"/>'
        inner += '<text x="' + (x+150) + '" y="' + (y+50) + '" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + lbl + '</text>'
        inner += '<text x="' + (x+150) + '" y="' + (y+90) + '" font-family="system-ui" font-size="44" font-weight="900" fill="' + c + '" text-anchor="middle">' + val + '</text>'
      }
      inner += '<rect x="220" y="400" width="360" height="35" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<text x="400" y="422" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">GoHighLevel CRM &#183; Live System</text>'
    }
    svg = wrapFn(inner, a, '#000d1f', 'CRM PIPELINE', title)

  } else if (category === 'Automation') {
    const a = pick(['#a78bfa','#8b5cf6','#c084fc','#7c3aed'], h)
    const triggers = ['Form Submitted','Missed Call','Deal Won','Appointment Booked']
    const trigger = triggers[h % 4]
    const actionSets = [['Send SMS','Send Email','Update CRM','Start Sequence'],['Text Back','Add Tag','Notify Owner','Follow-up'],['Welcome Email','Create Invoice','Onboarding','Review Request'],['Confirm SMS','Block Calendar','Prep Email','24h Reminder']]
    const actions = actionSets[h % 4]
    const actionColors = ['#6366f1','#8b5cf6','#06b6d4','#10b981']
    const counts = ['156','243','89','412']
    const count = counts[h % 4]
    let inner = ''
    if (v === 0) {
      inner = '<rect x="44" y="185" width="130" height="60" rx="10" fill="' + a + '" fill-opacity="0.2" stroke="' + a + '" stroke-width="2.5" stroke-opacity="0.9"/>'
      inner += '<text x="109" y="208" font-family="system-ui" font-size="10" font-weight="700" fill="' + a + '" text-anchor="middle">&#9889; TRIGGER</text>'
      inner += '<text x="109" y="226" font-family="system-ui" font-size="9" fill="#cbd5e1" text-anchor="middle">' + trigger + '</text>'
      inner += '<line x1="174" y1="215" x2="224" y2="215" stroke="' + a + '" stroke-width="2" stroke-opacity="0.7"/>'
      inner += '<polygon points="222,210 232,215 222,220" fill="' + a + '" fill-opacity="0.8"/>'
      for (let i = 0; i < 4; i++) {
        const x = 234 + i * 132, c = actionColors[i], ay = 175 + (i % 2) * 26
        inner += '<rect x="' + x + '" y="' + ay + '" width="118" height="50" rx="8" fill="' + c + '" fill-opacity="0.12" stroke="' + c + '" stroke-width="1.5" stroke-opacity="0.8"/>'
        inner += '<text x="' + (x+59) + '" y="' + (ay+20) + '" font-family="system-ui" font-size="10" font-weight="700" fill="' + c + '" text-anchor="middle">' + ['&#128241;','&#128231;','&#128196;','&#9201;'][i] + '</text>'
        inner += '<text x="' + (x+59) + '" y="' + (ay+36) + '" font-family="system-ui" font-size="9" fill="#94a3b8" text-anchor="middle">' + actions[i] + '</text>'
      }
      inner += '<rect x="44" y="355" width="712" height="52" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<circle cx="74" cy="381" r="7" fill="#10b981"/>'
      inner += '<text x="92" y="386" font-family="system-ui" font-size="12" fill="#94a3b8">' + count + ' automations running &#183; 0 human actions &#183; 24/7</text>'
    } else if (v === 1) {
      const stats = [['156','Active Workflows'],['2.1s','Avg Response'],['89%','Show-Up Rate'],['0','Manual Tasks']]
      const sCols = ['#6366f1','#06b6d4','#10b981','#60a5fa']
      inner = '<text x="400" y="65" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">Automation Dashboard &#8212; Live</text>'
      for (let i = 0; i < 4; i++) {
        const col = i % 2, row = Math.floor(i / 2)
        const x = 80 + col * 340, y = 88 + row * 155, c = sCols[i]
        const [val, lbl] = stats[i]
        inner += '<rect x="' + x + '" y="' + y + '" width="300" height="120" rx="14" fill="' + c + '" fill-opacity="0.09" stroke="' + c + '" stroke-opacity="0.3" stroke-width="1.5"/>'
        inner += '<text x="' + (x+150) + '" y="' + (y+48) + '" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">' + lbl + '</text>'
        inner += '<text x="' + (x+150) + '" y="' + (y+92) + '" font-family="system-ui" font-size="48" font-weight="900" fill="' + c + '" text-anchor="middle">' + val + '</text>'
      }
      inner += '<rect x="220" y="402" width="360" height="34" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      inner += '<text x="400" y="424" font-family="system-ui" font-size="12" font-weight="700" fill="' + a + '" text-anchor="middle">GoHighLevel &#183; Always On &#183; Zero Manual Work</text>'
    } else if (v === 2) {
      const savedHrs = ['15h','22h','8h','31h']
      const saved = savedHrs[h % 4]
      inner = '<text x="400" y="80" font-family="system-ui" font-size="13" fill="#94a3b8" text-anchor="middle">Hours Saved Per Week</text>'
      inner += '<text x="400" y="210" font-family="system-ui" font-size="120" font-weight="900" fill="' + a + '" text-anchor="middle">' + saved + '</text>'
      inner += '<text x="400" y="255" font-family="system-ui" font-size="14" fill="#94a3b8" text-anchor="middle">of manual work eliminated</text>'
      const taskLabels = ['Follow-up emails','Appointment reminders','Review requests','Invoice reminders']
      const bws = [140,180,110,160]
      for (let i = 0; i < 4; i++) {
        inner += '<rect x="100" y="' + (290 + i * 34) + '" width="220" height="24" rx="12" fill="#334155" fill-opacity="0.4"/>'
        inner += '<rect x="100" y="' + (290 + i * 34) + '" width="' + bws[i] + '" height="24" rx="12" fill="' + a + '" fill-opacity="0.35"/>'
        inner += '<text x="332" y="' + (307 + i * 34) + '" font-family="system-ui" font-size="10" fill="#94a3b8">' + taskLabels[i] + '</text>'
      }
    } else {
      inner = '<rect x="60" y="65" width="310" height="310" rx="14" fill="#0a0a14" stroke="#475569" stroke-opacity="0.5" stroke-width="1.5"/>'
      inner += '<text x="215" y="105" font-family="system-ui" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">BEFORE</text>'
      const before = ['Manual follow-up calls','Spreadsheet tracking','Forgot callbacks','No review requests','Late responses']
      for (let i = 0; i < 5; i++) {
        inner += '<rect x="80" y="' + (120 + i * 44) + '" width="270" height="34" rx="8" fill="#334155" fill-opacity="0.1"/>'
        inner += '<text x="100" y="' + (142 + i * 44) + '" font-family="system-ui" font-size="10" fill="#475569">&#10007; ' + before[i] + '</text>'
      }
      inner += '<rect x="430" y="65" width="310" height="310" rx="14" fill="#001a0d" stroke="#10b981" stroke-opacity="0.4" stroke-width="1.5"/>'
      inner += '<text x="585" y="105" font-family="system-ui" font-size="14" font-weight="700" fill="#10b981" text-anchor="middle">AFTER</text>'
      const after = ['Instant SMS in 60 sec','CRM auto-updated','No lead forgotten','Reviews on autopilot','&lt; 60s response']
      for (let i = 0; i < 5; i++) {
        inner += '<rect x="450" y="' + (120 + i * 44) + '" width="270" height="34" rx="8" fill="#10b981" fill-opacity="0.06"/>'
        inner += '<text x="470" y="' + (142 + i * 44) + '" font-family="system-ui" font-size="10" fill="#34d399">&#10003; ' + after[i] + '</text>'
      }
      inner += '<text x="400" y="396" font-family="system-ui" font-size="28" font-weight="900" fill="' + a + '" text-anchor="middle">&#8594; Automate Everything &#8592;</text>'
    }
    svg = wrapFn(inner, a, '#0d0520', 'AUTOMATION', title)

  } else if (category === 'Funnels & Landing Pages') {
    const a = pick(['#0ea5e9','#38bdf8','#0284c7','#7dd3fc'], h)
    const cvrs = ['34.7%','28.3%','41.2%','19.8%']
    const ctas = ['Book Free Demo &#8594;','Claim 50% Off &#8594;','Get Free Audit &#8594;','Start Free Trial &#8594;']
    const cvr = cvrs[h % 4], cta = ctas[(h>>>3) % 4]
    const lcount = ['284','156','412','98'][(h>>>5) % 4]
    const inner = '<rect x="65" y="55" width="430" height="340" rx="12" fill="#000d1f" stroke="' + a + '" stroke-width="2" stroke-opacity="0.7"/>'
      + '<rect x="65" y="55" width="430" height="30" rx="12" fill="' + a + '" fill-opacity="0.1"/>'
      + '<circle cx="91" cy="70" r="6" fill="' + a + '" fill-opacity="0.7"/>'
      + '<circle cx="109" cy="70" r="6" fill="' + a + '" fill-opacity="0.35"/>'
      + '<circle cx="127" cy="70" r="6" fill="#334155"/>'
      + '<rect x="155" y="62" width="240" height="17" rx="8" fill="' + a + '" fill-opacity="0.08"/>'
      + '<text x="275" y="74" font-family="monospace" font-size="8" fill="' + a + '" fill-opacity="0.5" text-anchor="middle">ghlserviceprovider.com/offer</text>'
      + '<rect x="85" y="105" width="390" height="13" rx="6" fill="' + a + '" fill-opacity="0.35"/>'
      + '<rect x="120" y="124" width="320" height="9" rx="4" fill="' + a + '" fill-opacity="0.18"/>'
      + '<rect x="85" y="150" width="390" height="6" rx="3" fill="#334155" fill-opacity="0.5"/>'
      + '<rect x="85" y="163" width="350" height="6" rx="3" fill="#334155" fill-opacity="0.4"/>'
      + '<rect x="85" y="176" width="370" height="6" rx="3" fill="#334155" fill-opacity="0.45"/>'
      + '<rect x="135" y="198" width="280" height="50" rx="25" fill="' + a + '"/>'
      + '<text x="275" y="229" font-family="system-ui" font-size="14" font-weight="800" fill="#000" text-anchor="middle">' + cta + '</text>'
      + '<rect x="100" y="264" width="108" height="22" rx="11" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="154" y="279" font-family="system-ui" font-size="9" fill="' + a + '" text-anchor="middle">&#10003; No Risk</text>'
      + '<rect x="218" y="264" width="108" height="22" rx="11" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="272" y="279" font-family="system-ui" font-size="9" fill="' + a + '" text-anchor="middle">&#10003; Demo First</text>'
      + '<rect x="336" y="264" width="108" height="22" rx="11" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="390" y="279" font-family="system-ui" font-size="9" fill="' + a + '" text-anchor="middle">&#10003; 50% Off</text>'
      + '<rect x="540" y="80" width="220" height="78" rx="12" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="650" y="118" font-family="system-ui" font-size="38" font-weight="900" fill="' + a + '" text-anchor="middle">' + cvr + '</text>'
      + '<text x="650" y="145" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Conversion Rate</text>'
      + '<rect x="540" y="173" width="220" height="78" rx="12" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="650" y="211" font-family="system-ui" font-size="38" font-weight="900" fill="' + a + '" text-anchor="middle">' + lcount + '</text>'
      + '<text x="650" y="237" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">Leads This Month</text>'
    svg = wrapFn(inner, a, '#001020', 'FUNNELS &amp; LANDING PAGES', title)

  } else if (category === 'Industry Guides') {
    const a = pick(['#818cf8','#a5b4fc','#6366f1','#c7d2fe'], h)
    const hl = h % 8
    const industries = [{e:'&#127968;',n:'Real Estate',c:'#818cf8'},{e:'&#127947;',n:'Fitness',c:'#8b5cf6'},{e:'&#128295;',n:'Contractor',c:'#10b981'},{e:'&#129529;',n:'Cleaning',c:'#60a5fa'},{e:'&#9878;',n:'Law Firms',c:'#818cf8'},{e:'&#127891;',n:'Coaching',c:'#06b6d4'},{e:'&#127973;',n:'Healthcare',c:'#a78bfa'},{e:'&#127970;',n:'Agency',c:'#34d399'}]
    let tilesHtml = ''
    for (let i = 0; i < 8; i++) {
      const col = Math.floor(i / 2), row = i % 2
      const x = 58 + col * 178, y = 72 + row * 168
      const ind = industries[i], isHL = i === hl
      tilesHtml += '<rect x="' + x + '" y="' + y + '" width="160" height="148" rx="12" fill="' + ind.c + '" fill-opacity="' + (isHL ? 0.18 : 0.08) + '" stroke="' + ind.c + '" stroke-opacity="' + (isHL ? 0.6 : 0.3) + '" stroke-width="' + (isHL ? 2 : 1.5) + '"/>'
      tilesHtml += '<text x="' + (x+80) + '" y="' + (y+55) + '" font-family="system-ui" font-size="' + (isHL ? 36 : 30) + '" text-anchor="middle">' + ind.e + '</text>'
      tilesHtml += '<text x="' + (x+80) + '" y="' + (y+84) + '" font-family="system-ui" font-size="' + (isHL ? 13 : 11) + '" font-weight="700" fill="' + ind.c + '" text-anchor="middle">' + ind.n + '</text>'
      if (isHL) {
        tilesHtml += '<rect x="' + (x+28) + '" y="' + (y+102) + '" width="104" height="22" rx="11" fill="' + ind.c + '" fill-opacity="0.25" stroke="' + ind.c + '" stroke-opacity="0.5" stroke-width="1"/>'
        tilesHtml += '<text x="' + (x+80) + '" y="' + (y+117) + '" font-family="system-ui" font-size="9" font-weight="700" fill="' + ind.c + '" text-anchor="middle">View Guide &#8594;</text>'
      }
    }
    svg = wrapFn(tilesHtml, a, '#04041a', 'INDUSTRY GUIDES', title)

  } else if (category === 'Setup Guide') {
    const a = pick(['#60a5fa','#93c5fd','#3b82f6','#bfdbfe'], h)
    const stepSets = [['Sub-account configured','Domain &amp; SMTP connected','CRM &amp; pipeline setup','Workflows live','Go live &amp; test'],['GHL account created','Phone number verified','Funnels built','Automations tested','Launch complete'],['Brand settings applied','SMTP authenticated','Lead capture forms','Follow-up sequences','System live'],['White label setup','Custom domain live','AI chatbot trained','Review automation','Fully automated']]
    const steps = stepSets[h % 4]
    const done = [2,3,1,4][h % 4]
    const pcts = ['40%','60%','20%','80%']
    const pct = pcts[done - 1] || '60%'
    const pctW = Math.floor(150 * parseInt(pct) / 100)
    let stepsHtml = ''
    for (let i = 0; i < 5; i++) {
      const isDone = i < done, isActive = i === done
      const c = isDone ? '#10b981' : isActive ? a : '#475569'
      const cy = 68 + i * 72
      if (i > 0) {
        const prevDone = (i - 1) < done
        stepsHtml += '<line x1="92" y1="' + (cy - 52) + '" x2="92" y2="' + (cy - 8) + '" stroke="' + (prevDone ? '#10b981' : '#334155') + '" stroke-width="2" stroke-dasharray="' + (prevDone ? 'none' : '4,3') + '"/>'
      }
      stepsHtml += '<circle cx="92" cy="' + cy + '" r="18" fill="' + (isDone ? '#10b981' : isActive ? a : 'none') + '" fill-opacity="' + (isDone ? 0.2 : 0.3) + '" stroke="' + c + '" stroke-width="2"/>'
      stepsHtml += '<text x="92" y="' + (cy + 6) + '" font-family="system-ui" font-size="13" font-weight="900" fill="' + c + '" text-anchor="middle">' + (isDone ? '&#10003;' : i + 1) + '</text>'
      const rw = isDone ? '#10b981' : isActive ? a : '#1e293b'
      stepsHtml += '<rect x="122" y="' + (cy - 12) + '" width="290" height="24" rx="6" fill="' + rw + '" fill-opacity="' + (isDone ? 0.08 : isActive ? 0.12 : 0.05) + '" stroke="' + c + '" stroke-opacity="' + (isActive ? 0.5 : 0.2) + '" stroke-width="1"/>'
      stepsHtml += '<text x="138" y="' + (cy + 4) + '" font-family="system-ui" font-size="11" font-weight="' + (isActive ? 700 : 500) + '" fill="' + (isDone ? '#34d399' : isActive ? a : '#64748b') + '">' + steps[i] + '</text>'
      if (isActive) {
        stepsHtml += '<rect x="420" y="' + (cy - 12) + '" width="100" height="22" rx="11" fill="' + a + '" fill-opacity="0.2" stroke="' + a + '" stroke-opacity="0.5" stroke-width="1"/>'
        stepsHtml += '<text x="470" y="' + (cy + 3) + '" font-family="system-ui" font-size="9" font-weight="700" fill="' + a + '" text-anchor="middle">IN PROGRESS</text>'
      }
    }
    const inner = stepsHtml
      + '<rect x="560" y="90" width="190" height="230" rx="14" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1.5"/>'
      + '<text x="655" y="135" font-family="system-ui" font-size="12" fill="#94a3b8" text-anchor="middle">Progress</text>'
      + '<text x="655" y="210" font-family="system-ui" font-size="58" font-weight="900" fill="' + a + '" text-anchor="middle">' + pct + '</text>'
      + '<rect x="580" y="242" width="150" height="12" rx="6" fill="#1e1b4b"/>'
      + '<rect x="580" y="242" width="' + pctW + '" height="12" rx="6" fill="' + a + '"/>'
      + '<text x="655" y="278" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="middle">' + done + ' of 5 steps done</text>'
    svg = wrapFn(inner, a, '#000d20', 'SETUP GUIDE', title)

  } else if (category === 'Reputation') {
    const a = pick(['#38bdf8','#7dd3fc','#0ea5e9','#bae6fd'], h)
    const ratings = ['4.9','4.8','5.0','4.7']
    const counts = ['247','183','312','98']
    const revList = ['"Completely transformed our follow-up process."','"Close rate went from 12% to 28% in 30 days."','"No-shows dropped from 35% to 8%. Perfect."','"Revenue went from $12k to $30k/month."']
    const rating = ratings[h % 4], cnt = counts[(h>>>3) % 4], rev = revList[(h>>>5) % 4]
    const barHeights = [40,55,72,92,115,142,174]
    let bars = ''
    for (let i = 0; i < 7; i++) {
      const bh = barHeights[i], bx = 434 + i * 38
      bars += '<rect x="' + bx + '" y="' + (332 - bh) + '" width="28" height="' + bh + '" rx="5" fill="' + a + '" fill-opacity="' + (0.3 + i * 0.1) + '"/>'
    }
    const inner = '<text x="220" y="185" font-family="system-ui" font-size="95" font-weight="900" fill="' + a + '" fill-opacity="0.9" text-anchor="middle">' + rating + '</text>'
      + '<text x="220" y="225" font-family="system-ui" font-size="36" fill="#93c5fd" text-anchor="middle">&#9733;&#9733;&#9733;&#9733;&#9733;</text>'
      + '<text x="220" y="254" font-family="system-ui" font-size="12" fill="#94a3b8" text-anchor="middle">' + cnt + ' Google reviews</text>'
      + '<rect x="58" y="292" width="330" height="55" rx="10" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1"/>'
      + '<text x="223" y="315" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Reviews after 60 days automation</text>'
      + '<text x="223" y="335" font-family="system-ui" font-size="16" font-weight="900" fill="' + a + '" text-anchor="middle">19 &#8594; ' + cnt + ' &#9733;&#9733;&#9733;&#9733;&#9733;</text>'
      + '<rect x="420" y="68" width="340" height="145" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1.5"/>'
      + '<text x="440" y="95" font-family="system-ui" font-size="16" fill="#93c5fd">&#9733;&#9733;&#9733;&#9733;&#9733;</text>'
      + '<text x="440" y="118" font-family="system-ui" font-size="11" fill="#cbd5e1" font-style="italic">' + rev + '</text>'
      + '<text x="440" y="158" font-family="system-ui" font-size="10" fill="#64748b">&#8212; Verified client</text>'
      + '<rect x="420" y="235" width="340" height="110" rx="12" fill="' + a + '" fill-opacity="0.05" stroke="' + a + '" stroke-opacity="0.2" stroke-width="1"/>'
      + '<text x="590" y="260" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Review Growth</text>'
      + bars
    svg = wrapFn(inner, a, '#001520', 'REPUTATION', title)

  } else if (category === 'Business Growth') {
    const a = pick(['#c084fc','#e9d5ff','#a855f7','#d8b4fe'], h)
    const mults = ['2.5x','3.1x','1.8x','4.2x']
    const barDataSets = [[55,72,92,118,152,198],[40,62,98,132,164,205],[65,78,90,104,124,148],[32,52,84,134,194,254]]
    const mult = mults[h % 4], barData = barDataSets[h % 4]
    const mos = ['Jan','Feb','Mar','Apr','May','Jun']
    const revLabels = ['$12k','$15k','$20k','$28k','$35k','$42k']
    let barsHtml = ''
    const pts: string[] = []
    for (let i = 0; i < 6; i++) {
      const bh = barData[i] * 2.4, x = 112 + i * 106
      barsHtml += '<rect x="' + x + '" y="' + (370 - bh) + '" width="82" height="' + bh + '" rx="6" fill="' + a + '" fill-opacity="' + (0.35 + i * 0.1) + '" stroke="' + a + '" stroke-opacity="' + (0.5 + i * 0.08) + '" stroke-width="1"/>'
      barsHtml += '<text x="' + (x + 41) + '" y="' + (370 - bh - 8) + '" font-family="system-ui" font-size="10" fill="' + a + '" text-anchor="middle">' + revLabels[i] + '</text>'
      barsHtml += '<text x="' + (x + 41) + '" y="392" font-family="system-ui" font-size="10" fill="#64748b" text-anchor="middle">' + mos[i] + '</text>'
      pts.push((153 + i * 106) + ',' + (370 - bh))
    }
    const inner = '<line x1="90" y1="55" x2="90" y2="370" stroke="#334155" stroke-width="1.5"/>'
      + '<line x1="90" y1="370" x2="750" y2="370" stroke="#334155" stroke-width="1.5"/>'
      + barsHtml
      + '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + a + '" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="6,4"/>'
      + '<polygon points="720,48 742,75 730,75 730,110 710,110 710,75 698,75" fill="' + a + '" fill-opacity="0.7"/>'
      + '<text x="400" y="428" font-family="system-ui" font-size="15" font-weight="900" fill="' + a + '" text-anchor="middle">Revenue grew ' + mult + ' in 6 months with GHL</text>'
    svg = wrapFn(inner, a, '#0d0520', 'BUSINESS GROWTH', title)

  } else if (category === 'Authority') {
    const a = pick(['#818cf8','#a5b4fc','#6366f1','#c7d2fe'], h)
    const systems = pick(['200+','350+','180+','500+'], h)
    const rate = pick(['98%','96%','99%','97%'], h >>> 3)
    const industries = pick(['50+','35+','60+','42+'], h >>> 5)
    const inner = '<polygon points="400,48 496,100 496,220 400,272 304,220 304,100" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-width="2.5" stroke-opacity="0.7"/>'
      + '<text x="400" y="182" font-family="system-ui" font-size="65" text-anchor="middle">&#10003;</text>'
      + '<text x="400" y="238" font-family="system-ui" font-size="11" font-weight="700" fill="' + a + '" text-anchor="middle">CERTIFIED EXPERT</text>'
      + '<rect x="50" y="95" width="215" height="76" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="157" y="142" font-family="system-ui" font-size="40" font-weight="900" fill="' + a + '" text-anchor="middle">' + systems + '</text>'
      + '<text x="157" y="164" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">GHL Systems Built</text>'
      + '<rect x="50" y="190" width="215" height="76" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="157" y="237" font-family="system-ui" font-size="40" font-weight="900" fill="' + a + '" text-anchor="middle">' + rate + '</text>'
      + '<text x="157" y="259" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Satisfaction Rate</text>'
      + '<rect x="535" y="95" width="215" height="76" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="642" y="142" font-family="system-ui" font-size="40" font-weight="900" fill="' + a + '" text-anchor="middle">' + industries + '</text>'
      + '<text x="642" y="164" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Industries Served</text>'
      + '<rect x="535" y="190" width="215" height="76" rx="12" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="642" y="237" font-family="system-ui" font-size="40" font-weight="900" fill="' + a + '" text-anchor="middle">4.9&#9733;</text>'
      + '<text x="642" y="259" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Average Rating</text>'
      + '<rect x="180" y="312" width="440" height="78" rx="14" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-opacity="0.3" stroke-width="1.5"/>'
      + '<text x="400" y="348" font-family="system-ui" font-size="12" fill="#94a3b8" text-anchor="middle">GoHighLevel Certified &#183; Demo First</text>'
      + '<text x="400" y="374" font-family="system-ui" font-size="15" font-weight="800" fill="' + a + '" text-anchor="middle">Pay After Satisfaction Guaranteed</text>'
    svg = wrapFn(inner, a, '#06040f', 'AUTHORITY', title)

  } else if (category === 'Integrations') {
    const a = pick(['#67e8f9','#a5f3fc','#22d3ee','#cffafe'], h)
    const hubSets = [['Facebook','Zapier','Twilio'],['Google','Make.com','LC Phone'],['Stripe','n8n','SendGrid']]
    const hub = hubSets[h % 3]
    let hubHtml = ''
    for (let i = 0; i < 3; i++) {
      const angle = (i * 120) * Math.PI / 180
      const cx = Math.round(400 + Math.cos(angle) * 165), cy = Math.round(225 + Math.sin(angle) * 165)
      const lx1 = Math.round(400 + Math.cos(angle) * 52), ly1 = Math.round(225 + Math.sin(angle) * 52)
      const lx2 = Math.round(cx - Math.cos(angle) * 40), ly2 = Math.round(cy - Math.sin(angle) * 40)
      hubHtml += '<circle cx="' + cx + '" cy="' + cy + '" r="40" fill="' + a + '" fill-opacity="0.1" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.6"/>'
      hubHtml += '<text x="' + cx + '" y="' + (cy + 5) + '" font-family="system-ui" font-size="11" font-weight="700" fill="' + a + '" text-anchor="middle">' + hub[i] + '</text>'
      hubHtml += '<line x1="' + lx1 + '" y1="' + ly1 + '" x2="' + lx2 + '" y2="' + ly2 + '" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="5,3"/>'
    }
    const inner = '<circle cx="400" cy="225" r="52" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-width="2.5"/>'
      + '<text x="400" y="218" font-family="system-ui" font-size="10" font-weight="900" fill="' + a + '" text-anchor="middle">GoHigh</text>'
      + '<text x="400" y="234" font-family="system-ui" font-size="10" font-weight="900" fill="' + a + '" text-anchor="middle">Level</text>'
      + hubHtml
      + '<text x="400" y="405" font-family="system-ui" font-size="13" font-weight="700" fill="' + a + '" text-anchor="middle">Connect any tool to GoHighLevel instantly</text>'
    svg = wrapFn(inner, a, '#001a20', 'INTEGRATIONS', title)

  } else if (category === 'Platform Review') {
    const a = pick(['#4f46e5','#6366f1','#4338ca','#818cf8'], h)
    const scores = ['9.2','8.8','9.5','8.4']
    const verdicts = ['Worth It &#10003;','Strong Yes &#10003;','Recommended &#10003;','Great Value &#10003;']
    const score = scores[h % 4], verdict = verdicts[(h>>>3) % 4]
    const inner = '<text x="400" y="195" font-family="system-ui" font-size="105" font-weight="900" fill="' + a + '" text-anchor="middle">' + score + '</text>'
      + '<text x="400" y="230" font-family="system-ui" font-size="14" fill="#94a3b8" text-anchor="middle">out of 10</text>'
      + '<rect x="270" y="252" width="260" height="44" rx="22" fill="' + a + '" fill-opacity="0.15" stroke="' + a + '" stroke-opacity="0.5" stroke-width="1.5"/>'
      + '<text x="400" y="279" font-family="system-ui" font-size="16" font-weight="800" fill="' + a + '" text-anchor="middle">' + verdict + '</text>'
      + '<rect x="60" y="92" width="190" height="70" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="155" y="130" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Value for Money</text>'
      + '<text x="155" y="150" font-family="system-ui" font-size="22" font-weight="900" fill="' + a + '" text-anchor="middle">&#9733;&#9733;&#9733;&#9733;&#9733;</text>'
      + '<rect x="60" y="178" width="190" height="70" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="155" y="216" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Ease of Setup</text>'
      + '<text x="155" y="236" font-family="system-ui" font-size="22" font-weight="900" fill="' + a + '" text-anchor="middle">&#9733;&#9733;&#9733;&#9733;&#9734;</text>'
      + '<rect x="550" y="92" width="190" height="70" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="645" y="130" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Features</text>'
      + '<text x="645" y="150" font-family="system-ui" font-size="22" font-weight="900" fill="' + a + '" text-anchor="middle">&#9733;&#9733;&#9733;&#9733;&#9733;</text>'
      + '<rect x="550" y="178" width="190" height="70" rx="10" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="645" y="216" font-family="system-ui" font-size="11" fill="#94a3b8" text-anchor="middle">Support</text>'
      + '<text x="645" y="236" font-family="system-ui" font-size="22" font-weight="900" fill="' + a + '" text-anchor="middle">&#9733;&#9733;&#9733;&#9733;&#9734;</text>'
      + '<rect x="100" y="315" width="600" height="90" rx="14" fill="' + a + '" fill-opacity="0.07" stroke="' + a + '" stroke-opacity="0.25" stroke-width="1"/>'
      + '<text x="400" y="358" font-family="system-ui" font-size="12" fill="#94a3b8" text-anchor="middle">Honest review from someone who builds on GHL daily</text>'
      + '<text x="400" y="384" font-family="system-ui" font-size="14" font-weight="700" fill="' + a + '" text-anchor="middle">Read the full breakdown inside &#8594;</text>'
    svg = wrapFn(inner, a, '#02021a', 'PLATFORM REVIEW', title)

  } else {
    const a = '#8b5cf6'
    svg = wrapFn(
      '<circle cx="400" cy="225" r="200" fill="' + a + '" fill-opacity="0.08" stroke="' + a + '" stroke-width="1.5" stroke-opacity="0.3"/>'
      + '<text x="400" y="215" font-family="system-ui" font-size="16" font-weight="700" fill="' + a + '" text-anchor="middle">GoHighLevel</text>'
      + '<text x="400" y="240" font-family="system-ui" font-size="14" fill="#94a3b8" text-anchor="middle">Expert Guide</text>',
      a, '#0d0520', 'GOHIGHLEVEL', title
    )
  }

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
    },
  })
}
