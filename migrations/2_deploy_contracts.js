// const ConvertLib = artifacts.require("ConvertLib");
const Blog = artifacts.require("Blog");

module.exports = function(deployer) {
  deployer.deploy(Blog);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
};
