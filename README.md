# 🎮 Servidor League of Legends - Ranking Amigos

## 🚀 Instalación y Ejecución

### Paso 1: Instalar Node.js
Si no lo tienes instalado, descárgalo desde: https://nodejs.org/
- Descarga la versión LTS (Recomendada)
- Instala normalmente

### Paso 2: Abrir Terminal en la carpeta del proyecto
1. Abre PowerShell o CMD
2. Navega a la carpeta: `c:\Users\nicol\Desktop\crosnik`

```bash
cd c:\Users\nicol\Desktop\crosnik
```

### Paso 3: Instalar dependencias
Ejecuta este comando una sola vez:

```bash
npm install
```

Esto descargará las librerías necesarias (Express, CORS, Axios)

### Paso 4: Iniciar el servidor
Ejecuta:

```bash
npm start
```

O simplemente:

```bash
node server.js
```

### Paso 5: Verificar que funciona
Si ves esto, ¡está funcionando! ✅

```
╔════════════════════════════════════════╗
║   🎮 SERVIDOR LEAGUE OF LEGENDS 🎮    ║
╠════════════════════════════════════════╣
║  ✅ Servidor ejecutándose en puerto 3000
║  📍 URL: http://localhost:3000
║  🔌 CORS habilitado
║  🎫 API Key: Configurada
╚════════════════════════════════════════╝
```

### Paso 6: Abrir la página web
Abre `index.html` en tu navegador (ya estará conectada al servidor)

## 📝 Uso

1. Haz clic en el botón **Admin**
2. Inicia sesión con:
   - Usuario: `admin`
   - Contraseña: `K7$mP2@xQ9#vL4&bR8!nT`

3. Agrega jugadores con:
   - Nombre (cómo lo quieres mostrar)
   - Nombre Invocador (nombre en-game exacto)
   - Región (LAS, LAN, NA, EUW, etc.)
   - Foto de perfil (opcional)

4. Presiona **"Actualizar Estadísticas"** para obtener datos reales

## ⚙️ Qué hace el servidor

- Recibe solicitudes de la página web
- Las envía a la API de Riot Games
- Procesa los datos
- Los devuelve a la página
- Todo sin problemas de CORS ✅

## 🛑 Detener el servidor

Presiona **Ctrl + C** en la terminal

## 🔄 Troubleshooting

### Error: "Puerto 3000 en uso"
Otro programa está usando ese puerto. Solución:
- Cambia el puerto en `server.js` línea 6 de `3000` a otro (ej: `3001`)

### Error: "Cannot find module"
No instalaste las dependencias. Ejecuta:
```bash
npm install
```

### Error: "Summoner not found"
Verifica que el nombre del invocador esté correcto (mayúsculas, espacios, etc.)

## 📚 Archivos

- `index.html` - Página web principal
- `server.js` - Servidor Node.js
- `package.json` - Configuración de dependencias

---

**Hecho con ❤️ para trackear a tus amigos en League of Legends**
