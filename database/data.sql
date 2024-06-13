-- Sample data for user_t with random passwords
INSERT INTO "user_t" ("mail", "role", "phone", "pass", "point", "unpaid") VALUES
('user1@gmail.com', 'customer', '123-456-7890', '$2b$10$/A2V1zmtyLlW./JyEFd5l.f2dUIwM2tJalovpet8gOVBY5YDG.h.C', 10, 0),
('user2@gmail.com', 'customer', '123-456-7891', '$2b$10$yo2H0vp4odPUsD8K1W.BCOz8VRvRTQspI2WrpT5TkaGilqJLiEYYm', 20, 5),
('user3@gmail.com', 'coach', '123-456-7892', '$2b$10$Qz.liaJbH76p1/41uczfOeMNOQfd/Y2fHpiPA7PX5TwI9yb44beNa', 30, 0),
('user4@gmail.com', 'customer', '123-456-7893', '$2b$10$QBB/mlBqVIqZPkljjd6WWOPPPX.pgfp8FBzku1V2HouDOEn8Kwv5u', 40, 10),
('user5@gmail.com', 'customer', '123-456-7894', '$2b$10$NPqqObGXWstqLzQHCgx6CuwM.YZLK0FWbDbf/QyGcaGgs/ebCORQC', 50, 15),
('user6@gmail.com', 'coach', '123-456-7895', '$2b$10$V4I01Nq9XSH2pufUehfNm.6EEZjWsrKS63oAlP5S.O.Oxxz1YH1HC', 60, 0),
('user7@gmail.com', 'customer', '123-456-7896', '$2b$10$JyCttPLU9/6.mkkdVF48sOkZ/UiI7XYnbYtK0nERsZbgax57..pCW', 70, 20),
('user8@gmail.com', 'customer', '123-456-7897', '$2b$10$bIbvVFDHfoEDxT6UIx5ThONIzBTDB0otoVOPYx0bMawJIlnCjKdDq', 80, 25);

-- Sample data for product_t
INSERT INTO "product_t" ("name", "brand", "price", "desc", "imgurl") VALUES
('Product A', 'Brand X', 100, 'Description of Product A', ARRAY['img1.jpg', 'img2.jpg']),
('Product B', 'Brand Y', 150, 'Description of Product B', ARRAY['img3.jpg', 'img4.jpg']),
('Product C', 'Brand Z', 200, 'Description of Product C', ARRAY['img5.jpg', 'img6.jpg']),
('Product D', 'Brand X', 120, 'Description of Product D', ARRAY['img7.jpg', 'img8.jpg']),
('Product E', 'Brand Y', 180, 'Description of Product E', ARRAY['img9.jpg', 'img10.jpg']),
('Product F', 'Brand Z', 220, 'Description of Product F', ARRAY['img11.jpg', 'img12.jpg']),
('Product G', 'Brand X', 130, 'Description of Product G', ARRAY['img13.jpg', 'img14.jpg']),
('Product H', 'Brand Y', 170, 'Description of Product H', ARRAY['img15.jpg', 'img16.jpg']);

-- Sample data for productStore_t
INSERT INTO "productStore_t" ("product_id", "size", "color", "count", "sold") VALUES
((SELECT "id" FROM "product_t" WHERE "name" = 'Product A'), 'M', 'Red', 10, 5),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product B'), 'L', 'Blue', 15, 7),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product C'), 'S', 'Green', 20, 10),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product D'), 'M', 'Yellow', 25, 12),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product E'), 'L', 'Black', 30, 15),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product F'), 'S', 'White', 35, 18),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product G'), 'M', 'Pink', 40, 20),
((SELECT "id" FROM "product_t" WHERE "name" = 'Product H'), 'L', 'Orange', 45, 22);

-- Sample data for cart_t
INSERT INTO "cart_t" ("user_mail", "isdone") VALUES
('user1@gmail.com', false),
('user2@gmail.com', false),
('user3@gmail.com', true),
('user4@gmail.com', false),
('user5@gmail.com', true),
('user6@gmail.com', false),
('user7@gmail.com', true),
('user8@gmail.com', false);

-- Sample data for cart_contain_product
INSERT INTO "cart_contain_product" ("cart_id", "product_id", "size", "color", "count") VALUES
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user1@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product A'), 'M', 'Red', 2),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user2@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product B'), 'L', 'Blue', 1),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user3@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product C'), 'S', 'Green', 3),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user4@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product D'), 'M', 'Yellow', 4),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user5@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product E'), 'L', 'Black', 2),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user6@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product F'), 'S', 'White', 1),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user7@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product G'), 'M', 'Pink', 5),
((SELECT "id" FROM "cart_t" WHERE "user_mail" = 'user8@gmail.com'), (SELECT "id" FROM "product_t" WHERE "name" = 'Product H'), 'L', 'Orange', 3);

