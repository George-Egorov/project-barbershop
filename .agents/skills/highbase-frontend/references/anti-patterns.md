# Антипаттерны Frontend Skill

## Источники и scope

- Придумывать «стандарт Highbase», которого нет в `hb-development-standarts`.
- Копировать project rules из `Agents.zip` во все repositories.
- Читать весь documentation tree без связи с задачей.
- Игнорировать ближайший `AGENTS.md`.
- Смешивать несколько задач в одном diff.

## Архитектура

- Создавать второй component, не найдя существующий.
- Добавлять abstraction ради гипотетического reuse.
- Совмещать UI, requests, formatting и state в одной сущности без причины.
- Создавать новую directory convention в одном файле.
- Перемещать unrelated code «для порядка».

## Верстка и стили

- Восстанавливать точные размеры только по screenshot при доступном design context.
- Использовать absolute positioning вместо layout без design-причины.
- Дублировать reset/base styles.
- Хардкодить повторяемые tokens.
- Переносить Figma-generated CSS механически.
- Использовать `!important` как первое решение.

## Types и data

- Добавлять optional/required fields по догадке.
- Возвращать удалённый пользователем field.
- Использовать `any`, чтобы скрыть mismatch.
- Редактировать generated data/cache вручную.
- Смешивать content и markup при наличии data layer.

## React и Next.js

- Добавлять `use client` без понимания boundary.
- Копировать state в нескольких источниках.
- Оставлять async effect без cleanup.
- Создавать context/global state для локальной задачи.
- Предполагать App Router или Pages Router по памяти.

## Проверка

- Объявлять готовность после одного `lint`.
- Игнорировать failed test как «не относящийся» без evidence.
- Не проверять UI в browser.
- Публиковать screenshots с клиентскими данными.
- Выполнять commit/push/merge как побочный эффект реализации.
