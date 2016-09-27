const fs = require('fs');

module.exports = {
  paths: {
    public: 'public',
    watched:  ['app']
  },

  conventions: {
    assets:   /^(app)(\\|\/)(assets)/,
    ignored:  [/\/_/, /\.(spec|scenario)\.(js$)/, 'test/**/*.js']
  },

  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': [/^(?!app)/],
        'js/app.js': [/^app/]
      }
    },
    stylesheets: {
      joinTo: '/css/app.css'
    }
  },

  plugins: {
    babel: {
      presets: ['es2015']
    }
  }
};
