const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // ---- Filters ----
  eleventyConfig.addFilter("ymd", (dateObj) => {
    // Eleventy gives JS Date objects; normalize to yyyy-MM-dd
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // ---- Passthrough ----
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // ---- Ignores ----
  eleventyConfig.ignores.add("**/drafts/**");
  eleventyConfig.ignores.add("**/_templates/**");

  // ---- Collections ----
eleventyConfig.addCollection("notes", function (collectionApi) {
  return collectionApi
    .getAll()
    .filter((item) => {
      const p = item.inputPath || "";
      const isNote =
        (p.includes("/notes/") || p.includes("\\notes\\")) &&
        p.endsWith(".md");
      const isNotesIndex =
        p.endsWith("/notes/index.md") || p.endsWith("\\notes\\index.md");
      return isNote && !isNotesIndex;
    })
    .sort((a, b) => b.date - a.date);
});

  return {
    pathPrefix: "/field-notes/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
