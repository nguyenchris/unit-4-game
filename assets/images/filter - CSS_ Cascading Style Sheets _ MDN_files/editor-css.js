!function(){return function e(t,n,i){function o(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[a]={exports:{}};t[a][0].call(d.exports,function(e){return o(t[a][1][e]||e)},d,d.exports,e,t,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}}()({1:[function(e,t,n){!function(){"use strict";var t=e("./editor-libs/clippy"),n=e("./editor-libs/events"),i=e("./editor-libs/mce-utils"),o=document.getElementById("example-choice-list"),r=o.querySelectorAll(".example-choice"),a=document.querySelector("header"),s=0,c=[],l=document.getElementById("output");function d(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1}i.isPropertySupported(o.dataset)&&!document.all&&(!function(){a.classList.remove("hidden"),o.classList.add("live"),l.classList.remove("hidden");for(var e=0,i=r.length;e<i;e++){var u=r[e];c.push(u.querySelector("code").textContent),u.getAttribute("initial-choice")&&(s=d(r,u))}n.register(),document.getElementById("reset").addEventListener("click",function(){for(var e=0,i=r.length;e<i;e++){var o=Prism.highlight(c[e],Prism.languages.css);r[e].classList.remove("invalid"),r[e].classList.remove("selected"),r[e].querySelector("code").innerHTML=o}s?(n.onChoose(r[s]),t.toggleClippy(r[s])):(n.onChoose(r[0]),t.toggleClippy(r[0]))}),t.addClippy()}(),n.onChoose(r[s]),t.toggleClippy(r[s])),void 0!==performance&&document.addEventListener("readystatechange",function(e){"complete"===e.target.readyState&&setTimeout(function(){n.trackloadEventEnd("CSS editor load time",performance.timing.loadEventEnd),i.postToKuma({markName:"css-ie-load-event-end"})},100)})}()},{"./editor-libs/clippy":3,"./editor-libs/events":5,"./editor-libs/mce-utils":6}],2:[function(e,t,n){t.exports={trackEvent:function(e){"use strict";window.parent.postMessage(e,window.ieConfig&&window.ieConfig.origin?window.ieConfig.origin:"https://developer.mozilla.org")},trackCSSExampleSelection:function(){"use strict";this.trackEvent({category:"Interactive Example - CSS",action:"New CSS example selected",label:"Interaction Events"})},trackRunClicks:function(){"use strict";this.trackEvent({category:"Interactive Example - JS",action:"Clicked run",label:"Interaction Events"})}}},{}],3:[function(e,t,n){var i=e("./mce-utils");t.exports={addClippy:function(){"use strict";new Clipboard(".copy",{target:function(e){var t=e.dataset.clipboardTarget;return t?document.querySelector(t):i.findParentChoiceElem(e).getElementsByTagName("code")[0]}}).on("success",function(e){var t=document.getElementById("user-message");t.classList.add("show"),t.setAttribute("aria-hidden",!1),function(e,t){var n=e.trigger,i=n.offsetParent.offsetTop+n.clientHeight+10+"px",o=n.offsetLeft+"px";t.style.top=i,t.style.left=o}(e,t),window.setTimeout(function(){t.classList.remove("show"),t.setAttribute("aria-hidden",!0)},1e3),e.clearSelection()})},toggleClippy:function(e){"use strict";for(var t=e.querySelector(".copy"),n=document.querySelectorAll(".copy"),i=0,o=n.length;i<o;i++)n[i].classList.add("hidden"),n[i].setAttribute("aria-hidden",!0);t.classList.remove("hidden"),t.setAttribute("aria-hidden",!1)}}},{"./mce-utils":6}],4:[function(e,t,n){t.exports={editTimer:void 0,applyCode:function(e,t,n){var i=n||document.getElementById("example-element");e.replace(/(\/\*)[\s\S]+(\*\/)/g,""),i.style.cssText=e,clearTimeout(this.editTimer),this.editTimer=setTimeout(function(){i.style.cssText?t.parentNode.classList.remove("invalid"):t.parentNode.classList.add("invalid")},500)},choose:function(e){var n=e.querySelector("code");e.classList.add("selected"),n.setAttribute("contentEditable",!0),n.setAttribute("spellcheck",!1),t.exports.applyCode(n.textContent,e)},resetDefault:function(){var e=document.getElementById("default-example"),n=document.getElementById("output");if(e.classList.contains("hidden")){for(var i=n.querySelectorAll("section"),o=0,r=i.length;o<r;o++)i[o].classList.add("hidden"),i[o].setAttribute("aria-hidden",!0);e.classList.remove("hidden"),e.setAttribute("aria-hidden",!1)}t.exports.resetUIState()},resetUIState:function(){for(var e=document.getElementById("example-choice-list").querySelectorAll(".example-choice"),t=0,n=e.length;t<n;t++)e[t].classList.remove("selected")}}},{}],5:[function(e,t,n){var i=e("./clippy"),o=e("./css-editor-utils"),r=e("./analytics"),a=e("./mce-utils");function s(e){"use strict";var t=window.getSelection().getRangeAt(0);e.preventDefault(),e.stopPropagation(),e.clipboardData.setData("text/plain",t.toString()),e.clipboardData.setData("text/html",t.toString())}function c(e){"use strict";var t=e.clipboardData.getData("text/plain"),n=e.target.offsetParent.querySelector("code"),i=n.textContent;e.preventDefault(),e.stopPropagation(),n.innerText=i+"\n"+t,Prism.highlightElement(n)}t.exports={onChoose:function(e){var t=document.querySelector(".selected");if(t&&!e.classList.contains("selected")){var n=Prism.highlight(t.firstChild.textContent,Prism.languages.css);t.firstChild.innerHTML=n,r.trackCSSExampleSelection(),o.resetDefault()}o.choose(e),i.toggleClippy(e)},register:function(){"use strict";var e=document.getElementById("example-choice-list"),n=document.getElementById("editor");!function(){window.onerror=function(e,t,n,i,o){var a=["URL: "+t,"Line: "+n,"Column: "+i,"Error object: "+JSON.stringify(o)].join(" - ");r.trackEvent({category:"Interactive Example - JavaScript Errors",action:a,label:e})}}(),e&&(function(){window.addEventListener("message",function(e){var t=window.ieConfig&&window.ieConfig.origin?window.ieConfig.origin:"https://developer.mozilla.org";if(e.origin===t&&void 0!==typeof e.data.smallViewport){var n=document.querySelector(".editor-wrapper");e.data.smallViewport?n.classList.add("small-desktop-and-below"):n.classList.remove("small-desktop-and-below")}},!1)}(),function(e){e.addEventListener("cut",s),e.addEventListener("copy",s),e.addEventListener("paste",c),e.addEventListener("keyup",function(e){var t=e.target.parentElement;o.applyCode(t.textContent,t)}),e.addEventListener("click",function(e){var n=e.target;n.classList.contains("example-choice")||(n=a.findParentChoiceElem(n)),n.classList.contains("copy")&&r.trackEvent({category:"Interactive Example - CSS",action:"Copy to clipboard clicked",label:"Interaction Events"}),t.exports.onChoose(n)})}(e)),n&&function(e){e.addEventListener("click",function(e){"execute"===e.target.id&&r.trackRunClicks()})}(n)},trackloadEventEnd:function(e,t){r.trackEvent({category:"Interactive Examples",action:e,label:"Performance Events",value:t})}}},{"./analytics":2,"./clippy":3,"./css-editor-utils":4,"./mce-utils":6}],6:[function(e,t,n){t.exports={findParentChoiceElem:function(e){"use strict";for(var t=e.parentElement,n=t.classList;t&&!n.contains("example-choice");)n=(t=t.parentElement).classList;return t},isPropertySupported:function(e){"use strict";if(void 0===e.property)return!0;for(var t=e.property.split(" "),n=!1,i=document.createElement("div"),o=0,r=t.length;o<r;o++)void 0!==i.style[t[o]]&&(n=!0);return n},openLinksInNewTab:function(e){e.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),window.open(e.href)})})},postToKuma:function(e){window.parent.postMessage(e,window.ieConfig&&window.ieConfig.origin?window.ieConfig.origin:"https://developer.mozilla.org")},scrollToAnchors:function(e,t){t.forEach(function(t){t.addEventListener("click",function(n){n.preventDefault(),e.querySelector(t.hash).scrollIntoView()})})},showCustomExampleHTML:function(e){"use strict";var t=document.getElementById("default-example");t.classList.add("hidden"),t.setAttribute("aria-hidden",!0),e.classList.remove("hidden"),e.setAttribute("aria-hidden",!1)}}},{}]},{},[1]);