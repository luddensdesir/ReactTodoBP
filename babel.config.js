module.exports = {
  // presets: [
  //   "@babel/preset-react",
  //   "@babel/preset-env",
  //   "@babel/preset-typescript"
  // ],
  presets: [
    ["@babel/preset-env", {targets: {"node": 4}}], 
    ["@babel/preset-typescript"], 
    "@babel/preset-react"],
  plugins:[
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
};
