import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API POST route for creating Github issues
  app.post('/api/aportes', async (req, res) => {
    try {
      const { autor, titulo, contenido } = req.body;
      
      const githubToken = process.env.GITHUB_TOKEN;
      const githubUser = process.env.GITHUB_USERNAME; // E.g., 'your-username'
      const githubRepo = process.env.GITHUB_REPO; // E.g., 'your-repo'

      if (!githubToken || !githubUser || !githubRepo) {
        return res.status(500).json({ error: 'Configuración de GitHub incompleta en el servidor.' });
      }

      if (!contenido) {
        return res.status(400).json({ error: 'El contenido del aporte es requerido' });
      }

      // Markdown body composition
      const issueBody = `### Aporte de: ${autor || 'Anónimo'}

${contenido}
`;

      const response = await fetch(`https://api.github.com/repos/${githubUser}/${githubRepo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo || 'Nuevo aporte desde aplicativo web',
          body: issueBody,
          labels: ['aporte-ciudadano']
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error desde GitHub API:', errorData);
        throw new Error(`GitHub API respondió con estado ${response.status}`);
      }

      const responseData = await response.json();
      return res.status(201).json({ message: 'Aporte creado exitosamente', issueUrl: responseData.html_url });
    } catch (error) {
      console.error('Error al crear el issue:', error);
      return res.status(500).json({ error: 'Error interno conectando con GitHub' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
