<template>
    <view style="padding: 20rpx;">
        <view class="title">nova-row-center</view>
        <view class="nova-row-center sample">
            <view>left</view>
            <view style="flex: 1;">中间自适应</view>
            <view>right</view>
        </view>

        <view class="title">nova-list-item</view>
        <view class="nova-list-item sample">
            <view>left</view>
            <view style="flex: 1;">中间自适应中间自适应中间自适应中间自适应中间自适应</view>
            <view class="arrow-right">right</view>
        </view>

        <view class="title">circle and rounded</view>
        <view class="nova-row-center">
            <text class="circle sample" style="width: 100rpx; height: 100rpx;">1</text>
            <text class="rounded sample" style="width: 100rpx; height: 100rpx;">2</text>
        </view>

        <view class="title">media</view>

        <view class="nova-row-center media media--stretch sample">
            <image class="icon" src="../../static/logo.png"></image>
            <view class="space"></view>
            <view class="nova-column body">
                <text>line1</text>
                <text>line2</text>
            </view>
        </view>
        <view class="nova-row-center media media--reverse sample">
            <image class="icon"></image>
            <view class="space"></view>
            <view class="nova-column body">
                <text>line1</text>
                <text>line2</text>
            </view>
        </view>

        <view class="sample">
            <media src="/static/logo.png" :stretch="false" iconWidth="90rpx" iconMargin="20rpx">
                <text>line1</text>
                <text>line2</text>
            </media>
        </view>
        <view class="title">text</view>
        <view class="nova-row-center sample">
            <text class="text-close"></text>
            <view class="text-caret"></view>
            <text class="text-single-line" style="width:60rpx">Single line text</text>
            <text class="two-line" style="width:60rpx">Two line text</text>
            <text class="text-arrow" style="width: 20rpx; height: 20rpx;"></text>
        </view>

        <view class="title">thin border</view>
        <view class="nova-row-center sample">
            <text class="use-normal">use-normal</text>
            <text class="use-transform">use-transform</text>
            <text class="use-media">use-media</text>
        </view>
    </view>
</template>

<script>
import media from '../../components/nova/media.vue';
export default {
    components: {
        media
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss">
page {
    background-color: $uni-bg-color;
}
.sample {
    border: 1rpx solid #555555;
    padding: 20rpx;
    margin: 10rpx 0;
}

.text-justify {
    text-align: justify;
    //text-justify: distribute;
    //text-align-last: justify;
}
.box {
    display: flex;
    width: 160rpx;
    height: 160rpx;
    border: 1rpx solid #ccc;
    padding: 20rpx;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    //align-items: center;
    align-content: space-between;
    .item {
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        background-color: black;
    }
}
.grid {
    padding-right: -20rpx;
    margin-bottom: -30rpx;
    background-color: $uni-bg-color-grey;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
    overflow: hidden;
    //justify-content: space-between;
    .grid-item {
        margin-right: 20rpx;
        margin-bottom: 30rpx;
        width: 100rpx;

        padding-bottom: 33%;
        border: 1px solid $uni-border-color;
        //flex: 0 0 33%;
        flex: 0 0 25%;
        overflow: hidden;
    }
}
.single-line {
    @include text-ellipsis();
}
.two-line {
    @include line-clamp(2);
}
.use-normal {
    margin: 10rpx;
    padding: 10rpx;
    border: 1px solid $uni-color-primary;
}
.use-transform {
    position: relative;
    margin: 10rpx;
    padding: 10rpx;
    &:after {
        @include border-1px($uni-color-primary);
    }
}
.use-media {
    margin: 10rpx;
    padding: 10rpx;
    border-color: $uni-color-primary;
    border-style: solid;
    @include border-width-1px(all);
}
</style>
