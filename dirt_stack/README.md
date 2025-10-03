# DIRT Stack Template

A comprehensive full-stack web development template that seamlessly combines the power of Django's robust backend with React's dynamic frontend through Inertia.js, styled with Tailwind CSS.

## 🏗️ Architecture Overview

The **DIRT Stack** represents a modern approach to full-stack development:

- **🐍 Django** - Robust Python web framework handling authentication, database operations, and server-side logic
- **🔗 Inertia.js** - The bridge that eliminates the need for REST APIs while maintaining SPA-like user experience
- **⚛️ React** - Component-based frontend library for building interactive user interfaces
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Why This Stack?

**Traditional SPA Problems Solved:**
- ❌ No complex API design and maintenance
- ❌ No authentication token management
- ❌ No CORS configuration headaches
- ❌ No duplicate validation logic

**DIRT Stack Benefits:**
- ✅ Server-side rendering with client-side navigation
- ✅ Shared authentication state
- ✅ Direct data passing from Django to React
- ✅ SEO-friendly with progressive enhancement
- ✅ Simplified deployment (single application)

## 🚀 Quick Start Guide

### Prerequisites

Ensure you have the following installed:

| Software | Minimum Version | Recommended | Check Command |
|----------|----------------|-------------|---------------|
| Python | 3.8+ | 3.11+ | `python3 --version` |
| Node.js | 16+ | 18+ | `node --version` |
| npm | 7+ | 9+ | `npm --version` |

### Installation Steps

1. **Clone and Navigate**
   ```bash
   git clone <your-repo-url>
   cd dirt-stack
   ```

2. **Automated Setup**
   ```bash
   # Unix/Linux/macOS
   chmod +x setup.sh && ./setup.sh

   # Windows
   setup.bat
   ```

3. **Manual Setup (Alternative)**
   ```bash
   # Backend setup
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate

   # Frontend setup
   cd ../frontend
   npm install
   npm run build
   ```

4. **Start Development Server**
   ```bash
   cd backend
   source venv/bin/activate  # Windows: venv\Scripts\activate
   python manage.py runserver
   ```

5. **Visit Your Application**
   Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser

## 📁 Project Structure

```
dirt-stack/
├── 🗂️ backend/                    # Django Backend
│   ├── 📁 dirt_project/           # Django Project Configuration
│   │   ├── ⚙️ settings.py         # Django settings with Inertia config
│   │   ├── 🛣️ urls.py             # Main URL routing
│   │   └── 🚀 wsgi.py             # WSGI application entry
│   ├── 📁 pages/                  # Django App for Pages
│   │   ├── 👁️ views.py            # Inertia render views
│   │   ├── 🛣️ urls.py             # Page-specific routes
│   │   └── 🧪 tests.py            # Backend tests
│   ├── 📁 templates/              # Django Templates
│   │   └── 📄 app.html            # Base HTML template for Inertia
│   ├── 🗄️ db.sqlite3             # SQLite database (development)
│   ├── 🐍 manage.py               # Django management commands
│   └── 📋 requirements.txt        # Python dependencies
├── 🗂️ frontend/                   # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 Pages/              # React Page Components (Inertia Pages)
│   │   │   ├── 🏠 Home.jsx        # Home page component
│   │   │   ├── ℹ️ About.jsx       # About page component
│   │   │   ├── 📞 Contact.jsx     # Contact page component
│   │   │   └── ... (other pages)
│   │   ├── 🎯 main.jsx            # React application entry point
│   │   └── 🎨 index.css           # Global styles and Tailwind imports
│   ├── 📁 dist/                   # Built assets (auto-generated)
│   │   ├── 📁 assets/             # Compiled JS/CSS files
│   │   └── 📄 .vite/manifest.json # Build manifest for asset mapping
│   ├── 📦 package.json            # Node.js dependencies and scripts
│   ├── ⚡ vite.config.js          # Vite build configuration
│   ├── 🎨 tailwind.config.js      # Tailwind CSS configuration
│   └── 🔧 postcss.config.js       # PostCSS configuration
├── 🔧 setup.sh                    # Unix setup automation script
├── 🔧 setup.bat                   # Windows setup automation script
└── 📖 README.md                   # This comprehensive guide
```

