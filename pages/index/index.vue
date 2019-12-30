<template>
    <view class="content nova-list">
        <nova-pref class="pref" title="常用" :arrow="true" @click.native="goPage('../nova-sample/nova-common')" value="一些常用的样式及布局"></nova-pref>
        <nova-pref class="pref" title="NovaPref" value="强大的列表项" :arrow="true" @click.native="goPage('../nova-sample/nova-pref')"></nova-pref>
        <nova-pref class="pref" title="NovaTag" value="标签" :arrow="true" @click.native="goPage('../nova-sample/nova-tag')"></nova-pref>
        <nova-pref class="pref" title="NovaGrid" value="uGrid加强版" :arrow="true" @click.native="goPage('../nova-sample/nova-grid')"></nova-pref>
    </view>
</template>

<script>
import novaPref from '../../components/nova/pref.vue';
export default {
    components: {
        novaPref
    },
    data() {
        return {};
    },
    onLoad() {},
    methods: {
        goPage(url) {
            uni.navigateTo({
                url: url
            });
        }
    }
};
</script>

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .pref {
        position: relative;
        &:after {
            @include divider();
        }
    }
}
</style>