-- Sample data for course_t
INSERT INTO "course_t" ("timeslot", "weekday", "coursetype", "duration", "title", "weeks", "max", "content", "startday", "timeidx", "fee") VALUES
(1, 'Monday', 'Yoga', 60, 'Morning Yoga', 8, 20, 'Yoga course for beginners', '2023-06-01', ARRAY[1,2], 50),
(2, 'Wednesday', 'Pilates', 45, 'Pilates Intermediate', 6, 15, 'Intermediate level Pilates', '2023-06-03', ARRAY[3,4], 40),
(3, 'Friday', 'HIIT', 30, 'HIIT Advanced', 10, 10, 'High-intensity interval training', '2023-06-05', ARRAY[5,6], 60),
(4, 'Tuesday', 'Spin', 50, 'Spin Class', 8, 20, 'High-energy spin class', '2023-06-02', ARRAY[7,8], 55),
(5, 'Thursday', 'Zumba', 40, 'Zumba Fun', 7, 25, 'Dance-based fitness class', '2023-06-04', ARRAY[9,10], 45),
(6, 'Saturday', 'Strength', 70, 'Strength Training', 9, 30, 'Strength and conditioning', '2023-06-06', ARRAY[11,12], 65),
(7, 'Sunday', 'Meditation', 30, 'Meditation Basics', 5, 15, 'Meditation and mindfulness', '2023-06-07', ARRAY[13,14], 35),
(8, 'Monday', 'Cardio', 60, 'Cardio Blast', 8, 20, 'High-intensity cardio workout', '2023-06-08', ARRAY[15,16], 50);

-- Sample data for subuser_t
INSERT INTO "subuser_t" ("user_mail", "avatar", "name", "gender", "birth") VALUES
('user1@gmail.com', 'avatar1.png', 'Subuser1', 'Male', '2010-01-01'),
('user2@gmail.com', 'avatar2.png', 'Subuser2', 'Female', '2012-02-02'),
('user3@gmail.com', 'avatar3.png', 'Subuser3', 'Male', '2011-03-03'),
('user4@gmail.com', 'avatar4.png', 'Subuser4', 'Female', '2013-04-04'),
('user5@gmail.com', 'avatar5.png', 'Subuser5', 'Male', '2010-05-05'),
('user6@gmail.com', 'avatar6.png', 'Subuser6', 'Female', '2012-06-06'),
('user7@gmail.com', 'avatar7.png', 'Subuser7', 'Male', '2011-07-07'),
('user8@gmail.com', 'avatar8.png', 'Subuser8', 'Female', '2013-08-08');

-- Sample data for user_take_course_t
INSERT INTO "user_take_course_t" ("user_mail", "user_name", "course_id", "leave_count") VALUES
('user1@gmail.com', 'Subuser1', (SELECT "id" FROM "course_t" WHERE "title" = 'Morning Yoga'), 0),
('user2@gmail.com', 'Subuser2', (SELECT "id" FROM "course_t" WHERE "title" = 'Pilates Intermediate'), 1),
('user3@gmail.com', 'Subuser3', (SELECT "id" FROM "course_t" WHERE "title" = 'HIIT Advanced'), 2),
('user4@gmail.com', 'Subuser4', (SELECT "id" FROM "course_t" WHERE "title" = 'Spin Class'), 0),
('user5@gmail.com', 'Subuser5', (SELECT "id" FROM "course_t" WHERE "title" = 'Zumba Fun'), 1),
('user6@gmail.com', 'Subuser6', (SELECT "id" FROM "course_t" WHERE "title" = 'Strength Training'), 2),
('user7@gmail.com', 'Subuser7', (SELECT "id" FROM "course_t" WHERE "title" = 'Meditation Basics'), 0),
('user8@gmail.com', 'Subuser8', (SELECT "id" FROM "course_t" WHERE "title" = 'Cardio Blast'), 1);

-- Sample data for activity_t
INSERT INTO "activity_t" ("title", "content") VALUES
('Yoga Session', 'Join us for a morning yoga session to relax and rejuvenate.'),
('Cooking Class', 'Learn to cook delicious meals with our expert chef.'),
('Art Workshop', 'Unleash your creativity in our art workshop.'),
('Tech Talk', 'Join our tech talk to stay updated on the latest trends in technology.'),
('Music Concert', 'Enjoy live music from our talented local bands.'),
('Dance Class', 'Get moving with our energetic dance class.'),
('Book Club', 'Join our book club to discuss the latest bestsellers.'),
('Fitness Bootcamp', 'Push your limits with our intense fitness bootcamp.'),
('Gardening Workshop', 'Learn the basics of gardening in our hands-on workshop.'),
('Photography Walk', 'Capture stunning photos in our guided photography walk.');

-- Sample data for table_t
INSERT INTO "table_t" ("timeidx", "tabledate", "tableid") VALUES
(1, '2024-06-01', 101),
(2, '2024-06-01', 102),
(3, '2024-06-01', 103),
(1, '2024-06-02', 101),
(2, '2024-06-02', 102),
(3, '2024-06-02', 103),
(1, '2024-06-03', 101),
(2, '2024-06-03', 102),
(3, '2024-06-03', 103),
(1, '2024-06-04', 101),
(2, '2024-06-04', 102),
(3, '2024-06-04', 103);

