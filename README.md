# grunt-min [![Build Status](https://travis-ci.org/colorhook/grunt-min.png)](https://travis-ci.org/colorhook/grunt-min)


### 使用示例

> `min`任务可以压缩js脚本，css样式，html文档，json数据，jpg、png和gif图片

#### 压缩

```js
grunt.initConfig({
  min: {
    my_target: {
      files: {
        'dest/style.min.css': ['src/style.css'],
        'dest/script.min.js': ['src/input1.js', 'src/input2.js'],
	'dest/index.html': 'src/index.html',
	'dest/data.json': 'src/data.json',
	'dest/t.jpg': 'src/t.jpg'
      }
    }
  }
});
```


#### 通过`except`参数可以保留变量名不被混淆

```js
grunt.initConfig({
  uglify: {
    options: {
       except: ['$', 'Backbone']
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```



#### 使用`banner`, `footer`

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      
      footer: '/*end*/'
    },
    my_target: {
      options:{
        //不保留原有js中的注释
        copyright: false
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```


#### 将整个文件夹中的脚本压缩

```js
grunt.initConfig({
  min: {
    my_target: {
      files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dest/js'
      }]
    }
  }
});
```

> `datauri`任务可以将css文件进行DataURI编码

#### datauri

```js
grunt.initConfig({
  datauri:{
    my_target: {
      'dest/datauri.css': 'src/style.css'
    }
  }
});
```


## Release History

  v0.1.0     2014-1-7

---

Task submitted by [colorhook@gmail.com](http://github.com/colorhook)
