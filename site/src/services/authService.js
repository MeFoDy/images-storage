import Axios from 'axios';
import router from '../router';

const imageStorageApi = `https://${window.location.hostname}:3001`;

export default {
    user: { authenticated: false },

    authenticate(context, credentials, redirect) {
        Axios
            .post(`${imageStorageApi}/v1/auth/signin`, credentials)
            .then(({ data }) => {
                context.$cookie.set('token', data.token, '1D');
                context.$cookie.set('user_id', data.user._id, '1D');
                context.validLogin = true;
                this.user.authenticated = true;

                if (redirect) router.push(redirect);
            })
            .catch(({ response }) => {
                context.snackbar = true;
                if (!response) {
                    context.message = `Can't connect to API`;
                } else {
                    context.message = response.data && response.data.message;
                }
            });
    },

    signup(context, credentials, redirect) {
        Axios
            .post(`${imageStorageApi}/v1/auth/signup`, credentials)
            .then(() => {
                context.validSignUp = true;
                this.authenticate(context, credentials, redirect);
            })
            .catch(({ response }) => {
                context.snackbar = true;
                if (!response) {
                    context.message = `Can't connect to API`;
                } else {
                    context.message = response.data && response.data.message;
                }
            });
    },

    signout(context, redirect) {
        context.$cookie.delete('token');
        context.$cookie.delete('user_id');
        this.user.authenticated = false;
        if (redirect) router.push(redirect);
    },

    checkAuthentication() {
        const token = document.cookie;
        this.user.authenticated = !!token;
    },

    getAuthenticationHeader(context) {
        return `Bearer ${context.$cookie.get('token')}`;
    },
};
