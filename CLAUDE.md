# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@cawpea/coderef` is a tool for validating and auto-fixing code references in markdown documentation. It ensures code snippets in documentation stay synchronized with actual source code through CODE_REF comments and AST-based symbol searching.

## Development Commands

### Building
```bash
npm run build              # Build for production (CJS + ESM + types)
npm run dev                # Watch mode for development
```

### Testing
```bash
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

Coverage thresholds are set to 80% for all metrics (branches, functions, lines, statements). CLI code is excluded from coverage as it's verified through integration tests.

### Linting & Formatting
```bash
npm run lint               # Lint TypeScript files
npm run lint:fix           # Auto-fix linting issues
npm run format             # Format code with Prettier
npm run format:check       # Check formatting without modifying
npm run type-check         # Run TypeScript compiler checks
```

### Single Test Execution
```bash
npx jest <test-file-path>            # Run specific test file
npx jest -t "<test-name-pattern>"    # Run tests matching pattern
```

## Architecture

### Build System
- **tsup**: Generates both CJS and ESM formats with type declarations
- Output directory: `./dist`
- Entry points defined in package.json exports for proper dual-package support

### Module Structure
The project is organized into three main directories under `src/`:
- `cli/`: Command-line interface implementations (validate.ts, fix.ts)
- `core/`: Core validation and fixing logic
- `utils/`: Shared utility functions

### CODE_REF Syntax Patterns
The tool supports three reference patterns:

1. **Line-based references**: `<!-- CODE_REF: src/index.ts:10-20 -->`
2. **Symbol references**: `<!-- CODE_REF: src/index.ts#myFunction -->`
3. **Class method references**: `<!-- CODE_REF: src/MyClass.ts#MyClass#myMethod -->`

### AST Parsing
Uses `@typescript-eslint/typescript-estree` for TypeScript/JavaScript symbol searching and code extraction.

### Test Configuration
- Test files: `test/**/*.test.ts`
- Path alias: `@/` maps to `src/`
- Environment: Node.js
- Preset: ts-jest

## Publishing
The `prepublishOnly` script ensures both build and tests pass before publishing to npm.

## Node Version
Minimum Node.js version: 16.0.0
