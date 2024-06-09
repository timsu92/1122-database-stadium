# PostgreSQL Database

1. 寫 `.env` 檔指定 PostgreSQL 的使用者密碼。請參考 `.env.template`

2. 建立 PostgreSQL 資料庫。
   ```sh
   docker compose up -d
   ```
3. 打開http://localhost:5050/ 用env的帳密登入
   1. ![alt text](READMEimage/image.png)
   2. ![alt text](READMEimage/image-1.png)
   3. ![alt text](READMEimage/image-2.png)
   4. Save點下去
   5. 左欄Servers/postgres/Databases/stadium/Schemas/public/Tables應該沒東西


3. 依照需求可能需要更新submodule。這部分比較不確定，這裡提供幾個可能的指令：
   ```sh
   # 在專案根目錄中執行
   git submodule update --init backend
   git submodule update backend
   ```

3. 建立 tables
   ```sh
   cat ../backend/sql_src/createdb.sql | docker compose exec -T postgres psql --username postgres --dbname stadium
   ```
   執行這個指令應該會看到一堆的"ALTER TABLE"與"CREATE TABLE"。
   讀入範例資料
   ```sh
   cat ./data.sql | docker compose exec -T postgres psql --username postgres --dbname stadium
   ```
5. 網頁重新整理。左欄Servers/postgres/Databases/stadium/Schemas/public/Tables會出現所有create的table  
   ![alt text](READMEimage/image-3.png)

4. 寫 `../backend/.env` 檔，讓後端程式可以連過來。記得參考`../backend/.env.template`進行更新。寫的內容類似這樣：
   ```.env
   JWT_SECRET='your jwt secret'
   DATABASE_URL='postgres://postgres:password@localhost:5432/stadium'
   ```

5. 若想要重置database

```sh
docker compose down
docker volume ls
docker volume rm <要刪除的volume>
```