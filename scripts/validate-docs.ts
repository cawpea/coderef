#!/usr/bin/env node

/**
 * Documentation validation script
 *
 * Validates that documentation is updated when user-facing code changes.
 */

import chalk from 'chalk';

import type { GitDiff, RequirementResult } from './lib/types';
import { detectBaseBranch, getChangedFiles } from './lib/git-diff';
import { requiresDocsUpdate, hasDocsChanges } from './lib/path-checker';

/**
 * Validation result status
 */
type ValidationStatus = 'skipped' | 'passed' | 'warning' | 'error';

/**
 * Validation result
 */
interface ValidationResult {
  status: ValidationStatus;
  baseBranch?: string;
  diff?: GitDiff;
  requirement?: RequirementResult;
  docsUpdated?: boolean;
  error?: Error;
  skipReason?: string;
}

/**
 * Validate documentation updates
 *
 * This function contains the core validation logic without any presentation concerns.
 * It returns a structured result that can be easily tested and reused.
 */
export function validateDocumentation(baseBranch?: string): ValidationResult {
  try {
    // Detect base branch if not provided
    let detectedBaseBranch: string;
    if (baseBranch) {
      detectedBaseBranch = baseBranch;
    } else {
      try {
        detectedBaseBranch = detectBaseBranch();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          status: 'skipped',
          skipReason: message,
        };
      }
    }

    // Get changed files
    const diff = getChangedFiles(detectedBaseBranch);

    // Check if there are any changes
    if (diff.files.length === 0) {
      return {
        status: 'skipped',
        baseBranch: detectedBaseBranch,
        diff,
        skipReason: 'No changes detected',
      };
    }

    // Get file paths
    const changedPaths = diff.files.map((f) => f.path);

    // Check if documentation update is required
    const requirement = requiresDocsUpdate(changedPaths);

    if (!requirement.required) {
      return {
        status: 'skipped',
        baseBranch: detectedBaseBranch,
        diff,
        requirement,
        skipReason: 'Documentation update not required for these changes',
      };
    }

    // Documentation update is required - check if docs have changes
    const docsUpdated = hasDocsChanges(changedPaths);

    if (docsUpdated) {
      return {
        status: 'passed',
        baseBranch: detectedBaseBranch,
        diff,
        requirement,
        docsUpdated: true,
      };
    } else {
      return {
        status: 'warning',
        baseBranch: detectedBaseBranch,
        diff,
        requirement,
        docsUpdated: false,
      };
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

/**
 * Format and display validation results
 */
function formatAndDisplay(result: ValidationResult): void {
  console.log('🔍 Validating documentation updates...\n');

  // Handle error status
  if (result.status === 'error') {
    console.error(chalk.red('❌ Error:'), result.error?.message ?? 'Unknown error');
    console.error('');
    process.exit(1);
  }

  // Handle skipped status
  if (result.status === 'skipped') {
    if (result.skipReason) {
      console.log(chalk.yellow(`⚠️  ${result.skipReason}`));
    }
    if (result.baseBranch) {
      console.log(`Base branch detected: ${chalk.cyan(result.baseBranch)}`);
      console.log(`Comparing: ${chalk.cyan(`${result.baseBranch}...HEAD`)}\n`);
    }
    if (result.diff && result.diff.files.length > 0) {
      console.log('Changes detected:');
      for (const file of result.diff.files) {
        const statusIcon = file.status === 'A' ? '+' : file.status === 'M' ? '~' : '-';
        const statusColor =
          file.status === 'A' ? chalk.green : file.status === 'M' ? chalk.yellow : chalk.red;
        console.log(`  ${statusColor(statusIcon)} ${file.path}`);
      }
      console.log('');
    }
    console.log('\nValidation skipped.\n');
    process.exit(0);
  }

  // Display base branch and comparison
  if (result.baseBranch) {
    console.log(`Base branch detected: ${chalk.cyan(result.baseBranch)}`);
    console.log(`Comparing: ${chalk.cyan(`${result.baseBranch}...HEAD`)}\n`);
  }

  // Display changed files in user-facing code
  if (result.diff && result.requirement) {
    console.log('Changes detected in user-facing code:');
    for (const file of result.diff.files) {
      if (result.requirement.affectedPaths.some((path) => file.path.startsWith(path))) {
        const statusIcon = file.status === 'A' ? '+' : file.status === 'M' ? '~' : '-';
        const statusColor =
          file.status === 'A' ? chalk.green : file.status === 'M' ? chalk.yellow : chalk.red;
        console.log(`  ${statusColor(statusIcon)} ${file.path}`);
      }
    }
    console.log('');
  }

  // Handle passed status
  if (result.status === 'passed' && result.diff) {
    console.log(chalk.green('✅ Documentation validation passed'));
    console.log('');
    console.log('Documentation updated:');
    for (const file of result.diff.files) {
      if (file.path.startsWith('docs/')) {
        const statusIcon = file.status === 'A' ? '+' : file.status === 'M' ? '~' : '-';
        const statusColor =
          file.status === 'A' ? chalk.green : file.status === 'M' ? chalk.yellow : chalk.red;
        console.log(`  ${statusColor(statusIcon)} ${file.path}`);
      }
    }
    console.log('');
    console.log('All checks passed!\n');
    process.exit(0);
  }

  // Handle warning status
  if (result.status === 'warning' && result.requirement) {
    console.log(chalk.yellow('⚠️  Documentation update recommended but not found'));
    console.log('');
    console.log(`${result.requirement.reason}`);
    console.log(`Documentation updated: ${chalk.red('NO')}`);
    console.log('');

    if (result.requirement.suggestions.length > 0) {
      console.log(chalk.cyan('💡 Suggestions:'));
      for (const suggestion of result.requirement.suggestions) {
        console.log(`  - Update ${suggestion}`);
      }
      console.log('');
    }

    console.log('Consider updating the relevant documentation.');
    console.log('See docs/development/documentation.md for guidelines.\n');
    process.exit(0);
  }
}

/**
 * Main validation function
 */
function main(): void {
  const result = validateDocumentation();
  formatAndDisplay(result);
}

// Run main function
if (require.main === module) {
  main();
}
