
## Accordion Basic

![demo](http://i.imgur.com/fp6KIwK.gif)

This demo is a key to understanding the concepts to do CSS only animations relying on checkboxes or radio options to register a users click. 

## Key Template

![demo2](http://imgur.com/dPgtIuc.gif)

The glue that holds all this together. 

## Key Template 2

![demo3](http://imgur.com/iCKGZ4Y.gif)

Sligt modification of the original template that forms the basis of making an accordion, allows content to be hidden or visible.


## Id_Checked
![demo4](http://imgur.com/jkazVuH.gif)

Very important, instead of doing 

```
input[type=radio]:checked + label {
  color: red;
} 
```

Can use the class/ID selectors with it! For example:

```
#kitchen:checked + label {
	color: blue;
}
```

## ID_checked 2

![demo5](http://imgur.com/44ZhkpA.gif)

More examples


## Tabs Component Basics

![demo6](http://imgur.com/jOD2bd5.gif)

The basic structure for creating a tabs component

----

## Tabs Refined

![demo7](http://imgur.com/eVjTDPc.gif)

Styling added, refined code most notably this section here:

#### Problem: 

![demo8](http://imgur.com/xVSUTLQ.png)

If you try to do this markup `.content{display:none}` it will prevent the individual div's from ever displaying. Instead you want to specify the children `divs` of `.content`

#### Solution:

![demo9](http://imgur.com/y8Il3Wc.png)


#### Refactoring Original Code

![demo10](http://imgur.com/almZJBj.png)

