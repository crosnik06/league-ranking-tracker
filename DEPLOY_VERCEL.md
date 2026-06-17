# 🚀 GUÍA DEPLOY EN VERCEL

## Paso 1: Preparar el repositorio Git

```bash
cd c:\Users\nicol\Desktop\crosnik
git init
git add .
git commit -m "Initial commit for League Ranking Tracker"
git remote add origin https://github.com/TU_USUARIO/league-ranking-tracker.git
git branch -M main
git push -u origin main
```

## Paso 2: Conectar a Vercel

1. **Crear cuenta en Vercel**: https://vercel.com/signup
2. **Conectar GitHub** a Vercel (autorizar la aplicación)
3. **Importar proyecto**:
   - Click en "New Project"
   - Selecciona el repositorio `league-ranking-tracker`
   - Vercel detectará automáticamente que es un proyecto Node.js
   
## Paso 3: Configurar Variables de Entorno

En Vercel Dashboard:
1. Ve a Settings → Environment Variables
2. Agrega la variable:
   - **Nombre**: `RIOT_API_KEY`
   - **Valor**: `RGAPI-a6bc8fa3-1efe-4176-911a-8f63c825b737`
   - **Selecciona**: Production, Preview, Development
3. Click en "Save"

## Paso 4: Hacer Deploy

```bash
# Opción 1: Desde CLI (más fácil)
npm install -g vercel
vercel

# Opción 2: Desde GitHub
- Simplemente hacer push a main branch
- Vercel deployará automáticamente
```

## Paso 5: Obtener URL Pública

Una vez deployado, Vercel te dará una URL como:
```
https://league-ranking-tracker.vercel.app
```

Esa es tu aplicación en vivo 🎉

---

## ⚠️ Importante: API Key

Si la API Key expira:
1. Regenera una nueva en: https://developer.riotgames.com
2. Actualiza en Vercel → Settings → Environment Variables
3. Vercel hará un nuevo deployment automáticamente

---

## 📁 Estructura del Proyecto Vercel

```
/api
  ├── player.js          ← Función serverless para Riot API
/public
  ├── index.html         ← Frontend (se sirve automáticamente)
vercel.json              ← Configuración de Vercel
package.json
.vercelignore
```

---

## 🧪 Testing Local

Antes de hacer deploy:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Simular entorno Vercel localmente
vercel dev

# Luego abre: http://localhost:3000
```

---

## 🎯 Próximos Pasos

1. **Crear repo en GitHub**
2. **Hacer push de los archivos**
3. **Conectar a Vercel**
4. **Configurar API Key en variables de entorno**
5. **¡Listo! Tu app estará en vivo**

---

## ❓ Problemas Comunes

### Error 401 en Riot API
- Verifica que `RIOT_API_KEY` esté correctamente configurada en Vercel
- La API Key debe estar en formato: `RGAPI-xxxxx...`

### La API no responde
- Comprueba que el endpoint está en `/api/player`
- Verifica CORS está habilitado en vercel.json

### Frontend no carga
- Asegúrate de que `public/index.html` existe
- Vercel sirve archivos estáticos desde `/public` automáticamente
