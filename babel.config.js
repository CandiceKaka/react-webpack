const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  "presets": [
    [
      '@babel/preset-env', 
      // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
      // "targets": {
      //  "chrome": 35,
      //  "ie": 9
      // },
      {
        "useBuiltIns" : "usage",  // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        "corejs" : 3  //  使用低版本js语法模拟高版本的库,也就是垫片
      }
    ], 
    '@babel/preset-react', 
    '@babel/preset-typescript'
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", {"legacy": true}],  //  项目支持装饰器
    isDEV && require.resolve('react-refresh/babel') //  开发模式，启动react热更新插件
  ].filter(Boolean) // 过滤空值
}

// babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5（上面已经安装过）
// @babel/corer: babel 编译的核心包
// @babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
// core-js: 使用低版本js语法模拟高版本的库,也就是垫片

// 为了避免webpack配置文件过于庞大,
// 可以把babel-loader的配置抽离出来, 新建babel.config.js文件,
// 使用js作为配置文件,
// 是因为可以访问到process.env.NODE_ENV环境变量来区分是开发还是打包模式。