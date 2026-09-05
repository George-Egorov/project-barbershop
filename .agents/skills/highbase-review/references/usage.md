# Использование Highbase Review

## Позитивные запросы

- «Используй `$highbase-review` для review diff `origin/develop...HEAD`».
- «Проверь uncommitted changes на regression и нарушение стандартов Highbase».
- «Проведи review Pull Request, но не исправляй код».
- «Проверь performance и accessibility изменения модального окна».

## Неоднозначный target

Если запрос «проверь изменения» не определяет target:

1. проверить working tree и текущую branch;
2. перечислить доступные варианты;
3. выбрать target только при однозначном контексте;
4. иначе запросить base/head.

Не смешивать uncommitted diff и branch range без явного указания.

## Формат ответа

Сначала findings по приоритету:

    [P1] Короткий заголовок
    Файл: path/to/file.ts:42
    Проблема: ...
    Сценарий: ...
    Влияние: ...
    Рекомендация: ...

Затем:

    Questions:
    - ...

    Reviewed:
    - changed files / supporting surfaces.

    Deferred:
    - что не проверено и почему.

    Validation:
    - запущенные команды и результаты.

    Human review:
    - AI-review не заменяет кросс-ревью и approval.

## Clean review

Если подтверждённых findings нет, написать:

    Подтверждённых findings не найдено.

После этого перечислить scope, выполненные проверки и residual risks. Не заполнять ответ искусственными замечаниями.
