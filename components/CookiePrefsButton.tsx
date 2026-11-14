'use client';

export default function CookiePrefsButton() {
  return (
    <button type="button" className="link" onClick={() => window.dispatchEvent(new Event('w2:cookie-prefs'))}>
      Preferências de cookies
    </button>
  );
}
