/**
 * scripts/set-env.js
 *
 * Script de pre-build que genera src/environments/environment.production.ts
 * leyendo la variable de entorno WEB3FORMS_ACCESS_KEY.
 *
 * Uso:
 *   - Vercel:  se ejecuta automáticamente como parte del Build Command en vercel.json
 *   - Local:   node scripts/set-env.js  (requiere WEB3FORMS_ACCESS_KEY en el shell o en .env)
 *
 * ⚠️  NUNCA hardcodees la key aquí. Este archivo sí se sube al repositorio.
 */

const fs = require('fs');
const path = require('path');

// ─── Leer la key desde el entorno ───────────────────────────────────────────────
// En Vercel la variable ya está disponible directamente.
// En local puedes cargarla con: $env:WEB3FORMS_ACCESS_KEY="tu-key" (PowerShell)
//                               o añadirla a tu sesión de terminal.
const accessKey = process.env['WEB3FORMS_ACCESS_KEY'];

if (!accessKey) {
  console.error(
    '\n❌  Error: la variable de entorno WEB3FORMS_ACCESS_KEY no está definida.\n' +
    '   En Vercel: Project Settings → Environment Variables.\n' +
    '   En local:  $env:WEB3FORMS_ACCESS_KEY="tu-key" (PowerShell)\n'
  );
  process.exit(1); // detiene el build para que Vercel lo marque como fallido
}

// ─── Generar el archivo de entorno de producción ────────────────────────────────
const targetPath = path.resolve(__dirname, '../src/environments/environment.production.ts');

const content = `// ARCHIVO GENERADO AUTOMÁTICAMENTE por scripts/set-env.js
// ⚠️  No editar manualmente — se sobreescribe en cada build.
export const environment = {
  production: true,
  web3FormsAccessKey: '${accessKey}',
};
`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, content, 'utf8');

console.log(`✅  environment.production.ts generado correctamente.`);
