<template>
    <view>
        <nova-pref title="openSetting" @click.native="ex_openSettings()" :arrow="true"></nova-pref>
        <nova-pref title="getUserInfo" @click.native="ex_getUserInfo()" value="使用API" :arrow="true"></nova-pref>
        <nova-pref title="getUserInfo" :arrow="true">
            <button open-type="getUserInfo" id="getUserInfo" @getuserinfo="ex_getUserInfo" v-show="false"></button>
            <label for="getUserInfo">使用button[open-type=getUserInfo]</label>
        </nova-pref>
        <nova-pref v-if="auth.userLocation" title="getLocation" @click.native="ex_getLocation()" :arrow="true" :value="getLocRes.latitude + ',' + getLocRes.longitude"></nova-pref>
        <nova-pref v-else title="getLocation" :arrow="true">
            <button open-type="openSetting" id="getLocation" @opensetting="ex_getLocation" v-show="false"></button>
            <label for="getLocation">{{ getLocRes.latitude + ',' + getLocRes.longitude }}</label>
        </nova-pref>
        <nova-pref v-if="auth.userLocation" title="chooseLocation" @click.native="ex_chooseLocation()" :arrow="true" :value="chooseLocRes.address" placeholder="请选择地址"></nova-pref>
        <nova-pref v-else title="chooseLocation" :arrow="true">
            <button open-type="openSetting" id="chooseLocation" @opensetting="ex_chooseLocation" v-show="false"></button>
            <label for="chooseLocation">{{ chooseLocRes.address || '请先打开定位权限'}}</label>
        </nova-pref>
    </view>
</template>

<script>
import NovaPref from '../../components/nova/pref.vue';
import novaOpenApi from '../../common/mp-open-api.js';
export default {
    components: {
        NovaPref
    },
    data() {
        return {
            auth: {
                userInfo: false,
                userLocation: false
            },
            getLocRes: {},
            chooseLocRes: {}
        };
    },
    onLoad(options) {
        let that = this;
        novaOpenApi.getSetting({
            needOpen: false,
            success: res => {
                console.log(res);
                for (let k in that.auth) {
                    that.auth[k] = res.authSetting[`scope.${k}`];
                }
                console.log(that.auth);
            }
        });
    },
    methods: {
        ex_openSettings() {
            novaOpenApi.openSetting();
        },
        ex_getUserInfo() {
            novaOpenApi.getUserInfo({
                success: function(res) {
                    console.log('success', res);
                },
                fail: function(err) {
                    console.error('fail', err);
                }
            });
        },
        ex_getLocation() {
            let that = this;
            novaOpenApi.getLocation({
                success: function(res) {
                    console.log('success', res);
                    that.getLocRes = res;
                },
                fail: function(err) {
                    console.error('fail', err);
                }
            });
        },
        ex_chooseLocation() {
            let that = this;
            novaOpenApi.chooseLocation({
                success: function(res) {
                    console.log('success', res);
                    that.chooseLocRes = res;
                },
                fail: function(err) {
                    console.error('fail', err);
                }
            });
        }
    }
};
</script>

<style></style>
