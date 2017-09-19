## canvas_video.js

### 一个用canvas来播放视频的小插件，主要应用于移动端微信

----

## 用途

video才是播放视频的最佳标签，那canvas播放video的意义何在呢？
能直接使用视频的地方当然要直接使用视频，但在一些特殊场合，尤其是人工制造了视频播放阻碍的应用里（比如安卓微信），非白名单里的视频播放会强制全屏，且播放完毕会显示广告。
此时短小的视频便可以使用帧动画来播放，那么有声音的视频呢？需要同时播放音频，并保持音视频同步。
没错，这个canvas_video.js并不是播放video，而是把video拆解为帧动画和音频来同时播放。
然而怎样拆解，本插件并不负责，你也可以尝试使用AE。

## 用法

```js
var video = new CanvasVideo(document.getElementById("canvas"), {
	width: 640,
	height: 1030,
	frame: 36,
	fps: 24,
	audio:null,//audio对象，存在即忽略audioSrc
	audioSrc: 'media/video.mp3',//音频地址
	imgSrc: 'img/video/',
	extension: 'jpg',
});

//播放-支持播放完毕执行回调，以及特定帧回调（这个功能仅仅是为了方便自己，可能对其他人来说并没什么卵用）
video.play(function(){
	console.log('播放完毕');
},{
	fn10:function(){
		console.log('第10帧');
	}
});
```

