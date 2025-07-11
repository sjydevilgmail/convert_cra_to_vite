module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "babel-eslint",
  extends: ["airbnb"],
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "max-len": [2, {
      "code" : 160
    }],
    "linebreak-style": 0,
    "no-console": "off",
    "no-alert": "off",
    "func-names": "off",
    "arrow-parens": "off",
    "max-len": "off",
    "arrow-body-style": "off",
    "no-debugger": 0
  }
};

