create type carts_status as enum ('OPEN', 'ORDERED');

create table if not exists carts (
	id uuid primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status carts_status
);

create table if not exists cart_items (
	cart_id uuid references carts (id),
	product_id uuid,
	count integer
);