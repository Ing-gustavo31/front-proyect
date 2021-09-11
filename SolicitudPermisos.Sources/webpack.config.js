const path = require('path');
var JavaScriptObfuscator = require('webpack-obfuscator');

var config={
    entry: {
        'main': './js/main.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/../SolicitudPermisos.Web/Dist'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}

var configProd = {
    plugins: [
      new JavaScriptObfuscator({
          rotateUnicodeArray: true
      }, [])
    ]
}



module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config = Object.assign(config, configProd);
    }

    return config;
}