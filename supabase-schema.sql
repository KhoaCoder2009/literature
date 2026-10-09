create table if not exists public.question_sets (
  id text primary key,
  title text not null,
  topic text default '',
  status text default 'draft',
  qs jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.set_question_sets_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists question_sets_updated_at on public.question_sets;
create trigger question_sets_updated_at
before update on public.question_sets
for each row
execute function public.set_question_sets_updated_at();

alter table public.question_sets enable row level security;

drop policy if exists "Public read access for question sets" on public.question_sets;
create policy "Public read access for question sets"
on public.question_sets for select
using (true);

drop policy if exists "Public insert access for question sets" on public.question_sets;
create policy "Public insert access for question sets"
on public.question_sets for insert
with check (true);

drop policy if exists "Public update access for question sets" on public.question_sets;
create policy "Public update access for question sets"
on public.question_sets for update
using (true)
with check (true);
