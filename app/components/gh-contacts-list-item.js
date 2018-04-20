import $ from 'jquery';
import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
    ghostPaths: service(),

    tagName: 'li',
    classNames: ['gh-posts-list-item'],

    contact: null,

    // closure actions
    onClick() {},
    onDoubleClick() {},

    scrollIntoView() {
        let element = this.$();
        let offset = element.offset().top;
        let elementHeight = element.height();
        let container = $('.content-list');
        let containerHeight = container.height();
        let currentScroll = container.scrollTop();
        let isBelowTop, isAboveBottom, isOnScreen;

        isAboveBottom = offset < containerHeight;
        isBelowTop = offset > elementHeight;

        isOnScreen = isBelowTop && isAboveBottom;

        if (!isOnScreen) {
            // Scroll so that element is centered in container
            // 40 is the amount of padding on the container
            container.clearQueue().animate({
                scrollTop: currentScroll + offset - 40 - containerHeight / 2
            });
        }
    }
});
