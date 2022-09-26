## Images and SVGs as pointers

Images and SVG can be used as pointers using **pointer-bg**, **pointer-bg-hover**, and **pointer-bg-focus** attributes, like this:

```html
<tc-range-slider
  value1="30"
  value2="70"

  pointer-width="2rem"
  pointer-height="2rem"
  
  slider-bg="#6AD3BA"
  slider-bg-hover="#3F8A8A"
  slider-bg-fill="#378c8a"
  
  pointer-bg="#fff url(/path/image.png) no-repeat 50% 50%"
  pointer-bg-hover="#c6f7eb url(/path/image.png) no-repeat 50% 50%"
  pointer-bg-focus="#c6f7eb url(/path/image.png) no-repeat 50% 50%">
</tc-range-slider>
```

<div class="my-12 flex flex-col items-center">
    <tc-range-slider
        value1="30"
        value2="70"
        pointer-width="2rem"
        pointer-height="2rem"
        slider-bg="#6AD3BA"
        slider-bg-hover="#3F8A8A"
        slider-bg-fill="#378c8a"
        pointer-bg="#fff url(/img/icons/paw.png) no-repeat 50% 50%"
        pointer-bg-hover="#c6f7eb url(/img/icons/paw.png) no-repeat 50% 50%"
        pointer-bg-focus="#c6f7eb url(/img/icons/paw.png) no-repeat 50% 50%">></tc-range-slider>
</div>