# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Mach Five Group corporate website (m5tg.com) - a single-page application built with vanilla HTML, CSS, and JavaScript. The website uses an external stylesheet for clean separation of concerns.

## Architecture

### File Structure
- **index.html**: Main HTML file with embedded JavaScript
- **styles.css**: External stylesheet containing all CSS styles
- **img/**: Image assets directory
- **Root assets**: Favicon suite, logos, and hero images
- **CNAME**: GitHub Pages deployment configuration

### Website Sections
1. **Navigation**: Fixed header with smooth scrolling
2. **Hero**: Animated landing with parallax effects and floating particles
3. **About**: Three-part company introduction
4. **Brands**: Showcases Mach Five Tech and Mach Five Marketing
5. **Tools**: Highlights MachVive and Web Tool Toys
6. **Engagement Model**: Timeline and metrics visualization
7. **Philosophy**: Company values and approach
8. **Contact**: Contact information and footer

### CSS Organization
- **External Stylesheet**: All styles organized in `styles.css` file
- **CSS Custom Properties**: Organized color system with `--m5-*` variables
- **BEM-like Naming**: Component-based class naming (e.g., `nav__container`, `hero__content`)
- **Responsive Design**: Mobile-first with clamp() functions and CSS Grid
- **Animation System**: Extensive keyframe animations and transitions

### JavaScript Architecture
- **Inline JavaScript**: All functionality in document-end `<script>` tag
- **Vanilla JS**: No external frameworks or libraries
- **Event-driven**: Scroll, click, and intersection observers
- **Performance Optimized**: requestAnimationFrame for smooth animations

## Development Workflow

### No Build Process
This is a static site with no build tools, preprocessors, or bundlers. Direct file editing is the development method.

### Deployment
- **GitHub Pages**: Deployed from `gh-pages` branch
- **CNAME**: Custom domain configuration present
- **Static Assets**: All resources served directly from repository

### Making Changes
1. Edit `index.html` directly
2. Test locally by opening in browser
3. Commit changes to `gh-pages` branch
4. Changes deploy automatically via GitHub Pages

## Technical Considerations

### Performance
- **Minimal Dependencies**: Only Google Fonts (Inter) external dependency
- **Self-contained**: No external CSS/JS files
- **Optimized Loading**: Font preconnect hints and efficient asset loading
- **Smooth Animations**: requestAnimationFrame for performance

### Browser Compatibility
- **Modern Standards**: Uses CSS Grid, CSS Custom Properties, Intersection Observer
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Mobile-first**: Responsive design with touch-friendly interactions

### Key Features
- **Parallax Effects**: Smooth scrolling background animations
- **Floating Particles**: CSS-only animated background elements
- **Intersection Observer**: Scroll-triggered animations
- **Mobile Navigation**: Hamburger menu with smooth transitions

## Common Tasks

### Content Updates
- Edit section content directly in `index.html`
- Update contact information in the contact section
- Modify brand links and descriptions in brands/tools sections

### Style Changes
- Modify CSS custom properties in `:root` for color scheme changes
- Update component styles in the `styles.css` file
- Test responsive behavior across viewport sizes

### Adding New Sections
- Follow existing section structure pattern
- Add corresponding navigation link
- Implement smooth scroll behavior
- Add intersection observer for animations if needed

## External Links and Integration Points

- **Mach Five Tech**: https://machfivetech.com
- **Contact Email**: hello@machfivegroup.com
- **Mach Five Marketing**: Placeholder links (not yet implemented)
- **MachVive/Web Tool Toys**: Placeholder links (not yet implemented)

## File Size Considerations

The `index.html` file is approximately 25,000+ tokens. When reading the file programmatically:
- Use offset/limit parameters for large file reads
- Use grep/search tools for specific content location
- Consider the file's single-page architecture when making structural changes