# 🚀 Guía de Despliegue Profesional

Aquí tienes las mejores opciones para poner **CodeCraft** en línea. Como es un sitio estático (HTML/CSS/JS), puedes usar servicios de "Alta Velocidad" de forma gratuita.

## Opción 1: Netlify (Recomendado / Más Fácil) ⭐
Netlify es el estándar de oro para sitios estáticos. Es rápido, tiene CDN global y se puede usar **arrastrando y soltando**.

### Método "Drag & Drop" (Sin Comandos)
1.  Regístrate en [netlify.com](https://www.netlify.com/).
2.  Una vez en tu panel (Dashboard), verás una caja que dice: **"Drag and drop your site output folder here"**.
3.  Toma la carpeta completa de tu proyecto `CodeCraft` en tu computadora.
4.  **Arrástrala y suéltala** dentro de esa caja en el navegador.
5.  ¡Listo! Netlify subirá los archivos y te dará un enlace (ej: `codecraft-random.netlify.app`).

### Configuración Extra (Dominio Personalizado)
*   En "Site Settings" > "Change site name", puedes ponerle algo más bonito como `codecraft-cristian.netlify.app`.

---

## Opción 2: Vercel (Rendimiento Extremo) ⚡
Vercel es la empresa detrás de Next.js. Su infraestructura es increíblemente rápida.

### Método con GitHub (Automático)
Si ya subiste tu código a GitHub:
1.  Ve a [vercel.com](https://vercel.com/) y regístrate con tu cuenta de GitHub.
2.  Haz clic en **"Add New..."** > **"Project"**.
3.  Verás tu repositorio `CodeCraft` en la lista. Haz clic en **Import**.
4.  Deja las configuraciones por defecto (Framework Preset: Other).
5.  Haz clic en **Deploy**.
6.  En segundos, tu sitio estará vivo con certificado SSL (candadito verde) incluido.

---

## Opción 3: GitHub Pages (Clásico)
Ideal si quieres mantener todo en un solo lugar.

1.  Ve a la pestaña **Settings** de tu repositorio en GitHub.
2.  Sección **Pages**.
3.  Source: `Deploy from a branch`.
4.  Branch: `main` / `root`.
5.  Guardar.

---

## ✅ Checklist Pre-Despliegue
Antes de subir tu sitio, verifica esto:

-   [ ] **Index.html**: Asegúrate de que tu archivo principal se llame exactamente `Index.html` (o `index.html`).
-   [ ] **Rutas Relativas**: Verifica que tus imágenes y CSS usen `./` (ej: `./css/estilos.css`), no rutas absolutas de tu PC (`C:/Users/...`).
-   [ ] **SEO**: Revisa que tus `<meta>` tags estén listos para cuando compartas el link.
