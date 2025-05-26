# 🚀 React + Vite + Netlify CMS Setup Guide

A complete guide to set up a React + Vite application with DecapCMS (Netlify CMS) for content management, using GitHub for content storage and Netlify for deployment.

## 📋 Prerequisites

- Node.js (v16 or higher)
- Git repository on GitHub
- Netlify account

## 📁 Project Structure

```
my-react-app/
├── public/
│   ├── admin/
│   │   ├── config.yml        # CMS configuration
│   │   └── index.html        # CMS admin interface
│   └── uploads/              # Media uploads folder
├── src/
│   ├── content/
│   │   └── projects.json     # Content data file
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── netlify.toml              # Netlify deployment config
```

## 🛠️ Setup Instructions

### Step 1: Create React + Vite Project

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
```

### Step 2: Create Content Structure

Create the content directory and initial data file:

```bash
mkdir -p src/content
```

Create `src/content/projects.json`:
```json
{
  "projects": []
}
```

### Step 3: Set Up Netlify CMS Admin

Create the admin directory in public folder:

```bash
mkdir -p public/admin
mkdir -p public/uploads
```

Create `public/admin/index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.10.0/dist/netlify-cms.js"></script>
</body>
</html>
```

Create `public/admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "projects"
    label: "Projects"
    files:
      - label: "All Projects"
        name: "projects"
        file: "src/content/projects.json"
        format: "json"
        fields:
          - label: "Projects"
            name: "projects"
            widget: "list"
            label_singular: "Project"
            fields:
              - label: "Title"
                name: "title"
                widget: "string"
                required: true
              - label: "Description"
                name: "description"
                widget: "text"
                required: true
              - label: "Link"
                name: "link"
                widget: "string"
                required: false
              - label: "Image"
                name: "image"
                widget: "image"
                required: false
              - label: "Tags"
                name: "tags"
                widget: "list"
                required: false
```

### Step 4: Configure Netlify Deployment

Create `netlify.toml` in your project root:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 5: Set Up Netlify Identity & Git Gateway

1. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Deploy the site

2. **Enable Netlify Identity:**
   - Go to Site Settings → Identity
   - Click "Enable Identity"

3. **Configure Git Gateway:**
   - In Identity settings, go to Services
   - Enable "Git Gateway"

4. **Invite Users:**
   - Go to Identity → Users
   - Click "Invite users"
   - Add your email address

5. **Set Registration Preferences:**
   - Go to Identity → Settings
   - Set registration to "Invite only" for security

### Step 6: Access the CMS

1. Visit `https://your-site-name.netlify.app/admin/`
2. Click "Login with Netlify Identity"
3. Check your email for the invitation
4. Set your password and start managing content!

## 📝 Using Content in React

### Basic Usage

```jsx
// src/components/ProjectList.jsx
import { useState, useEffect } from 'react'

function ProjectList() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Import the JSON file
    import('../content/projects.json')
      .then(data => setProjects(data.projects))
      .catch(err => console.error('Error loading projects:', err))
  }, [])

  return (
    <div className="project-list">
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects yet. Add some via the CMS!</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              )}
              {project.tags && (
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
```

### Advanced: Multiple Collections

For multiple content types, update your `config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "projects"
    label: "Projects"
    files:
      - label: "All Projects"
        name: "projects"
        file: "src/content/projects.json"
        format: "json"
        fields:
          - label: "Projects"
            name: "projects"
            widget: "list"
            # ... project fields

  - name: "blog"
    label: "Blog Posts"
    files:
      - label: "All Posts"
        name: "posts"
        file: "src/content/blog.json"
        format: "json"
        fields:
          - label: "Posts"
            name: "posts"
            widget: "list"
            label_singular: "Post"
            fields:
              - label: "Title"
                name: "title"
                widget: "string"
              - label: "Content"
                name: "content"
                widget: "markdown"
              - label: "Date"
                name: "date"
                widget: "datetime"
              - label: "Featured Image"
                name: "image"
                widget: "image"
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🐛 Troubleshooting

### Common Issues & Solutions

**1. CMS not loading at `/admin/`**
- Ensure `public/admin/index.html` exists
- Check that Netlify Identity is enabled
- Verify Git Gateway is configured

**2. "Must have required property 'folder' or 'files'" error**
- Check YAML indentation (use 2 spaces, no tabs)
- Ensure `file:` path points to existing file
- Verify the content file is committed to Git

**3. Images not uploading**
- Ensure `public/uploads/` folder exists
- Check `media_folder` and `public_folder` paths in config.yml
- Verify write permissions on Netlify

**4. Content not updating in React**
- Content changes require a new deployment
- Consider using dynamic imports or API endpoints for real-time updates

**5. Authentication issues**
- Check that you've accepted the Netlify Identity invitation
- Ensure registration is set to "Invite only"
- Try logging out and back in

## 🚀 Next Steps

- **Add more content types:** Extend your config.yml with additional collections
- **Style your CMS:** Customize the admin interface with custom CSS
- **Add validation:** Use field validation rules in your config
- **Implement search:** Add search functionality to your content
- **Set up environments:** Create staging and production branches

## 📚 Additional Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)

---

**🎉 Congratulations!** You now have a modern React + Vite application with a powerful CMS for content management. Start adding content through your admin panel at `/admin/`!
