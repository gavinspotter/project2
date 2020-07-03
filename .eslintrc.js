// =====================================================
//    The Eslint configuration below can be adjusted to
//  suit your needs.  Please visit the ESLint website at
//  https://eslint.org/docs/user-guide/configuring for
//  information on how to do so.  The configuration is
//  set to use the Airbnb style recommendations.
// =====================================================

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
<<<<<<< HEAD
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
=======
    "no-console": "off",
    "no-param-reassign": "off",
    "import/no-unresolved": "off",
>>>>>>> 84b90321206d3d5d628996165163a0d2c026f44b
  },
};
