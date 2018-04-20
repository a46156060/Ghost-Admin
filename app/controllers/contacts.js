import Controller from '@ember/controller';
import {alias} from '@ember/object/computed';
import {computed} from '@ember/object';
import {get} from '@ember/object';

const ORDERS = [
    {
        name: 'Newest',
        value: null
    },
    {
        name: 'Oldest',
        value: 'created_at asc'
    }
];

export default Controller.extend({
    order: null,

    init() {
        this._super(...arguments);
        this.availableOrders = ORDERS;
    },

    contactsInfinityModel: alias('model'),

    selectedOrder: computed('order', function () {
        let orders = this.get('availableOrders');
        return orders.findBy('value', this.get('order'));
    }),

    actions: {
        changeOrder(order) {
            this.set('order', get(order, 'value'));
        }
    }
});
