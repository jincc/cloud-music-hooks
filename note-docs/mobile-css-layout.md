[推荐看这篇文章](https://blog.csdn.net/weixin_57677300/article/details/129164050)

# rem适配

```
// 设置移动端适配:rem
// 现代浏览器支持设备屏幕宽度为100vw， 一般移动端设计稿为750px。 那么100vw = 750px, 1px = 100 / 750 vw
// 我们将html的fontsize设置为100 / 750 vw, 那么1rem就代表 100/750vw, 即1rem代表 1px
// 除以几视口的宽度就是多少rem，现在我们设置视口的宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw'; //如果这里设置20px，那么1rem就代表20px

div {
  width: 200rem; //相当于750px屏幕中的200px
}
```


# vw适配

这种方案不用设置根元素的font-size, 因为vw本身就是相对于视口的单位

![](https://img-blog.csdnimg.cn/5c93b0b5b5224a93bd2a1a671d78662d.png)


vw相比rem更简洁，也更容易理解。1vw就相当于屏幕的百分之一.

自动vw单位换算方法:
- vscode插件 px to vw
- 借助于webpack的工具来完成自动转化: https://github.com/evrone/postcss-px-to-viewport 


# 👍px为主，搭配vw/vh，媒体查询与flex布局

移动端的适配宗旨： 让拥有不同屏幕大小的终端拥有一样的UI界面，让拥有更大屏幕的终端展示更多的内容: 
- 关于文本，应用使用px单位，来实现在大屏设备显示更多的内容，而不是更大的文本
- 关于布局，我们可以使用flex来实现弹性布局，当实现特定宽高时可以适当使用vw/vh 或者rem
- 当要适配跨设备类型时，使用媒体查询； 如果跨设备类型交易差异太大，考虑分开项目开发

