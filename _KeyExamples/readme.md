
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


