# Development Progress & Decisions

## Project Overview
Transformation of a DIRT Stack (Django + Inertia + React + Tailwind) e-commerce application into a ticketing services platform with CI/CD implementation.

## 1. CI/CD Pipeline Implementation

### Decision: GitHub Actions Workflow
**Why**: Needed automated testing and build validation for the existing project structure.

**Implementation**:
- Created `.github/workflows/ci.yml`
- Mirrored existing `setup.sh` script logic
- Added manual trigger (`workflow_dispatch`) for testing

**Key Steps**:
1. Python 3.11 + Node.js 18 setup
2. Dependency caching for performance
3. Django migrations
4. Frontend build process
5. Asset management automation

### Challenges Identified:
- **Virtual Environment**: GitHub Actions handles isolation differently than local `venv/`
- **Build Artifacts**: CI creates ephemeral builds vs persistent local files
- **Asset Management**: Hash-based filenames require template synchronization

## 2. Application Transformation

### Decision: Replace E-commerce with Ticketing Services
**Why**: User requested complete pivot from grocery shopping to event ticketing platform.

**Changes Made**:
- **Home.jsx**: Complete rewrite from "Sisi" supermarket to "TicketPro" ticketing
- **UI Components**: Removed non-existent `@/components/ui/button` and `@/components/ui/badge`
- **Icons**: Changed from shopping-focused to event-focused (Ticket, Clock, Shield, Users)
- **Color Scheme**: Emerald → Blue theme
- **Content**: Features now focus on real-time booking, secure payments, event management

### Technical Fixes:
- Replaced missing UI components with native HTML elements
- Maintained Tailwind styling and animations
- Kept responsive design patterns

## 3. Build Process Issues & Solutions

### Problem: Stale Assets Served
**Issue**: Updated React code not appearing in browser despite successful build.

**Root Cause**: Django template referenced old asset filenames:
- Old: `main-0PPXPFqj.css`, `main-C9UL9x3X.js`
- New: `main-CVY8kmYj.css`, `main-DkH2LJ_O.js`

**Solution**:
1. `npm run build` - Generate new assets
2. `python3 update_assets.py` - Update Django template with new filenames

### Problem: CI/CD Asset Conflicts
**Issue**: Local builds create different asset hashes than CI builds, causing template conflicts.

**Solution**: Template Management Strategy
1. **Untracked Template**: Added `backend/templates/app.html` to `.gitignore`
2. **Template Source**: Created `app.template.html` with placeholders
3. **CI Process**: Copy template → Update with actual filenames
4. **Local Process**: Keep working `app.html` with current assets

## 4. Asset Management Architecture

### Current System:
- **Vite Build**: Creates hashed filenames for cache busting
- **Manifest.json**: Maps source files to built assets
- **update_assets.py**: Reads manifest and updates Django template
- **Template Strategy**: Placeholder-based for CI compatibility

### Workflow Integration:
```yaml
- name: Setup Django template
  run: cp app.template.html app.html
- name: Update Django assets  
  run: python update_assets.py
```

## 5. Key Technical Decisions

### 1. Component Strategy
**Decision**: Use native HTML elements instead of custom UI library
**Why**: Missing components were causing build failures; native elements provide reliability

### 2. Asset Tracking
**Decision**: Ignore generated template, track template source
**Why**: Prevents conflicts between local and CI builds while maintaining functionality

### 3. CI Trigger Strategy
**Decision**: Push to main/develop + manual trigger
**Why**: Automatic validation on important branches, manual testing capability

### 4. Caching Strategy
**Decision**: Cache npm and pip dependencies
**Why**: Faster CI builds, reduced external dependency load

## 6. Current Architecture

```
Project Structure:
├── .github/workflows/ci.yml          # CI/CD pipeline
├── dirt_stack/
│   ├── backend/
│   │   ├── templates/
│   │   │   ├── app.html             # Generated (ignored)
│   │   │   └── app.template.html    # Source template
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── src/Pages/Home.jsx       # Ticketing services page
│   │   ├── package.json
│   │   └── dist/                    # Build output (ignored)
│   ├── build.sh                     # Local build script
│   ├── setup.sh                     # Local setup script
│   └── update_assets.py             # Asset synchronization
```

## 7. Development Workflow

### Local Development:
1. Make code changes
2. `npm run build` (if frontend changes)
3. `python3 update_assets.py` (if assets changed)
4. Test locally

### CI/CD Process:
1. Push to main/develop
2. GitHub Actions runs full build
3. Validates all steps work in clean environment
4. No deployment (testing only)

## 8. Lessons Learned

1. **Asset Management Complexity**: Hash-based assets require careful template synchronization
2. **CI vs Local Differences**: Ephemeral CI environments behave differently than persistent local setups
3. **Component Dependencies**: Missing UI libraries can break builds; native elements provide fallback
4. **Git Tracking**: Already-tracked files need explicit removal before gitignore works

## 9. Future Considerations

- **Deployment Pipeline**: Current CI only validates; deployment step needed
- **Testing Integration**: No test suites currently; should be added
- **Environment Variables**: Production secrets management needed
- **Database Strategy**: SQLite for development; production database needed
- **Static File Serving**: CDN or static file server for production assets