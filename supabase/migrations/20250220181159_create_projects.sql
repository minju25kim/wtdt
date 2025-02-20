-- Create projects table
create table public.projects (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    user_id uuid references public.users(id) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table public.projects enable row level security;

-- Projects policies
create policy "Users can view their own projects"
    on public.projects for select
    using (auth.uid() = user_id);

create policy "Users can create their own projects"
    on public.projects for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own projects"
    on public.projects for update
    using (auth.uid() = user_id);

create policy "Users can delete their own projects"
    on public.projects for delete
    using (auth.uid() = user_id);