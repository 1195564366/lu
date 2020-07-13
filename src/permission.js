/* eslint-disable */
/**
*** @title：工程路由权限控制
*** @author：lupan
*** @desc：
*** @date：2019-09-17 14:41:23
**/
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router'

router.afterEach(() => {
  NProgress.done()
})
