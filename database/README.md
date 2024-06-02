# PostgreSQL Database

1. 寫 `.env` 檔指定 PostgreSQL 的使用者密碼。請參考 `.env.template`

2. 建立 PostgreSQL 資料庫。
   ```sh
   docker compose up -d
   ```

3. 建立 tables
   ```sh
   cat ../backend/sql_src/createdb.sql | docker compose exec -T postgres psql --username postgres --dbname stadium
   ```
   執行這個指令應該會看到一堆的"ALTER TABLE"與"CREATE TABLE"。

4. 寫 `../backend/.env` 檔，讓後端程式可以連過來。記得參考`../backend/.env.template`進行更新。寫的內容類似這樣：
   ```.env
   JWT_SECRET='your jwt secret'
   DATABASE_URL='postgres://postgres:password@localhost:5432/stadium'
   ```