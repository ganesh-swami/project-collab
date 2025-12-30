# Radiocarbon MVP - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               Next.js Frontend (React)                  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │        Components (TSX)                           │  │ │
│  │  │  - LoginPage, Dashboard, ProjectDetails, etc     │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                        ↓                                 │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │     Redux Store (State Management)               │  │ │
│  │  │  - authSlice (user, isAuthenticated)             │  │ │
│  │  │  - projectsSlice (projects, currentProject)      │  │ │
│  │  │  - membersSlice (members, status)                │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                        ↓                                 │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │     shadcn/ui Components + Tailwind CSS          │  │ │
│  │  │  - Buttons, Inputs, Modals, Tabs, etc           │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Redux Store Schema

### Auth Slice (`authSlice.ts`)
```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    role: "super-admin" | "admin" | "participant";
  } | null;
  isAuthenticated: boolean;
}
```

**Actions:**
- `login(user)` - Set authenticated user
- `logout()` - Clear user and set isAuthenticated to false

---

### Projects Slice (`projectsSlice.ts`)
```typescript
{
  projects: [
    {
      id: string;
      name: string;
      color: string;
      startDate: string;
      endDate: string;
      participantCap: number;
      members: string[]; // User IDs
      createdBy: string;
      frames: Frame[];
      messages: Message[];
    }
  ];
  currentProject: Project | null;
  showCreateModal: boolean;
}

interface Frame {
  id: string;
  title: string;
  content: string;
  attachments: string[];
  discussion: string;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  timestamp: string;
  attachments: string[];
}
```

**Actions:**
- `createProject(project)` - Add new project
- `setCurrentProject(project)` - Set active project
- `toggleCreateModal(boolean)` - Show/hide create modal
- `updateProject(project)` - Update existing project
- `deleteProject(projectId)` - Remove project
- `addMemberToProject({projectId, memberId})` - Add member
- `removeMemberFromProject({projectId, memberId})` - Remove member
- `updateFrameInProject({projectId, frame})` - Update frame content
- `addMessageToProject({projectId, message})` - Add message

---

### Members Slice (`membersSlice.ts`)
```typescript
{
  members: [
    {
      id: string;
      name: string;
      email: string;
      role: "super-admin" | "admin" | "participant";
      status: "online" | "offline";
      avatar?: string;
    }
  ];
}
```

**Actions:**
- `addMember(member)` - Add new member
- `updateMemberStatus({memberId, status})` - Change online/offline

---

## Component Data Flow

### Login Flow
```
LoginPage Component
    ↓
User enters credentials
    ↓
Matches demo account?
    ↓ YES
dispatch(login(user))
    ↓
Redux Store updated
    ↓
useRouter.push("/dashboard")
```

### Project Creation Flow
```
Dashboard Component
    ↓
Click "Create New Project"
    ↓
dispatch(toggleCreateModal(true))
    ↓
CreateProjectModal renders
    ↓
User fills form & clicks "Save Changes"
    ↓
dispatch(createProject(newProject))
    ↓
Redux Store updated
    ↓
Modal closes automatically
    ↓
Project appears in dashboard
```

### Project Navigation Flow
```
Dashboard Component
    ↓
Click project card
    ↓
dispatch(setCurrentProject(project))
    ↓
useRouter.push("/projects/[id]")
    ↓
ProjectDetailsPage renders
    ↓
useSelector gets currentProject from store
    ↓
Displays: StandardFrame, MembersList, DiscussionBoard
```

### Add Member Flow
```
MembersList Component
    ↓
User enters email & clicks "Add"
    ↓
Find member from members.slice
    ↓
dispatch(addMemberToProject({projectId, memberId}))
    ↓
Redux: project.members array updated
    ↓
Component re-renders with new member
```

### Send Message Flow
```
DiscussionBoard Component
    ↓
User types message & clicks "Send" (or Ctrl+Enter)
    ↓
Create Message object with:
  - userId, userName, userEmail
  - content, timestamp
  - id (generated from Date.now())
    ↓
dispatch(addMessageToProject({projectId, message}))
    ↓
Redux: project.messages array updated
    ↓
Component re-renders with new message
```

---

## Component Props & State

### LoginPage
**State:**
- `email: string` - User email input
- `password: string` - Password input
- `error: string` - Error message display

**Actions:**
- `handleLogin()` - Validate and dispatch login action
- `demoAccounts[]` - Array of test credentials

---

### CreateProjectModal
**Redux State (useSelector):**
- `showModal: boolean` - Modal visibility
- `user: User` - Current user

**Local State:**
- `formData: {name, color, startDate, endDate, participantCap}`

**Actions:**
- `handleSubmit()` - Create project
- `handleClose()` - Close modal

---

### Dashboard
**Redux State (useSelector):**
- `user: User` - Current authenticated user
- `projects: Project[]` - All projects

**Renders:**
- Project cards with: name, color, members, dates
- Create button (disabled if no user)
- Logout button

---

### StandardFrame
**Props:**
- `projectId: string`

