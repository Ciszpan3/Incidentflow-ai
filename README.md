# IncidentFlow AI

**Nowoczesna platforma do zarządzania incydentami IT, która pomaga zespołom szybciej reagować na awarie, organizować pracę i wyciągać wnioski z problemów produkcyjnych.**

IncidentFlow AI łączy zarządzanie incydentami, monitorowanie usług i rozwiązania wspierane przez sztuczną inteligencję w jednym miejscu — od zgłoszenia problemu aż po jego rozwiązanie.

>  **Projekt w trakcie rozwoju** — aplikacja tworzona jako pełny system full-stack.

## Funkcjonalności

- **Zarządzanie incydentami** — tworzenie, przeglądanie i aktualizowanie zgłoszeń z podziałem na priorytety oraz statusy.
- **Organizacja usług** — przypisywanie incydentów do konkretnych usług i systemów.
- **Panel incydentów** — filtrowanie, przeglądanie i zarządzanie zgłoszeniami z poziomu interfejsu webowego.
- **Uwierzytelnianie użytkowników** — bezpieczne logowanie i przypisywanie użytkowników do organizacji.
- **Wsparcie AI (planowane)** — automatyczne podsumowania incydentów, pomoc w analizie przyczyn awarii oraz przygotowywaniu raportów po incydentach.

## Technologie

| Frontend | Backend | Baza danych i narzędzia |
|---|---|---|
| React, TypeScript | Node.js, Express | PostgreSQL |
| Vite, React Router | Prisma ORM | Docker |
| TanStack Query | Zod | Vitest |
| React Hook Form | JWT, bcryptjs | Git |

## Uruchomienie lokalne

### Wymagania

- Node.js i npm
- Docker Desktop z obsługą Docker Compose

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/YOUR_USERNAME/IncidentFlow-ai.git
cd IncidentFlow-ai
```

### 2. Uruchom bazę danych

```bash
docker compose up -d
```

### 3. Skonfiguruj backend

```bash
cd apps/api
npm install
```

Utwórz plik `.env` na podstawie `.env.example` i ustaw wymagane zmienne środowiskowe, w tym `DATABASE_URL` oraz `SESSION_SECRET`.

### 4. Przygotuj bazę danych

```bash
npx prisma migrate dev
npx prisma generate
```

Utwórz początkową organizację w bazie danych. Następnie możesz dodać użytkownika demonstracyjnego:

```bash
npx tsx prisma/seed.ts
```

Przed uruchomieniem seeda ustaw zmienną `DEMO_PASSWORD`.

### 5. Uruchom aplikację

**Backend** — w katalogu `apps/api`:

```bash
npm run dev
```

**Frontend** — w osobnym terminalu, z głównego katalogu projektu:

```bash
cd apps/web
npm install
npm run dev
```

Skonfiguruj zmienną `VITE_API_URL`, aby frontend komunikował się z backendem.

## Cel projektu

Celem IncidentFlow AI jest uproszczenie procesu reagowania na incydenty IT poprzez połączenie **przejrzystego zarządzania zgłoszeniami, organizacji usług i inteligentnej automatyzacji**.

Projekt rozwijany jest z myślą o stworzeniu praktycznego narzędzia, które pozwoli zespołom technicznym poświęcać mniej czasu na koordynację awarii, a więcej na ich skuteczne rozwiązywanie.

---

**Projekt rozwijany z wykorzystaniem React, TypeScript, Express, Prisma i PostgreSQL.**
