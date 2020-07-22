
-- -- not being used, just for reference.

-- INSERT INTO users (id, name, email, password)
-- VALUES (1, 'Dane Giovanni', 'danegmancuso@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- (2, 'Dante Bartolo', 'dante@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- (3, 'Dakota James', 'dakota@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
--  (4, 'Dalton Vincenzo', 'dalton@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, province, post_code, active)
-- VALUES (1, 4, 'Silverado', 'description', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 45.99, 2, 3, 3, 'Canada', '100 Silverado rd.', 'ontario', 'L4H 2h7', true),
-- (2, 2, 'Swanage', 'description', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 60.99, 4, 3, 5, 'Canada', '255 brickston ave.', 'ontario', 'L4H 2h7', true),
-- (3, 1, 'Wildberry', 'description', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/892x501/s3/2019-11/IMG_5577.JPG?itok=45KPIPKR', 38.99, 1, 2, 4, 'Canada', '25105 fluff st.', 'ontario', 'L4H 2h7', true);


-- INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
-- VALUES (1, '2018-09-11', '2018-09-26', 2, 2),
-- (2, '2018-10-10', '2018-10-27', 3, 1),
-- (3, '2018-11-05', '2018-11-12', 1, 4);

-- INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
-- VALUES (1, 2, 2, 1, 2, 'messages'),
-- (2, 1, 3, 2, 10, 'messages'),
-- (3, 4, 1, 3, 5, 'messages');