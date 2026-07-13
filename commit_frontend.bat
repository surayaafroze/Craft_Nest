@echo off
git add src/components/layout/Navbar.tsx
git commit -m "fix: hide Navbar on dashboard to prevent overlapping"

git add src/app/(public)/about/page.tsx
git commit -m "style: fix padding on about page"

git add src/app/(auth)/login/page.tsx
git commit -m "style: fix padding on login page"

git add src/app/(public)/blog/[slug]/page.tsx
git commit -m "fix: update blog slugs to match backend data"

git add src/app/(public)/contact/page.tsx src/app/(public)/privacy/page.tsx src/app/(public)/terms/page.tsx
git commit -m "style: fix padding on policy and contact pages"

git add src/app/(public)/items/[id]/page.tsx src/app/(public)/blog/page.tsx src/app/(auth)/register/page.tsx
git commit -m "style: fix padding on items, blog, and register pages"

git add src/app/(public)/artisans/ src/app/(public)/refunds/ src/app/(public)/shipping/
git commit -m "feat: create placeholder pages for footer links to resolve 404s"

git add src/app/dashboard/
git commit -m "feat: update dashboard components and admin pages"

git add src/components/
git commit -m "refactor: update UI components and items cards"

git add .
git commit -m "chore: miscellaneous updates and untracked files"
