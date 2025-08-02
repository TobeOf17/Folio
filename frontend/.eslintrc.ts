module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        // Optional: override or add rules
        'react/react-in-jsx-scope': 'off', // Not needed with React 17+
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
