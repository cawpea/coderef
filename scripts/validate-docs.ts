#!/usr/bin/env node

/**
 * Documentation validation script
 *
 * Validates that documentation is updated when user-facing code changes.
 */

import chalk from 'chalk';

import { detectBaseBranch, getChangedFiles } from './lib/git-diff';
import { requiresDocsUpdate, hasDocsChanges } from './lib/path-checker';

/**
 * Main validation function
 */
function main(): void {
  console.log('🔍 Validating documentation updates...\n');

  try {
    // Detect base branch
    let baseBranch: string;
    try {
      baseBranch = detectBaseBranch();
      console.log(`Base branch detected: ${chalk.cyan(baseBranch)}`);
    } catch (error: any) {
      console.log(chalk.yellow(`⚠️  ${error.message}`));
      console.log('\nValidation skipped.\n');
      process.exit(0);
    }

    // Get changed files
    const diff = getChangedFiles(baseBranch);
    console.log(`Comparing: ${chalk.cyan(`${baseBranch}...HEAD`)}\n`);

    // Check if there are any changes
    if (diff.files.length === 0) {
      console.log(chalk.yellow('⚠️  No changes detected\n'));
      console.log('Validation skipped.\n');
      process.exit(0);
    }

    // Get file paths
    const changedPaths = diff.files.map((f) => f.path);

    // Check if documentation update is required
    const requirement = requiresDocsUpdate(changedPaths);

    if (!requirement.required) {
      // No documentation update required
      console.log('Changes detected:');
      for (const file of diff.files) {
        const statusIcon = file.status === 'A' ? '+' : file.status === 'M' ? '~' : '-';
        const statusColor =
          file.status === 'A' ? chalk.green : file.status === 'M' ? chalk.yellow : chalk.red;
        console.log(`  ${statusColor(statusIcon)} ${file.path}`);
      }
      console.log('');
      console.log(chalk.yellow('⚠️  Documentation update not required for these changes'));
      console.log('\nValidation skipped.\n');
      process.exit(0);
    }

    // Documentation update is required - check if docs have changes
    const docsUpdated = hasDocsChanges(changedPaths);

    // Display changed files
    console.log('Changes detected in user-facing code:');
    for (const file of diff.files) {
      if (requirement.affectedPaths.some((path) => file.path.startsWith(path))) {
        const statusIcon = file.status === 'A' ? '+' : file.status === 'M' ? '~' : '-';
        const statusColor =
          file.status === 'A' ? chalk.green : file.status === 'M' ? chalk.yellow : chalk.red;
        console.log(`  ${statusColor(statusIcon)} ${file.path}`);
      }
    }
    console.log('');

    if (docsUpdated) {
      // Success: docs have been updated
      console.log(chalk.green('✅ Documentation validation passed'));
      console.log('');
      console.log('Documentation updated:');
      for (const file of diff.files) {
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
    } else {
      // Warning: docs not updated
      console.log(chalk.yellow('⚠️  Documentation update recommended but not found'));
      console.log('');
      console.log(`${requirement.reason}`);
      console.log(`Documentation updated: ${chalk.red('NO')}`);
      console.log('');

      if (requirement.suggestions.length > 0) {
        console.log(chalk.cyan('💡 Suggestions:'));
        for (const suggestion of requirement.suggestions) {
          console.log(`  - Update ${suggestion}`);
        }
        console.log('');
      }

      console.log('Consider updating the relevant documentation.');
      console.log('See docs/development/documentation.md for guidelines.\n');
      process.exit(0);
    }
  } catch (error: any) {
    console.error(chalk.red('❌ Error:'), error.message);
    console.error('');
    process.exit(1);
  }
}

// Run main function
if (require.main === module) {
  main();
}
