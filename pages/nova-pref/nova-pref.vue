<template>
    <view class="nova-list">
        <view ref="hidden" class="hidden"></view>
        <nova-pref class="pref" title="标题"></nova-pref>
        <nova-pref class="pref" title="标题" value="说明+单位" unit="元"></nova-pref>
        <nova-pref class="pref" title="标题" value="说明+箭头" :arrow="true"></nova-pref>
        <nova-pref class="pref" title="标题" placeholder="placeholder" :arrow="true"></nova-pref>
        <nova-pref class="pref-custom" title="标题" value="自定义样式" :arrow="true"></nova-pref>
        <nova-pref class="pref-icon" title="带图标" value="线条自定义"><image class="icon" slot="icon" src="../../static/logo.png"></image></nova-pref>

        <nova-pref
            class="pref"
            title="文本(设置name和@input来绑定数据)"
            placeholder="请输入姓名"
            type="input"
            :arrow="true"
            name="name"
            :value="name"
            @input="inputPref"
        ></nova-pref>
        <nova-pref type="input" :arrow="true"></nova-pref>
        <nova-pref
            class="pref"
            title="多行文本"
            placeholder="请输入备注"
            type="textarea"
            name="remark"
            :value="remark"
            @input="inputPref"
            inputStyle="border: 1rpx solid #666; height: 160rpx; width: 100%; padding:10rpx;"
        ></nova-pref>

        <nova-pref class="pref" :arrow="false" title="自定义内容">
            <button style="margin-right: 0;">自定义右侧内容</button>
            <text slot="arrow" class="text-close"></text>
        </nova-pref>

        <nova-pref class="pref pref-pick" title="城市选择" :arrow="true">
            <view class="pref-input" @tap.stop="showMulLinkageTwoPicker">
                <text v-if="city.label">{{ city.label }}</text>
                <text v-else class="input-placeholder placeholder">{{ city.placeholder }}</text>
            </view>
            <mpvue-picker
                :themeColor="themeColor"
                ref="mpvuePicker"
                mode="multiLinkageSelector"
                :deepLength="2"
                :pickerValueDefault="city.index"
                @onConfirm="onConfirm"
                @onCancel="onCancel"
                :pickerValueArray="city.range"
            ></mpvue-picker>
        </nova-pref>
        <nova-pref class="pref pref-pick" title="地区" :arrow="true">
            <view class="pref-input" @tap.stop="showMulLinkageThreePicker">
                <text v-if="area.label">{{ area.label }}</text>
                <text v-else class="input-placeholder placeholder">{{ area.placeholder }}</text>
            </view>
            <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="area.index" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
        </nova-pref>

        <nova-pref class="pref pref-pick" title="自定义选择" :arrow="true">
            <picker mode="selector" :range="module" :key="rangeKey" :value="index" @change="_change">
                <text>{{ module[index][rangeKey] || '请选择' }}</text>
            </picker>
        </nova-pref>
    </view>
</template>

<script>
import novaPref from '../../components/nova/pref.vue';
// https://github.com/zhetengbiji/mpvue-picker
import mpvuePicker from 'mpvue-picker';
// https://github.com/zhetengbiji/mpvue-citypicker
import mpvueCityPicker from 'mpvue-citypicker';
import cityData from '@/common/city.data.js';
export default {
    components: {
        novaPref,
        mpvuePicker,
        mpvueCityPicker
    },
    data() {
        return {
            name: '',
            remark: '',
            themeColor: '#007AFF',
            city: {
                index: [0, 0],
                range: cityData,
                label: '',
                placeholder: '请选择'
            },
            area: {
                index: [0, 0, 0],
                range: cityData,
                label: '',
                placeholder: '请选择'
            },
            module: [{ moduleName: 'haha' }],
            index: 0,
            rangeKey: 'moduleName'
        };
    },
    methods: {
        inputPref(e) {
            console.log(e);
            this[e.target.name] = e.detail.value;
        },
        // 二级联动选择
        showMulLinkageTwoPicker() {
            this.$refs.mpvuePicker.show();
        },
        // 三级联动选择
        showMulLinkageThreePicker() {
            this.$refs.mpvueCityPicker.show();
        },
        onConfirm(e) {
            console.log(e);
            if (e.value.length == 2) {
                this.city.label = e.label;
                this.city.index = e.index;
                console.log(this.city);
            } else {
                this.area.label = e.label;
                this.area.index = e.index;
                console.log(this.area);
            }
        },
        onCancel(e) {
            console.log(e);
        },
        _change(e) {
            console.log(e);
        }
    },
    onBackPress() {
        if (this.$refs.mpvuePicker.showPicker) {
            this.$refs.mpvuePicker.pickerCancel();
            return true;
        }
        if (this.$refs.mpvueCityPicker.showPicker) {
            this.$refs.mpvueCityPicker.pickerCancel();
            return true;
        }
    },
    onUnload() {
        if (this.$refs.mpvuePicker.showPicker) {
            this.$refs.mpvuePicker.pickerCancel();
        }
        if (this.$refs.mpvueCityPicker.showPicker) {
            this.$refs.mpvueCityPicker.pickerCancel();
        }
    },
    onReady() {
        console.log(this.$refs.hidden);
        //this.themeColor = this.$refs.hidden.style.color;
    }
};
</script>

<style lang="scss">
.hidden {
    color: $uni-color-primary;
    display: none;
}
.pref {
    position: relative;
    &:after {
        @include divider(0);
    }
}
.pref-icon {
    position: relative;
    .icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 20rpx;
    }

    &:after {
        @include divider(88rpx);
    }
}
.pref-icon /deep/ .left {
    color: #888888;
}
.pref-custom {
    position: relative;
    color: $uni-color-primary;
    &:after {
        @include divider(0, 0, $uni-color-primary);
    }
}
</style>
