# @cawpea/coderef

> Validate and fix code references in markdown documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Status**: 🚧 Under Development

## Overview

`@cawpea/coderef` is a tool to validate and automatically fix code references in markdown documentation. It ensures that code snippets in your documentation stay in sync with your actual source code.

## Features

- ✅ Validate CODE_REF comments against actual source code
- 🔧 Auto-fix outdated references
- 🎯 AST-based symbol searching for TypeScript/JavaScript
- 📝 Interactive fix mode with colored diffs
- 🎨 Beautiful diff display
- 🚫 .docsignore support for excluding files

## Installation

```bash
npm install --save-dev @cawpea/coderef
```

## Quick Start

### CLI Usage

```bash
# Validate all CODE_REF references
npx coderef validate

# Fix errors interactively
npx coderef fix

# Auto-fix without prompts
npx coderef fix --auto
```

### Programmatic Usage

```typescript
import { validate, fix } from '@cawpea/coderef';

// Validate
const result = await validate({
  projectRoot: '.',
  docsDir: 'docs',
});

// Fix
await fix({
  projectRoot: '.',
  docsDir: 'docs',
  auto: true,
});
```

## CODE_REF Syntax

Reference code by line numbers:

```markdown
<!-- CODE_REF: src/index.ts:10-20 -->
```

Reference code by symbol name:

```markdown
<!-- CODE_REF: src/index.ts#myFunction -->
```

Reference class methods:

```markdown
<!-- CODE_REF: src/MyClass.ts#MyClass#myMethod -->
```

## Configuration

Create `.coderefrc.json` in your project root:

```json
{
  "projectRoot": ".",
  "docsDir": "docs",
  "ignoreFile": ".docsignore"
}
```

## Development

This package is currently under active development. More documentation will be added soon.

## License

MIT © cawpea
