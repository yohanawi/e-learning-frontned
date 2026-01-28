# Italy UMA Academy - Frontend

Modern Learning Management System (LMS) built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

✅ **Progressive Lesson Unlocking** - Students must complete lessons in order
✅ **Video-Based Learning** - Vimeo integration for high-quality video playback  
✅ **User Authentication** - Login/Register with Laravel Sanctum tokens
✅ **Course Enrollment** - Browse and enroll in courses
✅ **Progress Tracking** - Track completion status and progress percentage
✅ **Certificate Generation** - Earn certificates upon course completion
✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Next.js 16.1.1** - App Router with React 19
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Laravel Sanctum** - Token-based authentication
- **Vimeo Player** - Video hosting and playback

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Laravel backend running at `http://localhost:8000`

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Run development server:**

```bash
npm run dev
```

4. **Open browser:** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── courses/           # Course pages
│   ├── lessons/[id]/      # Video player
│   ├── login/            # Authentication
│   ├── register/
│   ├── my-account/       # Student dashboard
│   └── layout.tsx        # Root layout
├── contexts/
│   └── AuthContext.tsx   # Auth state management
└── lib/
    └── api.ts           # API client
```

## Key Features

### Progressive Unlocking

Lessons unlock sequentially as students complete previous lessons. Backend handles access control via `LessonAccessService`.

### Video Player

- Vimeo integration with iframe embed
- Auto-progress tracking at 90% completion
- Next/Previous lesson navigation
- Lock status indicators

### Student Dashboard

- View enrolled courses
- Track progress with visual bars
- Access certificates
- Filter by status (all/active/completed)

## API Integration

```typescript
import { api } from "@/lib/api";

// Auth
await api.auth.login(email, password);

// Courses
const courses = await api.courses.getAllMainCourses();

// Lessons
const lessons = await api.lessons.getLessons(subCourseId, token);
await api.lessons.updateProgress(lessonId, { completed: true }, token);

// Enrollments
const myCourses = await api.enrollments.getMyCourses(token);
```

## Available Scripts

```bash
npm run dev      # Development (port 3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api  # Laravel backend
NEXT_PUBLIC_APP_URL=http://localhost:3000      # Frontend URL
```

## Next Steps

1. **Payment Integration** - Add Stripe for course purchases
2. **Advanced Features** - Reviews, forums, quizzes
3. **Admin Panel** - Course management UI
4. **SEO** - Meta tags and structured data

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
