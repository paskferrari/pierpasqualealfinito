import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const url = env.VITE_SUPABASE_URL || ''
  const key = env.VITE_SUPABASE_ANON_KEY || ''

  function supabaseEnvPlugin() {
    return {
      name: 'supabase-env-plugin',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/supabase.json') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url, key }))
            return
          }
          next()
        })
      },
      writeBundle(options: any) {
        const outDir = options.dir || 'dist'
        const filePath = path.join(outDir, 'supabase.json')
        try {
          fs.writeFileSync(filePath, JSON.stringify({ url, key }), 'utf-8')
        } catch {}

        try {
          const indexPath = path.join(outDir, 'index.html')
          const indexHtml = fs.readFileSync(indexPath, 'utf-8')
          const targets = [
            path.join(outDir, 'myprojects', 'index.html'),
            path.join(outDir, 'myprojects', 'ritaverzamua', 'index.html'),
            path.join(outDir, 'myprojects', 'ritaverzamua', 'questionario', 'index.html')
          ]
          targets.forEach(t => {
            const dir = path.dirname(t)
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(t, indexHtml, 'utf-8')
          })
        } catch {}
      }
    }
  }

  return {
    plugins: [react(), supabaseEnvPlugin()]
  }
})
