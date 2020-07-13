module.exports = {
  /**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */
  root: true,
  // 指定解析器
  // babel-ESLint: 一个对Babel解析器的包装，使其能够与ESLint兼容。
  // parser: 'babel-eslint',
  // 设置解析器能帮助ESLint确定什么是解析错误。
  parserOptions: {
    parser: 'babel-eslint',
    // 指定js版本。语法上的支持
    ecmaVersion: 6
  },
  globals: {
    _: true
  },
  // 脚本在执行期间访问的额外的全局变量
  // globals: {},
  // env: 指定脚本的运行环境
  env: {
    // 一个环境定义了一组预定义的全局变量。
    browser: true,
    // 会自动开启es6语法支持。
    es6: true,
    node: true,
    jquery: true
  },
  // 配置文件从基础配置中继承已启用的规则。
  /**
   * eslint:recommended  启用核心规则，在规则页面中被标记为 √ 的。
   */
  //   extends: [
  //     // plugin:(此处不能有空格)包名/配置名称。解析时plugin是解析成 eslint-plugin-vue。如果有空格会解析失败，eslint-plugin- vue。
  //     // plugin可以省略包名的前缀 eslint-plugin-
  //     // 'plugin:vue/essential',
  //     // '@vue/standard',
  //     'eslint:recommended'
  //     // 也可以指定另一个基本配置文件的绝对路径或相对路径
  //   ],
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    /* for vue */

    // 禁止重复的二级键名
    // @off 没必要限制
    'vue/no-dupe-keys': 'off',
    // 禁止出现语法错误
    'vue/no-parsing-error': 'error',
    // 禁止覆盖保留字
    'vue/no-reservered-keys': 'off',
    // 组件的 data 属性的值必须是一个函数
    // @off 没必要限制
    'vue/no-shared-component-data': 'off',
    // 禁止 <template> 使用 key 属性
    // @off 太严格了
    'vue/no-template-key': 'off',
    // render 函数必须有返回值
    'vue/require-render-return': 'error',
    // prop 的默认值必须匹配它的类型
    // @off 太严格了
    'vue/require-valid-default-prop': 'off',
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'error',
    // template 的根节点必须合法
    'vue/valid-template-root': 'error',
    // v-bind 指令必须合法
    'vue/valid-v-bind': 'error',
    // v-cloak 指令必须合法
    'vue/valid-v-cloak': 'error',
    // v-else-if 指令必须合法
    'vue/valid-v-else-if': 'error',
    // v-else 指令必须合法
    'vue/valid-v-else': 'error',
    // v-for 指令必须合法
    'vue/valid-v-for': 'error',
    // v-html 指令必须合法
    'vue/valid-v-html': 'error',
    // v-if 指令必须合法
    'vue/valid-v-if': 'error',
    // v-model 指令必须合法
    'vue/valid-v-model': 'error',
    // v-on 指令必须合法
    'vue/valid-v-on': 'error',
    // v-once 指令必须合法
    'vue/valid-v-once': 'error',
    // v-pre 指令必须合法
    'vue/valid-v-pre': 'error',
    // v-show 指令必须合法
    'vue/valid-v-show': 'error',
    // v-text 指令必须合法
    'vue/valid-v-text': 'error',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/attributes-order': 'off',
    'vue/html-indent': 'off',

    // 最佳实践
    //
    // @fixable html 的结束标签必须符合规定
    // @off 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
    'vue/html-end-tags': 'off',
    // 计算属性禁止包含异步方法
    'vue/no-async-in-computed-properties': 'error',
    // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-confusing-v-for-v-if': 'error',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 'off',
    // 禁止在 <textarea> 中出现 {{message}}
    'vue/no-textarea-mustache': 'error',
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': 'error',
    // <component> 必须有 v-bind:is
    'vue/require-component-is': 'error',
    // prop 必须有类型限制
    // @off 没必要限制
    'vue/require-prop-types': 'off',
    // v-for 指令的元素必须有 v-bind:key
    'vue/require-v-for-key': 'error',

    // 风格问题
    //
    // @fixable 限制自定义组件的属性风格
    // @off 没必要限制
    'vue/attribute-hyphenation': 'off',
    // html 属性值必须用双引号括起来
    'vue/html-quotes': 'error',
    // @fixable 没有内容时，组件必须自闭和
    // @off 没必要限制
    'vue/html-self-closing': 'off',
    // 限制每行允许的最多属性数量
    // @off 没必要限制
    'vue/max-attributes-per-line': 'off',
    // @fixable 限制组件的 name 属性的值的风格
    // @off 没必要限制
    'vue/name-property-casing': 'off',
    // @fixable 禁止出现连续空格
    // TODO: 李德广   触发 新版本 typeerror：get 'range' of undefined
    // 'vue/no-multi-spaces': 'error',
    // @fixable 限制 v-bind 的风格
    // @off 没必要限制
    'vue/v-bind-style': 'off',
    // @fixable 限制 v-on 的风格
    // @off 没必要限制
    'vue/v-on-style': 'off',
    // 定义了的 jsx element 必须使用
    'vue/jsx-uses-vars': 'error',
    'no-console': 'off',
    'no-undef': 1,
    'no-use-before-define': 1,
    'no-unused-vars': 0,
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-useless-concat": 0
  }
}
