[官方文档](https://reactrouter.com/en/main/start/tutorial)


## [错误页](https://reactrouter.com/en/main/start/tutorial#handling-not-found-errors)

> Anytime your app throws an error while rendering, loading data, or performing data mutations, React Router will catch it and render an error screen.

useRouteError钩子用来获取路由错误

当发生错误时，会从路由表中查找最近的errorElement信息，直至找到根路由上配置的errorElement信息. 
错误的产生有多种情况，比如说找不到路由，或者loader中主动触发的异常

## [子路由](https://reactrouter.com/en/main/start/tutorial#nested-routes)

会在父路由组件中展示，搭配<Outlet/>使用

## [客户端路由 vs 向服务端文档请求](https://reactrouter.com/en/main/start/tutorial#client-side-routing)

使用<Link>标签

## [加载数据](https://reactrouter.com/en/main/start/tutorial#loading-data)

[loader](https://reactrouter.com/en/main/route/loader#loader)

## [表单处理](https://reactrouter.com/en/main/start/tutorial#data-writes--html-forms)

- post表单
- destroy表单
- get查询表单

react-router提供的<Form>表单它会拦截表单提交到服务器，而是交给本地react-router库处理. router库会执行绑定在路由上的action操作。action完成以后router库会调用绑定在路由上的loader来重新加载数据

## [高亮展示当前选中的路由](https://reactrouter.com/en/main/start/tutorial#active-link-styling)


