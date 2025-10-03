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
    
    # Paths
    manifest_path = Path('frontend/dist/.vite/manifest.json')
    template_path = Path('backend/templates/app.html')
    
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
    main_entry = manifest.get('src/main.jsx', {})
    js_file = main_entry.get('file', '')
    css_files = main_entry.get('css', [])
    
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
    
    # Update CSS reference (manifest already includes 'assets/' prefix)
    css_pattern = r"<link rel=\"stylesheet\" href=\"{% static 'assets/main-[^']+\.css' %}\">"
    css_replacement = f"<link rel=\"stylesheet\" href=\"{{% static '{css_file}' %}}\">"
    template_content = re.sub(css_pattern, css_replacement, template_content)

    # Update JS reference (manifest already includes 'assets/' prefix)
    js_pattern = r"<script type=\"module\" src=\"{% static 'assets/main-[^']+\.js' %}\"></script>"
    js_replacement = f"<script type=\"module\" src=\"{{% static '{js_file}' %}}\"></script>"
    template_content = re.sub(js_pattern, js_replacement, template_content)
    
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
