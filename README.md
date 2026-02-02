# Muskan Minhas - Portfolio & Task Manager

This is a streamlined portfolio website with integrated task management functionality.

## Project Structure

```
portfolio/
├── index.html                 # Main portfolio page with Weekly Learning Journey
├── task-manager.html          # Task Manager web application
├── css/
│   ├── style.css             # Main portfolio styles
│   └── task-manager.css      # Task manager styles
├── js/
│   ├── script.js             # Portfolio interactions
│   └── task-manager.js       # Task manager functionality
├── assets/
│   └── profile.jpg           # Profile image
└── README.md                 # This file
```

## Features

### Portfolio (index.html)
- **Simplified Navigation**: Home, Consolidated Tasks, Task Manager
- **Home Section**: Introduction with elegant design
- **Weekly Learning Journey**: 10 weeks of web development topics (Week 1-10)
  - Each week displayed in a modern card format
  - Topics include: Web Technologies, GitHub, Deployment, Multimedia, UX, CMS, and more

### Task Manager (task-manager.html)
A fully functional task management application with:

**Features:**
-  Add, edit, and delete tasks
-  Task details: title, description, due date, category
-  Status management: "In Progress" or "Completed"
-  Categories: Work, Personal, Study, Health, Other
-  Search functionality
-  Filter by category and status
-  Sort by due date or title
-  Task statistics dashboard
-  Overdue task indicators
-  Responsive design for all devices

**Technology Stack:**
- HTML5 for structure
- CSS3 for modern, elegant styling
- Vanilla JavaScript for functionality
- LocalStorage for data persistence (no database setup needed)

## How to Use

### Running the Portfolio

1. Open `index.html` in a web browser
2. Navigate through the sections using the navigation bar
3. View the 10-week learning journey in the Consolidated Tasks section
4. Click "Task Manager" to access the task management application

### Using the Task Manager

1. **Add a Task:**
   - Fill in the form with task title, description, due date, and category
   - Click "Add Task" button

2. **View Tasks:**
   - All tasks are displayed in card format
   - See task status, category, and due date
   - Overdue tasks are highlighted in red

3. **Edit a Task:**
   - Click the edit icon (pencil) on any task card
   - Modify the details in the modal
   - Click "Save Changes"

4. **Complete a Task:**
   - Click the checkbox next to any task
   - Task will be marked as completed

5. **Delete a Task:**
   - Click the delete icon (trash) on any task card
   - Confirm deletion

6. **Filter & Search:**
   - Use the search box to find tasks by title or description
   - Filter by category (Work, Personal, Study, Health, Other)
   - Filter by status (In Progress, Completed)
   - Sort by due date or title

## Design Features

### Color Palette
- Primary: Dark charcoal (#2d3436)
- Accent: Vibrant red (#d63031)
- Background: Clean white (#fefefe)
- Status colors for different task states

### Typography
- Display font: Playfair Display (elegant serif)
- Body font: Work Sans (modern sans-serif)

### Animations
- Smooth fade-in effects
- Hover state transitions
- Card elevation on hover
- Floating elements in the hero section

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Storage

The Task Manager uses **localStorage** for data persistence:
- All tasks are saved locally in your browser
- Data persists between sessions
- No server or database required
- Data is specific to each browser/device

## Responsive Design

The portfolio is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Week-by-Week Learning Content

**Week 1:** Web Development Technologies - RWD, PWA, Mobile-First Development
**Week 2:** GitHub & Version Control - Repositories, CI/CD, Collaboration
**Week 3:** Web Server Deployment - Hosting, DNS, SSL
**Week 4:** Multimedia Integration - HTML5, WebGL, Accessibility
**Week 5:** UX Enhancement - CSS, JavaScript, WCAG Standards
**Week 6:** ASP & JSP Technologies - Server-side Development
**Week 7:** Content Management Systems - WordPress, Drupal, Joomla
**Week 8:** Modern Web Technologies - SPA, AJAX, APIs
**Week 9:** Local Development Environment - LAMP/WAMP Stack
**Week 10:** User Authentication & Security - Hashing, 2FA, GDPR

## Future Enhancements (Optional)

- Backend integration with Node.js/Express
- Database storage (MongoDB/PostgreSQL)
- User authentication
- Task sharing/collaboration
- Email notifications
- Calendar integration
- Export tasks to PDF/CSV

## Credits

Designed and developed by Muskan Minhas
© 2026 All rights reserved

---

For any questions or support, please contact through the portfolio website.