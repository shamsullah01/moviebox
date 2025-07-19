# Contributing to MovieBox Clone

Thank you for your interest in contributing to MovieBox Clone! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0 or higher)
- npm (v7.0 or higher)
- Git
- Code editor (VS Code recommended)

### Setting up the Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/moviebox-clone.git
   cd moviebox-clone
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/originalowner/moviebox-clone.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## 📝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/moviebox-clone/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node.js version)

### Suggesting Features
1. Check existing [Issues](https://github.com/yourusername/moviebox-clone/issues) for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach
   - Screenshots or mockups (if applicable)

### Code Contributions

#### 1. Choose an Issue
- Look for issues labeled `good first issue` for beginners
- Comment on the issue to let others know you're working on it

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 3. Make Changes
- Follow the coding standards (see below)
- Write clear, concise commit messages
- Test your changes thoroughly

#### 4. Commit Changes
```bash
git add .
git commit -m "feat: add new movie search functionality"
```

**Commit Message Convention:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

#### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference related issues
- Screenshots of changes (if applicable)

## 🎯 Coding Standards

### JavaScript/React Guidelines
- Use functional components with hooks
- Follow ES6+ syntax
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid console.log in production code

### File Structure
```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── services/           # API and external services
├── utils/              # Utility functions
├── styles/             # Global styles
└── constants/          # App constants
```

### Component Guidelines
```javascript
// Use functional components
const MovieCard = ({ movie, onClick }) => {
  // Use hooks for state management
  const [isHovered, setIsHovered] = useState(false);
  
  // Event handlers
  const handleClick = () => {
    onClick(movie.id);
  };
  
  return (
    <div className="movie-card" onClick={handleClick}>
      {/* Component JSX */}
    </div>
  );
};

export default MovieCard;
```

### CSS Guidelines
- Use consistent naming (kebab-case for classes)
- Follow mobile-first responsive design
- Use CSS variables for colors and spacing
- Group related styles together

```css
/* Component styles */
.movie-card {
  background: var(--card-background);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-4px);
}
```

### API Integration
- Use async/await for API calls
- Implement proper error handling
- Add loading states
- Cache data when appropriate

```javascript
const fetchMovies = async () => {
  try {
    setLoading(true);
    const response = await movieAPI.getTrending();
    setMovies(response.data);
  } catch (error) {
    setError('Failed to fetch movies');
    console.error('API Error:', error);
  } finally {
    setLoading(false);
  }
};
```

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Writing Tests
- Write unit tests for utility functions
- Test component behavior, not implementation
- Use React Testing Library for component tests

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';

test('renders movie title', () => {
  const mockMovie = { id: 1, title: 'Test Movie' };
  render(<MovieCard movie={mockMovie} />);
  
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
});
```

## 📋 Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm test`)
- [ ] No console errors or warnings
- [ ] Code is properly commented
- [ ] README updated (if necessary)
- [ ] Screenshots included (for UI changes)
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked

## 🔍 Code Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Manual Review**: Maintainers review code for:
   - Code quality and standards
   - Functionality and performance
   - Security considerations
   - Documentation completeness
3. **Feedback**: Reviewers provide constructive feedback
4. **Approval**: Once approved, changes are merged

## 🎨 UI/UX Guidelines

### Design Principles
- **Consistency**: Follow existing design patterns
- **Accessibility**: Ensure WCAG 2.1 compliance
- **Performance**: Optimize images and animations
- **Mobile-first**: Design for mobile, enhance for desktop

### Color Palette
```css
:root {
  --primary-red: #e50914;
  --dark-background: #0a0a0a;
  --card-background: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
}
```

### Typography
- **Headers**: Use bold weights for section titles
- **Body**: Readable font sizes (16px minimum)
- **Labels**: Clear, concise text for UI elements

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow
1. Create release branch from `main`
2. Update version in `package.json`
3. Update CHANGELOG.md
4. Create pull request
5. After merge, create GitHub release
6. Deploy to production

## 📞 Getting Help

### Community Support
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Discord**: Join our community server (link in README)

### Maintainer Contact
- Create an issue for project-related questions
- Email: maintainer@example.com (for security issues)

## 🙏 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Invited to the contributors team (for regular contributors)

## 📄 Legal

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to MovieBox Clone! 🎬✨
