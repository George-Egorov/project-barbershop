# Антипаттерны security review

## Secrets

- Печатать найденный token для доказательства.
- Отправлять secret внешнему API для проверки.
- Считать masking полноценной защитой.
- Удалять secret из последнего commit без ротации.
- Хранить storage state/browser profile в repository.

## Findings

- Объявлять vulnerability без source-to-sink path.
- Завышать severity без reachability.
- Выдавать generic best practice за defect.
- Скрывать proof gap.
- Предлагать переписать всю систему вместо bounded remediation.

## Dependencies

- Устанавливать «безопасную альтернативу» без review.
- Доверять package только по имени.
- Игнорировать lockfile/install scripts.
- Запускать автоматический fix с major updates.
- Считать отсутствие advisory доказательством безопасности.

## Права агента

- Отключать sandbox.
- Использовать unrestricted filesystem/network.
- Подключать личный browser profile.
- Делать merge/force push/branch deletion.
- Менять production, access rights или secrets.
- Выполнять exploit против внешней/production системы.

## Git и disclosure

- Публиковать finding в public issue до согласования.
- Добавлять secret в PR description.
- Исправлять все findings одним большим patch.
- Выполнять commit/push без прямого запроса.
- Считать AI scan заменой human review.
