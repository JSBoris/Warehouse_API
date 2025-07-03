import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Статика (dist)
app.use(express.static(path.join(__dirname, 'dist')))

// Прокси запросов к API
app.get('/api-proxy/*', async (req, res) => {
  const targetPath = req.originalUrl.replace('/api-proxy', '')
  const targetUrl = `http://109.73.206.144:6969${targetPath}`

  try {
    const response = await fetch(targetUrl)
    const contentType = response.headers.get('content-type') || 'application/json'
    const data = await response.text()

    res.set('Content-Type', contentType)
    res.send(data)
  } catch (err) {
    console.error('Ошибка при проксировании:', err.message)
    res.status(500).json({ error: 'Ошибка при проксировании запроса' })
  }
})

// Для всех остальных путей — index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`✅ Сервер запущен на http://localhost:${port}`)
})
