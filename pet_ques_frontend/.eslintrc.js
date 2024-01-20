module.exports = {
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    "plugin:react-hooks/recommended"
  ],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
};
