import $ from 'jquery';
import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import InfinityRoute from 'ember-infinity/mixins/route';
import {assign} from '@ember/polyfills';
import {isBlank} from '@ember/utils';
// import {assign} from '@ember/polyfills';

export default AuthenticatedRoute.extend(InfinityRoute, {
    queryParams: {
        order: {
            refreshModel: true,
            replace: true
        }
    },

    titleToken: 'Content',

    perPage: 30,

    model(params) {
        let queryParams = {};
        let paginationParams = {
            perPageParam: 'limit',
            totalPagesParam: 'meta.pagination.pages'
        };

        if (!isBlank(params.order)) {
            queryParams.order = params.order;
        }

        let perPage = this.get('perPage');
        let paginationSettings = assign(
            {perPage, startingPage: 1},
            paginationParams,
            queryParams
        );

        return this.infinityModel('contact', paginationSettings);
    },

    actions: {
        willTransition() {
            if (this.get('controller')) {
                this.resetController();
            }
        },

        queryParamsDidChange() {
            // scroll back to the top
            $('.content-list').scrollTop(0);

            this._super(...arguments);
        }
    }
});
