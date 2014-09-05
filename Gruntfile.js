module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        concat: {
            files: {
                // 元ファイルの指定
                // src : 'javascripts/*.js',
                src : 'javascripts/jquery-ui.js',
                src : 'javascripts/jquery.cycle.all.js',
                src : 'javascripts/jquery.ellipsis.js',
                src : 'javascripts/jquery.heightLine.js',
                src : 'javascripts/jquery.localscroll.js',
                src : 'javascripts/jquery.maximage.js',
                src : 'javascripts/jquery.scrollto.js',
                src : 'javascripts/jquery.slides.js',
                src : 'javascripts/jquery.smarttruncation.js',
                src : 'javascripts/jquery.smoothScroll.js',
                // 出力ファイルの指定
                dest: 'javascripts/concat/jquerylibs.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    // 出力ファイル: 元ファイル
                    'javascripts/min/jquerylibs-min.js': 'javascripts/concat/jquerylibs.js'
                }
            }
        },

        watch: {
            js: {
                files: 'javascripts/*.js',
                tasks: ['concat', 'uglify']
            }
        }
    });

    // プラグインのロード・デフォルトタスクの登録
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify']);
};
