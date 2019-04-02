# MVC

**Model–View–Controller**

模型：管理应用程序的数据、逻辑和规则

视图：展示数据（可以直接从模型中获取数据）

控制器：接收输入并将其转化成模型和视图的命令

# MVP

**Model–View–Presenter**

模型：为 Presenter 提供视图要展示的数据的接口（和 MVC 的 M 一样）

视图：展示数据（通过 Presenter 从模型中获取数据），和将事件传递给 Presenter

Presenter：从模型中获取数据并组织成视图需要的格式，和接收视图事件更新模型

# MVVM

**Model–View–ViewModel**（也称**model–view–binder**）

模型：领域模型或数据访问层

视图：展示数据（模型），接受事件并通过数据绑定（data binding）传递给视图模型

视图模型：使用绑定器使视图和视图模型绑定属性自动通信（视图模型是视图的抽象，她将视图的公共属性和命令暴露出来。）

# 进化过程

MVC --- 将 M 和 V 进行分离 ---> MVP --- V 和业务逻辑分离 ---> MVVM

# 参考

-   [Model–view–controller - Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
-   [Model–view–presenter - Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)
-   [Model–view–viewmodel - Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