## 🔄 How Django and React Communicate

### The Inertia.js Bridge

Inertia.js eliminates the traditional API layer by creating a seamless bridge between Django and React. Unlike traditional SPAs that require separate REST APIs, Inertia allows Django views to directly pass data to React components as props.

**Data Flow:**
```
User Request → Django View → Inertia render() → JSON Response → React Component → Rendered Page
```

### Communication Example: Complete Data Flow

#### 1. Django Backend (Data Provider)

```python
# backend/pages/views.py
from inertia import render
from django.contrib.auth.decorators import login_required

def home(request):
    """Home page with user data and posts"""
    return render(request, 'Home', {
        'message': 'Welcome to DIRT Stack!',
        'user': {
            'name': request.user.username if request.user.is_authenticated else 'Guest',
            'is_authenticated': request.user.is_authenticated,
        },
        'posts': [
            {
                'id': 1,
                'title': 'Getting Started with DIRT Stack',
                'excerpt': 'Learn how Django and React work together...',
                'published_at': '2024-01-15'
            },
            {
                'id': 2,
                'title': 'Building Modern Web Apps',
                'excerpt': 'Discover the power of Inertia.js...',
                'published_at': '2024-01-20'
            }
        ],
        'stats': {
            'total_posts': 2,
            'total_users': 150,
            'last_updated': '2024-01-20T10:30:00Z'
        }
    })

@login_required
def dashboard(request):
    """Protected dashboard with user-specific data"""
    return render(request, 'Dashboard', {
        'user': request.user,
        'notifications': request.user.notifications.unread(),
        'recent_activity': get_user_activity(request.user),
    })
```

#### 2. React Frontend (Data Consumer)

```jsx
// frontend/src/Pages/Home.jsx
import React from 'react'
import { Link, Head } from '@inertiajs/react'

export default function Home({ message, user, posts, stats }) {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
                {/* Header with user info */}
                <header className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold text-gray-900">{message}</h1>
                        <p className="text-gray-600">
                            Welcome back, {user.name}!
                            {user.is_authenticated ? ' You are logged in.' : ' Please log in.'}
                        </p>
                    </div>
                </header>

                {/* Stats Dashboard */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold">Total Posts</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.total_posts}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold">Total Users</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.total_users}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold">Last Updated</h3>
                            <p className="text-sm text-gray-600">
                                {new Date(stats.last_updated).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-xl font-semibold">Recent Posts</h2>
                        </div>
                        <div className="divide-y">
                            {posts.map(post => (
                                <div key={post.id} className="px-6 py-4">
                                    <h3 className="font-semibold text-lg">{post.title}</h3>
                                    <p className="text-gray-600 mt-1">{post.excerpt}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Published: {post.published_at}
                                    </p>
                                    <Link
                                        href={`/posts/${post.id}/`}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Read more →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
```

### Key Communication Principles

1. **No API Endpoints Needed**: Django views directly pass data to React components
2. **Automatic Serialization**: Inertia handles JSON conversion automatically
3. **Type Safety**: Props received in React match exactly what Django sends
4. **Real-time Updates**: Form submissions and navigation happen seamlessly

#### Form Handling Example

**Django Form Processing:**
```python
def contact(request):
    if request.method == 'POST':
        # Process form data
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # Save to database or send email
        Contact.objects.create(name=name, email=email, message=message)

        # Redirect with success message
        return redirect('/').with_success('Message sent successfully!')

    return render(request, 'Contact', {
        'form_fields': ['name', 'email', 'message']
    })
```

**React Form Component:**
```jsx
import { useForm } from '@inertiajs/react'

export default function Contact({ form_fields }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/contact/')  // Posts directly to Django view
    }

    return (
        <form onSubmit={submit} className="max-w-md mx-auto">
            <input
                type="text"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                placeholder="Your Name"
                className="w-full p-2 border rounded mb-4"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}

            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {processing ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
```

## 🛠️ Development Workflow

### Development Modes

