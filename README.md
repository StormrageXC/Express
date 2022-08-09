# Express
## express-generator
### 安装

> npx express-generator

或者

> npm install -g express-generator
### 命令行
>             
>   express -h
> 
>   Usage: express [options] [dir]
> 
>   Options:
> 
>   -h, --help          输出使用方法
>
>   --version       输出版本号
>
>   -e, --ejs           添加对 ejs 模板引擎的支持
>
>   --hbs           添加对 handlebars 模板引擎的支持
>
>   --pug           添加对 pug 模板引擎的支持
>
>   -H, --hogan         添加对 hogan.js 模板引擎的支持
>
>   --no-view       创建不带视图引擎的项目
>
>   -v, --view <engine> 添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
>
>   -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是普通的 css 文件）
>
>   --git           添加 .gitignore
>
>   -f, --force         强制在非空目录下创建
>  
### 托管静态文件
如果要使用多个静态资源目录，请多次调用 express.static 中间件函数：
> app.use(express.static('public'))
>
> app.use(express.static('files'))