<template>
    <view v-if="text" :class="[disabled ? 'nova-tag--disabled' : '', inverted2 ? 'nova-tag--inverted' : '']" class="nova-center nova-tag" @click.stop="_onClick">
        <slot>{{ text }}</slot>
    </view>
</template>

<script>
export default {
    name: 'nova-tag',
    props: {
        text: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inverted: {
            type: Boolean,
            default: false
        },
        checkable: {
            type: Boolean,
            default: false
        },
        value: {
            
        }
    },
    data() {
        return {
            inverted2: false
        };
    },
    mounted: function() {
        this.inverted2 = this.inverted;
    },
    methods: {
        _onClick(e) {
            if (this.disabled) {
                return;
            }
            if (this.checkable) {
                this.inverted2 = !this.inverted2;
            }
            e.detail.checked = this.inverted2;
            e.detail.label = this.text;
            e.detail.value = this.value;
            this.$emit('click', e);
        }
    }
};
</script>

<style lang="scss">
$nova-tag-radius: 8rpx;
.nova-tag {
    display: inline-flex;
    position: relative;
    background-color: $uni-color-primary;
    color: white;
    border-radius: 4rpx;
    padding: 2rpx 6rpx;
    font-size: 24rpx;
    border: 1rpx solid $uni-color-primary;
    // &:after {
    //     @include border-1px($uni-color-primary, $nova-tag-radius);
    // }
    &--inverted {
        color: $uni-color-primary;
        background: none;
    }
    &--disabled {
        color: $uni-text-color-grey;
        background: none;
        border-color: $uni-text-color-grey;
        // &:after {
        //     @include border-1px($uni-text-color-grey, $nova-tag-radius);
        // }
    }
    margin-left: 10rpx;
}
</style>
