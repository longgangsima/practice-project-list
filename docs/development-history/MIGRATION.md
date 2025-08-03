# 📋 Documentation Migration Log

This file tracks the movement of documentation files to maintain reference links.

## File Movements (June 29, 2025)

### React Concepts Guides

- `src/pages/BookStore/array-methods-guide.md` → `docs/guides/react-concepts/array-methods-guide.md`
- `src/pages/BookStore/shallow-copy-guide.md` → `docs/guides/react-concepts/shallow-copy-guide.md`
- `src/pages/BookStore/nested-update-guide.md` → `docs/guides/react-concepts/nested-update-guide.md`
- `src/pages/BookStore/deep-nested-updates-guide.md` → `docs/guides/react-concepts/deep-nested-updates-guide.md`
- `src/pages/BookStore/correct-api-guide.md` → `docs/guides/react-concepts/correct-api-guide.md`

### Project Documentation (Moved Back)

- `docs/projects/bookstore/README.md` → `src/pages/BookStore/README.md` _(Moved back for development convenience)_
- `docs/projects/restaurant-system/README.md` → `src/pages/RestaurantSystem/README.md` _(Moved back for development convenience)_

### Testing Documentation

- `src/pages/RestaurantSystem/__tests__/test-setup-guide.md` → `docs/guides/testing/test-setup-guide.md`
- `src/pages/RestaurantSystem/__tests__/DisplayOrders.manual-test.md` → `docs/guides/testing/DisplayOrders.manual-test.md`

### Backend Documentation

- `backend/README.md` → `docs/backend/README.md`

## New Structure Benefits

1. **Centralized Documentation** - All docs in one location
2. **Better Organization** - Logical grouping by type and purpose
3. **Easier Navigation** - Clear hierarchy and index files
4. **Improved Discoverability** - Comprehensive README files
5. **Consistent Naming** - Standardized file names

## Update Required

If any external references or bookmarks point to the old file locations, they should be updated to use the new paths in the `docs/` directory.

## Design Decision: Project READMEs Stay Close to Code

**Rationale:** Project-specific documentation should remain in the project directory for:

1. **Developer Convenience** - Easy access while working on specific projects
2. **Context Proximity** - Documentation stays close to the code it describes
3. **IDE Integration** - Better support in code editors and IDEs
4. **Git Workflow** - Project changes and docs can be committed together

**Structure:**

- `docs/` - Contains cross-project guides, concepts, and general documentation
- `src/pages/[Project]/README.md` - Project-specific documentation stays with the code

This follows industry best practices where project READMEs are co-located with their respective codebases.
