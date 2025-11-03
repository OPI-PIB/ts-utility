/** @type {import("@stryker-mutator/api/core").Config} */
const config = {
	mutate: ['src/**/*.ts', '!src/**/*.spec.ts'],
	packageManager: 'npm',
	reporters: ['html', 'clear-text', 'progress', 'dashboard'],
	coverageAnalysis: 'perTest',
	testRunner: 'vitest'
};

export default config;
