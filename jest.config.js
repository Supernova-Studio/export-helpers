module.exports = {
    roots: ['<rootDir>/tests'],
    testMatch: ['**/tests/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    coverageReporters: ['json-summary'],
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>/src/'],
    moduleDirectories: ['node_modules', 'src']
}