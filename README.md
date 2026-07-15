# Groq AI Chat Application

Ushbu loyiha - **Groq AI (Llama-3)** modeli orqali ishlaydigan ultra-tezkor chat dasturi. Tizim ikkita asosiy qismdan iborat:
1. **Server (Backend):** Spring Boot (Java 21) va Gradle yordamida yozilgan REST API.
2. **Client (Frontend):** React (TypeScript), Vite va Tailwind CSS (v4) yordamida yaratilgan zamonaviy interfeys.

---

## Texnologiyalar (Tech Stack)

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React.
* **Backend:** Java 21, Spring Boot 4.1.0, RestClient, Thymeleaf, Lombok, Java Dotenv.
* **Konteynerlashtirish:** Docker, Docker Compose, Nginx.

---

## Loyiha Tuzilishi (Project Structure)

```text
ai-agent/
├── client/                     # Frontend kodi (React + TS + Vite)
│   ├── Dockerfile              # Frontend uchun Docker ko'rsatmalari
│   ├── nginx.conf              # Nginx konfiguratsiyasi (SPA marshrutlash uchun)
│   ├── package.json            # NPM kutubxonalari va skriptlar
│   └── src/                    # React komponentlari va ilova logikasi
├── server/                     # Backend kodi (Spring Boot + Gradle)
│   ├── Dockerfile              # Backend uchun Docker ko'rsatmalari
│   ├── build.gradle            # Gradle konfiguratsiyasi va dependencylar
│   └── src/                    # Spring Boot java kodlari va resurslari
├── docker-compose.yaml         # Butun tizimni orkestratsiya qilish fayli
├── .env.example                # Muhit o'zgaruvchilari shabloni
└── README.md                   # Loyiha hujjatlari (Ushbu fayl)
```

---

## Talablar (Prerequisites)

Loyihani ishga tushirish uchun kompyuteringizda quyidagilar o'rnatilgan bo'lishi kerak:
* **Docker** va **Docker Compose** (tavsiya etiladi)
* Yoki mahalliy ishlab chiqish uchun:
  * **Java 21 SDK**
  * **Node.js** (v18 yoki undan yuqori)

---

## Sozlash (Configuration)

Ishga tushirishdan oldin API kalitlarini sozlashingiz kerak:

1. Loyihaning ildiz (root) katalogida `.env` nomli fayl yarating (yoki `.env.example` nusxasini oling):
   ```bash
   cp .env.example .env
   ```

2. `.env` faylini tahrirlab, o'zining **Groq API kalitingizni** kiriting:
   ```env
   API_KEY=gsk_SizningHaqiqiyGroqKalitingizBuYergaYoziladi
   BASE_URL=https://api.groq.com/openai/v1/chat/completions
   ```

---

## Docker orqali Ishga Tushirish (Tavsiya etiladi)

Docker yordamida loyihani birgina buyruq orqali to'liq ishga tushirishingiz mumkin. Bu usulda Java yoki Node.js dasturlarini mahalliy kompyuterga o'rnatish talab etilmaydi.

1. Loyihaning ildiz katalogida terminalni oching va quyidagi buyruqni bajaring:
   ```bash
   docker-compose up --build
   ```

2. Loyiha muvaffaqiyatli ishga tushgach:
   * **Frontend (React app):** `http://localhost:5173` manzilida ochiladi.
   * **Backend (Spring Boot API):** `http://localhost:8080` manzilida ishlaydi.

### Docker buyruqlari cheat-sheet:
* Konteynerlarni fonda (background) ishga tushirish:
  ```bash
  docker-compose up -d --build
  ```
* Konteynerlarni to'xtatish:
  ```bash
  docker-compose down
  ```
* Loglarni kuzatish:
  ```bash
  docker-compose logs -f
  ```

---

## Mahalliy (Local) Ishga Tushirish

Agar Docker ishlatmasdan, har bir loyihani alohida ishga tushirmoqchi bo'lsangiz:

### 1. Server (Backend)ni ishga tushirish
1. `server` katalogiga o'ting:
   ```bash
   cd server
   ```
2. Loyihaning root katalogidagi `.env` faylini `server` katalogiga ham nusxalab oling (yoki server katalogida to'g'ridan-to'g'ri yarating):
   ```bash
   cp ../.env .env
   ```
3. Gradle yordamida loyihani qurish va ishga tushirish:
   ```bash
   ./gradlew bootRun
   ```
   *(Windows tizimida: `gradlew.bat bootRun`)*

### 2. Client (Frontend)ni ishga tushirish
1. `client` katalogiga o'ting:
   ```bash
   cd client
   ```
2. NPM dependencylarni o'rnating:
   ```bash
   npm install
   ```
3. Vite loyihasini rivojlantirish (development) rejimida ishga tushirish:
   ```bash
   npm run dev
   ```
4. Brauzerda `http://localhost:5173` manzilini oching.

---

## API Ma'lumotlari

### POST `/api/v1/chat`
* **Tavsif:** Chat xabari yuborish va Groq sun'iy intellektining javobini olish.
* **Content-Type:** `text/plain`
* **So'rov Tana qismi (Request Body):**
  ```text
  Salom! O'zbekiston haqida qisqacha ma'lumot ber.
  ```
* **Javob (Response):** Groq API dan kelgan standart JSON formatidagi javob qaytariladi. Frontend uni avtomatik o'qib, foydalanuvchiga taqdim etadi.
