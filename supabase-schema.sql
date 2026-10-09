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

create table if not exists public.leaderboard_entries (
  id text primary key,
  player_name text not null check (length(trim(player_name)) between 1 and 20),
  class_name text not null default '',
  set_id text not null,
  set_title text not null,
  score integer not null check (score >= 0),
  correct_count integer not null check (correct_count >= 0),
  question_count integer not null check (question_count > 0),
  accuracy numeric(5, 2) not null check (accuracy between 0 and 100),
  game_mode text not null check (game_mode in ('quiz', 'timed', 'boss')),
  elapsed_seconds integer not null check (elapsed_seconds >= 0),
  created_at timestamptz not null default now()
);

alter table public.leaderboard_entries enable row level security;

drop policy if exists "Public read access for leaderboard" on public.leaderboard_entries;
create policy "Public read access for leaderboard"
on public.leaderboard_entries for select
using (true);

drop policy if exists "Public insert access for leaderboard" on public.leaderboard_entries;
create policy "Public insert access for leaderboard"
on public.leaderboard_entries for insert
with check (
  length(trim(player_name)) between 1 and 20
  and score >= 0
  and correct_count >= 0
  and question_count > 0
  and correct_count <= question_count
  and accuracy between 0 and 100
  and game_mode in ('quiz', 'timed', 'boss')
  and elapsed_seconds >= 0
);
