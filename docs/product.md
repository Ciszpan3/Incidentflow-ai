# IncidentFlow AI

## User
Operations engineer responsible for several web services.

## Core flow
1. Monitoring webhook creates an alert.
2. Alert opens or updates an incident.
3. Operator adds timeline events and changes severity/status.
4. AI summarizes evidence and retrieves a relevant runbook.
5. Human approves evere optional action.

## Out of scope
 - executing shell commands on production systems
 - autonomous remediation
 - billing and multi-region deployment