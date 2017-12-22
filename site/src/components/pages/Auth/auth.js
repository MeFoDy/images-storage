import authService from '../../../services/authService';

export default {
    data() {
        return {
            snackbar: false,
            validLogin: false,
            validSignUp: false,
            signUpVisible: false,
            loginPasswordVisible: false,
            signUpPasswordVisible: false,
            rules: [(value) => !!value || 'This field is required'],
            credentials: {
                username: '',
                password: '',
            },
            newUser: {
                username: '',
                password: '',
            },
            message: '',
        };
    },
    methods: {
        submitAuthentication() {
            authService.authenticate(this, this.credentials, '/');
        },
        submitSignUp() {
            authService.signup(this, this.newUser, '/');
        },
    },
};
