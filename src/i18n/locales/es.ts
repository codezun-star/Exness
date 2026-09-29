/**
 * Diccionario de la interfaz. El sitio es monolingüe: este archivo es TODO el
 * texto que no vive en el blog ni en local-copy.ts.
 *
 * Placeholders disponibles, resueltos por useT(country) sin pasarlos a mano:
 *   {country} {leverage} {min} {minWallet} {minPro} {spread} {instruments}
 *   {countries} {brand} {year} {currency} {entity} {regulator} {license}
 *   {clients} {volume} {withdrawals} {years}
 *
 * ⚠️ Exness NO ofrece bonos de bienvenida ni de depósito, y lo dice de forma
 * expresa. Cualquier texto que insinúe un bono es publicidad falsa y motivo
 * de cierre de la cuenta de socio. El bloque que en otros sitios ocupa el
 * bono lo ocupan aquí las ventajas reales — ver la sección «Ventajas».
 */
const es = {
  // ── Navegación ────────────────────────────────────────────────
  'nav.home': 'Inicio',
  'nav.countries': 'Países',
  'nav.accounts': 'Cuentas',
  'nav.platforms': 'Plataformas',
  'nav.blog': 'Blog',
  'nav.faq': 'Preguntas',
  'nav.cta': 'Abrir cuenta',
  'nav.menu': 'Menú',
  'nav.more': 'Más',
  'nav.back': 'Volver',
  'nav.close': 'Cerrar',
  'nav.main': 'Navegación principal',
  'nav.skip': 'Saltar al contenido',

  // ── Capa de app (móvil / instalada) ───────────────────────────
  'app.country': 'Tu país',
  'app.install': 'Instalar la app',
  'app.installSub': 'Acceso directo en tu pantalla de inicio, sin tienda de apps.',
  'app.installIos': 'En Safari, toca Compartir y luego «Añadir a pantalla de inicio».',
  'app.offlineTitle': 'Sin conexión',
  'app.offlineSub': 'Ahora mismo no hay red. Las páginas que ya abriste siguen disponibles; el resto se carga en cuanto vuelva la conexión.',
  'app.retry': 'Reintentar',

  // ── Barra superior de urgencia ────────────────────────────────
  'bar.text': 'Registro abierto · Depósito desde {min} USD · Retiros instantáneos 24/7',
  'bar.cta': 'Registrarme',

  // ── Hero ──────────────────────────────────────────────────────
  'hero.badge': 'Socio del programa Exness Partners',
  'hero.title': 'Tu cuenta Exness lista en 3 minutos',
  'hero.titleHighlight': 'desde {min} USD',
  'hero.sub': 'Bróker con {instruments} instrumentos, retiros procesados de forma instantánea las 24 horas y cero comisión de depósito o retiro. Apalancamiento escalado hasta {leverage} según el saldo de la cuenta.',
  'hero.cta': 'Abrir cuenta real',
  'hero.cta2': 'Probar cuenta demo gratis',
  'hero.note': 'Sin comisiones de depósito ni retiro · Protección de saldo negativo · Soporte 24/7',

  // ── Señales de confianza ──────────────────────────────────────
  'trust.regulated': 'Regulado',
  'trust.deposit': 'Depósito mínimo',
  'trust.leverage': 'Apalancamiento',
  'trust.execution': 'Ejecución',
  'trust.support': 'Soporte',
  'trust.nbp': 'Saldo negativo protegido',

  'stats.instruments': 'Instrumentos',
  'stats.countries': 'Países',
  'stats.partners': 'Traders activos',
  'stats.minDeposit': 'Depósito mínimo',
  'stats.execution': 'Velocidad de ejecución',
  'stats.languages': 'Volumen mensual',

  // ── Ventajas del bróker ───────────────────────────────────────
  'why.title': 'Por qué miles de traders eligen Exness',
  'why.sub': 'Datos, no promesas. Esto es lo que obtienes al operar con Exness.',
  'why.1.t': 'Retiros instantáneos 24/7',
  'why.1.d': 'Es el argumento propio de la casa y el que más la diferencia: las solicitudes se procesan de forma automática, sin intervención manual, también fines de semana y festivos. El tiempo que tarde en aparecer el dinero depende ya de tu banco o monedero, no del bróker.',
  'why.2.t': 'Empieza desde {min} USD',
  'why.2.d': '{min} USD es el mínimo de las cuentas Standard y Standard Cent, y sirve igual con tarjeta, con criptomoneda o con el método local de tu país. Algunos monederos electrónicos bajan hasta {minWallet} USD. Las cuentas profesionales —Pro, Raw Spread y Zero— piden {minPro} USD de entrada.',
  'why.3.t': 'Spreads desde {spread} pips',
  'why.3.d': 'Las cuentas Raw Spread y Zero arrancan en 0,0 pips y cobran comisión por lote; Standard y Pro no cobran comisión y llevan el coste dentro del spread. Son dos formas de pagar lo mismo, y cuál sale mejor depende de tu volumen.',
  'why.4.t': 'Cero comisión de depósito y retiro',
  'why.4.d': 'Exness no cobra por ingresar ni por sacar dinero. El proveedor de pago sí puede cobrar lo suyo: la comisión que es cero es la del bróker, y conviene entender la diferencia antes de mover el dinero.',
  'why.5.t': 'Protección de saldo negativo',
  'why.5.d': 'Nunca puedes perder más de lo que depositaste. Si el mercado se desploma, tu cuenta se ajusta a cero, no a números rojos.',
  'why.6.t': 'Cuentas sin swap',
  'why.6.d': 'Disponibles para quien no puede pagar ni cobrar intereses, por convicción religiosa o por preferencia. Cubren la mayoría de pares de divisas y de materias primas, sin cuota administrativa sustitutoria en el grueso de los instrumentos.',

  // ── Tabla de cuentas ──────────────────────────────────────────
  'accounts.title': 'Qué cuenta te conviene',
  'accounts.sub': 'Cinco tipos de cuenta en dos familias. La misma plataforma, distinta estructura de costes.',
  'accounts.col.type': 'Tipo de cuenta',
  'accounts.col.min': 'Depósito mínimo',
  'accounts.col.spread': 'Spread desde',
  'accounts.col.commission': 'Comisión',
  'accounts.col.lot': 'Tamaño del lote',
  'accounts.recommended': 'Más elegida',
  'accounts.cta': 'Abrir esta cuenta',
  'accounts.note': 'Las cuentas estándar —Standard Cent y Standard— no cobran comisión: el coste va entero en el spread, y entran desde {min} USD. Las profesionales piden {minPro} USD; Pro tampoco cobra comisión y arranca en 0,1 pips, mientras que Raw Spread y Zero arrancan en 0,0 pips y cobran comisión por lote — hasta 3,50 USD por lado en Raw Spread y desde 0,02 USD por lado en Zero. La Cent opera con lotes de 1.000 unidades, pensada para dimensionar posiciones con capital reducido. Los spreads son variables y cambian según el instrumento y la liquidez del momento. Todas incluyen MT4, MT5, Exness Terminal y protección de saldo negativo. Datos comprobados en agosto de {year}: confirma los vigentes en tu área de cliente antes de depositar.',

  // ── Pasos ─────────────────────────────────────────────────────
  'steps.title': 'Cómo abrir tu cuenta',
  'steps.sub': 'Proceso 100% online. No necesitas ir a ninguna oficina.',
  'steps.1.t': 'Rellena el formulario',
  'steps.1.d': 'Correo, contraseña y país de residencia. Menos de dos minutos y sin depósito inicial obligatorio.',
  'steps.2.t': 'Verifica tu identidad',
  'steps.2.d': 'Sube tu documento de identidad y un comprobante de domicilio. La validación suele completarse el mismo día y es lo que habilita los retiros.',
  'steps.3.t': 'Deposita desde {min} USD',
  'steps.3.d': 'Elige el método de tu país. Tarjeta, monedero, cripto y transferencia local se acreditan en minutos y el bróker no cobra comisión por el ingreso. El mínimo son {min} USD en las cuentas Standard.',
  'steps.4.t': 'Empieza a operar',
  'steps.4.d': 'Abre MT5, el Exness Terminal desde el navegador o la app Exness Trade, y aplica tu plan de gestión de riesgo desde la primera posición.',
  'steps.cta': 'Empezar el registro',
  'steps.time': 'Tiempo estimado: 3 minutos',

  // ── Plataformas y pagos ───────────────────────────────────────
  'platforms.title': 'Plataformas disponibles',
  'platforms.sub': 'La misma cuenta funciona en escritorio, navegador y móvil. El Terminal y la app propia son sólo para cuentas MT5.',
  'platforms.cta': 'Descargar la app',
  'payments.title': 'Métodos de depósito en {country}',
  'payments.sub': 'Exness no cobra comisión por depósitos ni retiros. Los tiempos y los métodos disponibles dependen de tu país.',

  // ── Ventajas destacadas (ocupa el lugar del bono) ─────────────
  // Exness no tiene bono. Este bloque existe para decir exactamente eso y
  // poner en su lugar lo que la casa sí ofrece.
  'adv.title': 'Exness no da bonos. Da esto.',
  'adv.desc': 'No hay bono de bienvenida ni de depósito, y no es un olvido: Exness ha decidido no ofrecerlos. Lo que sí hay son condiciones que puedes comprobar antes de ingresar un dólar.',
  'adv.cta': 'Abrir mi cuenta',
  'adv.terms': 'Condiciones sujetas a los términos de Exness y a la verificación de la cuenta. El apalancamiento escalado depende del saldo, del instrumento y del historial de la cuenta, y no está disponible en todas las jurisdicciones. Confirma las condiciones vigentes en tu área de cliente antes de depositar.',
  'adv.blocked': 'La normativa de tu jurisdicción limita el apalancamiento en productos apalancados, así que el escalado de Exness no aplica a tu cuenta. A cambio, tu cuenta incluye protección reforzada al inversor.',
  'adv.withdrawals.t': 'Retiros instantáneos',
  'adv.withdrawals.d': 'Procesados de forma automática las 24 horas, todos los días del año.',
  'adv.fees.t': 'Cero comisión del bróker',
  'adv.fees.d': 'Ni al depositar ni al retirar. Lo que cobre tu proveedor de pago es aparte.',
  'adv.leverage.t': 'Apalancamiento escalado',
  'adv.leverage.d': 'Hasta {leverage} en cuentas de saldo bajo, y va bajando por tramos a medida que crece el capital.',
  'adv.swapfree.t': 'Cuentas sin swap',
  'adv.swapfree.d': 'Sobre la mayoría de divisas y materias primas, sin cuota administrativa sustitutoria.',
  'adv.entry.t': 'Entrada desde {min} USD',
  'adv.entry.d': 'En cuentas Standard, con cualquier método. {minPro} USD si vas directo a una cuenta profesional.',

  // ── Comparativa ───────────────────────────────────────────────
  'compare.title': 'Exness frente a un bróker medio',
  'compare.sub': 'Comparación sobre condiciones publicadas. Verifica siempre los datos actuales antes de operar.',
  'compare.col.feature': 'Característica',
  'compare.col.broker': 'Exness',
  'compare.col.others': 'Bróker medio',
  'compare.f1': 'Depósito mínimo',
  'compare.f2': 'Comisión por depósito y retiro',
  'compare.f3': 'Retiros fuera de horario laboral',
  'compare.f4': 'Protección de saldo negativo',
  'compare.f5': 'Cuentas sin swap',
  'compare.f6': 'Cuenta demo gratuita',
  'compare.yes': 'Sí',
  'compare.no': 'No siempre',

  // ── FAQ (formato AEO: pregunta literal + respuesta directa) ────
  'faq.title': 'Preguntas frecuentes sobre Exness',
  'faq.sub': 'Respuestas directas a lo que más se pregunta antes de abrir cuenta.',
  'faq.q1': '¿Exness es un bróker seguro y regulado?',
  'faq.a1': 'Exness opera mediante varias entidades reguladas. A los clientes de América Latina los atiende Exness (SC) Ltd, autorizada por la FSA de Seychelles con la licencia SD025. El grupo tiene además Exness B.V. en Curazao (CBCS, 0003LSI), Vlerizo (Pty) Ltd en Sudáfrica bajo el nombre Exness ZA (FSCA, FSP 51024) y Exness (Cy) Ltd en Chipre (CySEC, 178/12), esta última sólo para clientes profesionales. La entidad que te atiende depende de tu país de residencia y determina tu apalancamiento máximo y tus protecciones.',
  'faq.q2': '¿Desde qué países no se puede abrir cuenta en Exness?',
  'faq.a2': 'La lista de Exness es más larga que la de la mayoría de brókeres. No acepta residentes de Estados Unidos ni de sus territorios, de Canadá, de prácticamente todo el Espacio Económico Europeo —España incluida—, del Reino Unido, de Australia ni de Nueva Zelanda, además de las jurisdicciones sancionadas internacionalmente. El motivo en el caso europeo no es una sanción: sus entidades de la UE dejaron de atender a clientes minoristas. América Latina sí está cubierta en su totalidad, y por eso los 15 mercados de este sitio son hispanoamericanos y no está España.',
  'faq.q3': '¿Cuál es el depósito mínimo en Exness?',
  'faq.a3': 'El mínimo publicado por Exness es {min} USD para las cuentas Standard y Standard Cent, y vale igual con tarjeta, criptomoneda o método de pago local. Algunos monederos electrónicos —Skrill, Neteller, Perfect Money— admiten ingresos desde {minWallet} USD, pero eso es el suelo de esos métodos concretos, no el mínimo general de la cuenta. Las cuentas profesionales —Pro, Raw Spread y Zero— exigen {minPro} USD. Exness no cobra comisión por el depósito en ningún caso.',
  'faq.a4': 'Exness procesa los retiros de forma instantánea y automática, las 24 horas y todos los días del año, sin intervención manual. Lo que puede tardar es la acreditación en destino, y eso ya depende de tu banco o de tu monedero, no del bróker. Exness no cobra comisión por el retiro.',
  'faq.q4': '¿Cuánto tarda un retiro en Exness?',
  'faq.q5': '¿Qué apalancamiento ofrece Exness?',
  'faq.a5': 'Exness usa un apalancamiento escalado por saldo, no un valor único. En las cuentas de saldo bajo puede llegar a ser ilimitado si se cumplen las condiciones que exige la casa; a partir de ahí baja por tramos a medida que crece el capital de la cuenta. El apalancamiento amplifica tanto las ganancias como las pérdidas: úsalo con una gestión de riesgo definida y comprueba el tramo que te aplica en tu área de cliente.',
  'faq.q6': '¿Exness ofrece bono de bienvenida?',
  'faq.a6': 'No. Exness no ofrece bonos de bienvenida, de depósito ni de trading, y lo declara de forma expresa. Si ves una página que promete un bono de Exness, no viene de la casa. Lo que sí existe son los programas de socios y un esquema de recompensas ligado a la actividad de la cuenta.',

  // ── CTA final ─────────────────────────────────────────────────
  'cta.title': 'Abre tu cuenta Exness hoy',
  'cta.sub': 'Registro en 3 minutos, verificación el mismo día y depósito desde {min} USD.',
  'cta.button': 'Crear mi cuenta ahora',
  'cta.note': 'Al continuar aceptas los términos de Exness. Los CFD son instrumentos complejos con alto riesgo de perder dinero.',

  // ── Página de país ────────────────────────────────────────────
  'country.title': 'Exness en {country}',
  'country.sub': 'Condiciones, métodos de pago locales y entidad reguladora que aplica si resides en {country}.',
  'country.payments': 'Depositar desde {country}',
  'country.paymentsSub': 'Métodos disponibles para clientes residentes en {country}.',
  'country.entity': 'Entidad que te atiende',
  'country.regulator': 'Regulador',
  'country.license': 'Licencia',
  'country.leverage': 'Apalancamiento máximo',
  'country.protection': 'Protección',
  'country.assets': 'Lo más operado desde {country}',
  'country.assetsSub': 'Instrumentos con mayor volumen entre traders de la región.',
  'country.others': 'Otros países',
  'country.othersSub': 'Consulta las condiciones que aplican en tu país de residencia.',
  'country.breadcrumb': 'Países',
  'local.title': 'Lo que cambia si operas desde {country}',
  'country.localRegulator': 'Regulador local',

  // ── Blog ──────────────────────────────────────────────────────
  'blog.title': 'Blog de trading',
  'blog.sub': 'Guías prácticas sobre Exness, gestión de riesgo y mercados. Sin humo.',
  'blog.read': 'Leer artículo',
  'blog.min': 'min de lectura',
  'blog.by': 'Por',
  'blog.updated': 'Actualizado el',
  'blog.published': 'Publicado el',
  'blog.back': 'Volver al blog',
  'blog.related': 'Artículos relacionados',
  'blog.empty': 'Todavía no hay artículos publicados. Estamos preparando las primeras guías.',
  'blog.toc': 'En este artículo',

  // ── Red Inversax ──────────────────────────────────────────────
  //
  // El reparto de intención entre los sitios de la red. Este sitio responde
  // "Exness en {país}"; el comparador responde "mejores brokers en {país}".
  // El bloque lo dice en voz alta para que ninguna de las dos páginas persiga
  // la consulta de la otra.
  'network.eyebrow': 'Red Inversax',
  'network.title': '¿Exness es el bróker que te conviene en {country}?',
  'network.desc': 'Este sitio cubre Exness a fondo: la entidad que te atiende, las cuentas Cent y Standard y los plazos reales de retiro. Si todavía estás decidiendo el bróker, la comparativa de Inversax pone a Exness frente a los otros que aceptan clientes en {country}, con depósito mínimo, spreads y métodos de pago locales.',
  'network.cta': 'Comparar brókeres disponibles en {country}',
  'network.footer': 'Parte de Inversax, comparador independiente de brókeres',

  // ── Footer y legal ────────────────────────────────────────────
  /*
    Titular propio del pie. NO reutiliza 'cta.title': el pie va justo debajo
    de CtaBand, así que compartir cadena imprimía la misma frase dos veces
    seguidas con doscientos píxeles de separación.
  */
  'footer.ctaTitle': 'Registro en 3 minutos, desde {min} USD',
  'footer.about': 'Sobre este sitio',
  'footer.aboutText': '{brand} es un sitio informativo independiente que participa en el programa de socios de Exness. No somos un bróker ni gestionamos fondos de clientes.',
  'footer.nav': 'Navegación',
  'footer.legal': 'Legal',
  'footer.countries': 'Mercados',
  'footer.disclosure': 'Divulgación de afiliación',
  /** Versión de una línea para el pie. La larga vive en /legal/affiliate/ */
  'footer.disclosureShort': 'Enlaces de afiliado. Podemos cobrar una comisión de Exness si abres cuenta, sin coste adicional para ti.',
  'footer.disclosureText': 'Los enlaces a Exness de esta web son enlaces de afiliado. Si abres una cuenta a través de ellos, podemos recibir una comisión del bróker sin coste adicional para ti. Esto no altera las condiciones que obtienes ni influye en la información publicada.',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.risk': 'Advertencia de riesgo',

  'risk.short': 'Los CFD son instrumentos complejos y conllevan un alto riesgo de perder dinero rápidamente debido al apalancamiento.',
  'risk.full': 'Advertencia de riesgo: operar con divisas y CFD conlleva un riesgo elevado y puede no ser adecuado para todos los inversores. El apalancamiento amplifica tanto las ganancias como las pérdidas, y el escalado que ofrece Exness lo amplifica más que un apalancamiento fijo. Un porcentaje significativo de inversores minoristas pierde dinero al operar con CFD. Antes de operar, valora tus objetivos, tu experiencia y tu tolerancia al riesgo, y no inviertas dinero que no puedas permitirte perder. El rendimiento pasado no garantiza resultados futuros. Este sitio no ofrece asesoramiento financiero, fiscal ni de inversión.',

  'legal.risk': 'Advertencia de riesgo',
  'legal.privacy': 'Privacidad',
  'legal.terms': 'Términos de uso',
  'legal.affiliate': 'Divulgación de afiliación',
  'legal.cookies': 'Cookies',

  // ── Micro-interacciones ───────────────────────────────────────
  // Dos titulares para el mismo diálogo: el de salida solo se usa cuando el
  // cursor abandona la ventana de verdad; el de lectura, cuando el visitante
  // ha terminado la página y sigue en ella.
  'exit.title': 'Antes de irte',
  'exit.readTitle': 'Ya sabes cómo funciona',
  'exit.readSub': 'El registro son 3 minutos y no exige depósito inmediato.',
  'exit.sub': 'Abrir la cuenta lleva 3 minutos y puedes empezar en modo demo.',
  'exit.cta': 'Abrir cuenta gratis',
  'exit.dismiss': 'Ahora no',
  'exit.close': 'Cerrar',
  'consent.text': 'Usamos cookies para medir el tráfico y mejorar el sitio. Puedes rechazarlas sin perder funcionalidad.',
  'consent.accept': 'Aceptar',
  'consent.reject': 'Rechazar',
  'country.choose': 'Elige tu país',
  'country.label': 'País',
  'country.all': 'Todos los países',
  'geo.suggest': 'Parece que estás en {country}. ¿Quieres ver las condiciones de tu país?',
  // Versión corta para móvil: la barra tiene que caber en una línea.
  'geo.suggestShort': '¿Ver condiciones de {country}?',
  'geo.go': 'Ir a {country}',
  'geo.stay': 'Seguir aquí',
  'go.title': 'Redirigiendo a Exness…',
  'go.text': 'Si no se abre automáticamente, pulsa el botón.',

  '404.title': 'Página no encontrada',
  '404.sub': 'El enlace no existe o cambió de dirección.',
  '404.cta': 'Volver al inicio',

  // ── Vídeo de marca ────────────────────────────────────────────
  'video.title': 'Mira cómo funciona Exness antes de abrir cuenta',
  'video.titleCountry': 'Exness en {country}: míralo antes de decidir',
  'video.titleBlog': 'Dos minutos de vídeo antes de seguir leyendo',
  'video.cta': 'Abrir cuenta después del vídeo',

  'aeo.answer': 'Respuesta corta',
  'aeo.takeaways': 'Puntos clave',

  // ── SEO ───────────────────────────────────────────────────────
  //
  // Los títulos no llevan año. Dos razones: envejecen —hasta que se regenera el
  // build, en enero el título anuncia el año pasado— y no aportan nada a una
  // consulta de marca. El de portada sí dice "broker de forex y CFD" a
  // propósito: Search Console registraba "xm broker" en posición 32, "xm forex"
  // en 27 y "xm cfd" en 24, todas sin un solo clic, contra un título que no
  // contenía ninguna de esas tres palabras.
  'seo.home.title': 'Exness broker de forex y CFD: condiciones, spreads y abrir cuenta',
  'seo.home.desc': 'Cómo abrir una cuenta en Exness desde {min} USD: tipos de cuenta, spreads desde {spread} pips, apalancamiento escalado, retiros instantáneos y condiciones por país.',
  'seo.country.title': 'Exness en {country}: cómo abrir cuenta y depositar',
  'seo.country.desc': 'Guía de Exness para {country}: entidad reguladora, apalancamiento hasta {leverage}, depósito desde {min} USD y métodos de pago locales.',
  'seo.legal.risk': 'Advertencia de riesgo: qué implica operar con CFD apalancados, por qué la mayoría de minoristas pierde dinero y qué entidad de Exness te atiende según tu país.',
  'seo.legal.affiliate': 'Divulgación de afiliación: cómo se financia {brand}, qué comisión recibe de Exness y por qué eso no altera las condiciones que obtienes ni la información publicada.',
  'seo.legal.privacy': 'Política de privacidad: qué datos recoge {brand}, qué herramientas de medición usa, con qué base legal y cómo ejercer tus derechos sobre ellos.',
  'seo.legal.terms': 'Términos de uso de {brand}: naturaleza informativa del sitio, ausencia de asesoramiento de inversión y límites de responsabilidad sobre el contenido publicado.',
  'seo.legal.cookies': 'Política de cookies: qué se almacena en tu navegador, con qué finalidad, cuánto dura cada registro y cómo revocar el consentimiento en cualquier momento.',
  'seo.blog.title': 'Blog de trading y guías de Exness',
  'seo.blog.desc': 'Guías prácticas sobre Exness, gestión de riesgo, plataformas MetaTrader y mercados, actualizadas periódicamente.',
};

export default es;
