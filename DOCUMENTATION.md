# Radiocarbon - Team Collaboration Platform MVP

A modern team collaboration platform built with Next.js, React, Redux, Tailwind CSS, and shadcn/ui components.

## Features

### Authentication
- Login system with demo accounts for testing
- Three role types: Super Admin, Admin, and Participant
- Redux-based session management

**Demo Accounts:**
- Email: `superadmin@example.com` | Password: `superadmin` (Super Admin role)
- Email: `admin@example.com` | Password: `admin` (Admin role)
- Email: `user@example.com` | Password: `user` (Participant role)

### Dashboard
- View all projects at a glance
- Create new projects with custom settings
- Project cards showing member count, avatars, and date range
- Star projects for quick access

### Project Creation
- Modal form for creating new projects
- Customizable project name
- Color selection (6 color options)
- Set start and end dates
- Configure participant capacity
- Automatic creation of default introduction frame

### Project Details Page
- Project header with color indicator
- Action buttons: Participant View, Add People, Add Frame, Customize
- Navigation tabs: Home, Groups
- Responsive layout with sticky info sidebar

### Project Components

#### Standard Frame (Introduction)
- Display project introduction content
- Edit frame content with inline editor
- Upload files and add links
- Discussion section for frame-level comments

#### Members List
- View all project members with their roles
- Member status indicators (online/offline)
- Add new members by email
- Remove members from project
- Member avatars and information

#### Discussion Board
- Real-time message display
- Send messages to the discussion board
- Message history with timestamps
- User avatars and information
- Drag and drop media support (UI ready)
- Keyboard shortcut: Ctrl+Enter to send

## Technology Stack

- **Frontend Framework**: Next.js 16.1.1 with TypeScript
- **State Management**: Redux Toolkit + React-Redux
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **UI Components**: 
  - Button, Input, Textarea, Tabs, Calendar, Card, Popover
  - Radix UI for accessible components
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Redux Provider
│   ├── page.tsx                # Redirect to login
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx            # Projects dashboard
│   └── projects/
│       └── [id]/
│           └── page.tsx        # Project details page
├── components/
│   ├── ReduxProvider.tsx       # Redux Provider wrapper
│   ├── CreateProjectModal.tsx  # Create project modal
│   ├── StandardFrame.tsx       # Project introduction frame
│   ├── MembersList.tsx         # Members management
│   ├── DiscussionBoard.tsx     # Discussion messages
│   └── ui/                     # shadcn/ui components
├── store/
│   ├── store.ts                # Redux store configuration
│   ├── authSlice.ts            # Authentication state
│   ├── projectsSlice.ts        # Projects state
│   └── membersSlice.ts         # Members state
└── styles/
    └── globals.css             # Global styles with theme colors
```

## Redux Store Structure

### Auth Slice
- `user`: Current authenticated user
- `isAuthenticated`: Login status
- `login()`: Login action
- `logout()`: Logout action

### Projects Slice
- `projects`: Array of all projects
- `currentProject`: Currently viewed project
- `showCreateModal`: Modal visibility
- Actions: `createProject`, `setCurrentProject`, `updateProject`, `deleteProject`, `addMemberToProject`, `updateFrameInProject`, `addMessageToProject`

### Members Slice
- `members`: Array of all team members
- Actions: `addMember`, `updateMemberStatus`

## Color Theme

The application uses a red/pink color scheme:
- **Primary Red**: #e83e3e
- **Light Pink Background**: #fdf2f2
- **White**: #ffffff
- **Light Gray**: #f5f5f5

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:3000` to access the application.

### Build for Production

```bash
pnpm run build
pnpm start
```

## Features to Implement (Future)

- Backend API integration
- Real-time messaging with WebSockets
- File upload and media management
- User notifications
- Email invitations
- Project settings/customization
- Multiple frames per project
- Groups within projects
- Permission system
- Activity logs
- Project archiving

## Demo Workflow

1. **Login**: Use any demo account credentials
2. **View Dashboard**: See projects list (empty initially)
3. **Create Project**: Click "Create New Project" button
   - Fill in project details
   - Click "Save Changes"
4. **View Project**: Click on a project card
5. **Manage Members**: Add/remove members from the project
6. **Discussion**: Send messages in the discussion board
7. **Edit Frame**: Edit the introduction frame content
8. **Logout**: Use logout button to return to login

## Notes

- All data is stored in Redux store (in-memory)
- Data persists during the session but resets on page refresh
- The application is fully functional for testing workflows
- UI is responsive and mobile-friendly
- Accessibility features included (ARIA labels, semantic HTML)

## License

MIT

## Author

Created as an MVP for Radiocarbon Team Collaboration Platform.
