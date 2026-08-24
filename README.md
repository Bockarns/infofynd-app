# Projektidé: InfoFynd – Drivs av Bock AB

## Sammanfattning & Syfte

InfoFynd är en fullstack-webbapplikation byggd i React och Express med SQLite som databas. Syftet med applikationen är att fungera som en samlingsplats för konsumenttips, erbjudanden och information, där besökare kan ta del av publicerat innehåll och ansöka om medlemskap.

Målet med projektet är att demonstrera en komplett CRUD-arkitektur, användarhantering, säker autentisering och god databashantering enligt kursens krav.

---

## Planerad funktionalitet

### Publik del (Klient)

- **Start-/flödessida:** Visar delvis censurerade publicerade tips och erbjudanden indelade i kategorier.
- **Medlemsansökan:** Ett formulär där besökare kan ansöka om medlemskap (namn, e-post och GDPR-godkännande).
- **GDPR-information:** Tydlig presentation av hur användarens data sparas och hanteras.

### Administrationsdel (Skyddat läge)

- **Inloggning:** Säker autentisering och "hashade lösenord" detta måste jag undersöka mer om.
- **Hantera medlemsansökningar:** Gränssnitt för admin att granska, godkänna eller neka inkomna ansökningar.
- **Hantera inlägg (CRUD):** Skapa, redigera, läsa och radera tips och erbjudanden.
- **Skapande av inlägg** Vid skapande av inlägg ska ett meddelande gå ut som utskick med fullständig information/erbjudande gå ut till samtliga medlemmar.

---

## Teknisk arkitektur

- **Frontend:** React (Vite) med Tailwind CSS.
- **Backend:** Node.js och Express (REST API).
- **Databas:** SQLite (`better-sqlite3`).
- **Säkerhet:** Lösenordshashning ska kolla upp vad som finns för alternativ kring detta.
