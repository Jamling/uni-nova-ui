<template>
    <view class="content">
        <nova-tag class="tag" text="default" :value="1" @click="onClick"></nova-tag>
        <nova-tag class="tag" text="inverted" :inverted="true"></nova-tag>
        <nova-tag class="tag" text="disabled" :disabled="true"></nova-tag>
        <nova-tag class="tag" text="disabled" :disabled="true"></nova-tag>
        <nova-tag class="tag" text="checkable" :checkable="true" @click="onCheck"></nova-tag>
        <nova-tag class="tag" text="1">slot</nova-tag>
        <nova-tag class="tag" text="1"><text class="slot">高级slot</text></nova-tag>
        <nova-tag class="custom-tag" text="1" :inverted="true">样式穿透</nova-tag>
    </view>
</template>

<script>
import novaTag from '../../components/nova/tag.vue';
export default {
    components: {
        novaTag
    },
    data() {
        return {};
    },
    methods: {
        onCheck(e) {
            console.log(e);
            uni.showToast({
                title: e.detail.checked ? 'checked' : 'uncheck'
            });
        },
        onClick(e) {
            console.log(e);
            uni.showToast({
                title: '' + e.detail.value
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    padding: 20rpx 20rpx;
    .nova-tag:first-child {
        margin-left: 0;
    }
}
/* #ifndef H5 */
.custom-tag {
    /deep/ .nova-tag {
        color: red;
        &--inverted {
            border-color: red;
            // &:after {
            //     @include border-1px(red, 20rpx);
            // }
        }
    }
}
/* #endif */

/* #ifdef H5 */
.custom-tag {
    color: red;
    // &:after {
    //     @include border-1px(red, 20rpx);
    // }
    border-color: red;
}

/* #endif */

.slot {
    padding: 10rpx;
    font-size: 36rpx;
}
</style>
