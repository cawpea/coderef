import type { RequirementResult } from './types';

/**
 * Paths that require documentation updates
 */
const DOCS_REQUIRED_PATHS = ['src/cli/', 'src/index.ts', 'bin/', 'src/core/'];

/**
 * Documentation directory
 */
const DOCS_DIR = 'docs/';

/**
 * Suggestions for documentation updates based on changed paths
 */
const DOCS_SUGGESTIONS: Record<string, string[]> = {
  'src/cli/': ['docs/user-guide/cli-usage.md'],
  'src/index.ts': ['docs/user-guide/', 'docs/architecture/overview.md'],
  'bin/': ['docs/user-guide/installation.md'],
  'src/core/': ['docs/architecture/overview.md'],
};

/**
 * Check if a path requires documentation update
 */
function pathRequiresDocs(filePath: string): boolean {
  return DOCS_REQUIRED_PATHS.some((requiredPath) => {
    if (requiredPath.endsWith('/')) {
      return filePath.startsWith(requiredPath);
    }
    return filePath === requiredPath;
  });
}

/**
 * Check if a path is in the docs directory
 */
function isDocsPath(filePath: string): boolean {
  return filePath.startsWith(DOCS_DIR);
}

/**
 * Check if changed files require documentation updates
 */
export function requiresDocsUpdate(changedFiles: string[]): RequirementResult {
  const affectedPaths: string[] = [];
  const suggestions: string[] = [];

  // Check each changed file
  for (const file of changedFiles) {
    if (pathRequiresDocs(file)) {
      // Find matching required path
      for (const requiredPath of DOCS_REQUIRED_PATHS) {
        const matches = requiredPath.endsWith('/')
          ? file.startsWith(requiredPath)
          : file === requiredPath;

        if (matches && !affectedPaths.includes(requiredPath)) {
          affectedPaths.push(requiredPath);

          // Add suggestions
          const pathSuggestions = DOCS_SUGGESTIONS[requiredPath] || [];
          for (const suggestion of pathSuggestions) {
            if (!suggestions.includes(suggestion)) {
              suggestions.push(suggestion);
            }
          }
        }
      }
    }
  }

  if (affectedPaths.length === 0) {
    return {
      required: false,
      reason: 'No user-facing code changes detected',
      affectedPaths: [],
      suggestions: [],
    };
  }

  return {
    required: true,
    reason: `Changes detected in: ${affectedPaths.join(', ')}`,
    affectedPaths,
    suggestions,
  };
}

/**
 * Check if docs directory has changes
 */
export function hasDocsChanges(changedFiles: string[]): boolean {
  return changedFiles.some((file) => isDocsPath(file));
}

/**
 * Get list of documentation files that should be updated
 */
export function suggestDocsToUpdate(changedFiles: string[]): string[] {
  const suggestions: string[] = [];

  for (const file of changedFiles) {
    for (const requiredPath of DOCS_REQUIRED_PATHS) {
      const matches = requiredPath.endsWith('/')
        ? file.startsWith(requiredPath)
        : file === requiredPath;

      if (matches) {
        const pathSuggestions = DOCS_SUGGESTIONS[requiredPath] || [];
        for (const suggestion of pathSuggestions) {
          if (!suggestions.includes(suggestion)) {
            suggestions.push(suggestion);
          }
        }
      }
    }
  }

  return suggestions;
}
