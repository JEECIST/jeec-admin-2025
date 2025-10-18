// sw.js
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let raw = '';
    let data = {};

    if (event.data) {
      try {
        raw = event.data.text();
        console.log('[SW] push raw payload:', raw);
      } catch (e) {
        console.error('[SW] erro a ler event.data.text():', e);
      }

      // tenta parsear como JSON; se falhar, usa o texto como body
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        console.warn('[SW] payload não é JSON. A usar como body.');
        data = { body: raw };
      }
    } else {
      console.warn('[SW] push sem event.data');
    }

    // aceita tanto {payload:{...}} como {...} direto
    const p = data.payload || data;

    const title = p.title || 'Notification';
    const options = {
      body: p.body ?? p.message ?? 'You have a new message!',
    };

    console.log('[SW] push parsed payload:', p);
    console.log('[SW] a mostrar notificação:', { title, options });

    await self.registration.showNotification(title, options);
  })());
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] notification click:', event.notification);
  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (all.length) {
      console.log('[SW] focar e navegar janela existente para:', url);
      await all[0].focus();
      try { await all[0].navigate(url); } catch {}
      return;
    }
    console.log('[SW] abrir nova janela em:', url);
    await clients.openWindow(url);
  })());
});
