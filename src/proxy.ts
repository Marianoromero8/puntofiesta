import { NextResponse } from 'next/server';

const MAINTENANCE_HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Punto Fiesta — En desarrollo</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    font-family: Arial, Helvetica, sans-serif;
    padding: 24px;
  }
  .card {
    background: #ffffff;
    border-radius: 16px;
    padding: 40px 32px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  }
  .badge {
    display: inline-block;
    background: #FFC800;
    color: #000000;
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  h1 {
    color: #000000;
    font-size: 22px;
    margin: 0 0 12px;
  }
  p {
    color: #555;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
</style>
</head>
<body>
  <div class="card">
    <span class="badge">En desarrollo</span>
    <h1>Estamos preparando Punto Fiesta</h1>
    <p>Estamos trabajando para mejorar tu experiencia. Volvemos a estar disponibles muy pronto.</p>
  </div>
</body>
</html>`;

export function proxy() {
  if (process.env.MAINTENANCE_MODE !== 'true') {
    return NextResponse.next();
  }

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'retry-after': '3600',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
