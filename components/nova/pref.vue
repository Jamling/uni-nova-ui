<template>
    <view class="pref-box">
        <slot name="icon"></slot>
        <view class="title" v-if="title">{{ title }}</view>
        <view class="nova-row-center body" :style="bodyStyle">
            <slot name="text"></slot>
            <slot>
                <block v-if="type == 'input'">
                    <input :type="inputType" :placeholder="placeholder" class="pref-input" :style="inputStyle" :value="value" :name="name" @input="_input" />
                </block>
                <block v-if="type == 'textarea'"><textarea :placeholder="placeholder" class="pref-ta" :style="inputStyle" :value="value" @input="_input"></textarea></block>
                <block v-if="type == 'text'">
                    <view class="pref-input">
                        <text v-if="value" :style="inputStyle">{{ value }}</text>
                        <text v-else class="input-placeholder placeholder">{{ placeholder }}</text>
                    </view>
                </block>
            </slot>
            <slot name="arrow"><view v-if="arrow" class="text-arrow"></view></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'nova-pref',
    props: {
        title: {
            type: String,
            default: ''
        },
        arrow: {
            type: Boolean,
            default: false
        },
        compClass: {
            type: String,
            default: 'nova-pref-wrapper'
        },
        inputType: {
            type: String,
            default: 'text'
        },
        inputStyle: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String | Array,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        bodyStyle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            prefInputClass: 'pref-input'
        };
    },
    mounted: function() {
        if (this.value) {
            this.pickerText = this.value;
        }
    },
    methods: {
        _input(e) {
            e.target.name = this.name;
            this.$emit('input', e);
        }
    }
};
</script>

<style lang="scss">
.pref-box {
    display: flex;
    align-items: center;
    min-height: 80rpx;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
    .icon {
    }
    .title {
    }
    .body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-left: 10rpx;
        .pref-input {
            text-align: right;
            font-size: 28rpx;
        }
        .pref-ta {
            font-size: 28rpx;
        }
    }
}
</style>
