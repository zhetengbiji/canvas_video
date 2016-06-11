/*
 * canvas_video.js
 * 版本0.0.1
 * 用canvas同步部分帧动画和音频的插件
 * 作者微博：折腾笔记
 * */
(function(w) {
	function wxReady(fn) {
		if (window.WeixinJSBridge) {
			fn()
		} else {
			document.addEventListener("WeixinJSBridgeReady", function() {
				fn();
			}, false);
		}
	}
	var CanvasVideo = function(dom, opt, fn) {
		this.opt = {
			width: 0,
			height: 0,
			audio: null,
			audioSrc: 'xx.mp3',
			fps: 24,
			imgSrc: 'img/x',
			frame: 0,
		}
		for (var i in opt) {
			this.opt[i] = opt[i];
		}
		dom.width = this.opt.width;
		dom.height = this.opt.height;
		this.canvas = dom;
		this.state = 'load';
		this.init(typeof fn === 'function' ? fn : null);
	}
	CanvasVideo.prototype = {
		init: function(fn) {
			var audio;
			var self = this;
			if (this.opt.audio) {
				audio = this.audio = this.opt.audio;
			} else {
				audio = this.audio = new Audio;
				audio.src = this.opt.audioSrc;
			}
			audio.load();
		},
		play: function(fn, fns) {
			var self = this;
			var audio = self.audio;

			function play() {
				audio.removeEventListener('play', play, false);
				var canvas = self.canvas;
				var c2d = canvas.getContext('2d');
				var img = new Image;
				var begin;
				var currentTime;
				var duration;
				var end;
				var now_;

				function draw() {
					var now;
					if (end) {
						return
					} else {
						requestAnimFrame(draw);
					}
					if (!duration) {
						duration = audio.duration;
					}
					if (begin) {
						now = ((Date.now() / 1000 - begin + duration) * self.opt.fps) | 0;
					} else {
						currentTime = audio.currentTime;
						now = (currentTime * self.opt.fps) | 0;
						if (currentTime >= duration) {
							begin = Date.now() / 1000;
						}
					}
					if (now_ === now) {
						return;
					} else {
						now_ = now;
					}

					if (now >= self.opt.frame - 1) {
						if (typeof fn === 'function') {
							self.state = 'ended';
							fn();
						}
						end = true;
						return;
					}
					img.src = self.opt.imgSrc + now + '.' + self.opt.extension;
					canvas.width = canvas.width;
					c2d.drawImage(img, 0, 0, img.width, img.height);
					if (fns && ('fn' + now) in fns && typeof fns[('fn' + now)] === 'function') {
						fns[('fn' + now)]();
					}
				}
				var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
				requestAnimFrame(draw);

			}
			audio.addEventListener('play', play, false);
			this.state = 'play';

			function p() {
				audio.removeEventListener('play', p, false);
				this.state = 'playing';
			}
			audio.addEventListener('play', p, false);
			audio.play();
			setTimeout(function() {
				if (this.state !== 'playing') {
					wxReady(function() {
						WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
							audio.play();
						});
					});

					function one_touch() {
						document.removeEventListener('touchstart', one_touch, false);
						self.state === 'play' && audio.play();
					}
					document.addEventListener('touchstart', one_touch, false);
				}
			}, 100);

		}
	}
	w.CanvasVideo = CanvasVideo;
})(window);