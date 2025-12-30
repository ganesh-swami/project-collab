# Radiocarbon MVP - Team Collaboration Platform

A modern team collaboration platform built with **Next.js, React, Redux, Tailwind CSS, and shadcn/ui**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

**Access the app:** http://localhost:3000

### Demo Credentials
- **Super Admin:** superadmin@example.com / superadmin
- **Admin:** admin@example.com / admin  
- **Participant:** user@example.com / user

---

## ✨ Features Implemented

### 🔐 Authentication
- Login page with demo accounts
- Three role types (Super Admin, Admin, Participant)
- Redux state management
- Automatic redirect after login

### 📊 Dashboard
- View all projects at a glance
- Create new projects
- Project cards with stats
- Responsive grid layout

### ➕ Project Creation
- Modal form for new projects
- Custom project name
- 6 color options to choose from
- Set start and end dates
- Configure participant capacity

### 📁 Project Details
- Dynamic routing by project ID
- Multiple navigation tabs
- Project information sidebar
- Responsive layout

### 🎯 Project Components
- **Standard Frame** - Project introduction with edit capability
- **Members List** - Add/remove team members, view roles and status
- **Discussion Board** - Send and view messages with timestamps

### 🎨 Theme & Design
- Red/pink color scheme (#e83e3e primary)
- Fully responsive (mobile/tablet/desktop)
- Clean, modern UI using shadcn/ui
- Tailwind CSS for styling
- Accessibility features

### 💾 State Management
- Redux Toolkit with three slices:
  - `authSlice` - User authentication
  - `projectsSlice` - Project data and CRUD operations
  - `membersSlice` - Team members database
- Type-safe with TypeScript

---

## 📁 Project Structure

```
src/
├── app/
│   ├── login/page.tsx              # Login page
│   ├── dashboard/page.tsx          # Projects list
│   └── projects/[id]/page.tsx      # Project details
├── components/
│   ├── CreateProjectModal.tsx      # Create project form
│   ├── StandardFrame.tsx           # Project intro component
│   ├── MembersList.tsx             # Members management
│   ├── DiscussionBoard.tsx         # Discussion messages
│   ├── ReduxProvider.tsx           # Redux wrapper
│   └── ui/                         # shadcn/ui components
├── store/
│   ├── store.ts                    # Store configuration
│   ├── authSlice.ts                # Auth state
│   ├── projectsSlice.ts            # Projects state
│   └── membersSlice.ts             # Members state
└── styles/
    └── globals.css                 # Global styles & theme
```

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **State:** Redux Toolkit, React-Redux
- **UI:** shadcn/ui, Tailwind CSS 4
- **Icons:** Lucide React
- **Utilities:** date-fns, clsx, class-variance-authority

---

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Step-by-step guide to test the app
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Complete feature documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and data flow

---

## 🎯 User Workflow

1. **Login** → Use demo credentials
2. **View Dashboard** → See your projects
3. **Create Project** → Fill in details and save
4. **Open Project** → View and manage project
5. **Add Members** → Invite team members
6. **Send Messages** → Collaborate in discussion board
7. **Edit Content** → Modify project frames
8. **Logout** → Return to login

---

## 🔧 Available Scripts

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linter
pnpm run lint
```

---

## 📱 Responsive Design

The application is fully responsive across all device sizes:
- **Mobile:** Single column layout, optimized touch targets
- **Tablet:** Two column layout with adjusted spacing
- **Desktop:** Full three-column grid layout

---

## 🎨 Color Theme

| Element | Color |
|---------|-------|
| Primary | #e83e3e (Red) |
| Background | #fdf2f2 (Light Pink) |
| Card | #ffffff (White) |
| Text | #1a1a1a (Dark Gray) |
| Border | #e0e0e0 (Light Gray) |

---

## 🧪 Testing the MVP

### Test Scenario 1: Login Flow
```
1. Start at http://localhost:3000
2. Auto-redirects to /login
3. Enter: superadmin@example.com / superadmin
4. Click "Log In"
5. Redirects to /dashboard
```

### Test Scenario 2: Create Project
```
1. Click "Create New Project"
2. Fill in:
   - Project Name: "Marketing Q4"
   - Color: Blue
   - Dates: 23/12/2025 to 29/01/2026
   - Cap: 10
3. Click "Save Changes"
4. Project appears on dashboard
```

### Test Scenario 3: Manage Members
```
1. Click on a project
2. Scroll to Members List
3. Enter: admin@example.com
4. Click "Add"
5. Member appears in list
6. Click trash icon to remove
```

### Test Scenario 4: Collaboration
```
1. In Discussion Board
2. Type: "Hello team!"
3. Click "Send" or Ctrl+Enter
4. Message appears with timestamp
```

---

## 🚀 Deployment

### Build for Production
```bash
pnpm run build
pnpm start
```

### Environment Setup (Future)
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
# Add more env vars as needed
```

---

## 📝 Notes

- All data is stored in Redux (in-memory) during the session
- Data persists during session but resets on page refresh
- No backend API currently (ready for integration)
- Demo accounts are hardcoded (replace with API in production)
- Messages and member data are fully functional for testing

---

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time WebSocket messaging
- [ ] File upload functionality
- [ ] User notifications
- [ ] Activity logs
- [ ] Project archiving
- [ ] Advanced permissions
- [ ] Email invitations
- [ ] Dark mode
- [ ] User profiles

---

## 📚 Learning Resources

This project demonstrates:
- Modern React patterns with hooks
- Redux Toolkit state management
- Next.js 13+ App Router
- TypeScript best practices
- Tailwind CSS utility-first design
- Component composition
- Responsive design
- Form handling

---

## 🤝 Contributing

This is an MVP project. To extend:
1. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Follow existing patterns in components
3. Keep Redux slices modular
4. Maintain TypeScript types
5. Use shadcn/ui components
6. Follow Tailwind conventions

---

## 📄 License

MIT - Feel free to use this project for learning and development.

---

## ✅ Checklist - MVP Complete

- [x] Login page with 3 demo accounts
- [x] Project dashboard with grid layout
- [x] Project creation modal
- [x] Project details page
- [x] Standard frame component
- [x] Members list with add/remove
- [x] Discussion board
- [x] Redux store with all slices
- [x] Red/pink color theme
- [x] shadcn/ui integration
- [x] Tailwind CSS styling
- [x] Responsive design
- [x] TypeScript throughout
- [x] Complete documentation

---

**Built with ❤️ using React, Redux, and Tailwind CSS**

For detailed information, see the [QUICK_START.md](QUICK_START.md) guide.
