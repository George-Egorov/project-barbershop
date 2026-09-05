# Чеклист Frontend-реализации

## Перед изменением

- [ ] Прочитать ближайший `AGENTS.md`.
- [ ] Определить stack, versions и project commands.
- [ ] Найти `hb-development-standarts` и релевантный документ.
- [ ] Проверить working tree и чужие изменения.
- [ ] Найти существующие components, styles, tokens и utilities.
- [ ] Подтвердить design/spec и states.
- [ ] Подтвердить, разрешено ли менять types/mocks/API.
- [ ] Определить scope и out-of-scope.

## Верстка и структура

- [ ] Использовать semantic element по контексту.
- [ ] Не добавлять лишние wrappers.
- [ ] Соблюдать применимый BEM/naming.
- [ ] Сохранять component responsibility.
- [ ] Проверить длинный, пустой и ошибочный content.
- [ ] Реализовать agreed responsive behavior.
- [ ] Переиспользовать assets и code components.

## SCSS

- [ ] Проверить reset/base/layers.
- [ ] Использовать существующие variables/tokens.
- [ ] Взять breakpoints из проекта.
- [ ] Не дублировать base rules.
- [ ] Обосновать `!important`.
- [ ] Проверить hover/touch behavior.

## JS/TS/React/Next.js

- [ ] Сохранить понятные names и boundaries.
- [ ] Не использовать `any` без причины.
- [ ] Не добавить field/state «на будущее».
- [ ] Проверить cleanup и async race.
- [ ] Подтвердить server/client boundary.
- [ ] Проверить loading/error/success/disabled.
- [ ] Не добавить dependency без согласования.

## Проверка

- [ ] Запустить применимые lint/typecheck/tests/build.
- [ ] Проверить browser console.
- [ ] Проверить целевые viewports.
- [ ] Проверить keyboard/focus.
- [ ] Проверить network/error scenario по применимости.
- [ ] Просмотреть полный diff.
- [ ] Удалить debug/dead/unrelated changes.
- [ ] Проверить отсутствие secrets.
- [ ] Подготовить evidence и residual risks.
