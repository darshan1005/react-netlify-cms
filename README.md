# 🚀 React + Netlify CMS + GitHub Content (Single JSON File Setup)

This guide walks you through setting up a React SPA with DecapCMS (Netlify CMS), using GitHub as your content storage and Netlify for deployment.

---

## 📁 Project Structure Overview

```bash
my-app/
├── public/
│   └── uploads/              # For uploaded images
├── src/
│   └── content/
│       └── projects.json     # All project entries in one JSON array
├── static/
│   └── admin/
│       ├── config.yml        # Netlify CMS configuration
│       └── index.html        # CMS entry point
├── netlify.toml              # Netlify configuration (optional)
├── package.json
└── README.md
```

---

## ✅ Step-by-Step Guide

### 1. ✅ Create the Content File

```bash
mkdir -p src/content
```

Then create `projects.json` with this content:

For single File
```
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "projects"
    label: "Projects"
    files:
      - label: "Projects"
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
              - label: "Description"
                name: "description"
                widget: "text"
              - label: "Link"
                name: "link"
                widget: "string"
              - label: "Image"
                name: "image"
                widget: "image"
```
```json
{
  "projects": []
}
```
Commit it to Git:

```bash
git add src/content/projects.json
git commit -m "Add empty projects.json for Netlify CMS"
```

For multiple file 
```
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "data"
    label: "Data"
    files:
      - label: "Items"
        name: "items"
        file: "src/content/data/items.json"
        format: "json"
        fields:
          - label: "Items"
            name: "items"
            widget: "list"
            label_singular: "Item"
            fields:
              - label: "Title"
                name: "title"
                widget: "string"
              - label: "Description"
                name: "description"
                widget: "text"
              - label: "Price"
                name: "price"
                widget: "number"
              - label: "Image"
                name: "image"
                widget: "image"

      - label: "Products"
        name: "products"
        file: "src/content/data/products.json"
        format: "json"
        fields:
          - label: "Products"
            name: "products"
            widget: "list"
            label_singular: "Product"
            fields:
              - label: "Title"
                name: "title"
                widget: "string"
              - label: "Description"
                name: "description"
                widget: "text"
              - label: "Price"
                name: "price"
                widget: "number"
              - label: "Image"
                name: "image"
                widget: "image"
```
```
Output : 
src/content/data/
├── items.json
└── products.json
```

---

### 2. ✅ Create the CMS Admin Area

Inside your React project:

```bash
mkdir -p static/admin
```

**public/admin/index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    <script src="https://unpkg.com/netlify-cms@^2.10.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

---

### 3. ✅ Configure `config.yml`

**public/admin/config.yml**:

---

### 4. ✅ Enable Identity and Git Gateway on Netlify

1. Go to your Netlify site → **Site Settings → Identity** / **PROJECT CONFIGURATION**
2. Enable **Identity**
3. Go to **Identity → Services → Git Gateway** → Enable it
4. Under **Identity → Users**, invite yourself with an email to log in

---

### 5. ✅ Deploy and Access CMS

* Push your project to GitHub
* Deploy it via Netlify (connect your GitHub repo)
* Visit `https://your-site.netlify.app/admin/`
* Log in with the invited Identity email

---

### 6. ✅ Fetch the JSON in React

```js
import projects from './content/projects.json';

function ProjectList() {
  return (
    <div>
      {projects.projects.map((item, i) => (
        <div key={i}>
          <h2>{item.title}</h2>
          <img src={item.image} alt={item.title} />
          <p>{item.description}</p>
          <a href={item.link}>Visit</a>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧼 Common Errors

### Error: `must have required property 'folder' or 'files'`

* This happens if `file:` collections are missing the file or are mis-indented

### Fix:

* Ensure `projects.json` exists and is committed
* Ensure clean YAML format (2 spaces per indent, no tabs)

---

## ✅ You’re Done!

You now have a React app using Netlify CMS, editing a single JSON file via a beautiful admin UI 🎉

Let me know if you'd like an actual repo or zip to get started faster.

`Ca0+aGk1F>11&}&/`
