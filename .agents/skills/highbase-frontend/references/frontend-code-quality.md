# Качество Frontend-кода Highbase

## Канонические источники

Сначала читать соответствующий файл в `hb-development-standarts`:

- `README.md`;
- `docs/code-naming-and-style.md`;
- `docs/ajax-forms-toast-ecommerce.md`;
- `docs/bitrix-mock-data-contract.md`;
- `docs/ci-cd.md`.

Этот reference задаёт маршрут проверки и не заменяет исходные документы.

## Верстка

- Использовать BEM там, где он принят стандартом проекта.
- Выбирать понятную hierarchy и semantic elements.
- Не добавлять wrapper без layout/semantic функции.
- Подключать images/icons по project convention.
- Учитывать content variation и interaction states.

## SCSS

- Проверить existing reset, base, layers и tokens.
- Использовать понятные semantic names.
- Брать breakpoints и media pattern из проекта.
- Ограничивать nesting и specificity.
- Не дублировать declarations между components без анализа reuse.

## JavaScript

- Давать variables/functions имена по назначению.
- Делать side effects видимыми.
- Разделять fetching, transformation и UI update.
- Обрабатывать failed request и invalid response.
- Следовать Highbase AJAX JSON contract, если он применим.

## TypeScript

- Использовать существующие domain types.
- Сохранять required/optional semantics.
- Вкладывать object только для отдельной сущности.
- Не выносить одноразовую мелкую структуру без пользы.
- Применять project JSDoc, включая `@backend` для соответствующего Bitrix contract.

## React

- Сохранять component с одной понятной responsibility.
- Переиспользовать UI library проекта.
- Не дублировать derived state.
- Проверять effect cleanup и dependency semantics.
- Добавлять stories/tests только по фактическому project pattern.

## Next.js

- Определить router и rendering model.
- Соблюдать server/client component boundaries.
- Проверить caching/data fetching по используемой version.
- Не переносить универсальные paths из другого Next.js repository.
- Проверить build, route и hydration behavior.

## Структура компонентов

- Размещать files рядом с ответственностью.
- Следовать текущему naming.
- Не создавать параллельную directory tree.
- Документировать только неочевидный public contract.

## Адаптив

- Начинать от фактической mobile/desktop strategy.
- Проверять согласованные viewports и промежуточную ширину.
- Тестировать overflow, wrapping, order и touch states.
- Не считать один desktop screenshot полным responsive contract.

## Чистота

- Удалять созданный dead/debug code.
- Избегать vague names и hidden magic values.
- Не включать unrelated formatting.
- Оставлять код понятным следующему разработчику без истории thread.
