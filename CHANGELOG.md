# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [0.4.0](https://github.com/cawpea/docs-coderef/compare/v0.3.0...v0.4.0) (2026-01-02)


### Bug Fixes

* correct diff display for UPDATE_LINE_NUMBERS from CODE_CONTENT_MISMATCH ([1984d23](https://github.com/cawpea/docs-coderef/commit/1984d238e2e176980cfde79fe2dd296ee7a16be6))
* show actual vs kept code diff for UPDATE_LINE_NUMBERS in CODE_CONTENT_MISMATCH ([44c34cb](https://github.com/cawpea/docs-coderef/commit/44c34cb097d3e431eb10d90802e80666680f2d27))


### Features

* add color highlighting to CODE_REF preview in fix options ([11e8e84](https://github.com/cawpea/docs-coderef/commit/11e8e848126e3731dd015b84c7bb891ba70b7cc3))
* add syntax highlighting to code blocks in fix preview ([37bbebe](https://github.com/cawpea/docs-coderef/commit/37bbebe7b9c9bb1ada72874de9fbc22d9139a983))
* group diff display by change type for better readability ([3f891eb](https://github.com/cawpea/docs-coderef/commit/3f891eb5bf5a460a6eed5cbcdec2b57c80fda835))
* simplify Option 2 preview to show only CODE_REF change ([294e2e4](https://github.com/cawpea/docs-coderef/commit/294e2e424b00f51caf9aa7580d3f2e7eca0a6ecf))
* unify error message styling with centralized formatter ([4735c23](https://github.com/cawpea/docs-coderef/commit/4735c2392ae2b57154d0ddfea91c139634f3648a))

# [0.3.0](https://github.com/cawpea/docs-coderef/compare/v0.2.0...v0.3.0) (2026-01-01)


### Bug Fixes

* update demo valid docs to pass all validations ([2caab53](https://github.com/cawpea/docs-coderef/commit/2caab535a936d118efff7bedfadbd4a5b8d85c19))


### Features

* add demo environment for local CODE_REF testing ([b845f99](https://github.com/cawpea/docs-coderef/commit/b845f997368ef898ad315f3dfdd43506cfdb5679))
* add demo:reset npm script for quick demo restoration ([3bceb6e](https://github.com/cawpea/docs-coderef/commit/3bceb6e00b72421c193495f506a6a1428123978a))

# [0.2.0](https://github.com/cawpea/docs-coderef/compare/v0.1.0...v0.2.0) (2026-01-01)


### Bug Fixes

* exclude CODE_REF comments in unclosed code blocks from validation ([f1f5287](https://github.com/cawpea/docs-coderef/commit/f1f52879dbed2d8ffaaf29fdba959e401fc81d2a))
* handle variable-length backtick sequences in code blocks ([b5674ad](https://github.com/cawpea/docs-coderef/commit/b5674add6060fbb429190ca97a02526ae16c31f2))
* keep release version v0 by semantic-release ([9173244](https://github.com/cawpea/docs-coderef/commit/91732445e82635221888e0ff4d6a6f4ddfa8d582))
* revert package version to v0.1.0 ([f537336](https://github.com/cawpea/docs-coderef/commit/f537336bfb658429e236b82d3b947de5805ee4f4))


### Features

* remove default .docsignore value from configuration ([67967d3](https://github.com/cawpea/docs-coderef/commit/67967d3adccb5709ea8bfc2e357d8ff685831e12))


### BREAKING CHANGES

* The `ignoreFile` configuration no longer defaults to '.docsignore'.
To continue using .docsignore, explicitly set `ignoreFile: '.docsignore'` in your
configuration file (.coderefrc.json or package.json).

This change makes the ignore file behavior explicit rather than implicit, applying
ignore patterns only when intentionally configured. All documentation examples now
use `.gitignore` instead of `.docsignore` to reflect this generic approach.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

## [Unreleased]

### Changed

- **Package rename**: Changed package name from `@cawpea/coderef` to `docs-coderef` (removed scope)
- **CLI command**: Changed from `coderef` to `docs-coderef`
- **Config file**: Renamed from `.coderefrc.json` to `.docs-coderefrc.json`
- **package.json field**: Changed from `"coderef"` to `"docs-coderef"`
- **Environment variables**: Changed from `CODEREF_*` to `DOCS_CODEREF_*`
- **Repository**: Renamed from `cawpea/coderef` to `cawpea/docs-coderef`

### Added

- Initial project setup
- Basic directory structure
- Configuration files (package.json, tsconfig.json, jest.config.js)

[unreleased]: https://github.com/cawpea/docs-coderef/compare/v0.1.0...HEAD
