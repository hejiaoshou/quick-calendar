/**
 * 显示菜单
 */
function showMenu () {
  const prompt = require('@system.prompt')
  const router = require('@system.router')
  const appInfo = require('@system.app').getInfo()
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消'],
    success: function (ret) {
      switch (ret.index) {
      case 0:
        // 保存桌面
        createShortcut()
        break
      case 1:
        // 关于
        router.push({
          uri: '/About',
          params: {
            name: appInfo.name,
            icon: appInfo.icon
          }
        })
        break
      case 2:
        // 取消
        break
      default:
        prompt.showToast({
          message: 'error'
        })
      }
    }
  })
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut () {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

function Alert(val) {
  const prompt = require('@system.prompt')
  prompt.showToast({
      message: val
  })
}

function Ajax (url, method, data) {
  const fetch = require('@system.fetch')
  let host = ""
  if (url.indexOf("http") == -1) {
    host = "http://qrl.hedingheng.com"
  }
  return new Promise ((resolve, reject) => {
    fetch.fetch({
      url: `${host}${url}`,
      method: method || "GET",
      data: data || "",
      success: function (response) {
        resolve(response)
      },
      fail: function (err, code) {
        Alert('网络错误，请稍后再试！'+code)
      }
    })
  })

}

function getDeviceInfo () {
  const device = require('@system.device')
  return new Promise ((resolve, reject) => {
    device.getInfo({
      success: function (ret) {
        resolve(ret)
      }
    })
  })
}

function goTo (uri,val) {
  const router = require('@system.router')
  router.push ({
    uri: uri,
    params: val
  })
}

function goBack (uri) {
    const router = require('@system.router')
    uri ? router.back() : router.back({ path: uri })
}

export default {
  showMenu,
  createShortcut,
  Alert,
  getDeviceInfo,
  Ajax,
  goTo,
  goBack
}
