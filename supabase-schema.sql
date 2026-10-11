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

-- ============================================================================
-- 3. BẢNG LỊCH SỬ BÀI LÀM (QUIZ_SUBMISSIONS)
-- ============================================================================
create table if not exists public.quiz_submissions (
  id text primary key,
  user_id text default '',
  type text not null default 'quiz', -- 'quiz' hoặc 'reading'
  player_name text not null default 'Học sinh',
  class_name text default '',
  set_id text not null,
  set_title text not null,
  set_topic text default '',
  set_emo text default '📖',
  score integer not null default 0,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  saved_short_count integer not null default 0,
  total_questions integer not null default 0,
  accuracy numeric(5, 2) not null default 0,
  elapsed_seconds integer not null default 0,
  details jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.quiz_submissions enable row level security;

drop policy if exists "Public read access for quiz submissions" on public.quiz_submissions;
create policy "Public read access for quiz submissions"
on public.quiz_submissions for select
using (true);

drop policy if exists "Public insert access for quiz submissions" on public.quiz_submissions;
create policy "Public insert access for quiz submissions"
on public.quiz_submissions for insert
with check (true);

drop policy if exists "Public update access for quiz submissions" on public.quiz_submissions;
create policy "Public update access for quiz submissions"
on public.quiz_submissions for update
using (true)
with check (true);

drop policy if exists "Public delete access for quiz submissions" on public.quiz_submissions;
create policy "Public delete access for quiz submissions"
on public.quiz_submissions for delete
using (true);

-- ============================================================================
-- 4. BẢNG TÀI KHOẢN NGƯỜI DÙNG (USER_ACCOUNTS - DÀNH CHO TÍNH NĂNG ĐĂNG NHẬP)
-- ============================================================================
create table if not exists public.user_accounts (
  id text primary key,
  username text unique not null,
  password_hash text not null,
  full_name text not null,
  class_name text default '',
  role text not null default 'student', -- 'student' (học sinh), 'teacher' (giáo viên), 'admin'
  avatar text default '👤',
  created_at timestamptz not null default now(),
  last_login timestamptz default now()
);

alter table public.user_accounts enable row level security;

drop policy if exists "Public read access for user accounts" on public.user_accounts;
create policy "Public read access for user accounts"
on public.user_accounts for select
using (true);

drop policy if exists "Public insert access for user accounts" on public.user_accounts;
create policy "Public insert access for user accounts"
on public.user_accounts for insert
with check (true);

drop policy if exists "Public update access for user accounts" on public.user_accounts;
create policy "Public update access for user accounts"
on public.user_accounts for update
using (true)
with check (true);

