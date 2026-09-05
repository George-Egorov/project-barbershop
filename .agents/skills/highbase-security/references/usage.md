# Использование Highbase Security

## Позитивные запросы

- «Используй `$highbase-security` для проверки текущего diff перед PR».
- «Проверь, не попали ли в изменение tokens или API keys».
- «Оцени новую npm dependency и связанные риски».
- «Проверь изменение raw HTML и redirects».
- «Подготовь threat-model guidance для Codex Security».

## Scope

Предпочитать:

- конкретный diff;
- один component/service boundary;
- конкретный data flow;
- dependency change;
- MCP configuration.

Не начинать с полного monorepo scan, если задачу можно проверить ограниченно.

## Формат finding

    [P1] Заголовок
    Location: path:line
    Asset/control:
    Attacker-controlled input:
    Sink:
    Reachability:
    Impact:
    Evidence:
    Proof gaps:
    Remediation:
    Re-validation:

Не включать secret value, exploit payload против production или лишние client data.

## Итоговый отчёт

После findings указать:

- target revision;
- threat model summary;
- reviewed surfaces;
- deferred coverage;
- dependency/advisory sources;
- tests/tools и результаты;
- рекомендацию Codex Security;
- необходимость human acceptance.

## Реальный secret

1. Не копировать значение.
2. Указать тип и location безопасным способом.
3. Остановить распространение.
4. Сообщить владельцу по incident process.
5. Рекомендовать ротацию.
6. Не считать удаление строки достаточным исправлением.