#### Mode 1: Production-like Development (Recommended)
```bash
# Single terminal - serves built assets
cd backend
source venv/bin/activate
python manage.py runserver

# When you make frontend changes:
cd frontend && npm run build
```

**Pros:** Matches production exactly, faster page loads
**Cons:** Need to rebuild after frontend changes

#### Mode 2: Hot Reload Development
```bash
# Terminal 1: Django backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2: Vite dev server (hot reload)
cd frontend
npm run dev
```

**Pros:** Instant frontend updates, great for UI development
**Cons:** Slightly different from production

### Adding New Features

#### Creating a New Page

1. **Add Django URL Pattern:**
   ```python
   # backend/pages/urls.py
   path('new-page/', views.new_page, name='new_page'),
   ```

2. **Create Django View:**
   ```python
   # backend/pages/views.py
   def new_page(request):
       return render(request, 'NewPage', {
           'title': 'My New Page',
           'data': 'Some data from Django',
           'items': ['Item 1', 'Item 2', 'Item 3']
       })
   ```

3. **Create React Component:**
   ```jsx
   // frontend/src/Pages/NewPage.jsx
   import React from 'react'
   import { Link, Head } from '@inertiajs/react'

   export default function NewPage({ title, data, items }) {
       return (
           <>
               <Head title={title} />
               <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
                   <div className="container mx-auto px-4 py-8">
                       <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
                       <p className="text-white mb-4">{data}</p>
                       <ul className="text-white">
                           {items.map((item, index) => (
                               <li key={index} className="mb-2">• {item}</li>
                           ))}
                       </ul>
                       <Link href="/" className="text-blue-200 hover:text-white">
                           ← Back to Home
                       </Link>
                   </div>
               </div>
           </>
       )
   }
   ```

4. **Rebuild Frontend:**
   ```bash
   cd frontend && npm run build
   ```

## � Creating New Django Apps

### Adding Independent Django Apps

The DIRT stack supports multiple Django apps for better code organization. Here's how to create and integrate new apps:

#### 1. Create a New Django App

```bash
# Navigate to backend directory
cd backend
source venv/bin/activate

# Create new app (e.g., 'blog', 'products', 'users')
python manage.py startapp blog
```

#### 2. Configure the New App

**Add to Django settings:**
```python
# backend/dirt_project/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'inertia',
    'pages',  # Existing app
    'blog',   # New app
]
```

#### 3. Create Models (Optional)

```python
# backend/blog/models.py
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=300)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
```

#### 4. Create and Run Migrations

```bash
# Create migrations for the new app
python manage.py makemigrations blog

# Apply migrations
python manage.py migrate
```

#### 5. Create Inertia Views

```python
# backend/blog/views.py
from inertia import render
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from .models import Post, Category

def blog_index(request):
    """Blog listing page"""
    posts = Post.objects.filter(published=True)
    categories = Category.objects.all()

    # Pagination
    paginator = Paginator(posts, 6)  # 6 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'Blog/Index', {
        'posts': [
            {
                'id': post.id,
                'title': post.title,
                'slug': post.slug,
                'excerpt': post.excerpt,
                'author': post.author.username,
                'category': post.category.name,
                'created_at': post.created_at.strftime('%Y-%m-%d'),
            }
            for post in page_obj
        ],
        'categories': [
            {'id': cat.id, 'name': cat.name, 'slug': cat.slug}
            for cat in categories
        ],
        'pagination': {
            'has_previous': page_obj.has_previous(),
            'has_next': page_obj.has_next(),
            'current_page': page_obj.number,
            'total_pages': paginator.num_pages,
        }
    })

def blog_detail(request, slug):
    """Individual blog post page"""
    post = get_object_or_404(Post, slug=slug, published=True)
    related_posts = Post.objects.filter(
        category=post.category,
        published=True
    ).exclude(id=post.id)[:3]

    return render(request, 'Blog/Detail', {
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username,
            'category': post.category.name,
            'created_at': post.created_at.strftime('%B %d, %Y'),
            'updated_at': post.updated_at.strftime('%B %d, %Y'),
        },
        'related_posts': [
            {
                'id': p.id,
                'title': p.title,
                'slug': p.slug,
                'excerpt': p.excerpt,
            }
            for p in related_posts
        ]
    })

def blog_category(request, slug):
    """Posts by category"""
    category = get_object_or_404(Category, slug=slug)
    posts = Post.objects.filter(category=category, published=True)

    return render(request, 'Blog/Category', {
        'category': {
            'name': category.name,
            'slug': category.slug,
        },
        'posts': [
            {
                'id': post.id,
                'title': post.title,
                'slug': post.slug,
                'excerpt': post.excerpt,
                'author': post.author.username,
                'created_at': post.created_at.strftime('%Y-%m-%d'),
            }
            for post in posts
        ]
    })
```

