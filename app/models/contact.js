import Model from 'ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';
import attr from 'ember-data/attr';

export default Model.extend(ValidationEngine, {
    validationType: 'contact',

    name: attr('string'),
    phone_number: attr('string'),
    email: attr('string'),
    content: attr('string'),
    created_at: attr('moment-utc'),
    count: attr('raw')
});
