import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Download, FileText, Folder, Plus } from 'lucide-react'
import QuestionarioRitaVerza from './QuestionarioRitaVerza'

type Material = {
  name: string
  url: string
}

function useProjectSlug() {
  const path = window.location.pathname
  const parts = path.split('/').filter(Boolean)
  if (parts[0] !== 'myprojects') return null
  return parts[1] || null
}

function ProjectHeader({ title }: { title: string }) {
  return (
    <div className="bg-white border-gray-100 rounded-3xl p-8 shadow-xl border mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Folder className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <a href="/myprojects" className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Torna ai progetti
        </a>
      </div>
    </div>
  )
}

function MaterialsList({ slug }: { slug: string }) {
  const [materials, setMaterials] = useState<Material[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = `/myprojects/${slug}/materials.json`
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('not-found')
        return r.json()
      })
      .then((data: Material[]) => setMaterials(data))
      .catch(() => setError('Nessun materiale ancora caricato'))
  }, [slug])

  if (error) {
    return (
      <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Materiali</h2>
        </div>
        <p className="text-gray-600 text-sm">{error}. Carica i file in `public/myprojects/{slug}`.</p>
      </div>
    )
  }

  if (!materials) {
    return (
      <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Materiali</h2>
        </div>
        <p className="text-gray-600 text-sm">Caricamento…</p>
      </div>
    )
  }

  return (
    <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Materiali</h2>
        </div>
        <a href={`/myprojects/${slug}/`} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          Apri cartella
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {materials.map(m => (
          <div key={m.url} className="p-4 bg-gray-50 border-gray-200/50 rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-800 truncate">{m.name}</span>
            </div>
            <a href={m.url} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-2">
              <Download className="w-3 h-3" />
              Scarica
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MyProjects() {
  const slug = useProjectSlug()
  const isQuestionario = typeof window !== 'undefined' && window.location.pathname.endsWith('/questionario')
  const items = useMemo(() => ([
    {
      slug: 'ritaverzamua',
      title: 'Rita Verza MUA',
      description: 'Materiali di lavoro per Rita Verza (Makeup Artist)'
    }
  ]), [])

  if (slug) {
    const project = items.find(i => i.slug === slug)
    if (slug === 'ritaverzamua' && isQuestionario) return <QuestionarioRitaVerza />
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto p-6">
          <ProjectHeader title={project ? project.title : slug} />
          <div className="grid grid-cols-1 gap-6">
            <MaterialsList slug={slug} />
            <a href={`/myprojects/${slug}/questionario`} className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Questionario Informativo</h2>
              </div>
              <p className="text-gray-600 text-sm">Compila il questionario per raccogliere tutte le informazioni necessarie. Le risposte vengono salvate su Supabase.</p>
              <div className="text-blue-600 text-sm font-medium flex items-center gap-2 mt-3">Apri <ArrowRight className="w-4 h-4" /></div>
            </a>
            <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Aggiungi materiali</h2>
              </div>
              <p className="text-gray-600 text-sm">Aggiungi i file nella cartella `public/myprojects/{slug}`. Verranno serviti come statici e potrai linkarli direttamente.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white border-gray-100 rounded-3xl p-8 shadow-xl border mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
              <p className="text-gray-600 text-sm">Area per ospitare e conservare materiali di lavoro.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <a key={item.slug} href={`/myprojects/${item.slug}`} className="p-6 bg-white border-gray-100 rounded-2xl shadow-lg border hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Folder className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="text-blue-600 text-sm font-medium flex items-center gap-2">
                Apri
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
