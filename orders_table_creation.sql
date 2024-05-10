create table if not exists orders (
	id uuid primary key,
	user_id uuid not null,
	cart_id uuid references carts (id),
	payment json not null,
	delivery json not null,
	comments text,
	status text not null,
	total int not null
);
