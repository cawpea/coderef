/**
 * Type definitions for documentation validation
 */

/**
 * Git file change information
 */
export interface GitFileChange {
  path: string;
  status: 'A' | 'M' | 'D' | 'R';
}

/**
 * Git diff result
 */
export interface GitDiff {
  files: GitFileChange[];
  stats: {
    added: number;
    modified: number;
    deleted: number;
  };
}

/**
 * Documentation requirement result
 */
export interface RequirementResult {
  required: boolean;
  reason: string;
  affectedPaths: string[];
  suggestions: string[];
}
