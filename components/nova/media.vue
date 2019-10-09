<template>
    <view class="nova-row-center media-box" :class="[reverse ? 'media-box--reverse' : '', stretch ? 'media-box--stretch' : '']">
        <slot name="icon"><image :src="src" class="icon" :mode="mode" :style="iconSize"></image></slot>
        <view class="nova-column body"><slot></slot></view>
    </view>
</template>

<script>
export default {
    name: 'media',
    props: {
        reverse: false,
        stretch: false,
        iconMargin: '',
        iconWidth: '',
        iconHeight: '',
        src: '',
        mode: 'scaleToFill'
    },
    computed: {
        iconSize: function() {
            let s = '';
            if (this.iconWidth) {
                s += 'width:' + this.iconWidth + ';';
            }
            if (this.iconHeight) {
                s += 'height:' + this.iconHeight + ';';
            }
            if (this.iconMargin) {
                if (this.reverse) {
                    s += 'margin-left:' + this.iconMargin;
                } else {
                    s += 'margin-right:' + this.iconMargin;
                }
            }
            return s;
        }
    }
};
</script>

<style lang="scss">
.media-box {
    .icon {
        width: 120rpx;
        height: 90rpx;
        background-color: $uni-bg-color-grey;
    }
    .space {
        width: 20rpx;
    }
    .body {
        flex: 1;
        justify-content: space-between;
    }
    &--reverse {
        flex-direction: row-reverse !important;
    }
    &--stretch {
        align-items: stretch !important;
        .body {
        }
    }
}
</style>
