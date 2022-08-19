
QUnit.module('Range Slider Events', () => {

  QUnit.test('slider should send change event', (assert) => {

    const done = assert.async();

    const $slider = document.querySelector('#slider-1');
    const $pointer = $slider.shadowRoot.querySelector('.pointer');

    $slider.addEventListener('change', (evt) => {
      const value = Math.round(evt.detail.value);
      assert.equal(value, 1);
      done();
    });

    $pointer.dispatchEvent(new KeyboardEvent('keydown', {
      view: window,
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight',
    }));
  });

  QUnit.test('slider should send onMouseDown event', (assert) => {

    const done = assert.async();

    const $slider = document.querySelector('#slider-1');
    const $pointer = $slider.shadowRoot.querySelector('.pointer');

    $slider.addEventListener('onMouseDown', (evt) => {
      assert.equal(evt.detail.nativeEvent.clientX, 10);
      done();
    });

    $pointer.dispatchEvent(new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 10,
    }));
  });

  QUnit.test('slider should send onMouseUp event', (assert) => {

    const done = assert.async();

    const $slider = document.querySelector('#slider-1');
    const $pointer = $slider.shadowRoot.querySelector('.pointer');

    $slider.addEventListener('onMouseUp', (evt) => {
      assert.equal(evt.detail.nativeEvent.clientX, 10);
      done();
    });

    $pointer.dispatchEvent(new MouseEvent('mouseup', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 10,
    }));
  });

  QUnit.test('slider should send onPointerClicked event', (assert) => {

    const done = assert.async();

    const $slider = document.querySelector('#slider-1');
    const $pointer = $slider.shadowRoot.querySelector('.pointer');

    $slider.addEventListener('onPointerClicked', (evt) => {
      assert.ok(evt.detail.$pointer);
      done();
    });

    $pointer.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));
  });

  QUnit.test('slider should send onKeyDownEvent event', (assert) => {

    const done = assert.async();

    const $slider = document.querySelector('#slider-1');
    const $pointer = $slider.shadowRoot.querySelector('.pointer');

    $slider.addEventListener('onKeyDown', (evt) => {
      assert.equal(evt.detail.nativeEvent.key, 'ArrowLeft');
      done();
    });

    $pointer.dispatchEvent(new KeyboardEvent('keydown', {
      view: window,
      bubbles: true,
      cancelable: true,
      key: 'ArrowLeft',
    }));
  });

});