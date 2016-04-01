var cover = require('browserify-istanbul');

module.exports = function(config) {
    config.set({
        basePath : '../',
        frameworks: ['browserify', 'chai', 'jasmine'],

        files: [
            'test/lib/pixi.min.js',
            'src/pom.js',
            'src/**/*.js',
            'test/src/*.js',
            'test/setup.js',
            'test/unit/**/*.test.js'
        ],
        browserify: {
            debug: true,
            extensions: ['.js'],
            configure: function(bundle){
                bundle.on('prebundle', function(){
                    bundle
                        .transform(cover);
                });
            }
        },
        // list of files to exclude
        //exclude : [],

        // use dolts reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress', 'junit', 'teamcity'
        // CLI --reporters progress
        reporters : ['spec', 'coverage', 'progress'],

        'coverageReporter': {
            dir: 'coverage/',
            reporters: [
              // reporters not supporting the `file` property
              { type: 'html', subdir: 'report-html' },
              { type: 'lcov', subdir: 'report-lcov' }
          ]
        },

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors : true,

        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        // CLI --log-level debug
        logLevel : config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 60000
        captureTimeout : 60000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun : true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan : 500,

        preprocessors : {
            'src/pom.js': ['browserify'],
            'src/**/*.js': ['browserify']
        },

        proxies: {
            '/textures/': '/base/textures/'
        },

        plugins : [
            'karma-coverage',
            'karma-jasmine',
            'karma-chai',
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ]
    });
};
