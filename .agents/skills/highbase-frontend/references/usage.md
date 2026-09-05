# Использование Highbase Frontend

## Цель

Применять Skill к ограниченной Frontend-задаче и возвращать проверяемый результат.

## Позитивные запросы

- «Используй `$highbase-frontend`, чтобы сверстать карточку по Figma в текущем Next.js-проекте».
- «Исправь адаптив секции, не меняя types и mocks».
- «Добавь обработку error state в AJAX-форму по стандарту Highbase».
- «Создай React component в существующей структуре и добавь Storybook story, если Storybook настроен».
- «Проверь и исправь keyboard focus в модальном окне».

## Запросы для другого Skill

- «Проверь Pull Request и перечисли ошибки» → `highbase-review`.
- «Подготовь README» → `highbase-documentation`.
- «Проверь утечку token» → `highbase-security`.
- «Предложи commit message» → `highbase-git-branching`.

## Context pack

Перед работой собрать:

    Goal:
    Done when:
    Repository / scope:
    Design / specification:
    Allowed files:
    Forbidden changes:
    Validation commands:
    Known risks:

Не запрашивать весь repository, если достаточно конкретного component и его dependencies.

## Выбор stack

- Для Next.js подтвердить router, server/client boundaries и data fetching.
- Для React без Next.js подтвердить bundler, routing и state pattern.
- Для Bitrix/Nunjucks открыть `bitrix-mock-data-contract.md`.
- Для WordPress использовать только фактические project conventions; не переносить Next.js rules.
- Для неизвестного stack сначала исследовать config и сообщить результат.

## Формат результата

    Результат:
    - что изменено;
    - зачем;
    - затронутые файлы.

    Проверка:
    - команда — результат;
    - browser/visual scenario — результат.

    Предположения:
    - только реально сделанные assumptions.

    Ограничения:
    - что не проверено и почему.

    Риски:
    - остаточные риски и следующий безопасный шаг.

Не скрывать failed command. Привести короткий error и отделить дефект изменения от проблемы окружения.
