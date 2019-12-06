<template>
    <view style="padding: 20rpx;">
        <view v-for="(item, index) in [1, 2, 3, 4]" :key="index">
            <uni-grid :showBorder="true" :column="3" :square="false">
                <uni-grid-item v-for="i in 4" :key="i">
                    <text>tab{{ i }}</text>
                </uni-grid-item>
            </uni-grid>
        </view>
        <!--        <view class="grid2" style="margin-top: 10px;">
            <view v-for="i in 4" class="grid2-item" :key="i" :class="['item-' + (i % 3)]">
                <view class="grid2-item-box"><view class="grid2-item-box-item">aaa</view></view>
            </view>
        </view> -->
        <view class="grid3 nova-column" style="margin-top: 10px;">
            <view>
                <nova-grid :column="3" :hspace="space" :vspace="space" :ratio="ratio" :borderWidth="2" borderColor="red" :key="key" :highlight="true">
                    <nova-grid-item v-for="i in count" :key="i" style="padding: 10px;" :itemIndex="i - 1">
                        <text>grid-item-{{ i }}</text>
                        <image class="grid-image" src="../../static/logo.png"></image>
                    </nova-grid-item>
                </nova-grid>
            </view>
        </view>

        <view>
            个数
            <input type="number" :value="count" @input="inputNum" />
            水平间距
            <input type="number" :value="space" @input="inputSpace" />
            高宽比
            <input type="number" :value="ratio" @input="inputRatio" />
        </view>
    </view>
</template>

<script>
import uniGrid from '../../components/uni-grid/uni-grid.vue';
import uniGridItem from '../../components/uni-grid-item/uni-grid-item.vue';
import novaGrid from '../../components/nova/grid.vue';
import novaGridItem from '../../components/nova/grid-item.vue';

export default {
    components: {
        uniGrid,
        uniGridItem,
        novaGrid,
        novaGridItem
    },
    data() {
        return {
            count: 4,
            ratio: 0,
            space: 0,
            key: 0,
        };
    },
    methods: {
        inputNum(e) {
            let v = parseInt(e.detail.value);
            if (v > 0) {
                this.count = v;
            }
        },
        inputSpace(e) {
            let v = parseInt(e.detail.value);
            if (v >= 0) {
                this.space = v;
                this.key = Math.random()
            }
        },
        inputRatio(e) {
            let v = parseFloat(e.detail.value);
            if (v >= 0) {
                this.ratio = v;
                this.key = Math.random()
            }
        }
    }
};
</script>

<style lang="scss">
.grid2 {
    display: flex;
    flex-wrap: wrap;
    &-item {
        width: 125px; //dyn
        &-box {
            position: relative;
            box-sizing: border-box;
            height: 0;
            padding-top: 80%;
            background-color: #808080;
            border: 1px solid red;

            &-item {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                display: flex;
                align-content: center;
                justify-content: center;
            }
        }
    }
    .item-0,
    .item-2 {
        //margin-left: 10px;
    }
}
.grid-image {
    width: 50%;
    height: 50%;
}
</style>
