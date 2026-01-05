module.exports = function (eleventyConfig) {
  // Static files
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
return {
  pathPrefix: "/field-notes/",
  dir: {
    input: "src",
    includes: "_includes",
    output: "_site",
  },
};
};
