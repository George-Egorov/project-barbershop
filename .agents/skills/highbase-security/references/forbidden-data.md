# Запрещённые данные

## Никогда не передавать AI/MCP

- passwords;
- access/refresh tokens;
- API keys;
- private keys и certificates;
- recovery codes и seed phrases;
- `.env` contents;
- production connection strings;
- cookies и browser storage;
- personal browser profile;
- production database dumps;
- персональные данные клиентов;
- платежные данные;
- закрытые договоры и коммерческие условия без разрешения;
- private source/design, запрещённые договором;
- security findings до разрешённого disclosure.

## Разрешённая замена

- Использовать имя environment variable вместо значения.
- Заменять real data synthetic mock.
- Оставлять только минимальный обезличенный log excerpt.
- Маскировать identifier так, чтобы нельзя было восстановить значение.
- Описывать secret как «API token обнаружен в path:line», не цитируя его.

## Логи и screenshots

Проверить:

- request headers;
- query parameters;
- cookies;
- local/session storage;
- user names/email/phones;
- internal URLs;
- file paths с персональными именами;
- terminal history;
- browser tabs и notifications.

## Если данные уже раскрыты

1. Прекратить передачу.
2. Не повторять значение в сообщении.
3. Зафиксировать tool, time и scope.
4. Уведомить owner/Security/DevOps по внутреннему каналу.
5. Ротировать credential.
6. Проверить history/logs/destinations.
7. Добавить preventive control после review.

Удаление сообщения или commit не отменяет возможное раскрытие.
