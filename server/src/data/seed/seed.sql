-- 1. Töm befintliga tabeller och återställ AUTOINCREMENT-räknarna
DELETE FROM posts;
DELETE FROM members;
DELETE FROM admins;

DELETE FROM sqlite_sequence WHERE name IN ('posts', 'members', 'admins');

-- 2. Lägg till en SuperAdmin (id: 1)
INSERT INTO admins (id, firstName, lastName, email, password, superAdmin, suspendedAccount)
VALUES (
  1,
  'Admin',
  'Gordon-Bock',
  'admin@infofynd.se',
  '$2b$10$w1qE1vQ5pG3sQ1.placeholderHashForBcrypt',
  1,
  0
);
-- Lägg till Demo-konto (används av demotesten i appen)
INSERT INTO admins (id, firstName, lastName, email, password, superAdmin, suspendedAccount, isDemo)
VALUES (
  2,
  'Demo',
  'Användare',
  'demo@infofynd.se',
  '$2b$10$w1qE1vQ5pG3sQ1.placeholderHashForBcrypt',
  0,
  0,
  1
);

-- 3. Lägg till 1 Nyhet och 1 Erbjudande
INSERT INTO posts (
  type,
  title,
  description,
  censoredDescription,
  imageUrl,
  discountCode,
  discountAmount,
  discountType,
  archived,
  createdBy
)
VALUES 
(
  'news',
  'InfoFynd lanseras officiellt!',
  'Vi är glada att kunna presentera InfoFynd, plattformen där du hittar lokala nyheter, tips och exklusiva erbjudanden samlade på ett och samma ställe.',
  'Vi är glada att kunna presentera InfoFynd... Logga in eller bli medlem för att läsa hela artikeln.',
  '/images/launch-news.webp',
  NULL,
  NULL,
  NULL,
  0,
  1
),
(
  'offer',
  '20% rabatt på lunchbuffé',
  'Visa upp din medlemskod i kassan för att ta del av 20% rabatt på hela lunchmenyn under vardagar mellan kl. 11-14.',
  'Få 20% rabatt på lunchen hos vår partner. Bli medlem för att låsa upp rabattkoden.',
  '/images/lunch-offer.webp',
  'LUNCH20',
  20,
  'percent',
  0,
  1
);

-- 4. Lägg till 2 Medlemmar
INSERT INTO members (
  firstName,
  lastName,
  email,
  approveGDPR,
  status,
  gdprRequest,
  approvedBy
)
VALUES 
(
  'Anna',
  'Svensson',
  'anna.svensson@example.com',
  1,
  'approved',
  'none',
  1
),
(
  'Erik',
  'Karlsson',
  'erik.karlsson@example.com',
  1,
  'pending',
  'none',
  NULL
);