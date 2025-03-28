# Workflow Management System

This is a Workflow Management System built using React and Firebase Firestore for data storage. The application allows users to create, manage, and execute workflows with various components, including API calls and email triggers.

## Features

### Authentication
- User login with email and password

### Workflow List View
- Display a list of workflows with status indicators (passed/failed)
- Search workflows by name or ID
- Execute workflows with a single click (with a confirmation modal)
- Edit existing workflows
- Create new workflows

### Workflow Creator
- Define start and end points
- Add multiple step types (API calls, emails, etc.)
- Connect steps in a logical sequence
- Delete workflow steps
- Save progress functionality
- Flowchart visualization using `react-flow`
- Zoom in/out and canvas panning

## Tech Stack
- **Frontend:** React
- **State Management:** Redux
- **Data Storage:** Firebase Firestore
- **Deployment:** Vercel

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/workflow-management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd workflow-management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

5. Start the development server:
   ```sh
   npm start
   ```

## Deployment

1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to Vercel:
   ```sh
   vercel
   ```


## Usage
- Login with your email and password.
- Create workflows by adding steps and connecting them.
- Save and execute workflows.
- View workflow statuses and manage existing workflows.

## Resources
- **Figma Design:** [View Design](https://www.figma.com/design/c0wuuxwwZlP4zbwOpWt5rY/Assignment?node-id=0-1&t=V0ZJtJUEjucmXBzb-1)
- **Prototype:** [View Prototype](https://www.figma.com/proto/c0wuuxwwZlP4zbwOpWt5rY/Assignment?page-id=0%3A1&node-id=7-7306&viewport=-13981%2C-7569%2C0.24&t=tO7BlFJSbit8zvjx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A7306)
- **Mock API:** [Beeceptor Sample API](https://beeceptor.com/docs/sample-api-for-testing)
