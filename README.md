# Connection With Intention Private Practice Website

A single page application for a private practice specializing in early childhood mental health. The site is built with Vue 3, TypeScript, and is deployed using Firebase.

## Running the Project Locally

### Prerequisites

* Node.js 18+ and npm
* Firebase CLI (only required for deployment)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url>
   cd Connection-With-Intention
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build the project for production:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

## Deploying to Firebase Hosting

### Step 1: Setup Firebase

Install the Firebase CLI and log in:

```bash
npm install -g firebase-tools
firebase login
```

Initialize Firebase Hosting in your project:

```bash
firebase init hosting
```

### Step 2: Configure Firebase

Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-project-id-here"
  }
}
```

The default `firebase.json` configuration included in the repo is already optimized for deployment.

### Step 3: Deploy the Site

Build the project and deploy:

```bash
npm run build
firebase deploy
```

For testing changes on a preview channel:

```bash
firebase hosting:channel:deploy preview
```

### Step 4: Set Up a Custom Domain (Optional)

1. In the Firebase Console, navigate to **Hosting**.
2. Add your custom domain.
3. Follow the DNS configuration steps provided.
4. Update your site URL in the codebase after verification.

---

This project is licensed under the MIT License. See the LICENSE file for details.
