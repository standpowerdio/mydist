"use strict";function getStyle(t,e){return window.getComputedStyle?window.getComputedStyle(t)[e]:t.currentStyle[e]}function bufferMove(l,a,n){var o=0;clearInterval(l.timer),l.timer=setInterval(function(){var t=!0;for(var e in a){var r=null;r="opacity"===e?Math.round(100*getStyle(l,e)):parseInt(getStyle(l,e)),o=0<(o=(a[e]-r)/10)?Math.ceil(o):Math.floor(o),r!==a[e]&&("opacity"===e?(l.style.opacity=(r+o)/100,l.style.filter="alpha(opacity="+(r+o)+")"):l.style[e]=r+o+"px",t=!1)}t&&(clearInterval(l.timer),n&&"function"==typeof n&&n())},1e3/60)}