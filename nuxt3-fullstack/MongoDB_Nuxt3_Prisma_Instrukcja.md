# Instrukcja podłączenia MongoDB do Nuxt3 + Prisma

## 1. Instalacja Prisma i sterownika MongoDB

```bash
npm install prisma @prisma/client
```

---

## 2. Konfiguracja Prisma do pracy z MongoDB

Otwórz plik `server/database/schema.prisma` i ustaw provider na MongoDB:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

---

## 3. Dodanie połączenia do MongoDB w pliku `.env`

W pliku `.env` dodaj:

```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
```

Zmień `<username>`, `<password>`, `<cluster-url>`, `<database>` na swoje dane z MongoDB Atlas lub lokalnej instancji.

---

## 4. Definiowanie modeli w Prisma

Przykład modelu użytkownika:

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @test.ObjectId
  email String @unique
  name  String?
}
```

---

## 5. Generowanie klienta Prisma

Uruchom:

```bash
npx prisma generate
```

---

## 6. Użycie Prisma w kodzie

W pliku `server/database/client.ts`:

```ts
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()
```

Przykład użycia w API:

```ts
import { prisma } from '../database/client'

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return users
})
```

---

## 7. Migracje

Prisma nie wspiera migracji dla MongoDB – kolekcje tworzą się automatycznie na podstawie modeli.

---

**W razie problemów sprawdź plik `schema.prisma` oraz konfigurację `.env`.**