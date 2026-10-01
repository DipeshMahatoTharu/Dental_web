# Rumidental

Full-stack dental clinic website using Django, React, Tailwind CSS, and MongoDB.

## Run the backend

```powershell
.\.venv\Scripts\activate
copy .env.example .env
python manage.py runserver
```

MongoDB should be running locally at `mongodb://localhost:27017/rumidental`, or set `MONGODB_URI` in `.env`.

## Run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. API requests under `/api` are proxied to Django.
# Dental_web
