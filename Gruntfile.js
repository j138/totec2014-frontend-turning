module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        concat: {
            files: {
                // 元ファイルの指定
                // src : 'js/*.js',
                src : 'js/jquery-ui.js',
                src : 'js/jquery.cycle.all.js',
                src : 'js/jquery.heightLine.js',

                
                // concat無理だった
                // src : 'js/jquery.bxslider.js',
                // src : 'js/jquery.ellipsis.js',
                // src: 'js/jquery.localscroll.js',
                // src : 'js/jquery.maximage.js',
                // src : 'js/jquery.scrollto.js',
                // src : 'js/jquery.slides.js',
                // src : 'js/jquery.smarttruncation.js',
                // src : 'js/jquery.smoothScroll.js',
                // 出力ファイルの指定
                dest: 'js/_jslibs.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    // 出力ファイル: 元ファイル
                    'js/_jslibs-min.js': 'js/_jslibs.js'
                }
            }
        },

        watch: {
            js: {
                files: 'js/*.js',
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
