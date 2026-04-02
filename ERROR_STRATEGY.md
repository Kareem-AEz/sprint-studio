# Error Handling & "Not Found" Strategy

This document outlines the architectural decisions made for handling empty states, missing resources, and runtime errors in the Sprint Studio.

## 🧠 The Learning: Why Default Files Failed
During development, we discovered that using the standard Next.js segment-level `not-found.tsx` and `error.tsx` files inside dynamic segments (like `[taskId]`) led to unstable behavior:
- **Navigation Issues**: Next.js sometimes "unmounts" the router context when showing a segment-level `not-found`, which caused `<Link>` and `useRouter` to stop working.
- **Production Crashes**: In production, these boundaries occasionally triggered a generic "This page couldn't load" fallback screen instead of our custom UI.

## 🛠️ The Solution: The "Bulletproof" Component Pattern
Instead of relying on Next.js "magic" file conventions, we use a manual **Component Pattern** for better stability and control.

### 1. Manual "Not Found" Handling
Instead of throwing `notFound()`, we return the `TaskNotFound` component directly in the page.
- **Stability**: Keeps the user inside the stable page lifecycle.
- **Functional Routing**: Breadcrumbs and Links remain fully interactive.
- **Context**: Allows us to pass specific data (like `taskId`) directly to the UI.

### 2. Manual `try/catch` for Data Fetching
For Server Components, we wrap data fetching in a `try/catch` and return a `TaskError` component on failure.
- This catches database/network errors **before** hydration, preventing the client-side React tree from ever crashing.

### 3. Global Safety Net (`global-error.tsx`)
We maintain a single `app/global-error.tsx` at the root. 
- This acts as the absolute "last line of defense" for catastrophic rendering failures.
- It replaces the `<html>` and `<body>` to ensure a UI is shown even if the root layout crashes.

## 🎨 Design & Personality
We use the shadcn `Empty` component as the base for all error/not-found states to ensure visual consistency. 

To give the app personality, we incorporate **ASCII art** into the breadcrumbs and titles:
- **Not Found**: `(╯°□°)╯︵ ┻━┻` (Table Flip)
- **Error State**: `(┛ಠ_ಠ)┛彡┻━┻` (Angry Table Flip)
- **System Failure**: `(x_x)` (Dead)

## 🚀 Implementation Example (`page.tsx`)
```tsx
export default async function Page({ params }) {
  const { id } = await params;
  try {
    const data = await getData(id);
    if (!data) return <ResourceNotFound id={id} />;
    return <YourPage data={data} />;
  } catch (err) {
    return <ResourceError error={err} />;
  }
}
```
