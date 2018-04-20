import Helper from '@ember/component/helper';
import moment from 'moment';
import {assert} from '@ember/debug';
import {inject as service} from '@ember/service';

export default Helper.extend({
    settings: service(),

    compute([timeago]) {
        assert(timeago, 'You must pass a time to the gh-format-contact-time helper');

        let timezone = this.get('settings.activeTimezone');
        let time = moment.tz(timeago, timezone);

        // let format = 'YYYY-MM-DD HH:mm:ss';
        return time.format('YYYY-MM-DD HH:mm:ss');
    }
});