-- Sample data for user_reserve_table_t
INSERT INTO "user_reserve_table_t" ("user_mail", "usedtableid", "tabledate", "timeidx") VALUES
('user1@gmail.com', 101, '2024-06-01', 1),
('user2@gmail.com', 102, '2024-06-01', 2),
('user3@gmail.com', 103, '2024-06-01', 3),
('user4@gmail.com', 101, '2024-06-02', 1),
('user5@gmail.com', 102, '2024-06-02', 2),
('user6@gmail.com', 103, '2024-06-02', 3),
('user7@gmail.com', 101, '2024-06-03', 1),
('user8@gmail.com', 102, '2024-06-03', 2);

-- Sample data for course_use_table_t
INSERT INTO "course_use_table_t" ("courseid", "usedtableid", "tabledate", "timeidx") VALUES
((SELECT "id" FROM "course_t" WHERE "title" = 'Morning Yoga'), 101, '2024-06-01', 1),
((SELECT "id" FROM "course_t" WHERE "title" = 'Pilates Intermediate'), 102, '2024-06-01', 2),
((SELECT "id" FROM "course_t" WHERE "title" = 'HIIT Advanced'), 103, '2024-06-01', 3),
((SELECT "id" FROM "course_t" WHERE "title" = 'Spin Class'), 101, '2024-06-02', 1),
((SELECT "id" FROM "course_t" WHERE "title" = 'Zumba Fun'), 102, '2024-06-02', 2),
((SELECT "id" FROM "course_t" WHERE "title" = 'Strength Training'), 103, '2024-06-02', 3),
((SELECT "id" FROM "course_t" WHERE "title" = 'Meditation Basics'), 101, '2024-06-03', 1),
((SELECT "id" FROM "course_t" WHERE "title" = 'Cardio Blast'), 102, '2024-06-03', 2);

-- Sample data for announcement_t
INSERT INTO "announcement_t" ("title", "content") VALUES
('New Yoga Class', 'We are excited to announce a new Yoga class starting next Monday.'),
('Holiday Schedule', 'The gym will be closed on July 4th for Independence Day.'),
('New Equipment', 'We have added new treadmills and ellipticals to the cardio room.'),
('Member of the Month', 'Congratulations to Jane Doe for being the member of the month!'),
('Workshop: Nutrition Basics', 'Join us for a workshop on nutrition basics next Saturday.'),
('Extended Hours', 'We are extending our hours on weekdays until 10 PM.'),
('Personal Training Discount', 'Get 20% off personal training sessions this month.'),
('Upcoming Maintenance', 'The pool will be closed for maintenance next Tuesday.');

-- Sample data for coachIs_t
INSERT INTO "coachIs_t" ("user_mail", "course_id") VALUES
('user3@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Morning Yoga')),
('user6@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Pilates Intermediate')),
('user3@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'HIIT Advanced')),
('user6@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Spin Class')),
('user3@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Zumba Fun')),
('user6@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Strength Training')),
('user3@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Meditation Basics')),
('user6@gmail.com', (SELECT "id" FROM "course_t" WHERE "title" = 'Cardio Blast'));

-- Sample data for purchaseHis_t
INSERT INTO "purchaseHis_t" ("user_mail", "price", "product_name", "product_id", "product_size", "product_color", "product_store_id", "count") VALUES
('user1@gmail.com', 100, 'Product A', (SELECT "id" FROM "product_t" WHERE "name" = 'Product A'), 'M', 'Red', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product A') AND "size" = 'M' AND "color" = 'Red'), 1),
('user2@gmail.com', 150, 'Product B', (SELECT "id" FROM "product_t" WHERE "name" = 'Product B'), 'L', 'Blue', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product B') AND "size" = 'L' AND "color" = 'Blue'), 2),
('user3@gmail.com', 200, 'Product C', (SELECT "id" FROM "product_t" WHERE "name" = 'Product C'), 'S', 'Green', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product C') AND "size" = 'S' AND "color" = 'Green'), 1),
('user4@gmail.com', 120, 'Product D', (SELECT "id" FROM "product_t" WHERE "name" = 'Product D'), 'M', 'Yellow', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product D') AND "size" = 'M' AND "color" = 'Yellow'), 1),
('user5@gmail.com', 180, 'Product E', (SELECT "id" FROM "product_t" WHERE "name" = 'Product E'), 'L', 'Black', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product E') AND "size" = 'L' AND "color" = 'Black'), 2),
('user6@gmail.com', 220, 'Product F', (SELECT "id" FROM "product_t" WHERE "name" = 'Product F'), 'S', 'White', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product F') AND "size" = 'S' AND "color" = 'White'), 3),
('user7@gmail.com', 130, 'Product G', (SELECT "id" FROM "product_t" WHERE "name" = 'Product G'), 'M', 'Pink', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product G') AND "size" = 'M' AND "color" = 'Pink'), 1),
('user8@gmail.com', 170, 'Product H', (SELECT "id" FROM "product_t" WHERE "name" = 'Product H'), 'L', 'Orange', (SELECT "id" FROM "productStore_t" WHERE "product_id" = (SELECT "id" FROM "product_t" WHERE "name" = 'Product H') AND "size" = 'L' AND "color" = 'Orange'), 2);