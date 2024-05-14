import {GM_getValue,GM_setValue,GM_deleteValue} from '$'
(function () {
	'use strict';

	// Your code here...
	const app = {
		currentPackage: null,
		init: function () {
			this.onAddElementEventDoFunction('next-table-row', this.onTableRowClick.bind(this));
			this.onAddElementEventDoFunction('next-dialog-body', this.pkgUploadFormUpdate.bind(this));
			this.onAddElementEventDoFunction('next-btn', this.quickMFALogin.bind(this));
		},

    // ===================================================================================== 制品
		/**
		 * 更新制品上传表单
		 */
		pkgUploadFormUpdate: function () {
			if(location.href.indexOf('https://packages.aliyun.com')==-1) return false;
			let _this = this;
			let $groupId = document.querySelector('#groupId');
			let $artifactId = document.querySelector('#artifactId');
			let $version = document.querySelector('#version');

			if(_this.currentPackage){
				$groupId.value = _this.currentPackage.group;
				_this.reactInputEmit($groupId);
				$artifactId.value = _this.currentPackage.artifact;
				_this.reactInputEmit($artifactId);
				$version.value = _this.currentPackage.version;
				_this.reactInputEmit($version);
			}
			_this.currentPackage = null;
		},

		// js如何在外部改变react受控组件的状态量？参考：https://github.com/ILovePing/ILovePing.github.io/issues/22
		reactInputEmit: function (element) {
			let event = new Event('input', { bubbles: true });
			// hack React15
			event.simulated = true;
			// hack React16 内部定义了descriptor拦截value，此处重置状态
			let tracker = element._valueTracker;
			if (tracker) {
				tracker.setValue(element);
			}
			element.dispatchEvent(event);
		},

		versionFormat: function (version) {
			if(!version) return version;

			// 兼容-SNAPSHOT版本
			let arr = version.split('-');
			let numberArr = arr[0].split('.');
			numberArr.forEach((e, i) => {
				if(i >= (numberArr.length-1)){
						numberArr[numberArr.length-1] = ++e;
				}
			});
			let out = numberArr.join('.');
			if(arr[1]){
				out += '-SNAPSHOT';
			}

			return out;
		},

		clickTableRow: function(e){
			if(e.button == 1){
				let $parent = app.getParent(e.target, 'next-table-row');
				let $cells = $parent.querySelectorAll('.next-table-cell');
				let $GA = $parent.querySelector('.teamix-title');
				let $ver = $cells[1].querySelector('.next-table-cell-wrapper');
				let GAStr = $GA.innerText;
				app.currentPackage = {
					group: GAStr.split(':')[0],
					artifact: GAStr.split(':')[1],
					version: app.versionFormat($ver.innerText),
				};
				document.querySelector('button.upload-btn').click();
			}
		},
		onTableRowClick: function(){
			document.querySelectorAll('.next-table-row').forEach(e=>{
				e.removeEventListener('mousedown', this.clickTableRow);
				e.addEventListener('mousedown', this.clickTableRow)
			})
		},

		/**
		 * 监听指定元素加载完成，执行函数
		 */
		onAddElementEventDoFunction: function (elementClassName, func) {
			let mos = new MutationObserver(function (mutations, observer) {
				for (const mutation in mutations) {
					if (Object.hasOwnProperty.call(mutations, mutation)) {
						const element = mutations[mutation];
						if (element.target.classList.contains(elementClassName)) {
							func();
						}
					}
				}
			});

			mos.observe(document.body, {
				attributes: true,
				childList: true,
				subtree: true,
			});
		},

		/**
		 * 获取指定元素的目标父元素
		 * @param {Dom} element
		 * @param {String} className
		 * @returns Dom[]
		 */
		getParent: function (element, className) {
			if (!element || !className) {
				return false;
			}

			let _this = this;
			while (element.parentNode) {
				element = element.parentNode;
				if (
					element.classList &&
					element.classList.contains(className)
				) {
					return element;
				}
				_this.getParent(element, className);
			}

			return null;
		},

		// ===================================================================================== 登录
		// MFA快速登录
		quickMFALogin: function(){
			if(location.href.indexOf('signin.aliyun.com')==-1) return false;

			let $btnSubmit = document.querySelector('.next-btn[type=submit]');
			if($btnSubmit.innerHTML.indexOf('提交验证')==-1) return false;

			let $nextMessageError = document.querySelector('.next-message-error');
			let $nextLoadingTip = document.querySelector('.next-loading-tip');

			if(!$btnSubmit.hasAttribute('disabled') && !$nextMessageError && !$nextLoadingTip){
					$btnSubmit.click();
			}
		}
	};
	app.init();
})();
