-- Create users table (extending Supabase auth.users)
create table public.users (
    id uuid references auth.users(id) primary key,
    email text not null,
    name text,
    avatar text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table public.users enable row level security;

-- Users policies
create policy "Users can view their own profile"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.users for update
    using (auth.uid() = id);

