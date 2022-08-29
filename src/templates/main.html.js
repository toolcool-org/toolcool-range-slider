export default (styles) => {
  return `
    <style>
        ${styles}
    </style>
    
    <div class="range-slider-box">
    
      <div class="labels-row">
        <slot name="value-label"></slot>
        <slot name="value2-label"></slot>
      </div>
      
      <div class="row">
        <slot name="min-label"></slot>
        
        <div id="range-slider" class="range-slider" role="slider">
          <div class="container">
            <div class="panel"></div>
            <div class="panel-fill"></div>
        
            <div class="container">
              <div class="pointer" tabindex="0">
                <div class="pointer-shape"></div>
              </div>
            </div>
        
          </div>
        </div>
        
        <slot name="max-label"></slot>
      </div>
      
  </div>`;
};
