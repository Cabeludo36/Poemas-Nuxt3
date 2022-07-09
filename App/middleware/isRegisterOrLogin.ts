import { isLoggedin } from '@/utils/util';

export default defineNuxtRouteMiddleware(() => {
    if(isLoggedin()) {
        return navigateTo('/');
    }
})