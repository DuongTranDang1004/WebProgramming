module.exports = {
  content: [
    "./views/**/*.ejs", // All EJS files in the views folder
    "./views/**/*.html", // Any HTML files in the views folder
    "./static/css/**/*.css", // All CSS files to apply Tailwind customizations
    "./app.js", // Main entry file
    "./routes/**/*.js", // route files to use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
