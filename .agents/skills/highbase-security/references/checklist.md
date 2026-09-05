# Базовый security checklist

## Данные и secrets

- [ ] В diff нет credentials, cookies и private keys.
- [ ] Logs/errors не раскрывают sensitive values.
- [ ] Client/commercial data не попали в fixtures/screenshots.
- [ ] Environment values не доступны client bundle.

## Inputs и output

- [ ] Attacker-controlled inputs определены.
- [ ] Validation выполняется на trust boundary.
- [ ] HTML/DOM output безопасно кодируется.
- [ ] Raw HTML имеет подтверждённый sanitizer/contract.
- [ ] URLs/redirects проверяются.
- [ ] File paths/uploads ограничены.

## Auth и state

- [ ] Authorization проверяется отдельно от UI visibility.
- [ ] Session/token storage обоснован.
- [ ] Side effects защищены от unintended request.
- [ ] Errors не раскрывают внутреннюю структуру.

## Dependencies

- [ ] Dependency необходима.
- [ ] Package/publisher/repository подтверждены.
- [ ] Version и lockfile проверены.
- [ ] Install scripts и transitive risk оценены.
- [ ] Advisory source проверен или отмечен недоступным.

## Tooling

- [ ] Agent permissions минимальны.
- [ ] MCP tools allowlisted.
- [ ] Filesystem/network ограничены.
- [ ] Browser profile isolated.
- [ ] Production/access config не изменены.

## Delivery

- [ ] Target revision указан.
- [ ] Findings имеют evidence/reachability.
- [ ] Human reviewer принимает findings.
- [ ] Deferred coverage указано.
- [ ] Codex Security рекомендован по необходимости.
