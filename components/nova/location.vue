<template>
    <view>
        <nova-pref v-if="auth" :title="title" :placeholder="placeholder" :value="value" :arrow="true" @click.native="_action()"></nova-pref>
        <nova-pref v-else :title="title" :arrow="true">
            <button open-type="openSetting" id="locationActionId" @opensetting="_openSetting" v-show="false"></button>
            <label for="locationActionId" class="placeholder">{{ placeholder }}</label>
        </nova-pref>
    </view>
</template>

<script>
import NovaPref from './pref.vue';
export default {
    name: 'nova-location',
    components: {
        NovaPref
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        placeholder: {
            //没有值时显示的占位
            type: String,
            default: ''
        },
        action: {
            type: String,
            default: 'get' // get|choose
        },
        loc: {
            type: Object,
            default: () => {
                return {
                    latitude: '',
                    longitude: '',
                    name: '',
                    address: ''
                };
            }
        }
    },
    data() {
        return {
            auth: false
        };
    },
    created() {
        let that = this;
        uni.getSetting({
            success: res => {
                that.auth = res.authSetting['scope.userLocation'];
                console.log('created auth ? ' + this.auth);
                if (that.auth === undefined) {
                    that._action();
                }
            }
        });
    },
    methods: {
        _openSetting() {
            let that = this;
            uni.getSetting({
                success(res) {
                    console.log('open setting', res.authSetting);
                    that._checkAuth(res.authSetting);
                },
                fail(err) {
                    console.error('open settings err', err);
                    that.$emit('error', err);
                }
            });
        },
        _checkAuth(auth, needOpen) {
            let that = this;
            console.log(auth['scope.userLocation']);
            if (auth['scope.userLocation']) {
                that.auth = true;
                that._action();
            }
        },

        _action() {
            let that = this;
            if (that.action === 'get') {
                that._getLocation();
            } else if (that.action === 'choose') {
                that._chooseLocation();
            }
        },
        _getLocation() {
            console.log('getLocation');
            let that = this;
            uni.getLocation({
                success(res) {
                    console.log('getLocation', res);
                    that.$emit('change', res);
                },
                fail(err) {
                    console.error('getLocation err', err);
                    that.$emit('error', err);
                }
            });
        },
        _chooseLocation() {
            let that = this;
            // #ifdef MP-TOUTIAO || MP-QQ
            that.$emit('error', { errMsg: 'unsupport platform' });
            return;
            // #endif
            // #ifndef MP-TOUTIAO || MP-QQ
            let options = {
                success(res) {
                    console.log('choose ', res);
                    that.$emit('change', res);
                },
                fail(err) {
                    console.error('chooseLocation err', err);
                    that.$emit('error', err);
                }
            };

            // #ifdef MP-WEIXIN
            if (that.loc.latitude) {
                latitude: that.loc.latitude;
            }
            if (that.loc.longitude) {
                longitude: that.loc.longitude;
            }
            // #endif

            uni.chooseLocation(options);
            // #endif
        }
    }
};
</script>

<style></style>
