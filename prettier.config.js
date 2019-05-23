module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '.gitlab-ci.yml',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
