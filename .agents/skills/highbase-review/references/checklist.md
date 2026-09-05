# Чеклист review

## Scope

- [ ] Repository и revision подтверждены.
- [ ] Цель Pull Request понятна.
- [ ] Diff ограничен одной задачей.
- [ ] `AGENTS.md` и стандарты прочитаны.

## Correctness

- [ ] Happy path работает.
- [ ] Error/empty/loading/disabled states учтены.
- [ ] Boundary values и null/optional обработаны.
- [ ] Async cleanup/race проверены.
- [ ] Existing behavior не сломано.

## Architecture и качество

- [ ] Responsibility разделена понятно.
- [ ] File placement соответствует проекту.
- [ ] Нет необоснованной abstraction.
- [ ] Нет дублирования существующего component/utility.
- [ ] Names раскрывают назначение.
- [ ] Dead/debug code отсутствует.

## Frontend

- [ ] Responsive behavior согласован.
- [ ] Content overflow проверен.
- [ ] Keyboard/focus/accessible name проверены.
- [ ] Performance impact оценён.
- [ ] Browser console/network не показывают новую ошибку.

## Contracts

- [ ] Types соответствуют реальным данным.
- [ ] API/data contract не изменён скрыто.
- [ ] Highbase AJAX/Bitrix rules применены по stack.
- [ ] Generated files не изменены вручную.

## Delivery

- [ ] Tests проверяют значимое поведение.
- [ ] Lint/typecheck/build results доступны.
- [ ] Docs обновлены при изменении contract.
- [ ] В diff нет secrets.
- [ ] PR содержит evidence и risks.
- [ ] Человеческое кросс-ревью обязательно.
