 EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title, severity, status, "updatedAt"
FROM "Incident"
WHERE "organizationId" = 'ORG_UUID' AND status = 'OPEN'
ORDER BY "updatedAt" DESC, id DESC
LIMIT 20;

-- Indeks dla wariantu z filtrem status:
CREATE INDEX incident_org_status_updated_id_idx
ON "Incident" ("organizationId", status, "updatedAt" DESC, id DESC);

-- Gdy status nie jest filtrem, zmierz osobno indeks:
-- ("organizationId", "updatedAt" DESC, id DESC)
