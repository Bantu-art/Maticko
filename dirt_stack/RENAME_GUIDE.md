# Django Project Renamer Guide

This guide explains how to safely rename your Django project from `dirt_stack` to any name you choose.

## 🚀 Quick Start

```bash
# Navigate to your project directory
cd /path/to/your/dirt_stack

# Run the rename script
python rename_project.py your_new_project_name

# Example:
python rename_project.py maticko_app
```

## 📋 What the Script Does

The script performs the following operations:

### 1. **Validates Project Name**
- Ensures name starts with a letter
- Only allows lowercase letters, numbers, and underscores
- Checks it's not a Python keyword
- Limits length to 50 characters

### 2. **Creates Backup**
- Automatically backs up your entire project
- Backup saved as `dirt_stack_backup_[timestamp]` in parent directory
- Excludes `.git`, `node_modules`, and virtual environments

### 3. **Updates File Contents**
- Replaces all references to `dirt_stack` with your new name
- Updates `dirt_project` to `your_name_project`
- Handles various naming conventions (snake_case, kebab-case, Title Case)
- Processes files: `.py`, `.js`, `.jsx`, `.json`, `.md`, `.txt`, `.html`, `.css`, `.sh`, `.bat`

### 4. **Renames Directories and Files**
- Renames the Django project directory (`backend/dirt_project` → `backend/your_name_project`)
- Renames any files containing `dirt_stack` in their names
- Updates directory names if they contain the old project name

### 5. **Special Django Updates**
- Updates `manage.py` settings module reference
- Updates `wsgi.py` settings module reference
- Ensures all Django configuration points to the new project name

## 🎯 Example Usage

```bash
# Rename to "maticko"
python rename_project.py maticko

# This will change:
# - dirt_stack → maticko
# - dirt_project → maticko_project  
# - DIRT Stack → Maticko
# - backend/dirt_project/ → backend/maticko_project/
```

## ✅ After Renaming

Once the script completes, follow these steps:

### 1. **Test Django Application**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

### 2. **Rebuild Frontend**
```bash
cd frontend
npm run build
```

### 3. **Run Migrations (if needed)**
```bash
cd backend
python manage.py migrate
```

### 4. **Update Git Remote (if applicable)**
```bash
git remote set-url origin https://github.com/yourusername/your-new-repo-name.git
```

## 🛡️ Safety Features

- **Automatic Backup**: Creates full project backup before any changes
- **Validation**: Ensures new name follows Python/Django conventions
- **Confirmation**: Asks for confirmation before proceeding
- **Error Handling**: Gracefully handles file operation errors
- **Rollback**: Keep backup until you verify everything works

## 📁 Files That Get Updated

The script updates references in these types of files:

### Python Files
- `manage.py`
- `settings.py`
- `wsgi.py`
- `urls.py`
- All other `.py` files

### Frontend Files
- `package.json`
- `vite.config.js`
- React component files (`.jsx`)
- JavaScript files (`.js`)

### Documentation
- `README.md`
- Any `.txt` files
- HTML templates

### Configuration Files
- Shell scripts (`.sh`, `.bat`)
- YAML files (`.yml`, `.yaml`)
- JSON configuration files

## ⚠️ Important Notes

1. **Run from Project Root**: Execute the script from your `dirt_stack` directory
2. **Virtual Environment**: Deactivate any virtual environments before running
3. **Git Status**: Commit any pending changes before renaming
4. **Dependencies**: No additional dependencies required - uses Python standard library
5. **Backup Location**: Backup is created in the parent directory of your project

## 🔧 Troubleshooting

### Script Won't Run
```bash
# Make sure you're in the right directory
pwd  # Should show path ending in /dirt_stack

# Make script executable (Linux/Mac)
chmod +x rename_project.py

# Run with Python explicitly
python3 rename_project.py your_new_name
```

### Invalid Project Name Error
- Use only lowercase letters, numbers, and underscores
- Start with a letter (not number or underscore)
- Avoid Python keywords like `class`, `def`, `import`, etc.

### Permission Errors
- Ensure you have write permissions to the project directory
- Close any IDEs or editors that might have files open
- On Windows, run terminal as Administrator if needed

## 🔄 Rollback Instructions

If something goes wrong, you can restore from backup:

```bash
# Navigate to parent directory
cd ..

# Remove the renamed project (if needed)
rm -rf your_new_project_name

# Restore from backup
cp -r dirt_stack_backup_[timestamp] dirt_stack

# Or rename backup back
mv dirt_stack_backup_[timestamp] dirt_stack
```

## 📞 Support

If you encounter issues:

1. Check the backup was created successfully
2. Verify you're running from the correct directory
3. Ensure the new project name follows naming conventions
4. Check file permissions in your project directory

The script is designed to be safe and reversible - your original project is always backed up before any changes are made.