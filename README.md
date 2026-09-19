# InfoFynd – Drivs av Bock AB

![Deployed on Azure](https://img.shields.io/badge/deployed-Azure-0089D6?logo=microsoft-azure)

## Sammanfattning & Syfte

InfoFynd är en fullstack-webbapplikation byggd i React och Express med SQLite som databas. Syftet med applikationen är att fungera som en samlingsplats för konsumenttips, erbjudanden och information, där besökare kan ta del av publicerat innehåll och ansöka om medlemskap.

Applikationen har en säker administrationsdel där administratörer har tillgång till fullständiga CRUD-operationer för medlemmar och inlägg. Systemet har dessutom stöd för rollbaserad behörighet där en **Super Admin** kan hantera övriga administratörskonton.

Målet med projektet är att demonstrera en komplett CRUD-arkitektur, användarhantering, säker autentisering med JWT och bcrypt samt god databashantering enligt kursens krav.

---

## Projektstruktur

Projektet är uppdelat i en tydlig klient-server-arkitektur med separata mappar för frontend (`client`) och backend (`server`):

### 📁 Client (`/client`)

```text
client/
├── public/
│   ├── favicon/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/       # Återanvändbara UI-komponenter (Admin, Forms, Posts, Navbar etc.)
│   ├── pages/            # Sidkomponenter och vyer (Home, Admin, About, Archive etc.)
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── package.json
```

### 📁 Server (`/server`)

```text
server/
├── src/
│   ├── data/             # Databasfiler och seed-skript (SQLite)
│   ├── middlewares/      # Säkerhetsfilter (t.ex. JWT-verifiering)
│   ├── routes/           # API-rutter (admin, auth, members, posts)
│   ├── services/         # Affärslogik och databasanrop
│   └── server.js         # Applikationens startpunkt
├── .env                  # Miljövariabler
└── package.json
```

---

## Funktionalitet

### Publik del (Klient)

- **Start-/flödessida:** Visar publicerade tips och erbjudanden indelade i kategorier.
- **Medlemsansökan:** Ett formulär där besökare kan ansöka om medlemskap (namn, e-post och GDPR-godkännande).
- **GDPR-information:** Tydlig presentation av hur användarens data sparas och hanteras.

**Startsida (ljust och mörkt tema):**

<table>
<tr>
<td><img width="400" alt="InfoFynd startsida - ljust tema" src="https://github.com/user-attachments/assets/c3453558-921a-41ab-9c82-a4caefab54c7" /></td>
<td><img width="400" alt="InfoFynd startsida - mörkt tema" src="https://github.com/user-attachments/assets/8ad6d7a0-9048-4e72-a892-93f004670296" /></td>
</tr>
</table>

### Administrationsdel (Skyddat läge)

- **Inloggning:** Säker autentisering för administratörer med hashade lösenord via `bcrypt` och skyddade rutter med `JWT` (JSON Web Tokens), med sessionhantering via `sessionStorage`.
- **Demokonto:** Integrerat demokonto med begränsade skrivrättigheter ("bälte och livrem"-säkerhet i både frontend och backend).
- **Hantera medlemsansökningar:** Gränssnitt för admin att granska, godkänna eller neka inkomna medlemsansökningar.
- **Hantera inlägg (CRUD):** Fullständigt stöd för att skapa, redigera, läsa och radera tips och erbjudanden.
  - Vid skapande av nytt inlägg simuleras ett epostutskick via modal.
- **Admin-konton (Super Admin):** Möjlighet för Super Admin att skapa, lista, avstänga/aktivera och radera andra administratörskonton.

**Admin demo vy och superadmin vy**

<table>
<tr>
<td><img width="400" alt="Admin demokonto vy" src="https://github.com/user-attachments/assets/943d2809-796e-40b5-8d38-59d33518126b" /></td>
<td><img width="400" alt="Superadmin vy" src="https://github.com/user-attachments/assets/818c885b-858b-43c0-b355-2dde9d225ef0" /></td>
</tr>
</table>

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

2. **Konfigurera miljövariabler:**
   - Skapa en `.env`-fil i `server`-mappen.
   - Filen bör följa strukturen i `.env.example`:
     ```env
     PORT=3000
     JWT_SECRET=din_hemliga_jwt_nyckel_här
     ```

3. **Starta servern:**
   - Navigera till servermappen:
     ```bash
     cd server
     ```
   - Installera beroenden:
     ```bash
     npm install
     ```
   - Starta servern:
     ```bash
     npm run dev
     ```

4. **Starta klienten:**
   - Navigera till klientmappen:
     ```bash
     cd client
     ```
   - Installera beroenden:
     ```bash
     npm install
     ```
   - Starta klienten:
     ```bash
     npm run dev
     ```

   ## Om projektet

   Detta är ett skolprojekt utvecklat som del av kursen JavaScript 2. Inte avsett för produktionsanvändning.
