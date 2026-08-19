/// <reference types="astro/client" />

/**
 * Helpers de analítica que Base.astro define antes de cualquier interacción,
 * para que ningún clic se pierda mientras el consentimiento sigue pendiente.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    xmTrack?: (event: string, params?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  }
}

export {};
