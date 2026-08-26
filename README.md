# Projektidé: InfoFynd – Drivs av Bock AB

## Sammanfattning & Syfte

InfoFynd är en fullstack-webbapplikation byggd i React och Express med SQLite som databas. Syftet med applikationen är att fungera som en samlingsplats för konsumenttips, erbjudanden och information, där besökare kan ta del av delvist publicerat innehåll och ansöka om medlemskap för att få tillgång till fullständiga.

Admin ska logga in och ha tillgång till CRUD operationer för medlemmar, nyheter, erbjudanden osv.
SuperAdmin ska även ha CRUD över admins.

Målet med projektet är att demonstrera en komplett CRUD-arkitektur, användarhantering, säker autentisering och god databashantering enligt kursens krav.

---

## Planerad funktionalitet

### Publik del (Klient)

- **Start-/flödessida:** Visar delvis censurerade publicerade tips och erbjudanden indelade i kategorier.
- **Medlemsansökan:** Ett formulär där besökare kan ansöka om medlemskap (namn, e-post och GDPR-godkännande).
- **GDPR-information:** Tydlig presentation av hur användarens data sparas och hanteras.

### Administrationsdel (Skyddat läge)

- **Inloggning:** Säker autentisering och "hashade lösenord" detta måste jag undersöka mer om. bcrypt och jwt(JsonWebTokens). (npm i bcrypt jsonwebtoken) i server mapp
- **Hantera medlemsansökningar:** Gränssnitt för admin att granska, godkänna eller neka inkomna ansökningar.
- **Hantera inlägg (CRUD):** Skapa, redigera, läsa och radera tips och erbjudanden.
- **Skapande av inlägg** Vid skapande av inlägg ska ett meddelande gå ut som utskick med fullständig information/erbjudande gå ut till samtliga medlemmar.
- **Medlemsinlogg** Om utskick inte går att få till utan att behöva någon premium package av något slag så är alternativ B en egen inloggning för medlemmar.

---

## Teknisk arkitektur

- **Frontend:** React (Vite) med Tailwind CSS.
- **Backend:** Node.js och Express (REST API).
- **Databas:** SQLite (`better-sqlite3`).
- **Säkerhet:** Lösenordshashning + auth ska kolla upp vad som finns för alternativ kring detta. bcrypt och jwt(JsonWebTokens)

## Databas struktur

- **Nyhet/erbjudande**
  - kolumner: id, type("news" / "offer"), title, description, censoredDescription, imageUrl, discountCode, discountAmount, discountType, archived, createdAt, createdBy

- **Medlemar**
  - Kolumner: id, firstName, lastName, email, approveGDPR, gdprConsentAt, status("pending", "approved", "denied") , gdprRequest("none", "export", "delete"), createdAt, approvedBy

- **Admin**
  - Kolumner: id, firstName, lastName, password, email, superAdmin, suspendedAccount, createdAt
