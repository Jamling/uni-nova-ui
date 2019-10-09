<template>
    <view class="content">
        <nova-pref title="Common" :arrow="true" @click.native="goPage('../common-layout/common-layout')"></nova-pref>
        <nova-pref title="Preference" :arrow="true" @click.native="goPage('../nova-pref/nova-pref')"></nova-pref>
        <nova-pref title="Tag" @click.native="goPage('../nova-tag/nova-tag')"></nova-pref>
        <nova-pref title="Flowlayout" @click.native="goPage('../nova-flowlayout/nova-flowlayout')"></nova-pref>
    </view>
</template>

<script>
import novaPref from '../../components/nova/pref.vue';
export default {
    components: {
        novaPref
    },
    data() {
        return {
            
        };
    },
    onLoad() {
        
    },
    methods: {
        goPage(url) {
            uni.navigateTo({
                url: url
            });
        }
    }
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
