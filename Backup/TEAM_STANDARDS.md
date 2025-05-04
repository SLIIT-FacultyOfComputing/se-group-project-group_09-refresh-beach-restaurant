# Team Standards and Guidelines

This document outlines the standards and guidelines for the Refresh Beach Restaurant application development team.

## Code Standards

### Java/Backend

1. **Naming Conventions**
   - Classes: PascalCase (e.g., `UserService`)
   - Methods/Variables: camelCase (e.g., `getUserById`)
   - Constants: UPPER_SNAKE_CASE (e.g., `MAX_LOGIN_ATTEMPTS`)

2. **Architecture**
   - Follow layered architecture (Controller → Service → Repository)
   - Use DTOs for data transfer between layers
   - Keep controllers thin, business logic in services
   - Use interfaces for services

3. **Documentation**
   - Add Javadoc to all public methods and classes
   - Comment complex business logic
   - Keep comments up-to-date with code changes

4. **Testing**
   - Write unit tests for services and repositories
   - Write integration tests for controllers
   - Aim for at least 70% code coverage

### JavaScript/Frontend

1. **Naming Conventions**
   - Components: PascalCase (e.g., `LoginForm`)
   - Functions/Variables: camelCase (e.g., `handleSubmit`)
   - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

2. **Component Structure**
   - One component per file
   - Organize by feature/page
   - Use function components with hooks

3. **State Management**
   - Use Context API for global state
   - Keep local state in components when possible
   - Document complex state transitions

4. **Styling**
   - Use Tailwind CSS classes
   - Follow consistent color scheme (blues, yellows as defined)
   - Create utility classes for repeated styling

## Git Workflow

1. **Branching Strategy**
   - `main`: Production-ready code
   - `develop`: Development branch for integration
   - `feature/*`: Feature branches (e.g., `feature/login-page`)
   - `bugfix/*`: Bug fix branches
   - `release/*`: Release preparation branches

2. **Commit Guidelines**
   - Write clear, concise commit messages
   - Start with a verb (e.g., "Add login functionality")
   - Keep commits focused on a single task
   - Reference ticket numbers when applicable

3. **Pull Request Process**
   - Create PRs to merge into `develop` (not directly to `main`)
   - Require at least one code review before merging
   - Ensure all tests pass before requesting review
   - Address all review comments before merging

4. **Merge Strategy**
   - Use squash and merge to keep history clean
   - Delete feature branches after merging

## Database Guidelines

1. **Schema Changes**
   - Document all schema changes in `schema.sql`
   - Use migrations for production changes
   - Avoid direct database modifications in production

2. **Naming Conventions**
   - Tables: snake_case, plural (e.g., `users`, `restaurant_tables`)
   - Columns: snake_case (e.g., `first_name`, `created_at`)
   - Primary keys: `id`
   - Foreign keys: `<table_name>_id` (e.g., `user_id`)

3. **Best Practices**
   - Add indexes for frequently queried columns
   - Use appropriate data types
   - Include created_at/updated_at timestamps

## Collaboration and Communication

1. **Daily Standup**
   - Share what you worked on yesterday
   - What you're working on today
   - Any blockers or challenges

2. **Code Reviews**
   - Be respectful and constructive
   - Focus on code, not the coder
   - Prompt response to review requests (within 24 hours)

3. **Documentation**
   - Update README.md with new features
   - Document API changes in the API documentation
   - Create diagrams for complex flows

4. **Knowledge Sharing**
   - Schedule regular tech sharing sessions
   - Document solutions to complex problems
   - Cross-train team members on different areas of the codebase

## Development Environment

1. **Local Setup**
   - Use the same versions of tools and libraries
   - Document environment setup steps
   - Use Docker for development environment (optional)

2. **IDE Configuration**
   - Share code formatting settings
   - Consistent indentation (4 spaces for Java, 2 spaces for JS)
   - Enable suggested linters

By following these standards, we aim to maintain a high-quality, consistent codebase and foster effective team collaboration. 