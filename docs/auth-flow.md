1. User + passwordHash w Prisma; migration i seed.
2. bcryptjs, jsonwebtoken, cookie-parser; SESSION_SECRET.
3. signSession/verifySession + walidacja claims przez Zod.
4. POST /api/v1/auth/login porównuje hash i ustawia cookie.
5. requireAuth weryfikuje cookie i tworzy res.locals.auth.
6. incidentsRouter jest montowany za requireAuth.
7. Każde repository query filtruje organizationId z sesji.

Authentication: kim jesteś?
Authorization: czy masz prawo do tego konkretnego zasobu?
Cookie HttpOnly: JS go nie czyta; nadal potrzebujesz SameSite/CSRF i HTTPS.