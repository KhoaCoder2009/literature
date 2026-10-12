-- ============================================================================
-- MIGRATION: NÂNG CẤP CHẤM ĐIỂM THỦ CÔNG CHO QUIZ_SUBMISSIONS
-- Cho phép điểm số thập phân (numeric) và các trường phục vụ giáo viên chấm bài
-- ============================================================================

-- 1. Chuyển đổi cột score từ integer sang numeric(5, 2)
alter table public.quiz_submissions 
  alter column score type numeric(5, 2);

-- 2. Thêm các cột phục vụ chấm bài và nhận xét của giáo viên
alter table public.quiz_submissions 
  add column if not exists is_graded boolean default false;

alter table public.quiz_submissions 
  add column if not exists teacher_feedback text default '';

alter table public.quiz_submissions 
  add column if not exists teacher_name text default '';

alter table public.quiz_submissions 
  add column if not exists graded_at timestamptz;

-- 3. Đảm bảo chính sách RLS cho phép cập nhật kết quả chấm bài
drop policy if exists "Public update access for quiz submissions" on public.quiz_submissions;
create policy "Public update access for quiz submissions"
on public.quiz_submissions for update
using (true)
with check (true);
