const mpOpenApi = {
    debug: process.env.NODE_ENV === 'development',
    login(options = {}) {
        let
            onSuccess = options.success,
            onError = options.fail

        uni.login({
            ...options,
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('login success', res);
                }
                onSuccess && onSuccess(res)
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('login fail', err);
                }
                onError && onError(err)
            }
        })
    },
    getUserInfo(options = {}) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail
        uni.getUserInfo({
            ...options,
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('getUserInfo success', res);
                }
                onSuccess && onSuccess(res)
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('getUserInfo fail', err);
                }
                //"getUserInfo:fail scope unauthorized"
                // #ifdef MP-WEIXIN
                let needOpen = options.needOpen === undefined || options.needOpen;
                needOpen = needOpen && (err.errMsg.indexOf('unauthorized') > 0 || err.errMsg.indexOf(
                    'auth deny') > 0)
                if (needOpen) {

                    that.openSetting(options)
                }
                // #endif
                onError && onError(err)
            }
        })
    },
    getSetting(options = {}) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail
        // #ifndef APP-PLUS || H5
        uni.getSetting({
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('getSetting success', res.authSetting);
                }
                that._checkAuth({ ...options,
                    //needOpen: true
                }, res);
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('geSettings fail', err);
                }
                onError && onError(err)
            }
        });
        // #endif
    },
    openSetting(options = {}) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail
        uni.openSetting({
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('openSetting success', res.authSetting);
                }
                that._checkAuth({ ...options,
                    needOpen: false
                }, res);
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('openSetting fail', err);
                }
                onError && onError(err)
            }
        });
    },
    _checkAuth(options = {}, res) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail
        if (mpOpenApi.debug) {
            console.log('auth res', res);
        }
        if (options.scope) {
            if (res.authSetting[options.scope]) {
                onSuccess && onSuccess(res)
            } else if (options.needOpen) {
                that.openSetting(options);
            }
        } else {
            onSuccess && onSuccess(res)
        }
    },

    getLocation(options = {}) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail

        uni.getLocation({
            ...options,
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('getLocation success', res);
                }
                onSuccess && onSuccess(res)
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('getLocation fail', err);
                }
                onError && onError(err)
                // let needOpen = options.needOpen === undefined || options.needOpen;
                // needOpen = needOpen && (err.errMsg.indexOf('unauthorized') > 0 || err.errMsg.indexOf(
                //     'auth deny') > 0)
                // if (needOpen) {
                //     that.openSetting(options)
                // } else {
                //     onError && onError(err)
                // }
            }
        })
    },
    chooseLocation(options = {}) {
        let that = this;
        let
            onSuccess = options.success,
            onError = options.fail

        uni.chooseLocation({
            ...options,
            success(res) {
                if (mpOpenApi.debug) {
                    console.log('chooseLocation success', res);
                }
                onSuccess && onSuccess(res)
            },
            fail(err) {
                if (mpOpenApi.debug) {
                    console.error('chooseLocation fail', err);
                }
                let needOpen = options.needOpen === undefined || options.needOpen;
                needOpen = needOpen && (err.errMsg.indexOf('unauthorized') > 0 || err.errMsg.indexOf(
                    'auth deny') > 0)
                if (needOpen) {
                    that.openSetting(options)
                } else {
                    onError && onError(err)
                }
            }
        })
    }
}
export default mpOpenApi;
