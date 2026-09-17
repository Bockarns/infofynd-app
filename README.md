# InfoFynd – Drivs av Bock AB
![Deployed on Azure](https://img.shields.io/badge/deployed-Azure-0089D6?logo=microsoft-azure)

## Sammanfattning & Syfte

InfoFynd är en fullstack-webbapplikation byggd i React och Express med SQLite som databas[cite: 1]. Syftet med applikationen är att fungera som en samlingsplats för konsumenttips, erbjudanden och information, där besökare kan ta del av publicerat innehåll och ansöka om medlemskap.

Applikationen har en säker administrationsdel där administratörer har tillgång till fullständiga CRUD-operationer för medlemmar och inlägg. Systemet har dessutom stöd för rollbaserad behörighet där en **Super Admin** kan hantera övriga administratörskonton.

Målet med projektet är att demonstrera en komplett CRUD-arkitektur, användarhantering, säker autentisering med JWT och bcrypt samt god databashantering enligt kursens krav.

---

## Funktionalitet

### Publik del (Klient)

- **Start-/flödessida:** Visar publicerade tips och erbjudanden indelade i kategorier.
- **Medlemsansökan:** Ett formulär där besökare kan ansöka om medlemskap (namn, e-post och GDPR-godkännande).
- **GDPR-information:** Tydlig presentation av hur användarens data sparas och hanteras.

### Administrationsdel (Skyddat läge)

- **Inloggning:** Säker autentisering för administratörer med hashade lösenord via `bcrypt` och skyddade rutter med `JWT` (JSON Web Tokens), med sessionhantering via `sessionStorage`.
- **Demokonto:** Integrerat demokonto med begränsade skrivrättigheter ("bälte och livrem"-säkerhet i både frontend och backend).
- **Hantera medlemsansökningar:** Gränssnitt för admin att granska, godkänna eller neka inkomna medlemsansökningar.
- **Hantera inlägg (CRUD):** Fullständigt stöd för att skapa, redigera, läsa och radera tips och erbjudanden.
  - Vid skapande av nytt inlägg simuleras ett epostutskick via modal.
- **Admin-konton (Super Admin):** Möjlighet för Super Admin att skapa, lista, avstänga/aktivera och radera andra administratörskonton.

---

## Teknisk arkitektur

- **Frontend:** React (Vite) med Tailwind CSS.
- **Backend:** Node.js och Express (REST API).
- **Databas:** SQLite med `better-sqlite3`.
- **Säkerhet:** Lösenordshashning med `bcrypt` samt token-baserad autentisering med `jsonwebtoken`.

---

## Databasstruktur

- **Nyheter / Erbjudanden (`posts`)**
  - Kolumner: `id`, `type` ("news" / "offer"), `title`, `description`, `censoredDescription`, `imageUrl`, `discountCode`, `discountAmount`, `discountType`, `archived`, `createdAt`, `createdBy`
- **Medlemmar (`members`)**
  - Kolumner: `id`, `firstName`, `lastName`, `email`, `approveGDPR`, `gdprConsentAt`, `status` ("pending", "approved", "denied"), `gdprRequest` ("none", "export", "delete"), `createdAt`, `approvedBy`
- **Administratörer (`admins`)**
  - Kolumner: `id`, `firstName`, `lastName`, `password`, `email`, `superAdmin`, `suspendedAccount`, `isDemo`, `createdAt`

---

## Installation och körning

Följ dessa steg för att köra projektet lokalt:

1. **Klona eller ladda ner projektet.**
2. **Starta servern:**
   - Navigera till servermappen:

   ```
   cd server
   ```

   - Installera beroenden:

   ```
   npm install
   ```

   - Starta servern:

   ```
   npm run dev
   ```

3. **Starta klienten:**
   - Navigera till klientmappen:

   ```
   cd client
   ```

   - Installera beroenden:

   ```
   npm install
   ```

   - Starta klienten:

   ```
   npm run dev
   ```
