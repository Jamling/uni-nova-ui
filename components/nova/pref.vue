<template>
    <view class="pref-box">
        <slot name="icon"></slot>
        <view class="title" v-if="title">{{ title }}</view>
        <view class="nova-row-center body" :style="bodyStyle">
            <slot name="text"></slot>
            <slot>
                <block v-if="type == 'input'">
                    <input
                        :type="inputType"
                        :placeholder="placeholder"
                        class="pref-input"
                        :style="inputStyle"
                        :value="value"
                        :name="name"
                        @input="_input"
                        @blur="_blur"
                        @focus="_focus"
                    />
                </block>
                <block v-if="type == 'textarea'">
                    <textarea :placeholder="placeholder" class="pref-ta" :style="inputStyle" :value="value" @input="_input" @blur="_blur" @focus="_focus"></textarea>
                </block>
                <block v-if="type == 'text'">
                    <view class="pref-text">
                        <text v-if="value" :style="inputStyle">{{ value }}</text>
                        <text v-else class="input-placeholder placeholder">{{ placeholder }}</text>
                    </view>
                </block>
                <block v-if="type == 'picker'">
                    <picker class="pref-picker" :mode="pickerMode" :value="value" @change="_pickerChange" :range="pickerRange" :range-key="pickerRangeKey">
                        <text v-if="_getPickerLabel()">{{ _getPickerLabel() }}</text>
                        <text v-else class="input-placeholder placeholder">{{ placeholder }}</text>
                    </picker>
                </block>
            </slot>
            <slot name="unit" v-if="unit">
                <text class="unit">{{ unit }}</text>
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
            // 左侧的标题
            type: String,
            default: ''
        },
        arrow: {
            // 是否显示箭头
            type: Boolean,
            default: false
        },
        compClass: {
            type: String,
            default: 'nova-pref-wrapper'
        },
        inputType: {
            // 当type == 'input'时设置input[type]属性值
            type: String,
            default: 'text'
        },
        inputStyle: {
            // 当type == 'input'时设置input的样式
            type: String,
            default: ''
        },
        type: {
            // 类型：text, input, textarea, picker
            type: String,
            default: 'text'
        },
        name: {
            //名称
            type: String,
            default: ''
        },
        value: {
            //值
            type: String | Array,
            default: ''
        },
        unit: {
            // 附加的单位，一般当type=input时使用
            type: String,
            default: ''
        },
        placeholder: {
            //没有值时显示的占位
            type: String,
            default: ''
        },
        bodyStyle: {
            // pref内容主体样式
            type: String,
            default: ''
        },
        // 以下三个为type=picker时的属性
        pickerMode: {
            type: String,
            default: 'selector'
        },
        pickerRange: {
            type: Array,
            default: () => []
        },
        pickerRangeKey: {
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
        },
        _blur(e) {
            e.target.name = this.name;
            this.$emit('blur', e);
        },
        _focus(e) {
            e.target.name = this.name;
            this.$emit('focus', e);
        },
        _getPickerLabel() {
            let v = parseInt(this.value);
            if (isNaN(v)) {
                v = -1;
            }
            if (this.pickerRange && v >= 0 && v < this.pickerRange.length) {
                return this.pickerRangeKey ? this.pickerRange[v][this.pickerRangeKey] : this.pickerRange[v];
            }
            return '';
        },
        _pickerChange(e) {
            e.target.name = this.name;
            this.$emit('change', e);
        }
    }
};
</script>

<style lang="scss">
.pref-box {
    display: flex;
    align-items: center;
    min-height: 96rpx;
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
        .pref-text {
            width: 100%;
            text-align: right;
            font-size: 28rpx;
        }
        .pref-picker {
            width: 100%;
            text-align: right;
            font-size: 28rpx;
        }
        .pref-ta {
            font-size: 28rpx;
        }
    }
}
</style>