**Redux State (useSelector):**
- `project: Project` - Current project
- `frame: Frame` - First frame (index 0)

**Local State:**
- `isEditing: boolean` - Edit mode toggle
- `editContent: string` - Edited content

**Features:**
- Display introduction content
- Edit frame content inline
- Show attachments
- Discussion section placeholder

---

### MembersList
**Props:**
- `projectId: string`

**Redux State (useSelector):**
- `project: Project` - Current project
- `allMembers: TeamMember[]` - All team members

**Local State:**
- `emailInput: string` - Email input for adding member

**Features:**
- Display project members with roles and status
- Add members from available pool
- Remove members from project
- Member avatars and information

---

### DiscussionBoard
**Props:**
- `projectId: string`

**Redux State (useSelector):**
- `project: Project` - Current project
- `user: User` - Current user
- `messages: Message[]` - Project messages

**Local State:**
- `message: string` - Message text input

**Features:**
- Display all messages with user info
- Send new messages
- Timestamp formatting
- User avatars

---

### ProjectDetailsPage
**Route Parameters:**
- `id: string` - Project ID from URL

**Redux State (useSelector):**
- `user: User` - Current user
- `project: Project` - Current project
- `allMembers: TeamMember[]` - Team members

**Features:**
- Project header with navigation
- Responsive grid layout
- Three sub-components:
  - StandardFrame (left)
  - Project Info (right sidebar)
  - MembersList (bottom left)
  - DiscussionBoard (bottom right)

---

## Data Persistence Strategy

### Current Implementation (MVP)
- All data stored in Redux store (in-memory)
- Session-based persistence
- Resets on page refresh or browser close

### Future Implementation
1. **Local Storage** (intermediate)
   ```typescript
   // Save on every action
   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
   
   // Load on app init
   const savedState = localStorage.getItem('reduxState');
   ```

2. **Backend API** (production)
   ```typescript
   // Replace Redux actions with API calls
   const createProject = async (project) => {
     const response = await fetch('/api/projects', {
       method: 'POST',
       body: JSON.stringify(project)
     });
     return response.json();
   };
   ```

---

## Type System

### Role-Based Access (Future Implementation)
```typescript
type Permission = 
  | "create_project"
  | "edit_project"
  | "delete_project"
  | "add_member"
  | "remove_member"
  | "send_message"
  | "edit_frame";

const rolePermissions: Record<Role, Permission[]> = {
  "super-admin": [/* all permissions */],
  "admin": [/* most permissions */],
  "participant": [/* send_message, view_project */]
};
```

---

## Routing Structure

```
/                    → Redirects to /login
├── /login           → LoginPage
│   └── POST data → Redux store
│
├── /dashboard       → Dashboard/Projects List
│   ├── GET projects from Redux
│   └── Modal:
│       └── CreateProjectModal
│
└── /projects/[id]   → Project Details
    ├── GET project from Redux
    ├── StandardFrame component
    ├── MembersList component
    └── DiscussionBoard component
```

---

## Future Integration Points

### Backend API
1. **Authentication Endpoint**
   - Replace demo accounts with `/api/auth/login`
   - Add JWT token management

2. **Projects Endpoints**
   - `POST /api/projects` - Create
   - `GET /api/projects` - List
   - `PUT /api/projects/:id` - Update
   - `DELETE /api/projects/:id` - Delete

3. **Members Endpoints**
   - `POST /api/projects/:id/members` - Add
   - `DELETE /api/projects/:id/members/:memberId` - Remove
   - `GET /api/members` - List all

4. **Messages Endpoints**
   - `POST /api/projects/:id/messages` - Send
   - `GET /api/projects/:id/messages` - List

### Real-Time Features
- WebSocket connection for live messaging
- Real-time member status updates
- Live project update notifications

---

## Performance Considerations

### Redux Store Optimization
- Use `useSelector` with selectors for specific data
- Memoize heavy computations with `useMemo`
- Lazy load project data

### Component Optimization
- Convert components to React.memo() if needed
- Split large components (currently optimized)
- Use code splitting for route-based loading

### Asset Optimization
- Image optimization (future with real uploads)
- CSS minification (automatic with Tailwind)
- Bundle size monitoring

---

## Error Handling Strategy

### Current Implementation
- Simple alert() for validation errors
- No error state in Redux

### Recommended Improvements
```typescript
// Add error handling slice
const errorSlice = createSlice({
  name: 'errors',
  initialState: { message: null, code: null },
  reducers: {
    setError: (state, action) => { /* ... */ },
    clearError: (state) => { /* ... */ }
  }
});
```

---

## Testing Strategy

### Unit Tests (Future)
- Redux reducers and selectors
- Component props and state changes
- Form validation

### Integration Tests (Future)
- User login flow
- Project creation workflow
- Member addition flow

### E2E Tests (Future)
- Complete user journey
- Cross-browser testing
- Mobile responsiveness

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Error boundaries added
- [ ] Analytics integrated
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
