import Axios from 'axios';
import authService from '../../../services/authService';

import ImagesList from '../../elements/ImagesList/ImagesList.vue';

const ImageStorageAPI = `https://${window.location.hostname}:3001`;


export default {
    components: {
      'images-list': ImagesList,
    },
    data() {
        return {
            images: [],
        };
    },
    mounted() {
        //this.getAllImages();
    },
    methods: {
        getAllImages() {
            Axios.get(`${ImageStorageAPI}/v1/images`, {
                headers: { 'Authorization': authService.getAuthenticationHeader(this) },
                params: { user_id: this.$cookie.get('user_id') },
            }).then(({ data }) => (this.images = data));
        },
    },
};
