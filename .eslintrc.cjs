module.exports = {
    extends: ["supernova"],
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-restricted-syntax": "off",
        "fp/no-mutation": "off",
        "no-param-reassign": ["error", { props: false }],
        "@typescript-eslint/restrict-template-expressions": "off",
        "no-nested-ternary": "off",
        "no-prototype-builtins": "off",
        "prefer-destructuring": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "no-await-in-loop": "off",
        "no-continue": "off",
        "@typescript-eslint/no-useless-constructor": "off", // Rule that removes clarity in inherited classes, don't remove this
        "no-console": "off", // Don't remove this as it is used for specific helpers
    },
}