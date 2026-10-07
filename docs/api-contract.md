# Incidents API

## GET /api/v1/health
- 200 { "status": "ok" }

## POST /api/v1/incidents
Content-Type: application/json
Body: { "title": string, "serviceId": UUID, "severity": "SEV1"|"SEV2"|"SEV3" }
- 201: tymczasowy incident JSON (bez zapisu do bazy)
- 400: body nie jest poprawnym JSON-em — błąd parsera Express
- 422: JSON jest poprawny, ale nie przechodzi createIncidentSchema

- test w drugim terminalu
curl -i http://localhost:4000/api/v1/health
curl -i -X POST http://localhost:4000/api/v1/incidents ^
-H "Content-Type: application/json" ^
-d "{"title":"API
500","serviceId":"00000000-0000-4000-8000-000000000001","severity":"SEV2"}"

Można również użyć aplikacji postman i w body ustawic raw JSON i podać np.:
{"title":"API
500","serviceId":"00000000-0000-4000-8000-000000000001","severity":"SEV2"}