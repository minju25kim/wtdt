create table public.waitlist (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table public.waitlist enable row level security;

-- Allow inserts from anyone
create policy "Anyone can join waitlist" on public.waitlist
    for insert
    with check (true);
