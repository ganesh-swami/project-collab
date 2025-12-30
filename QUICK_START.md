# Radiocarbon MVP - Quick Start Guide

## Application URL
**Local Development:** http://localhost:3000

## Demo Credentials

### Super Admin Account
- **Email:** superadmin@example.com
- **Password:** superadmin
- **Role:** Super Admin (full access)

### Admin Account
- **Email:** admin@example.com
- **Password:** admin
- **Role:** Admin (project management)

### Participant Account
- **Email:** user@example.com
- **Password:** user
- **Role:** Participant (limited access)

## Quick Workflow

### 1. Login
- Navigate to http://localhost:3000 (auto-redirects to login)
- Enter any of the demo credentials above
- Click "Log In"

### 2. Dashboard
After login, you'll see the Projects Dashboard with:
- "Create New Project" button in red
- Empty project list (initially)
- Header with logout button

### 3. Create a Project
- Click "Create New Project" button
- Fill in the form:
  - **Project Name:** e.g., "Marketing Campaign Q4"
  - **Project Color:** Select from 6 color options (blue is default)
  - **Start Date:** e.g., 23/12/2025
  - **End Date:** e.g., 29/01/2026
  - **Participant Cap:** e.g., 10
- Click "Save Changes"
- Project will appear as a card on the dashboard

### 4. View Project
- Click on any project card on the dashboard
- You'll be taken to the Project Details page

### 5. Project Details Page Features

#### Navigation
- **Home Tab:** Main project view with frames, members, and discussion
- **Groups Tab:** Not implemented (shows placeholder)

#### Project Information Sidebar
- Member count and capacity
- Start and end dates
- Team avatars

#### Standard Frame
- Shows project introduction
- Edit button to modify content
- Upload files and add links sections
- Discussion subsection

#### Members List
- View all project members
- Add members by email from available pool
- Remove members with delete button
- See member roles (Super Admin, Admin, Participant)
- Online/offline status indicators

#### Discussion Board
- Send messages to the project
- View conversation history with timestamps
- User avatars and information for each message
- Attach files option (UI ready)
- Keyboard shortcut: Ctrl+Enter to send message

## Key Features Implemented

✅ **Authentication**
- Login system with Redux state management
- Three role types
- Demo account pool

✅ **Project Management**
- Create projects with custom settings
- View project list with cards
- Delete projects
- Set participant caps and dates

✅ **Team Collaboration**
- Add/remove members to projects
- View member status and roles
- Member invitation system (Redux-ready)

✅ **Communication**
- Discussion board with messaging
- Real-time message display
- User information with messages

✅ **Content Management**
- Standard frames for project content
- Edit frame content inline
- File and link attachments (UI ready)

✅ **UI/UX**
- Red/pink color theme
- Responsive design
- shadcn/ui components
- Tailwind CSS styling
- Smooth animations and transitions

## Redux Store Structure

### State Management
- **auth:** Login state and user info
- **projects:** All projects and current project
- **members:** Team members database

### Data Persistence
- Data is stored in Redux store during session
- Resets on page refresh
- Ready for backend API integration

## Browser Navigation

After login, you can navigate:
- `/login` - Login page
- `/dashboard` - Projects dashboard
- `/projects/[id]` - Project details page

## Customization Options

### Colors
Edit these in [src/styles/globals.css](src/styles/globals.css):
- `--primary: #e83e3e;` - Main red color
- `--background: #fdf2f2;` - Light pink background

### Demo Accounts
Add more accounts in [src/app/login/page.tsx](src/app/login/page.tsx):
```typescript
const demoAccounts = [
  { email: "newemail@example.com", password: "password", role: "participant" as const },
  // ...
];
```

### Team Members
Add initial members in [src/store/membersSlice.ts](src/store/membersSlice.ts)

## Troubleshooting

### Application won't start?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm run dev
```

### CSS not loading?
- Check that `@/styles/globals.css` is imported in `src/app/layout.tsx`
- Make sure Tailwind CSS v4 is installed

### Redux not working?
- Verify `ReduxProvider` is wrapping the app in `layout.tsx`
- Check Redux DevTools in browser (if extension installed)

## Performance Tips

- Use browser DevTools to monitor Redux state changes
- Check Network tab to see component loads
- Lighthouse for performance metrics

## Next Steps (For Full Development)

- [ ] Connect to backend API
- [ ] Add user authentication with JWT
- [ ] Implement WebSocket for real-time collaboration
- [ ] Add file upload functionality
- [ ] Create project settings/customization page
- [ ] Add project archiving
- [ ] Implement user notifications
- [ ] Add activity logs
- [ ] Create admin panel
- [ ] Add dark mode toggle

## File Structure Reference

```
src/
├── app/
│   ├── login/page.tsx           # Login page
│   ├── dashboard/page.tsx       # Projects list
│   └── projects/[id]/page.tsx   # Project details
├── components/
│   ├── CreateProjectModal.tsx   # Create project form
│   ├── StandardFrame.tsx        # Project intro content
│   ├── MembersList.tsx          # Team members panel
│   ├── DiscussionBoard.tsx      # Messages panel
│   ├── ReduxProvider.tsx        # Redux wrapper
│   └── ui/                      # shadcn components
└── store/
    ├── store.ts                 # Redux configuration
    ├── authSlice.ts            # Auth state
    ├── projectsSlice.ts        # Projects state
    └── membersSlice.ts         # Members state
```

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
