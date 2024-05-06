-- NOTE: Carts table insertion script

-- INSERT INTO carts (id, user_id, created_at, updated_at, status) 
-- VALUES 
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'ORDERED'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'ORDERED'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'ORDERED'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
-- (gen_random_uuid(), gen_random_uuid(), CURRENT_DATE, CURRENT_DATE, 'ORDERED');

select * from carts

-- NOTE: cart_items table insertion script

-- INSERT INTO cart_items (cart_id, product_id, count)
-- VALUES
-- ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', gen_random_uuid(), 3),
-- ('b3ba3d88-8da9-4c91-82dd-053f59a7b0a9', gen_random_uuid(), 2),
-- ('0b9f246a-d386-4545-a9c4-c9eac4f7d59b', gen_random_uuid(), 5),
-- ('8e2bef7f-5efa-465e-9867-d7f790a8ae4c', gen_random_uuid(), 1),
-- ('17457856-a3ee-41ff-a590-007f514ce28a', gen_random_uuid(), 4),
-- ('5531d8df-8e6b-408e-888a-edf5e5c3e31d', gen_random_uuid(), 2),
-- ('008573bb-2407-42b9-9c6e-f29f9ace4cdc', gen_random_uuid(), 1),
-- ('481d557d-e6de-45a4-ad00-cf4513732be9', gen_random_uuid(), 3),
-- ('3d82aa2e-8cf4-4879-b688-d059e4cc4b2f', gen_random_uuid(), 1),
-- ('f27a75f8-6c3b-49b7-88cb-39df77bb5eb2', gen_random_uuid(), 2);