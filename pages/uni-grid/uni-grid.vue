<template>
    <view>
        <uni-grid :showBorder="true" :column="3" :square="true">
            <uni-grid-item><text>tab1</text></uni-grid-item>
            <uni-grid-item><text>tab2</text></uni-grid-item>
        </uni-grid>
        <view class="grid2" style="margin-top: 10px;">
            <view v-for="i in 4" class="grid2-item" :key="i" :class="['item-' + (i % 3)]">
                <view class="grid2-item-box"><view class="grid2-item-box-item">aaa</view></view>
            </view>
        </view>
        <view class="grid3" style="margin-top: 10px;">
            <nova-grid :column="3" :hspace="0" :vspace="0" :ratio="0" :borderWidth="2" borderColor="red">
                <nova-grid-item v-for="i in 4" :key="i" style="padding: 10px;">
                    <text>grid-item-{{ i }}</text>
                    <image class="grid-image" src="../../static/logo.png"></image>
                </nova-grid-item>
            </nova-grid>
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
        return {};
    },
    methods: {}
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
