(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{_L:()=>F,OP:()=>M,mD:()=>D,sQ:()=>I,yf:()=>N,xS:()=>p,Ac:()=>J});var t=function(e){e.disabled=!0,e.classList.add(J.inactiveButtonClass)},n=function(e){var t=e.querySelector(J.submitButtonSelector),n=Array.from(e.querySelectorAll(J.inputSelector));n.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(J.inputErrorClass),n.classList.remove(J.errorClass),n.textContent=""}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(J.inputErrorClass),r.textContent=n,r.classList.add(J.errorClass)}(e,t,t.validationMessage)})(e,r),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(J.inactiveButtonClass)):(t.disabled=!0,t.classList.add(J.inactiveButtonClass))}(n,t)}))}))};function r(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_opened"))}document.querySelectorAll(".popup__close-button").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return o(t)})),t.addEventListener("click",(function(e){return function(e){e.target.classList.contains("popup_opened")&&o(e.target)}(e)}))}));var a={baseUrl:"https://nomoreparties.co/v1/plus-cohort-26",headers:{authorization:"d48850ee-0174-40ac-94a8-4573c8ed93c1","Content-Type":"application/json"}},u=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function i(e){return e.some((function(e){return e._id===p}))}function l(e,t){var n=M.cloneNode(!0),o=n.querySelector(".card__title"),c=n.querySelector(".card__image"),l=n.querySelector(".card__like-button"),s=n.querySelector(".card__delete-button"),d=n.querySelector(".card__like-counter"),p=n.querySelector(".card").dataset.id=e._id;return o.textContent=e.name,c.src=e.link,c.alt=e.name,d.textContent=e.likes.length,i(e.likes)&&l.classList.add("card__like-button_active"),e.owner._id!==t&&n.querySelector(".card").removeChild(s),e.likes.length>0?d.classList.add("card__like-counter_active"):d.classList.remove("card__like-counter_active"),l.addEventListener("click",(function(e){!function(e){if(e.classList.contains("card__like-button_active"))return!0}(l)?function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:a.headers}).then(u).catch((function(e){return console.log(e)}))}(p).then((function(e){d.textContent=e.likes.length,l.classList.add("card__like-button_active"),d.classList.add("card__like-counter_active")})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:a.headers}).then(u).catch((function(e){return console.log(e)}))}(p).then((function(e){d.textContent=e.likes.length,l.classList.remove("card__like-button_active")})).catch((function(e){return console.log(e)}))})),s.addEventListener("click",(function(e){(function(e){return fetch("".concat(a.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:a.headers}).then(u).catch((function(e){return console.log(e)}))})(p).then((function(t){e.target.closest(".card").remove()}))})),c.addEventListener("click",(function(){return t=e,F.textContent=t.name,I.src=t.link,I.alt=t.name,void r(N);var t})),n}var s=function(e,t){e.textContent=t?"Сохранение...":"Сохранить"};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p,f,v,_=document.querySelector(".profile"),y=_.querySelector(".profile__name"),m=_.querySelector(".profile__description"),h=_.querySelector(".profile__edit-button"),S=_.querySelector(".profile__avatar-image"),b=_.querySelector(".profile__edit-avatar-button"),q=document.querySelector(".popup_type_update-avatar"),g=q.querySelector("#avatarFormPopup"),k=q.querySelector("#update-avatar-input"),L=q.querySelector("#updateAvatar-save-button"),C=document.querySelector(".popup_type_editProfile"),E=C.querySelector("#editProfileFormPopup"),x=C.querySelector("#profile-name-input"),A=C.querySelector("#description-input"),P=C.querySelector("#editProfile-save-button"),O=document.querySelector(".popup_type_addCard"),U=_.querySelector(".profile__add-button"),j=O.querySelector("#card-name-input"),w=O.querySelector("#card-url-input"),T=O.querySelector("#cardFormPopup"),B=O.querySelector("#addCard-save-button"),D=document.querySelector(".elements-container"),M=document.querySelector("#cardTemplate").content,N=document.querySelector(".popup_type_image-preview"),F=document.querySelector(".popup__image-name"),I=document.querySelector(".popup__image"),J=(document.querySelector(".popup__form").querySelector(".popup__input"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"});f=fetch("".concat(a.baseUrl,"/users/me"),{headers:a.headers}).then(u).catch((function(e){return console.log(e)})),v=fetch("".concat(a.baseUrl,"/cards"),{headers:a.headers}).then(u).catch((function(e){return console.log(e)})),Promise.all([f,v]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];y.textContent=o.name,m.textContent=o.about,S.src=o.avatar,function(e,t){e.forEach((function(e){var n=l(e,t);D.prepend(n)}))}(c,p=o._id)})).catch((function(e){console.error(e)})),h.addEventListener("click",(function(){r(C),x.value=y.textContent,A.value=m.textContent})),b.addEventListener("click",(function(){r(q)})),U.addEventListener("click",(function(){r(O)})),E.addEventListener("submit",(function(e){e.preventDefault();var n,r=e.target.querySelector(".popup__save-button");s(r,!0),(n={name:x.value,about:A.value},fetch("".concat(a.baseUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(u).catch((function(e){return console.log(e)}))).then((function(e){y.textContent=x.value,m.textContent=A.value,t(P),o(C)})).catch((function(e){console.error(e)})).finally((function(){s(r,!1)}))})),T.addEventListener("submit",(function(e,n){e.preventDefault();var r,c=e.target.querySelector(".popup__save-button"),i={name:j.value,link:w.value,owner:{_id:p},likes:[]};s(c,!0),(r=i,fetch("".concat(a.baseUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(u).catch((function(e){return console.log(e)}))).then((function(e){var n=l(e);D.prepend(n),T.reset(),t(B),o(O)})).catch((function(e){console.error(e)})).finally((function(){s(c,!1)}))})),g.addEventListener("submit",(function(e){var n;e.preventDefault(),s(L,!0),(n=k.value,fetch("".concat(a.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:n})}).then(u).catch((function(e){return console.log(e)}))).then((function(e){S.src=k.value,g.reset(),t(L),o(q)})).catch((function(e){console.error(e)})).finally((function(){s(L,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){n(e)}))}(J)})();