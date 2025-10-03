#!/usr/bin/env python3
"""
Django Project Renamer Script

This script renames your Django project from 'dirt_stack' to a new name
while updating all references throughout the codebase.

Usage:
    python rename_project.py <new_project_name>

Example:
    python rename_project.py my_awesome_project
"""

import os
import sys
import re
import shutil
from pathlib import Path

def validate_project_name(name):
    """Validate the new project name."""
    if not name:
        return False, "Project name cannot be empty"
    
    if not re.match(r'^[a-z][a-z0-9_]*$', name):
        return False, "Project name must start with a letter and contain only lowercase letters, numbers, and underscores"
    
    if len(name) > 50:
        return False, "Project name must be 50 characters or less"
    
    python_keywords = [
        'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
        'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
        'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield'
    ]
    
    if name in python_keywords:
        return False, f"'{name}' is a Python keyword and cannot be used as a project name"
    
    return True, "Valid project name"

def update_file_content(file_path, old_name, new_name):
    """Update file content by replacing old project name with new name."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace various forms of the old name
        replacements = [
            (f'dirt_stack', new_name),
            (f'dirt-stack', new_name.replace('_', '-')),
            (f'DIRT Stack', new_name.replace('_', ' ').title()),
            (f'DIRT stack', new_name.replace('_', ' ').title()),
            (f'dirt_project', f'{new_name}_project'),
            (f'DIRT project', f'{new_name.replace("_", " ").title()} project'),
        ]
        
        updated = False
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new)
                updated = True
        
        if updated:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def rename_directories_and_files(base_path, old_name, new_name):
    """Rename directories and files containing the old project name."""
    renamed_items = []
    
    # Walk through all directories and files
    for root, dirs, files in os.walk(base_path, topdown=False):
        # Rename files first
        for file in files:
            if old_name in file:
                old_path = Path(root) / file
                new_file = file.replace(old_name, new_name)
                new_path = Path(root) / new_file
                
                try:
                    old_path.rename(new_path)
                    renamed_items.append(f"File: {old_path} → {new_path}")
                except Exception as e:
                    print(f"❌ Error renaming file {old_path}: {e}")
        
        # Rename directories
        for dir_name in dirs:
            if old_name in dir_name:
                old_dir_path = Path(root) / dir_name
                new_dir_name = dir_name.replace(old_name, new_name)
                new_dir_path = Path(root) / new_dir_name
                
                try:
                    old_dir_path.rename(new_dir_path)
                    renamed_items.append(f"Directory: {old_dir_path} → {new_dir_path}")
                except Exception as e:
                    print(f"❌ Error renaming directory {old_dir_path}: {e}")
    
    return renamed_items

def get_files_to_update():
    """Get list of files that need content updates."""
    files_to_check = []
    
    # Common file extensions that might contain project references
    extensions = ['.py', '.js', '.jsx', '.json', '.md', '.txt', '.html', '.css', '.sh', '.bat', '.yml', '.yaml']
    
    # Walk through the project directory
    for root, dirs, files in os.walk('.'):
        # Skip certain directories
        skip_dirs = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', 'dist', 'build'}
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        
        for file in files:
            file_path = Path(root) / file
            if file_path.suffix in extensions:
                files_to_check.append(file_path)
    
    return files_to_check

def create_backup():
    """Create a backup of the current project."""
    backup_name = f"dirt_stack_backup_{int(__import__('time').time())}"
    try:
        shutil.copytree('.', f'../{backup_name}', ignore=shutil.ignore_patterns('.git', '__pycache__', 'node_modules', '.venv', 'venv'))
        return backup_name
    except Exception as e:
        print(f"❌ Error creating backup: {e}")
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python rename_project.py <new_project_name>")
        print("Example: python rename_project.py my_awesome_project")
        sys.exit(1)
    
    new_name = sys.argv[1].lower().strip()
    old_name = "dirt_stack"
    
    # Validate new project name
    is_valid, message = validate_project_name(new_name)
    if not is_valid:
        print(f"❌ Invalid project name: {message}")
        sys.exit(1)
    
    if new_name == old_name:
        print("❌ New project name is the same as the current name")
        sys.exit(1)
    
    print(f"🔄 Renaming Django project from '{old_name}' to '{new_name}'...")
    print(f"📁 Current directory: {os.getcwd()}")
    
    # Confirm with user
    response = input(f"\n⚠️  This will rename your project to '{new_name}'. Continue? (y/N): ")
    if response.lower() != 'y':
        print("❌ Operation cancelled")
        sys.exit(0)
    
    # Create backup
    print("\n📦 Creating backup...")
    backup_name = create_backup()
    if backup_name:
        print(f"✅ Backup created: ../{backup_name}")
    else:
        response = input("❌ Backup failed. Continue anyway? (y/N): ")
        if response.lower() != 'y':
            print("❌ Operation cancelled")
            sys.exit(1)
    
    # Step 1: Update file contents
    print(f"\n📝 Updating file contents...")
    files_to_update = get_files_to_update()
    updated_files = []
    
    for file_path in files_to_update:
        if update_file_content(file_path, old_name, new_name):
            updated_files.append(str(file_path))
    
    print(f"✅ Updated {len(updated_files)} files")
    
    # Step 2: Rename directories and files
    print(f"\n📂 Renaming directories and files...")
    renamed_items = rename_directories_and_files('.', old_name, new_name)
    
    if renamed_items:
        print(f"✅ Renamed {len(renamed_items)} items:")
        for item in renamed_items:
            print(f"   {item}")
    else:
        print("ℹ️  No directories or files needed renaming")
    
    # Step 3: Special handling for Django project directory
    django_project_old = Path('backend') / 'dirt_project'
    django_project_new = Path('backend') / f'{new_name}_project'
    
    if django_project_old.exists():
        try:
            django_project_old.rename(django_project_new)
            print(f"✅ Renamed Django project directory: {django_project_old} → {django_project_new}")
        except Exception as e:
            print(f"❌ Error renaming Django project directory: {e}")
    
    # Step 4: Update manage.py specifically
    manage_py = Path('backend') / 'manage.py'
    if manage_py.exists():
        try:
            with open(manage_py, 'r') as f:
                content = f.read()
            
            content = content.replace('dirt_project.settings', f'{new_name}_project.settings')
            
            with open(manage_py, 'w') as f:
                f.write(content)
            print("✅ Updated manage.py")
        except Exception as e:
            print(f"❌ Error updating manage.py: {e}")
    
    # Step 5: Update wsgi.py specifically
    wsgi_py = django_project_new / 'wsgi.py'
    if wsgi_py.exists():
        try:
            with open(wsgi_py, 'r') as f:
                content = f.read()
            
            content = content.replace('dirt_project.settings', f'{new_name}_project.settings')
            
            with open(wsgi_py, 'w') as f:
                f.write(content)
            print("✅ Updated wsgi.py")
        except Exception as e:
            print(f"❌ Error updating wsgi.py: {e}")
    
    print(f"\n🎉 Project successfully renamed to '{new_name}'!")
    print(f"\n📋 Next steps:")
    print(f"   1. Test your application: cd backend && python manage.py runserver")
    print(f"   2. Rebuild frontend: cd frontend && npm run build")
    print(f"   3. Run migrations if needed: python manage.py migrate")
    print(f"   4. Update your git remote if applicable")
    
    if backup_name:
        print(f"\n💾 Backup available at: ../{backup_name}")
        print(f"   You can delete it once you've verified everything works correctly")

if __name__ == '__main__':
    main()