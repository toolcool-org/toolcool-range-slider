import '../../../../dist/plugins/tcrs-themes.min.css';
import '../../../../dist/plugins/tcrs-pointer-shapes.min.css';
import '../../../../dist/plugins/tcrs-binding-labels.min.js';
import '../../../../dist/plugins/tcrs-generated-labels.min.js';
import '../../../../dist/toolcool-range-slider.min.js';

import {
  getSetValuesExamples,
  autoBindingValuesExamples,
  autoGeneratedLabelsExamples,
  minMaxExamples,
  roundExamples,
  stepExamples,
  nonLinearStepExamples,
  dataExamples,
  withHeightBorderRadiusExamples, colorExamples, themesExamples, pointerShapesExamples
} from './examples';

const initMobileMenu = () => {
  const $btn = document.getElementById('mobile-menu-btn');
  if(!$btn) return;

  $btn.addEventListener('click', (evt) => {
    evt.stopPropagation();
    document.body.classList.toggle('mobile-menu-opened');
  });

  document.body.addEventListener('click', () => {
    document.body.classList.remove('mobile-menu-opened');
  });

  const $sideMenu = document.getElementById('side-menu');
  if(!$sideMenu) return;

  $sideMenu.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  const $close = document.getElementById('mobile-menu-close-btn');
  if(!$close) return;

  $close.addEventListener('click', () => {
    document.body.classList.remove('mobile-menu-opened');
  });
};

const init = () => {
  initMobileMenu();
  getSetValuesExamples();
  autoBindingValuesExamples();
  autoGeneratedLabelsExamples();
  minMaxExamples();
  roundExamples();
  stepExamples();
  nonLinearStepExamples();
  dataExamples();
  withHeightBorderRadiusExamples();
  colorExamples();
  themesExamples();
  pointerShapesExamples();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

export {};
