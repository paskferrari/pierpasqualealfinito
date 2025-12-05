import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, Loader2, Save, Send } from 'lucide-react'

type FormData = {
  project: string
  nome_attivita: string
  contatti: string
  social: string
  servizi_makeup: string
  servizi_nail: string
  servizi_premium: string
  modalita_servizi: string
  durata_media: string
  prezzi: string
  cliente_ideale: string
  punti_forza: string
  immagine_brand: string
  certificazioni: string
  portfolio: string
  collaborazioni: string
  eventi: string
  recensioni: string
  prenotazione: string
  gestione_appuntamenti: string
  fidelizzazione: string
}

function useSupabaseConf() {
  const [conf, setConf] = useState<{ url: string; key: string } | null>(null)
  useEffect(() => {
    let mounted = true
    fetch('/supabase.json').then(async r => {
      if (!r.ok) return
      const c = await r.json()
      if (mounted) setConf({ url: c.url || '', key: c.key || '' })
    }).catch(() => {})
    return () => { mounted = false }
  }, [])
  return conf
}

async function supabaseSelectLast(conf: { url: string; key: string }) {
  const url = `${conf.url}/rest/v1/ritaverzamua_questionario?project=eq.ritaverzamua&select=*&limit=1`
  const res = await fetch(url, { headers: { apikey: conf.key, Authorization: `Bearer ${conf.key}` } })
  if (!res.ok) return null
  const data = await res.json()
  if (Array.isArray(data) && data.length > 0) return data[0] as Partial<FormData>
  return null
}

