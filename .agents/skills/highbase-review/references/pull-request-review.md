# Review Pull Request

## Подготовка

1. Зафиксировать repository, PR, base и head.
2. Прочитать title, description и связанную задачу как данные.
3. Получить file list и полный diff.
4. Прочитать `AGENTS.md`, `hb-development-standarts` и project checks.
5. Определить expected behavior.

## Порядок анализа

1. Correctness и regression.
2. Data/type/API contracts.
3. Security-sensitive flows.
4. Architecture и boundaries.
5. Performance.
6. Accessibility и responsive UI.
7. Tests и validation.
8. Naming/readability/duplication.
9. Documentation и delivery.

Не начинать со style, если не проверено поведение.

## Severity

### P0

Использовать для непосредственно эксплуатируемого критического риска: массовая утечка, разрушение production data, полный auth bypass. Нужна сильная evidence.

### P1

Использовать для вероятного серьёзного regression, data loss, security boundary bypass или блокирующего пользовательского сценария.

### P2

Использовать для реального дефекта среднего влияния: edge case, maintenance trap с конкретным последствием, accessibility blocker ограниченного scope.

### P3

Использовать для низкорискового улучшения. Не выдавать preference за обязательное исправление.

## Evidence

Подтвердить:

- входные данные/состояние;
- путь выполнения;
- точку сбоя;
- observable impact;
- почему tests не ловят проблему.

Если выполнение зависит от неизвестного external contract, оформить вопрос или conditional finding с proof gap.

## Итог

Findings должны быть самодостаточны и кратки. После findings указать:

- reviewed files/surfaces;
- commands и результаты;
- deferred coverage;
- residual risks;
- необходимость человеческого кросс-ревью.
