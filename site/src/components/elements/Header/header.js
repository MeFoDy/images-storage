import authService from '../../../services/authService';

export default {
    data() {
        return {
            search: '',
            status: '',
            statusItems: [
                'All', 'Approved', 'Denied', 'Waiting', 'Writing', 'Editing',
            ],
        };
    },
    methods: {
        submitSignout() {
            authService.signout(this, '/login');
        },
    },
};
