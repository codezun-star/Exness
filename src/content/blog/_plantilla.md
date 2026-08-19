---
title: "Plantilla de artículo — no se publica"
description: "Archivo de referencia con todos los campos del frontmatter, sus límites y qué hace cada uno. Copia este archivo para crear un artículo real."
pubDate: 2026-01-01
updatedDate: 2026-01-01
author: "EXZUN"
tags: ["Exness", "Guías"]
draft: true
answer: "Respuesta directa de 40 a 60 palabras. Es el bloque que citan ChatGPT, Perplexity y los fragmentos destacados de Google, así que tiene que entenderse sin leer nada más y contener el dato concreto que responde al título."
faq:
  - q: "¿Pregunta literal, tal y como la escribe la gente en el buscador?"
    a: "Respuesta completa y autónoma. Se publica como FAQPage en JSON-LD, así que se lee fuera de contexto: no empieces con «como decíamos» ni con «además»."
---

# Cómo se publica un artículo

**Este archivo no se publica.** Lleva `draft: true`, así que queda fuera del
build: no genera página, no entra en el RSS, no aparece en el índice del blog
ni en `/llms.txt`. Existe por dos razones, y las dos importan:

1. **Documenta el formato** donde se usa, en vez de en un README que se queda
   desactualizado. Los campos de arriba son todos los que acepta el esquema.
2. **Mantiene viva la colección.** Astro avisa en cada página del build si la
   colección `blog` está completamente vacía. Con este archivo dentro, el
   aviso desaparece y el blog sigue sin publicar nada.

Si algún día borras este archivo y no hay ningún artículo real, el sitio sigue
compilando —el índice muestra el texto de `blog.empty` y el RSS sale con el
canal vacío— pero vuelve el aviso.

## Crear un artículo real

Copia este archivo a `src/content/blog/<slug>.md`. **El nombre del archivo es
el slug** y la URL resultante es `/blog/<slug>/`. Luego quita `draft: true`.

Nada más. No hay que registrar el artículo en ningún índice, ni en el sitemap,
ni en el RSS, ni en `llms.txt`: los cuatro se generan solos a partir de la
colección en cada build.

## Los campos, uno a uno

| Campo | Obligatorio | Límite | Qué hace |
| --- | --- | --- | --- |
| `title` | sí | 70 caracteres | Es el `<h1>` y el `<title>`. Por encima de 70 Google lo corta. |
| `description` | sí | entre 50 y 170 | Es la meta description real, la que se ve en el resultado de búsqueda. |
| `pubDate` | sí | — | Una fecha futura mantiene el artículo sin publicar hasta que llegue el día. |
| `updatedDate` | no | — | Si está, sale como «Actualizado el» y alimenta `dateModified` del schema. |
| `author` | no | — | Por defecto `EXZUN`. |
| `tags` | no | — | Deciden qué artículos se enlazan entre sí como relacionados. |
| `draft` | no | — | `true` lo excluye del build por completo. |
| `answer` | no | 40-60 palabras | El bloque destacado del principio. Es lo que citan los motores de IA. |
| `faq` | no | — | Se publica como `FAQPage` en JSON-LD. Cada respuesta tiene que sostenerse sola. |

El esquema que valida todo esto está en `src/content.config.ts`, y falla el
build si algo no cuadra — un título de 80 caracteres no llega a producción.

## Guías por país

`guideFor()`, en `src/lib/blog.ts`, busca por convención de nombre: la landing
de un mercado enlaza automáticamente a su guía si existe un artículo con el
slug `exness-en-<nombre-del-país-sin-tildes>`.

Para México eso es `exness-en-mexico.md`; para República Dominicana,
`exness-en-republica-dominicana.md`. No hay que registrar la relación en
ningún sitio: si el archivo existe y está publicado, la landing lo enlaza; si
no existe, la landing simplemente no muestra el bloque de guía.

## Reglas de contenido que no conviene romper

- **Nada de rendimientos prometidos ni de «ganancias garantizadas».** Es la
  causa más común de cierre de una cuenta de socio.
- **Nada de bonos.** Exness no ofrece bonos de bienvenida ni de depósito, y lo
  dice de forma expresa. Un artículo que insinúe lo contrario es publicidad
  falsa.
- **Cifras con fecha.** Spreads, comisiones y apalancamientos caducan. Si citas
  uno, di cuándo lo comprobaste, o mejor: sácalo de `src/config/offers.ts` en
  vez de escribirlo a mano.
- **El aviso de riesgo se añade solo** al final de cada artículo. No hay que
  escribirlo en el cuerpo.
