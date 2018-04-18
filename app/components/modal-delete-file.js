import ModalComponent from 'ghost-admin/components/modal-base';
import ghostPaths from 'ghost-admin/utils/ghost-paths';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default ModalComponent.extend({
    notifications: service(),
    ajax: service(),

    uploadUrl: '/upload/files',

    post: alias('model.post'),
    onSuccess: alias('model.onSuccess'),

    actions: {
        confirm() {
            this.get('deleteFile').perform();
        }
    },
    _success() {
        this.get('notifications').closeAlerts('post.delete');
    },

    _failure(error) {
        this.get('notifications').showAPIError(error, {
            key: 'post.delete.failed'
        });
    },

    fileUploaded(property, results) {
        if (results[0]) {
            let model = this.get('model');

            // If the title entered is different, set it as the new meta title
            const url = results[0].url || '';
            const filename = url.split('/').pop();

            model.set('file', filename);

            // Make sure the meta title is valid and if so, save it into the model
            return model.validate({property: 'file'}).then(() => {
                if (model.get('isNew')) {
                    return;
                }

                return this.get('savePost').perform();
            });
        }
    },

    deleteFile: task(function*() {
        let ajax = this.get('ajax');
        let post = this.get('post');
        let url = `${ghostPaths().apiRoot}${this.get('uploadUrl')}/${post.id}`;

        try {
            yield ajax.del(url, {
                processData: false,
                contentType: false,
                dataType: 'text'
            });

            post.set('file', '');

            // Make sure the meta title is valid and if so, save it into the model
            post.validate({property: 'file'}).then(() => this.get('savePost'));

            this._success();
        } catch (error) {
            this._failure(error);
        } finally {
            this.send('closeModal');
        }
    })
});
