module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'index.org.html'
        }
      }
    },
    cssmin : {
      pc : {
        src : [
          'c/bootstrap-theme.css',
          'c/bootstrap.css',
          'c/jquery-ui.css',
          'c/jquery-ui.structure.css',
          'c/jquery-ui.theme.css',
          'c/jquery.bxslider.css',
          'c/jquery.maximage.css',
          'c/normalize.css',
          'c/tabulous.css',
          'c/main.css'
        ],
        dest : 'c/all.css'
      }
    },
    concat: {
      files: {
        // 元ファイルの指定
        // src : 'j/*.js',
        src : 'j/jquery-ui.js',
        src : 'j/jquery.cycle.all.js',
        src : 'j/jquery.heightLine.js',

        // concat無理だった
        // src : 'j/jquery.bxslider.js',
        // src : 'j/jquery.ellipsis.js',
        // src: 'j/jquery.localscroll.js',
        // src : 'j/jquery.maximage.js',
        // src : 'j/jquery.scrollto.js',
        // src : 'j/jquery.slides.js',
        // src : 'j/jquery.smarttruncation.js',
        // src : 'j/jquery.smoothScroll.js',
        // 出力ファイルの指定
        dest: 'j/_jslibs.js'
      }
    },

    uglify: {
      dist: {
        files: {
          // 出力ファイル: 元ファイル
          'j/_.js': 'j/_jslibs.js'
        }
      }
    },

    watch: {
      // js: {
      //   files: 'j/*.js',
      //   tasks: ['concat', 'uglify']
      // }
    }
  });

  // プラグインのロード・デフォルトタスクの登録
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'htmlmin']);
};
