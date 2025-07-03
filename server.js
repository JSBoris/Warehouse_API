import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Раздача фронтенда
app.use(express.static(path.join(__dirname, 'dist')))

// Проксирование запросов к API
app.use('/api-proxy', async (req, res) => {
  const targetUrl = 'http://109.73.206.144:6969' + req.originalUrl.replace('/api-proxy', '')
  try {
    const response = await fetch(targetUrl)
    const data = await response.text()
    res.set('Content-Type', 'application/json')
    res.send(data)
  } catch (err) {
    res.status(500).send({ error: 'Ошибка при проксировании запроса' })
  }
})

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})
