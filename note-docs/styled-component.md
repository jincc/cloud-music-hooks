# styled-component

原理: 
>> styled-components generates an actual stylesheet with classes, and attaches those classes to the DOM nodes of styled components via the className prop. It injects the generated stylesheet at the end of the head of the document during runtime.
>> 因为样式表是在运行时往<head>末尾注入样式，所以当出现style-components和其他css技术混用时（比如css module)，styled-components的样式优先级会高一些


优势在于（[官方介绍](https://styled-components.com/docs/basics#motivation)）:
- CSS模块化: 它可以理解为自动关联了样式的**组件**，既然是组件就具有独立性，隔离性，复用性
- 易于维护: 样式和组件是放在一个文件夹下的
- 动态样式: 因为在通过js写样式，所以做动态样式会非常方便
- 自动添加供应商前缀

劣势在于:
- 运行时解析成本

## 功能点

1. 支持动态样式，即[通过props值调整组件的样式](https://styled-components.com/docs/basics#adapting-based-on-props) 

速查语法
```
const Button = styled.button`
  background: ${props => props.$primary ? "#BF4F74" : "white"};
`;
```

2. 支持样式继承， 比如您可能经常想要使用某个组件，但针对单个情况稍微更改一下。 [可以通过styled()构造函数完成样式继承](https://styled-components.com/docs/basics#extending-styles)

速查语法:
```
const Button = styled.button`xxxx`;
const TomatoButton = styled(Button)`
  color: tomato;
`
```

3. 支持props传递，注意传递的属性要以$开头，这样框架将不会将其传递给最终的DOM元素

4. 内嵌预处理库stylis, 支持伪元素，伪选择器和嵌套

[详情见官方文档](https://styled-components.com/docs/basics#pseudoelements-pseudoselectors-and-nesting)

[支持CSS选择器语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors)

速查语法:
```
&代表组件的所有实例元素, 常用:
&: hover {
  xx
}

&.someclass { //额外需要具有someclass的classname

}

.someclass {} //后代元素中具有该类名的元素

>.someclass {} //直接子代并且具有该类名的元素
```

5. 支持[通过attrs构造函数传递静态或动态属性](https://styled-components.com/docs/basics#attaching-additional-props)，一般是作为样式中要引用的一些默认值.

```
const Input = styled.input.attrs(props => ({
  $size: props.$size || '1em'
}))`
  margin: ${props => props.$size}
`
```

6. 支持CSS动画，[@keyframes](https://styled-components.com/docs/basics#animations)

7. 支持全套[主题功能](https://styled-components.com/docs/advanced#theming), 基于useContext技术而来

速查语法:
- ThemeProvider
- styled-component内部可以通过theme属性获取主题
- 其他外部组件可以通过useTheme来获取主题