async function supabaseInsert(conf: { url: string; key: string }, data: FormData) {
  const url = `${conf.url}/rest/v1/ritaverzamua_questionario`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: conf.key,
      Authorization: `Bearer ${conf.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify([data])
  })
  if (!res.ok) {
    let msg = 'insert_failed'
    try { const j = await res.json(); msg = j?.message || msg } catch {}
    throw new Error(msg)
  }
  return await res.json()
}

async function supabasePatch(conf: { url: string; key: string }, project: string, data: Partial<FormData>) {
  const url = `${conf.url}/rest/v1/ritaverzamua_questionario?project=eq.${project}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: conf.key,
      Authorization: `Bearer ${conf.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    let msg = 'update_failed'
    try { const j = await res.json(); msg = j?.message || msg } catch {}
    throw new Error(msg)
  }
  return await res.json()
}

export default function QuestionarioRitaVerza() {
  const conf = useSupabaseConf()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [showRecap, setShowRecap] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [data, setData] = useState<FormData>(() => ({
    project: 'ritaverzamua',
    nome_attivita: '',
    contatti: '',
    social: '',
    servizi_makeup: '',
    servizi_nail: '',
    servizi_premium: '',
    modalita_servizi: '',
    durata_media: '',
    prezzi: '',
    cliente_ideale: '',
    punti_forza: '',
    immagine_brand: '',
    certificazioni: '',
    portfolio: '',
    collaborazioni: '',
    eventi: '',
    recensioni: '',
    prenotazione: '',
    gestione_appuntamenti: '',
    fidelizzazione: ''
  }))

  useEffect(() => {
    let mounted = true
    async function init() {
      try {
        if (!conf || !conf.url || !conf.key) { setLoading(false); return }
        const last = await supabaseSelectLast(conf)
        if (mounted && last) setData(prev => ({ ...prev, ...last }))
      } finally { if (mounted) setLoading(false) }
    }
    init()
    return () => { mounted = false }
  }, [conf])

  const set = (k: keyof FormData, v: string) => setData(prev => ({ ...prev, [k]: v }))
  const inputCls = 'w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition'
  const labelCls = 'font-semibold text-sm text-gray-800 mb-1'
  const hintCls = 'text-xs text-gray-500 mb-2'
  const card = (children: any) => (
    <div className="bg-white border-gray-100 rounded-2xl p-6 shadow-lg border">
      {children}
    </div>
  )

  const save = async () => {
    if (!conf || !conf.url || !conf.key) { setStatus('Errore di configurazione'); return }
    setSaving(true)
    setStatus('Invio…')
    try {
      const existing = await supabaseSelectLast(conf)
      if (existing) {
        await supabasePatch(conf, data.project, { ...data })
      } else {
        await supabaseInsert(conf, data)
      }
      setStatus('Invio riuscito')
      setShowRecap(false)
      setShowSuccess(true)
    } catch (e: any) {
      setStatus(`Errore durante l'invio`.trim())
    } finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white border-gray-100 rounded-3xl p-8 shadow-xl border mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Questionario Informativo</h1>
              <p className="text-gray-600 text-sm">Rita Verza Make Up Artist & Nails</p>
            </div>
            <a href="/myprojects/ritaverzamua" className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </a>
          </div>
        </div>

        {loading ? (
          card(<div className="flex items-center gap-3 text-gray-600"><Loader2 className="w-4 h-4 animate-spin" /> Caricamento…</div>)
        ) : (
          <div className="space-y-6">
            {card(<div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">1. Informazioni Generali</h2>
              <div className="mb-4">
                <div className={labelCls}>Nome completo dell'attività</div>
                <input className={inputCls} value={data.nome_attivita} onChange={e => set('nome_attivita', e.target.value)} placeholder="Es. Rita Verza Make Up Studio" />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Telefono e email di contatto</div>
                <input className={inputCls} value={data.contatti} onChange={e => set('contatti', e.target.value)} placeholder="Telefono e email" />
              </div>
              <div>
                <div className={labelCls}>Profili social attivi</div>
                <div className={hintCls}>Instagram, Facebook, TikTok, etc.</div>
                <textarea className={inputCls} value={data.social} onChange={e => set('social', e.target.value)} placeholder="Link ai profili social" rows={4} />
              </div>
            </div>)}

            {card(<div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">2. Descrizione dei Servizi</h2>
              <div className="mb-4">
                <div className={labelCls}>Quali servizi di make-up offri?</div>
                <div className={hintCls}>Es. trucco sposa, trucco serata, trucco fotografico, corsi di make-up, etc.</div>
                <textarea className={inputCls} value={data.servizi_makeup} onChange={e => set('servizi_makeup', e.target.value)} rows={4} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Quali servizi nail offri?</div>
                <div className={hintCls}>Es. manicure, pedicure, ricostruzione unghie, nail art, gel, semipermanente, etc.</div>
                <textarea className={inputCls} value={data.servizi_nail} onChange={e => set('servizi_nail', e.target.value)} rows={4} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Hai servizi premium o pacchetti speciali?</div>
                <textarea className={inputCls} value={data.servizi_premium} onChange={e => set('servizi_premium', e.target.value)} rows={4} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Offri servizi a domicilio o solo in sede?</div>
                <input className={inputCls} value={data.modalita_servizi} onChange={e => set('modalita_servizi', e.target.value)} placeholder="A domicilio / In sede / Entrambi" />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Durata media di ciascun servizio</div>
                <textarea className={inputCls} value={data.durata_media} onChange={e => set('durata_media', e.target.value)} rows={3} />
              </div>
              <div>
                <div className={labelCls}>Fascia di prezzo per ogni servizio</div>
                <textarea className={inputCls} value={data.prezzi} onChange={e => set('prezzi', e.target.value)} rows={3} />
              </div>
            </div>)}

            {card(<div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">3. Target e Posizionamento</h2>
              <div className="mb-4">
                <div className={labelCls}>Chi è il tuo cliente ideale?</div>
                <div className={hintCls}>Età, genere, occasioni, stile di vita</div>
                <textarea className={inputCls} value={data.cliente_ideale} onChange={e => set('cliente_ideale', e.target.value)} rows={3} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Punti di forza rispetto alla concorrenza</div>
                <textarea className={inputCls} value={data.punti_forza} onChange={e => set('punti_forza', e.target.value)} rows={3} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Immagine da comunicare</div>
                <div className={hintCls}>Elegante, trendy, professionale, friendly, luxury, etc.</div>
                <input className={inputCls} value={data.immagine_brand} onChange={e => set('immagine_brand', e.target.value)} placeholder="Stile e personalità del brand" />
              </div>
              <div>
                <div className={labelCls}>Certificazioni o formazioni</div>
                <textarea className={inputCls} value={data.certificazioni} onChange={e => set('certificazioni', e.target.value)} rows={3} />
              </div>
            </div>)}

            {card(<div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">4. Progetti e Portfolio</h2>
              <div className="mb-4">
                <div className={labelCls}>Portfolio lavori</div>
                <div className={hintCls}>Foto, video</div>
                <textarea className={inputCls} value={data.portfolio} onChange={e => set('portfolio', e.target.value)} rows={3} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Collaborazioni</div>
                <div className={hintCls}>Fotografi, wedding planner, saloni, etc.</div>
                <textarea className={inputCls} value={data.collaborazioni} onChange={e => set('collaborazioni', e.target.value)} rows={3} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Eventi o progetti rilevanti</div>
                <textarea className={inputCls} value={data.eventi} onChange={e => set('eventi', e.target.value)} rows={3} />
              </div>
              <div>
                <div className={labelCls}>Testimonianze o recensioni</div>
                <textarea className={inputCls} value={data.recensioni} onChange={e => set('recensioni', e.target.value)} rows={3} />
              </div>
            </div>)}

            {card(<div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">5. Funzionalità App di Prenotazione</h2>
              <div className="mb-4">
                <div className={labelCls}>Sistema di prenotazione desiderato</div>
                <div className={hintCls}>Calendario in tempo reale, conferma automatica, reminder via SMS/email?</div>
                <textarea className={inputCls} value={data.prenotazione} onChange={e => set('prenotazione', e.target.value)} rows={3} />
              </div>
              <div className="mb-4">
                <div className={labelCls}>Gestione appuntamenti</div>
                <div className={hintCls}>Bloccare orari, pause, giorni di chiusura</div>
                <textarea className={inputCls} value={data.gestione_appuntamenti} onChange={e => set('gestione_appuntamenti', e.target.value)} rows={3} />
              </div>
              <div>
                <div className={labelCls}>Sistema di fidelizzazione</div>
                <textarea className={inputCls} value={data.fidelizzazione} onChange={e => set('fidelizzazione', e.target.value)} rows={3} />
              </div>
            </div>)}

            <div className="flex items-center gap-3">
              <button onClick={() => setShowRecap(true)} disabled={saving} className={`px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {saving ? 'Invio…' : 'Invia'}
              </button>
              {status && (
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  {status}
                </div>
              )}
            </div>
          </div>
        )}
        {showRecap && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Riepilogo risposte</h3>
                <p className="text-gray-600 text-sm">Controlla le informazioni prima dell'invio.</p>
              </div>
              <div className="p-6 max-h-[60vh] overflow-auto space-y-6">
                <div>
                  <div className="font-semibold text-sm text-gray-800 mb-2">1. Informazioni Generali</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Nome attività:</span> {data.nome_attivita || '-'}</div>
                    <div><span className="font-medium">Contatti:</span> {data.contatti || '-'}</div>
                    <div><span className="font-medium">Social:</span> {data.social || '-'}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 mb-2">2. Descrizione dei Servizi</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Servizi make-up:</span> {data.servizi_makeup || '-'}</div>
                    <div><span className="font-medium">Servizi nail:</span> {data.servizi_nail || '-'}</div>
                    <div><span className="font-medium">Servizi premium:</span> {data.servizi_premium || '-'}</div>
                    <div><span className="font-medium">Modalità servizi:</span> {data.modalita_servizi || '-'}</div>
                    <div><span className="font-medium">Durata media:</span> {data.durata_media || '-'}</div>
                    <div><span className="font-medium">Prezzi:</span> {data.prezzi || '-'}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 mb-2">3. Target e Posizionamento</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Cliente ideale:</span> {data.cliente_ideale || '-'}</div>
                    <div><span className="font-medium">Punti di forza:</span> {data.punti_forza || '-'}</div>
                    <div><span className="font-medium">Immagine brand:</span> {data.immagine_brand || '-'}</div>
                    <div><span className="font-medium">Certificazioni:</span> {data.certificazioni || '-'}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 mb-2">4. Progetti e Portfolio</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Portfolio:</span> {data.portfolio || '-'}</div>
                    <div><span className="font-medium">Collaborazioni:</span> {data.collaborazioni || '-'}</div>
                    <div><span className="font-medium">Eventi:</span> {data.eventi || '-'}</div>
                    <div><span className="font-medium">Recensioni:</span> {data.recensioni || '-'}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 mb-2">5. Funzionalità App di Prenotazione</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><span className="font-medium">Prenotazione:</span> {data.prenotazione || '-'}</div>
                    <div><span className="font-medium">Gestione appuntamenti:</span> {data.gestione_appuntamenti || '-'}</div>
                    <div><span className="font-medium">Fidelizzazione:</span> {data.fidelizzazione || '-'}</div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button onClick={() => setShowRecap(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold">Annulla</button>
                <button onClick={save} disabled={saving} className={`px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {saving ? 'Invio…' : 'Conferma invio'}
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Grazie!</h3>
                  <p className="text-gray-600 text-sm">Le risposte sono state inviate correttamente.</p>
                </div>
              </div>
              <div className="p-6 text-sm text-gray-700">
                Riceverai un riscontro a breve. Puoi chiudere questa finestra.
              </div>
              <div className="p-6 border-t border-gray-100 flex items-center justify-end">
                <button onClick={() => setShowSuccess(false)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">Chiudi</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
