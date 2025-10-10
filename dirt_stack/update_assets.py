#!/usr/bin/env python3
"""
Automatic Asset Updater for DIRT Stack

This script reads the Vite manifest.json file and automatically updates
the Django template with the correct asset filenames after each build.

Usage:
    python update_assets.py

This eliminates the need to manually update template files after each
frontend build, making the development workflow truly agile.
"""

import json
import re
from pathlib import Path

def update_template_assets():
    """Update Django template with current asset filenames from Vite manifest."""
    
    # Paths - adjust for Docker container context
    manifest_path = Path('../frontend/dist/.vite/manifest.json')
    template_path = Path('templates/app.html')
    
    # Check if manifest exists
    if not manifest_path.exists():
        print("❌ Manifest file not found. Please run 'npm run build' first.")
        return False
    
    # Read manifest
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
    except Exception as e:
        print(f"❌ Error reading manifest: {e}")
        return False
    
    # Get asset filenames from manifest
    # Try different possible entry points
    main_entry = None
    for key in ['src/main.jsx', 'src/main.js', 'main.jsx', 'main.js']:
        if key in manifest:
            main_entry = manifest[key]
            break
    
    if not main_entry:
        # If no main entry found, use the first entry
        if manifest:
            main_entry = list(manifest.values())[0]
        else:
            print("❌ No entries found in manifest")
            return False
    
    js_file = main_entry.get('file', '')
    css_files = main_entry.get('css', [])
    
    print(f"📋 Manifest entries: {list(manifest.keys())}")
    print(f"📦 Using entry: {main_entry}")
    
    if not js_file:
        print("❌ No main.jsx entry found in manifest")
        return False
    
    if not css_files:
        print("❌ No CSS files found in manifest")
        return False
    
    css_file = css_files[0]  # Get the first CSS file
    
    print(f"📦 Found assets:")
    print(f"   CSS: {css_file}")
    print(f"   JS:  {js_file}")
    
    # Read current template
    try:
        with open(template_path, 'r') as f:
            template_content = f.read()
    except Exception as e:
        print(f"❌ Error reading template: {e}")
        return False
    
    # Update CSS reference - match PLACEHOLDER format
    css_pattern = r"{% static 'assets/main-PLACEHOLDER\.css' %}"
    css_replacement = f"{{% static '{css_file}' %}}"
    template_content = template_content.replace("{% static 'assets/main-PLACEHOLDER.css' %}", css_replacement)

    # Update JS reference - match PLACEHOLDER format  
    js_replacement = f"{{% static '{js_file}' %}}"
    template_content = template_content.replace("{% static 'assets/main-PLACEHOLDER.js' %}", js_replacement)
    
    # Write updated template
    try:
        with open(template_path, 'w') as f:
            f.write(template_content)
    except Exception as e:
        print(f"❌ Error writing template: {e}")
        return False
    
    print(f"✅ Template updated successfully!")
    print(f"   Updated: {template_path}")
    return True

if __name__ == '__main__':
    print("🔄 Updating DIRT Stack assets...")
    success = update_template_assets()
    if success:
        print("🎉 Asset update complete! Your template is now up to date.")
    else:
        print("💥 Asset update failed. Please check the errors above.")
