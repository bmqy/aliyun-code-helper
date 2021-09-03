// ==UserScript==
// @name         阿里云云效增强
// @namespace    http://bmqy.net/
// @version      1.0.0
// @description  阿里云效平台功能增强辅助脚本
// @author       bmqy
// @match        https://packages.aliyun.com/repos/*
// @icon         data:image/png;base64,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
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
	'use strict';

	// Your code here...
	const app = {
		init: function () {
			this.delStorage();
			this.checkboxOnClick();
			this.pkgUploadFormOnAddEvent();
		},

		// 脚本存储数据key
		sotrageKey: 'BmqyAliyunPackage',

		/**
		 * 获取脚本存储数据值
		 * @returns {Object}
		 */
		getStorage: function () {
			return GM_getValue(this.sotrageKey);
		},

		/**
		 * 设置脚本存储
		 * @param {Object} value 存储数据值
		 */
		setStorage: function (value) {
			GM_setValue(this.sotrageKey, value);
		},

		/**
		 * 清除脚本存储
		 * @param {Object} value 存储数据值
		 */
		delStorage: function () {
			GM_deleteValue(this.sotrageKey);
		},

		/**
		 * 更新制品上传表单
		 */
		pkgUploadFormUpdate: function () {
			let _this = this;
			let $groupId = document.querySelector('#groupId');
			let $artifactId = document.querySelector('#artifactId');
			let $version = document.querySelector('#version');
			if (_this.getStorage()) {
				$groupId.value = _this.getStorage().group;
				_this.reactInputEmit($groupId);
				$artifactId.value = _this.getStorage().artifact;
				_this.reactInputEmit($artifactId);
				$version.value = _this.getStorage().version;
				_this.reactInputEmit($version);
			}
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

		// 监听当前选中的制品
		checkboxOnClick: function () {
			let _this = this;
			document.body.addEventListener('click', (e) => {
				let $element = e.target;
				if ($element.classList.contains('next-checkbox-input')) {
					if ($element.checked) {
						let $parent = _this.getParent(
							$element,
							'next-table-row'
						);
						_this.currentPackageUpdate($parent);
					} else {
						// 取消当前选中则检测列表中第一个选中的行，如果有更新存储值
						setTimeout(() => {
							let $checkboxList = document.querySelectorAll(
								'.next-table-row.selected'
							);
							if ($checkboxList.length == 0) {
								_this.delStorage();
								return false;
							}

							_this.currentPackageUpdate($checkboxList[0]);
						}, 200);
					}
				}
			});
		},

		// 更新本地存储值
		currentPackageUpdate: function (element) {
			let _this = this;
			if (!element) return false;

			let $tr = element.querySelectorAll('.next-table-cell-wrapper');
			let $GA = $tr[1],
				$ver = $tr[2];
			let GAStr = $GA.innerText;
			let data = {
				group: GAStr.split(':')[0],
				artifact: GAStr.split(':')[1],
				version: _this.versionFormat($ver.innerText),
			};
			_this.setStorage(data);
		},

        versionFormat: function (version) {
            if(!version) return version;

            let arr = version.split('.');
            arr.forEach((e, i) => {
                if(i >= (arr.length-1)){
                    arr[arr.length-1] = ++e;
                }
            });
            return arr.join('.');
        },

		/**
		 * 监听制品上传表单加载完成
		 */
		pkgUploadFormOnAddEvent: function () {
			let _this = this;
			let mos = new MutationObserver(function (mutations, observer) {
				for (const mutation in mutations) {
					if (Object.hasOwnProperty.call(mutations, mutation)) {
						const element = mutations[mutation];
						if (
							element.target.classList.contains(
								'next-dialog-body'
							)
						) {
							_this.pkgUploadFormUpdate();
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
	};
	app.init();
})();
