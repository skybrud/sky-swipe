# sky-swipe

Angular-module wrapper for swipe.js.
https://github.com/thebird/Swipe

The `sky-swipe` directive has some optional attributes:
- `auto`: enables autoplay
- `delay`: sets an initial delay before autoplaying (useful if multiple swipes are on the same page, and you would like to avoid synchronous playback). Both attributes are defined in milliseconds.

Please refer to the code-files for more documation and usage specifics.

```html
<sky-swipe auto="5000" delay="500">
	<div><img src="http://lorempixel.com/500/280/sports/1/" alt="" /></div>
	<div><img src="http://lorempixel.com/500/280/sports/2/" alt="" /></div>
	<div><img src="http://lorempixel.com/500/280/sports/3/" alt="" /></div>
	<div><img src="http://lorempixel.com/500/280/sports/4/" alt="" /></div>
	<div><img src="http://lorempixel.com/500/280/sports/5/" alt="" /></div>
</sky-swipe>
```


### Credits

This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
