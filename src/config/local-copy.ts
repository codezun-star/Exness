/**
 * Texto propio de cada mercado.
 *
 * Es lo único que distingue de verdad una landing de otra: sin esto, las 17
 * páginas comparten el 96 % del vocabulario y sólo cambian el topónimo, la
 * divisa y el nombre del regulador. Con esto, cada una responde preguntas que
 * ninguna otra puede responder — que es lo que se busca en la cola larga
 * («¿Exness está regulada en México?», «¿cómo deposito desde Colombia?»).
 *
 * ⚠️ Regla al escribir aquí: sólo hechos estables y verificables. Nada de
 * plazos de retiro, comisiones ni cifras de mercado — eso caduca, y publicar
 * datos desactualizados es motivo de suspensión de la cuenta de socio. Lo que
 * sí es estable: qué supervisa cada regulador local, qué es cada vía de pago y
 * si el país usa el dólar. Revisa este archivo cada trimestre.
 */
export const LOCAL_COPY: Record<string, string[]> = {
  mx: [
    'La CNBV supervisa a los bancos y las casas de bolsa que operan en México. Exness no figura en ese registro: atiende a los clientes mexicanos desde Exness (SC) Ltd, con licencia de la FSA de Seychelles. La diferencia importa y conviene tenerla clara antes de abrir la cuenta, no después: ante un problema no hay un supervisor mexicano al que reclamar.',
    'México es de los mercados con más vías de ingreso del sitio. SPEI, el sistema de pagos interbancarios del Banco de México, funciona todos los días del año y liquida en minutos; OXXO permite depositar en efectivo en cualquier tienda, sin cuenta bancaria de por medio. La cuenta se lleva en dólares, así que cada ingreso pasa por una conversión MXN/USD. Desde México el volumen se concentra en USD/MXN, oro y los índices estadounidenses US30 y NAS100.',
  ],
  co: [
    'La Superintendencia Financiera de Colombia vigila a las entidades autorizadas en el país. Exness no es una de ellas: opera con Exness (SC) Ltd bajo licencia de la FSA de Seychelles. Es la distinción entre un bróker internacional y uno domiciliado, y determina qué mecanismo de reclamación tienes disponible.',
    'Colombia tiene tres vías locales y conviene saber en qué se diferencian. PSE conecta la cuenta bancaria con el comercio en línea sin salir del entorno del banco; Nequi y Daviplata son monederos móviles que funcionan con el número de teléfono y no exigen cuenta corriente. El saldo se mantiene en dólares, de modo que cada ingreso en pesos se convierte al entrar. USD/COP, oro, petróleo y el US500 concentran el interés local.',
  ],
  cl: [
    'La Comisión para el Mercado Financiero regula a los intermediarios chilenos y mantiene el registro de quienes pueden ofrecer servicios de inversión en Chile. Exness no está inscrita ahí: su entidad es Exness (SC) Ltd, con licencia de la FSA de Seychelles.',
    'El depósito se hace por transferencia bancaria local o tarjeta, y el peso se convierte a dólares al ingresar porque la cuenta es en USD. Lo distintivo de Chile es el cobre: aparece junto a USD/CLP, el oro y el US30 entre los instrumentos más seguidos, algo esperable en una economía donde el metal marca buena parte del ciclo.',
  ],
  pe: [
    'La Superintendencia del Mercado de Valores supervisa el mercado peruano. Exness no está registrada ante la SMV: atiende desde Exness (SC) Ltd con licencia de la FSA de Seychelles, en el mismo marco que el resto de brókeres internacionales que operan en la región.',
    'Transferencia bancaria local y tarjeta son las vías habituales de ingreso, con conversión de soles a dólares al depositar. El perfil peruano se inclina hacia los metales —oro y plata— junto a USD/PEN y el NAS100, un reflejo del peso que la minería tiene en la economía.',
  ],
  ar: [
    'La Comisión Nacional de Valores regula la oferta pública en Argentina. Exness opera fuera de ese registro, desde Exness (SC) Ltd con licencia de la FSA de Seychelles.',
    'Desde Argentina el ingreso se apoya en Mercado Pago, en transferencia bancaria local, en tarjeta y en USDT, que es la vía que más se usa cuando el resto se complica. La cuenta se lleva en dólares, así que el peso se convierte al entrar. El interés local se concentra en activos dolarizados —oro, US30, NAS100 y BTC/USD— más que en pares con la moneda nacional.',
  ],
  ec: [
    'Ecuador usa el dólar estadounidense como moneda de curso legal desde el año 2000, así que aquí no hay conversión de divisa al depositar: lo que ingresas es lo que queda disponible. Es una ventaja poco frecuente en la región y elimina una capa de coste que sí existe en el resto de LATAM.',
    'Exness atiende a los clientes ecuatorianos desde Exness (SC) Ltd, con licencia de la FSA de Seychelles; no hay inscripción ante un supervisor ecuatoriano. El volumen local se reparte entre oro, petróleo y el US500 — el crudo pesa por el papel que tiene en las cuentas del país.',
  ],
  ve: [
    'La cuenta se lleva en dólares, que en la práctica es también la referencia de precios en buena parte de la economía venezolana. Los ingresos se canalizan sobre todo por monederos electrónicos —Skrill y Neteller— y por USDT, que evita depender de la banca local.',
    'Exness opera con Exness (SC) Ltd bajo licencia de la FSA de Seychelles, sin registro ante un supervisor venezolano. Desde Venezuela el interés se concentra en oro, BTC/USD y el US500.',
  ],
  pa: [
    'Panamá usa el dólar estadounidense en circulación junto al balboa, que está vinculado a la par. En la práctica eso significa que no hay conversión de divisa al depositar: el ingreso entra directo a una cuenta denominada en USD.',
    'Exness atiende desde Exness (SC) Ltd con licencia de la FSA de Seychelles. La transferencia bancaria local y la tarjeta son las vías habituales de ingreso, y el volumen se reparte entre oro, US30 y NAS100.',
  ],
  sv: [
    'El Salvador dolarizó su economía en 2001, así que el depósito no pasa por conversión de divisa: entra directamente en la moneda de la cuenta. Es una de las razones por las que operar desde aquí resulta más sencillo que en la mayoría de países de la región.',
    'Exness opera con Exness (SC) Ltd y licencia de la FSA de Seychelles, sin supervisión local. Además del oro y el US30, BTC/USD tiene un seguimiento notable entre los operadores salvadoreños.',
  ],
  uy: [
    'Exness atiende a Uruguay desde Exness (SC) Ltd, con licencia de la FSA de Seychelles y sin registro ante el Banco Central del Uruguay, que es quien supervisa a los intermediarios de valores locales.',
    'La transferencia bancaria local y la tarjeta son las vías habituales, con conversión de pesos uruguayos a dólares al ingresar. Oro, US30 y EUR/USD concentran el interés.',
  ],
  cr: [
    'La supervisión del mercado de valores costarricense corresponde a la SUGEVAL. Exness no está inscrita ahí: opera desde Exness (SC) Ltd con licencia de la FSA de Seychelles.',
    'El depósito se hace con tarjeta, Skrill o USDT, y el colón se convierte a dólares al entrar. El perfil local es conservador en instrumentos: oro, US500 y EUR/USD.',
  ],
  gt: [
    'Exness atiende a Guatemala desde Exness (SC) Ltd, con licencia de la FSA de Seychelles y sin inscripción ante un supervisor guatemalteco.',
    'Tarjeta, Skrill y USDT son las vías de ingreso habituales; el quetzal se convierte a dólares al depositar. Oro, US30 y EUR/USD son los instrumentos con más seguimiento.',
  ],
  do: [
    'La Superintendencia del Mercado de Valores dominicana supervisa a los intermediarios locales. Exness opera fuera de ese registro, desde Exness (SC) Ltd con licencia de la FSA de Seychelles.',
    'El depósito entra por tarjeta, Skrill o USDT, con conversión del peso dominicano a dólares. Oro, US500 y EUR/USD concentran la operativa.',
  ],
  py: [
    'Exness atiende a Paraguay desde Exness (SC) Ltd, con licencia de la FSA de Seychelles, sin registro ante la Comisión Nacional de Valores paraguaya.',
    'Tarjeta, Skrill y USDT son las vías habituales de ingreso, con conversión del guaraní a dólares. Junto al oro y el US500, la soja tiene seguimiento propio aquí por su peso en las exportaciones del país.',
  ],
  bo: [
    'Exness opera con Exness (SC) Ltd y licencia de la FSA de Seychelles; no existe un registro boliviano que la supervise.',
    'El depósito se hace con tarjeta, Skrill o USDT, y el boliviano se convierte a dólares al ingresar. Los metales —oro y plata— junto al US30 concentran la operativa desde Bolivia.',
  ],
  hn: [
    'Exness atiende a Honduras desde Exness (SC) Ltd, con licencia de la FSA de Seychelles y sin inscripción ante la Comisión Nacional de Bancos y Seguros.',
    'Tarjeta, Skrill y USDT son las vías de depósito habituales; el lempira se convierte a dólares al entrar. Oro, US500 y EUR/USD son los instrumentos más seguidos.',
  ],
  ni: [
    'Exness opera desde Exness (SC) Ltd con licencia de la FSA de Seychelles, sin registro ante un supervisor nicaragüense.',
    'El ingreso se hace con tarjeta, Skrill o USDT, con conversión del córdoba a dólares. Oro, US500 y EUR/USD concentran el interés local.',
  ],
};

/** Párrafos propios del mercado, vacío si todavía no se ha escrito. */
export function localCopy(code: string): string[] {
  return LOCAL_COPY[code] ?? [];
}
