# ⚡ SprintStudio

**Live Demo:** [sprint-studio](https://sprint-studio-indol.vercel.app/)

SprintStudio is a high-agency product management interface built for the bleeding edge. We're leaning hard into Next.js 16, React 19, and the React Compiler to see how far we can push the server-first mental model without sacrificing the snappiness of a local app.

---

## 1. The Vibe: URL-First and Snappy

We have moved away from the loading spinner hell that plagues modern dashboards. Every interaction—including filters, searches, and view toggles—is synchronized with the address bar via [nuqs](https://github.com/47ng/nuqs).

This means navigation is instant. Because the state lives in the URL, the server prepares the exact slice of data you need before the browser even finishes the transition. Combined with Motion's shared-element transitions, the tasks board feels tactile and responsive.

---

## 2. Setup and The "License Trap"

Getting this running requires a bit more than just a standard install. We are using Central Icons, which requires a license key even for deployment.

### 1. Environment Sync

```sh
cp .env.example .env
```

### 2. The Central License (**CRITICAL**)

If you are running locally or deploying to Vercel, you must set the license key or the dependency installation will fail.

```sh
export CENTRAL_LICENSE_KEY=review
# Also ensure it is in your .env for Vercel/CI
CENTRAL_LICENSE_KEY=review
```

### 3. Database Initialization

We are using SQLite for that zero-latency local feel.

```sh
npx prisma db push
npm run db:seed
```

### 4. Convit (AI Workflow)

We use [convit](https://github.com/Kareem-AEz/convit) for disciplined, AI-assisted development. If you want to contribute using the same workflow:

- Configure your `CONVIT_URL` and `CONVIT_KEY` in `.env`.
- Use `npm run commit` to trigger the guided commit flow.

---

## 3. System Resilience & The "Humane" Error Page

Modern frameworks occasionally have friction points that force a pivot. We have implemented a custom orchestration layer to manage the lifecycle of a request while keeping the user experience pleasant, even when things break.

### The "Router Deadlock" Fix

Initially, we relied on the native `error.tsx` and `not-found.tsx` for the task detail views. However, we encountered a critical failure where `next/link` components would become completely unresponsive inside these boundaries. In development, this would often crash the HMR state. In production, navigation was effectively dead once a user hit an error page.

#### The Fix

We moved to manual orchestration. By catching errors and handling not-found states explicitly within the server component, we bypassed the router deadlock. This ensures our "Back to Dashboard" buttons actually work and maintain a smooth exit path for the user.

### State-Driven UI and The "Feedback Loop"

We treat empty, error, and zero-data scenarios as first-class citizens in our design DNA:

- **Kaomoji Failure States:** Errors should not be boring. We use playful kaomoji, like `(╯°□°)╯︵ ┻━┻` for Not Found and `(┛ಠ_ಠ)┛彡┻━┻` for errors, to inject some humanity into failure states.
- **The Empty Shadcn Primitive:** We implemented a polymorphic Empty UI primitive in `src/components/ui/empty.tsx` that serves as the foundation for all zero-data and error screens.
- **Sonner Context Patch:** We patched the standard Sonner implementation to solve the "ghost timer" problem. By enforcing a singleton state and using ID reconciliation, we prevent UI desync during rapid interactions. It even includes a Unicode-safe hashing algorithm for messages and a custom OKLCH-bordered shake animation for repeated alerts.
    - *Try it in:* The **Tasks View Switcher** or **Activity Filters** to see how repeated clicks intelligently refresh the same toast instead of stacking them.
    
- **Structural Breadcrumbs:** Failure states are not dead ends. Every error and not-found view is fully integrated into our breadcrumbs system to provide a clear path back to the parent context.

---

## 4. Possible Improvements

These are suggestions for evolving the prototype into a production-scale platform. None of these are currently implemented.

- **Sidebar Performance:** The current sidebar transition utilizes width changes, which triggers layout reflows on every frame. A future improvement would involve moving to GPU-accelerated transform properties like `translateX` to ensure a buttery 60fps experience.
- **Enterprise Authentication:** Implementation of a robust multi-tenant auth system like [Better Auth](https://github.com/better-auth/better-auth). This would support organization-level RBAC, granular permissions, and secure team isolation.
- **Async Pipelines:** Implementation for sending emails and notifications via a background queue like [Inngest](https://www.inngest.com/) to keep the main request cycle as lean and fast as possible.

---

## 5. Architecture: Pragmatic Layers

We have collapsed the DTO and Service layers into our Queries and Actions to keep the codebase lean.

1. **Actions:** The Mutators. They handle the Zod handshake, business logic, and database writes in a single transactional flow.
2. **Queries:** The Fetchers. These are for read-only RSC data fetching and return Prisma types directly to the UI to avoid the overhead of manual mapping.
3. **Components:** The View. Atomic units that are decoupled from database concerns.

---

**Standard:** Build it for scale. Build it for beauty.