/**
 * Test utility package for elastic-builder tests
 *
 * This package provides minimal, essential utilities for writing explicit Vitest tests.
 * We deliberately keep this minimal - most test logic should be explicit in the test files.
 */

/**
 * Re-export recursiveToJSON from source for convenience in tests.
 * This is NOT a duplicate - it's a convenience re-export of the existing function.
 *
 * Use this to convert nested builder objects to JSON for assertions.
 *
 * @example
 * import { recursiveToJSON } from '../testutil/index.js';
 * const result = recursiveToJSON(queryBuilder.toJSON());
 */
export { recursiveToJSON } from '../../src/core/util.js';
