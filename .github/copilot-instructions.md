# KeePassXC.org Website

KeePassXC.org is the official website for the KeePassXC password manager. This is a Hugo-based static website that generates HTML files for deployment.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup and Dependencies

**CRITICAL**: Install Hugo before attempting any build operations:
```bash
# Install Hugo (required for building the website)
curl -L https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_extended_0.139.4_linux-amd64.tar.gz -o /tmp/hugo.tar.gz
cd /tmp && tar -xzf hugo.tar.gz && sudo mv hugo /usr/local/bin/
hugo version
```

**Install Node.js dependencies**:
```bash
npm install
```
- **Timing**: Takes ~1-5 seconds to complete  
- **NEVER CANCEL**: Set timeout to 60+ seconds to be safe

### Build the Website

**Static build** (generates files in `public/` directory):
```bash
hugo
```
- **Timing**: Takes ~400 milliseconds to complete
- **NEVER CANCEL**: Although very fast, set timeout to 30+ seconds for safety
- **Output**: Generates 65+ pages and 70+ HTML files in `public/` directory
- **Size**: Build output is approximately 22MB

**Development server** (with live reload):
```bash
hugo serve --bind 0.0.0.0 --port 1313
```
- **Timing**: Starts in ~500 milliseconds
- **Access**: Available at http://localhost:1313/
- **Features**: Live reload on file changes, fast render mode
- **Stop**: Press Ctrl+C

### Known Issues and Workarounds

**CRITICAL FontAwesome Compatibility Issue**:
- FontAwesome 7.0.0 has Sass syntax incompatibility with Hugo
- **Error**: `Invalid CSS after "  --#{v": expected expression`
- **Solution**: Downgrade to FontAwesome 6.5.1:
```bash
npm install @fortawesome/fontawesome-free@6.5.1
```
- This fix is **required** for the build to succeed

## Content Management

### Create New Blog Posts

```bash
hugo new blog/YYYY-MM-DD-blog-post-name.md
```
- **Template**: Uses `archetypes/blog.md` template
- **Location**: Creates file in `content/blog/` directory
- **Default content**: Includes frontmatter with title, author, date, category fields

### Content Structure

```
content/
├── blog/           # Blog posts
├── docs/           # Documentation pages
├── donate.html     # Donation page
├── download.html   # Download page
├── privacy.html    # Privacy policy
├── screenshots.html # Screenshots
├── team.html       # Team page
└── verifying-signatures.html # GPG verification guide
```

## Validation

**ALWAYS run these validation steps after making changes**:

### 1. Build Validation
```bash
hugo
```
**Expected results**:
- No errors in output
- Generates 65+ pages in ~400ms
- Creates 70+ HTML files in `public/` directory
- Output size: approximately 22MB

### 2. Development Server Validation
```bash
hugo serve --bind 0.0.0.0 --port 1313
```
**Expected results**:
- Server starts without errors
- Available at http://localhost:1313/
- Homepage shows "KeePassXC Password Manager" title
- Live reload functionality works

### 3. Content Validation Scenarios
**Homepage validation**:
```bash
curl -s http://localhost:1313/ | grep "<title>KeePassXC Password Manager</title>"
```

**Blog section validation**:
- Navigate to /blog/ - should show list of release posts
- Verify blog posts are properly formatted with dates and categories

**Key pages to manually test**:
- `/download/` - Download page with platform options
- `/docs/` - Documentation section  
- `/donate/` - Donation page
- `/screenshots/` - Screenshots gallery

**Static assets validation**:
- CSS loads properly (no broken styles)
- FontAwesome icons display correctly
- Images and fonts are accessible

### 4. FontAwesome Compatibility Check
If build fails with Sass errors mentioning `--#{v.$css-prefix}`, run:
```bash
npm install @fortawesome/fontawesome-free@6.5.1
hugo
```

**No additional linting or testing tools** are configured in this repository.

## Project Structure

### Key Directories
- `content/`: Markdown content files
- `layouts/`: Hugo templates and HTML structure
- `assets/`: SCSS, JavaScript, and images for processing
- `static/`: Static files (copied directly to output)
- `public/`: Generated website output (created by Hugo)
- `node_modules/`: NPM dependencies

### Configuration Files
- `hugo.toml`: Hugo site configuration
- `package.json`: NPM dependencies (FontAwesome, UIKit, jQuery)
- `package-lock.json`: NPM dependency lock file

### Dependencies
- **Hugo**: Static site generator (v0.139.4+ with extended features)
- **FontAwesome**: Icons (v6.5.1 - NOT v7.0.0)
- **UIKit**: CSS framework
- **jQuery**: JavaScript library

## Common Tasks

### Repository Root Structure
```
.
├── .github/           # GitHub configuration
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
├── LICENSE            # GPL license
├── hugo.toml          # Hugo configuration
├── package.json       # NPM dependencies
├── index.html         # Homepage template
├── archetypes/        # Content templates
├── assets/            # SCSS, JS, images
├── content/           # Markdown content
├── layouts/           # Hugo templates
├── static/            # Static files
└── public/            # Generated output (after build)
```

### Essential Commands Reference
```bash
# Setup (first time only)
curl -L https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_extended_0.139.4_linux-amd64.tar.gz -o /tmp/hugo.tar.gz
cd /tmp && tar -xzf hugo.tar.gz && sudo mv hugo /usr/local/bin/

# Install dependencies
npm install

# Fix FontAwesome if needed
npm install @fortawesome/fontawesome-free@6.5.1

# Build website
hugo

# Development server
hugo serve

# Create blog post
hugo new blog/2024-01-01-post-name.md
```

### Troubleshooting

**Build fails with Sass error containing `--#{v.$css-prefix}`**: 
- **Cause**: FontAwesome 7.0.0 has Sass syntax incompatibility with Hugo
- **Solution**: Downgrade to FontAwesome 6.5.1
```bash
npm install @fortawesome/fontawesome-free@6.5.1
```

**Hugo command not found**: 
- **Cause**: Hugo not installed or not in PATH
- **Solution**: Install Hugo extended version:
```bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_extended_0.139.4_linux-amd64.tar.gz -o /tmp/hugo.tar.gz
cd /tmp && tar -xzf hugo.tar.gz && sudo mv hugo /usr/local/bin/
```

**Development server not accessible**: 
- **Cause**: Default bind address may not work in all environments
- **Solution**: Use `--bind 0.0.0.0` flag
```bash
hugo serve --bind 0.0.0.0 --port 1313
```

**Missing dependencies error during build**: 
- **Cause**: NPM dependencies not installed
- **Solution**: Install dependencies first
```bash
npm install
```

**Permission denied when installing Hugo**: 
- **Cause**: Need sudo for /usr/local/bin/
- **Alternative**: Install to user directory
```bash
mkdir -p ~/bin && cd /tmp && tar -xzf hugo.tar.gz && mv hugo ~/bin/
export PATH="$HOME/bin:$PATH"
```

## Technical Details

- **Site Generator**: Hugo v0.139.4+ (extended)
- **CSS Framework**: UIKit + custom SCSS
- **JavaScript**: jQuery + UIKit components
- **Content Format**: Markdown with YAML frontmatter
- **Deployment**: Static HTML files in `public/` directory