#### 6. Create App URLs

```python
# backend/blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.blog_index, name='index'),
    path('category/<slug:slug>/', views.blog_category, name='category'),
    path('<slug:slug>/', views.blog_detail, name='detail'),
]
```

#### 7. Include App URLs in Main URLs

```python
# backend/dirt_project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls')),      # Existing pages app
    path('blog/', include('blog.urls')),  # New blog app
]
```

### 🎨 Creating React Components for New App

#### 1. Create App-Specific Component Directory

```bash
# Create directory structure
mkdir -p frontend/src/Pages/Blog
```

#### 2. Blog Index Component

```jsx
// frontend/src/Pages/Blog/Index.jsx
import React from 'react'
import { Link, Head } from '@inertiajs/react'

export default function BlogIndex({ posts, categories, pagination }) {
    return (
        <>
            <Head title="Blog" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                        <p className="text-gray-600 mt-2">Latest articles and insights</p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {posts.map(post => (
                                    <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <span>{post.author}</span>
                                                <span className="mx-2">•</span>
                                                <span>{post.created_at}</span>
                                            </div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                                <Link
                                                    href={`/blog/${post.slug}/`}
                                                    className="hover:text-blue-600"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                    {post.category}
                                                </span>
                                                <Link
                                                    href={`/blog/${post.slug}/`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.total_pages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <nav className="flex space-x-2">
                                        {pagination.has_previous && (
                                            <Link
                                                href={`/blog/?page=${pagination.current_page - 1}`}
                                                className="px-3 py-2 bg-white border rounded-md hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        <span className="px-3 py-2 bg-blue-500 text-white rounded-md">
                                            {pagination.current_page}
                                        </span>
                                        {pagination.has_next && (
                                            <Link
                                                href={`/blog/?page=${pagination.current_page + 1}`}
                                                className="px-3 py-2 bg-white border rounded-md hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </nav>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/blog/category/${category.slug}/`}
                                                className="text-gray-600 hover:text-blue-600"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
```

#### 3. Blog Detail Component

```jsx
// frontend/src/Pages/Blog/Detail.jsx
import React from 'react'
import { Link, Head } from '@inertiajs/react'

