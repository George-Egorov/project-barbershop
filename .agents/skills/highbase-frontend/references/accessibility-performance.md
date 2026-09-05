# Accessibility и performance

## Accessibility

Проверять по изменённому scope:

- semantic structure;
- keyboard navigation;
- focus order и видимый focus;
- возврат фокуса после modal/drawer;
- accessible name у controls без текста;
- labels, descriptions и errors форм;
- disabled/loading semantics;
- heading structure в контексте страницы;
- отсутствие лишней ARIA;
- contrast и non-color indicators;
- reduced motion;
- zoom, reflow и content overflow;
- alt intent: информативное или декоративное изображение.

Не добавлять ARIA, если native HTML уже передаёт корректную семантику.

## Практическая проверка

1. Пройти сценарий только keyboard.
2. Проверить focus после открытия/закрытия overlay.
3. Проверить accessible tree разрешённым browser tool.
4. Проверить error announcement формы.
5. Проверить 200% zoom и narrow viewport по применимости.
6. Зафиксировать ручные проверки отдельно от automated.

## Performance

Проверять:

- новую dependency и bundle impact;
- duplicate network requests;
- лишние rerenders и expensive calculations;
- images: format, dimensions, loading и responsive source;
- fonts и blocking resources;
- DOM size и frequency updates;
- cache/data-fetch behavior;
- third-party scripts;
- event listeners и cleanup;
- large client components в Next.js.

## Evidence

Не писать «оптимизировано» без доказательства. Использовать подходящее evidence:

- before/after metric;
- bundle diff;
- network trace;
- render count;
- reproducible user scenario;
- browser performance profile.

Если measurement tool недоступен, сформулировать ожидаемый эффект как hypothesis и указать нужную проверку.

## Ограничения

- Не ухудшать accessibility ради метрики.
- Не добавлять complexity без измеряемой проблемы.
- Не принимать screenshot за accessibility test.
- Не публиковать trace с cookies, tokens или client data.
