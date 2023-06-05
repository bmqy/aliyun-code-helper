import {GM_getValue,GM_setValue,GM_deleteValue} from '$'
(function () {
	'use strict';

	// Your code here...
	const app = {
		init: function () {
			this.delStorage();
			this.checkboxOnClick();
			this.onAddElementEventDoFunction('next-dialog-body', this.pkgUploadFormUpdate.bind(this));
		},

        // ===================================================================================== 方法
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

		/**
		 * 监听指定元素加载完成，执行函数
		 */
		onAddElementEventDoFunction: function (elementClassName, func) {
			let _this = this;
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
	};
	app.init();
})();