export default function BlogDetail({ post, related_posts }) {
    return (
        <>
            <Head title={post.title} />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <Link href="/blog/" className="text-blue-600 hover:text-blue-800">
                            ← Back to Blog
                        </Link>
                    </nav>

                    {/* Article */}
                    <article className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-8">
                            <header className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    {post.title}
                                </h1>
                                <div className="flex items-center text-gray-600">
                                    <span>By {post.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.created_at}</span>
                                    <span className="mx-2">•</span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </header>

                            <div className="prose max-w-none">
                                {/* Render post content - you might want to use a markdown parser */}
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                        </div>
                    </article>

                    {/* Related Posts */}
                    {related_posts.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related_posts.map(relatedPost => (
                                    <div key={relatedPost.id} className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            <Link
                                                href={`/blog/${relatedPost.slug}/`}
                                                className="hover:text-blue-600"
                                            >
                                                {relatedPost.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
```

#### 4. Blog Category Component

```jsx
// frontend/src/Pages/Blog/Category.jsx
import React from 'react'
import { Link, Head } from '@inertiajs/react'

export default function BlogCategory({ category, posts }) {
    return (
        <>
            <Head title={`${category.name} - Blog`} />
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <nav className="mb-4">
                            <Link href="/blog/" className="text-blue-600 hover:text-blue-800">
                                ← Back to Blog
                            </Link>
                        </nav>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {category.name}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
                        </p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <span>{post.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.created_at}</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                        <Link
                                            href={`/blog/${post.slug}/`}
                                            className="hover:text-blue-600"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <Link
                                        href={`/blog/${post.slug}/`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Read more →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No posts found in this category.</p>
                            <Link
                                href="/blog/"
                                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                            >
                                Browse all posts →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
```

### 🔧 Admin Integration (Optional)

```python
# backend/blog/admin.py
from django.contrib import admin
from .models import Category, Post

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'published', 'created_at']
    list_filter = ['published', 'category', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}

    def save_model(self, request, obj, form, change):
        if not change:  # If creating new post
            obj.author = request.user
        super().save_model(request, obj, form, change)
```

### 🚀 Build and Test

```bash
# Build frontend with new components
./build.sh

# Create superuser (if not already created)
cd backend
source venv/bin/activate
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### 📝 Key Integration Points

1. **Data Flow**: Django views pass data as props to React components via Inertia
2. **Routing**: Django URLs map to React page components
3. **Navigation**: Use Inertia's `Link` component for SPA-like navigation
4. **Forms**: Use Inertia's `useForm` hook for form handling
5. **State**: React components receive all data as props from Django

### 🎯 Best Practices

- **Organize by Feature**: Create separate directories for each app's components
- **Consistent Naming**: Match React component names to Django view render calls
- **Data Serialization**: Always serialize Django model data to simple dictionaries
- **Error Handling**: Handle missing data gracefully in React components
- **SEO**: Use Inertia's `Head` component for proper page titles and meta tags

This approach allows you to build complex, multi-app Django backends while maintaining a seamless React frontend experience!

## �🔧 Technical Integration Guides

### Database Configuration

#### Switching to PostgreSQL

1. **Install PostgreSQL adapter:**
   ```bash
   cd backend
   source venv/bin/activate
   pip install psycopg2-binary
   pip freeze > requirements.txt
   ```

2. **Update Django settings:**
   ```python
   # backend/dirt_project/settings.py
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'dirt_stack_db',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

3. **Create database and run migrations:**
   ```bash
   createdb dirt_stack_db
   python manage.py migrate
   ```

#### Database Migrations
```bash
# Create new migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# View migration status
python manage.py showmigrations
```

### Authentication Setup

#### Django Authentication with Inertia

1. **Create authentication views:**
   ```python
   # backend/pages/views.py
   from django.contrib.auth import authenticate, login, logout
   from django.contrib.auth.decorators import login_required
   from inertia import render, redirect

   def login_view(request):
       if request.method == 'POST':
           username = request.POST['username']
           password = request.POST['password']
           user = authenticate(request, username=username, password=password)
           if user:
               login(request, user)
               return redirect('/')
           else:
               return render(request, 'Login', {
                   'error': 'Invalid credentials'
               })
       return render(request, 'Login')

   @login_required
   def dashboard(request):
       return render(request, 'Dashboard', {
           'user': request.user
       })
   ```

2. **Create login component:**
   ```jsx
   // frontend/src/Pages/Login.jsx
   import React from 'react'
   import { useForm, Head } from '@inertiajs/react'

   export default function Login({ error }) {
       const { data, setData, post, processing } = useForm({
           username: '',
           password: '',
       })

       const submit = (e) => {
           e.preventDefault()
           post('/login/')
       }

       return (
           <>
               <Head title="Login" />
               <div className="min-h-screen flex items-center justify-center bg-gray-50">
                   <form onSubmit={submit} className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                       <h2 className="text-2xl font-bold mb-6">Login</h2>
                       <input
                           type="text"
                           value={data.username}
                           onChange={e => setData('username', e.target.value)}
                           placeholder="Username"
                           className="w-full p-3 border rounded mb-4"
                       />
                       <input
                           type="password"
                           value={data.password}
                           onChange={e => setData('password', e.target.value)}
                           placeholder="Password"
                           className="w-full p-3 border rounded mb-4"
                       />
                       <button
                           type="submit"
                           disabled={processing}
                           className="w-full bg-blue-500 text-white p-3 rounded"
                       >
                           {processing ? 'Logging in...' : 'Login'}
                       </button>
                       {error && <div className="text-red-500 mt-4">{error}</div>}
                   </form>
               </div>
           </>
       )
   }
   ```

### Environment Configuration

#### Setting up .env files

1. **Install python-dotenv (already included):**
   ```bash
   pip install python-dotenv
   ```

2. **Create environment files:**
   ```bash
   # backend/.env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

3. **Update Django settings:**
   ```python
   # backend/dirt_project/settings.py
   import os
   from dotenv import load_dotenv

   load_dotenv()

   SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-secret-key')
   DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
   ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
   ```

### Static Files & Media

#### Production Static Files Setup

1. **Configure static files:**
   ```python
   # backend/dirt_project/settings.py
   STATIC_URL = '/static/'
   STATIC_ROOT = BASE_DIR / 'staticfiles'
   STATICFILES_DIRS = [
       BASE_DIR.parent / 'frontend' / 'dist',
   ]

   # Media files
   MEDIA_URL = '/media/'
   MEDIA_ROOT = BASE_DIR / 'media'
   ```

2. **Collect static files for production:**
   ```bash
   python manage.py collectstatic
   ```

3. **Handle media uploads:**
   ```python
   # backend/dirt_project/urls.py
   from django.conf import settings
   from django.conf.urls.static import static

   urlpatterns = [
       # ... your urls
   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   ```

## 📋 Development Best Practices

### Component Organization

#### Recommended Structure
```
frontend/src/
├── Pages/              # Inertia page components
│   ├── Auth/          # Authentication pages
│   ├── Dashboard/     # Dashboard pages
│   └── Public/        # Public pages
├── Components/        # Reusable components
│   ├── Layout/        # Layout components
│   ├── Forms/         # Form components
│   └── UI/            # UI components
├── Hooks/             # Custom React hooks
├── Utils/             # Utility functions
└── Styles/            # Additional styles
```

#### Example Reusable Component
```jsx
// frontend/src/Components/UI/Button.jsx
import React from 'react'

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    ...props
}) {
    const baseClasses = 'font-semibold rounded-md transition-colors'
    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    }
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
            {...props}
        >
            {children}
        </button>
    )
}
```

### State Management

#### Using Inertia's Built-in State

```jsx
// For simple forms
import { useForm } from '@inertiajs/react'

function ContactForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/contact/')
    }

    return (
        <form onSubmit={submit}>
            <input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
            />
            {errors.name && <div>{errors.name}</div>}
            {/* ... other fields */}
        </form>
    )
}
```

#### For Complex State - Use React Context

```jsx
// frontend/src/Context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [user, setUser] = useState(null)
    const [notifications, setNotifications] = useState([])

    return (
        <AppContext.Provider value={{
            user, setUser,
            notifications, setNotifications
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
```

### Styling Guidelines

#### Tailwind CSS Best Practices

1. **Use component classes for repeated patterns:**
   ```css
   /* frontend/src/index.css */
   @layer components {
       .btn-primary {
           @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded;
       }

       .card {
           @apply bg-white shadow-lg rounded-lg p-6;
       }
   }
   ```

2. **Customize Tailwind config:**
   ```js
   // frontend/tailwind.config.js
   module.exports = {
       content: ['./src/**/*.{js,jsx,ts,tsx}'],
       theme: {
           extend: {
               colors: {
                   primary: {
                       50: '#eff6ff',
                       500: '#3b82f6',
                       900: '#1e3a8a',
                   }
               },
               fontFamily: {
                   sans: ['Inter', 'sans-serif'],
               }
           }
       }
   }
   ```

### Testing Strategy

#### Django Backend Tests

```python
# backend/pages/tests.py
from django.test import TestCase
from inertia.test import InertiaTestCase

class HomeViewTest(InertiaTestCase):
    def test_home_page_renders(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertComponentUsed('Home')
        self.assertIncludesProps({
            'message': 'hello home',
            'page_name': 'home'
        })

# Run tests
# python manage.py test
```

#### React Component Tests (with Jest & React Testing Library)

```bash
# Install testing dependencies
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

```jsx
// frontend/src/Pages/__tests__/Home.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../Home'

test('renders home page with message', () => {
    const props = {
        message: 'Test message',
        page_name: 'home'
    }

    render(<Home {...props} />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
})
```

## 🚀 Deployment & Production

### Production Build Process

1. **Build frontend assets:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Collect Django static files:**
   ```bash
   cd backend
   python manage.py collectstatic --noinput
   ```

3. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

### Server Configuration

#### Nginx Configuration Example

```nginx
# /etc/nginx/sites-available/dirt-stack
server {
    listen 80;
    server_name your-domain.com;

    location /static/ {
        alias /path/to/your/project/backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /path/to/your/project/backend/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Environment Variables

#### Required Production Settings

```bash
# backend/.env.production
SECRET_KEY=your-very-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
DATABASE_URL=postgresql://user:password@localhost/dbname

# Security settings
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

### Performance Optimization

#### Django Optimizations

```python
# backend/dirt_project/settings.py

# Caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# Session engine
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

# Static files compression
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
```

#### Frontend Optimizations

```js
// frontend/vite.config.js
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    inertia: ['@inertiajs/react'],
                }
            }
        }
    }
})
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Inertia Pages Not Loading

**Symptoms:** Blank page, no errors in console
**Solutions:**
- Check that React components are in `frontend/src/Pages/`
- Ensure component names match Django view render calls exactly
- Verify Vite build completed: `cd frontend && npm run build`
- Check browser console for JavaScript errors

#### 2. Static Files Not Loading (404 errors)

**Symptoms:** CSS/JS files return 404 errors
**Solutions:**
- Run `npm run build` in frontend directory
- Check `STATICFILES_DIRS` in Django settings
- Verify file paths in Django template match built assets
- Run `python manage.py collectstatic` for production

#### 3. CSRF Token Errors

**Symptoms:** 403 Forbidden on form submissions
**Solutions:**
```jsx
// Add CSRF token to forms
import { usePage } from '@inertiajs/react'

function MyForm() {
    const { props } = usePage()

    return (
        <form>
            <input type="hidden" name="csrfmiddlewaretoken" value={props.csrf_token} />
            {/* form fields */}
        </form>
    )
}
```

#### 4. Hot Reload Not Working

**Symptoms:** Changes don't reflect immediately
**Solutions:**
- Ensure Vite dev server is running: `npm run dev`
- Check Vite config HMR settings
- Clear browser cache
- Restart both Django and Vite servers

### Debug Tools

#### Django Debug Toolbar

```python
# backend/dirt_project/settings.py
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1']
```

#### React DevTools

1. Install React DevTools browser extension
2. Open browser DevTools → React tab
3. Inspect component props and state

#### Browser Debugging

```jsx
// Add debugging to React components
export default function MyComponent(props) {
    console.log('Component props:', props)

    return <div>...</div>
}
```

### Asset Management

#### Handling Vite Build Artifacts

The build process generates files with content hashes for cache busting:
```
dist/assets/main-abc123.js
dist/assets/main-def456.css
```

**Automatic Solution:** Use django-vite package for dynamic asset loading:
```bash
pip install django-vite
```

**Manual Solution:** Update template after each build:
```html
<!-- Check dist/.vite/manifest.json for current filenames -->
<script type="module" src="{% static 'assets/main-[HASH].js' %}"></script>
```

## 📚 Additional Resources

### Documentation Links
- [Django Documentation](https://docs.djangoproject.com/)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Community & Support
- [Inertia.js Discord](https://discord.gg/gwgxN8Y)
- [Django Forum](https://forum.djangoproject.com/)
- [React Community](https://react.dev/community)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly (both Django and React)
5. Update documentation if needed
6. Submit a pull request

## 📄 License

MIT License - feel free to use this DIRT stack template for your projects!

---

**Happy coding with the DIRT Stack! 🚀**

*The perfect combination of Django's robustness, Inertia's simplicity, React's flexibility, and Tailwind's utility!*