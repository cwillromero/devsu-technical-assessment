Requisitos previos:
- Node.js (>=16) y npm instalados.
- Acceso a Internet para descargar dependencias y ejecutar tests contra los endpoints públicos (saucedemo / petstore).

1) Clonar el repositorio (si no está local):

  git clone https://github.com/cwillromero/devsu-technical-assessment.git
  cd devsu_assessment

2) Instalar dependencias:

  npm install

3) Comandos disponibles (npm scripts):
- `npm run cy:open`  -> Abre Cypress Test Runner (UI).
- `npm run test:e2e`  -> Ejecuta los tests E2E en modo headless (configuración por defecto en `cypress.config.js`).
- `npm run test:e2e:ui` -> Ejecuta los tests E2E en modo interactivo (si está definido en package.json).
- `npm run test:api`  -> Ejecuta los tests API (script apunta directamente al spec para compatibilidad con PowerShell).
- `npm run test:all`  -> Ejecuta E2E + API (si está definido en package.json).

4) Ejecutar tests E2E (modo headless):

  npm run test:e2e


5) Abrir el Test Runner (modo interactivo):

  npm run cy:open

6) Ejecutar tests API (PowerShell NOTE: el script `test:api` evita usar globs entrecomillados):

  npm run test:api

7) Ejecución en modo headless con navegador específico:

  npx cypress run --browser chrome --headless

8) Logs y reportes
- Los reportes generados por Cypress/Mochawesome se ubican (si están configurados) en `cypress/reports/` y `cypress/reports/mochawesome/`.
- Capturas de pantalla y videos quedan en `cypress/screenshots/` y `cypress/videos/` si la configuración los habilita.