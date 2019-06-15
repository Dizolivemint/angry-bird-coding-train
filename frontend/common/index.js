/** 
 * common/index.js
 * 
 * What it Does:
 *   This file sets up our react app to render inside of the root html
 *   file. The global css file is included here as well as our service
 *   worker is registered.
 * 
 * Things to Change:
 *   Anything outside of react that needs to be included in your project
 *   can go here. If you want additional CSS files you can include them
 *   here.
 */
import Koji from 'koji-tools';
import './index.css';

Koji.pageLoad();
window.Koji = Koji;

require('script-loader!app/slingshot.js');
require('script-loader!app/bird.js');
require('script-loader!app/box.js');
require('script-loader!app/ground.js');
require('script-loader!app/sketch.js');
new p5();

if (module.hot) {
    module.hot.accept('script-loader!app/sketch.js', () => {
        let oldCanvas = document.getElementsByTagName('canvas')[0];
        oldCanvas.parentNode.removeChild(oldCanvas);

        require('script-loader!app/sketch.js');
        new p5();
    });
}
