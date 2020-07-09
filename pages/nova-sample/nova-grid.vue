<template>
    <view style="padding: 20rpx;">
        <pre>
        <text style="white-space: pre-line; padding-bottom: 20rpx;">
            写在最前面：为什么要造这么一个轮子？
            1，我觉得官方的uGrid里面包含的九宫格角标，图片显示不太合适（新版本已经删除了，大赞）
            2，uGrid不支持自定义水平和垂直间距
            3，uGrid仅支持设置正方形单元格
            4，uGridItem有点复杂（新版本简化许多了，大赞）
            5，uGrid的边框配置比较死（我也尝试了能够像App那样灵活配置，不过失败了:(）
            6，uGrid不支持选中功能
            7，我在App上有一个FlowLayout组件，是一个类似表格布局，功能比较强大，如果我把它移植到uniapp，不挺好的吗？
            于是，我开始动手，copy uGrid，重新造了一个轮子。支持以下功能
            1，抽象化：grid只是一个表格容器，grid-item只是格子容器，里面什么内容，咱不管，由使用者自己决定。
            2，水平和垂直间距，使用者说了算（仅支持rpx)
            3，边框可以自定义（好吧，我被打脸了，暂时是不支持厚度，显示位置的）
            4，支持选中模式，不仅如此，还支持限定选中个数，选择互斥（比如选择了全部，全部后面的项目自动取消选中，这个功能在App原生控件中，我都没有实现呢）
            5，支持自动填充数据，类似picker组件那样，当然了，仅支持简单显示，太复杂了，还是需要自己写grid-item的。
            6，支持first/last slot，我搞不懂在小程序中，我的那个添加图片的格子为啥会跑到选择的图片前面去？H5中就没有此现象。好吧，强大的slot派上用场了
        </text>
        </pre>
        <view style="margin-top: 20rpx;">
            <uni-grid :showBorder="true" :column="column" :square="false">
                <uni-grid-item v-for="(item, i) in gridData" :key="i">
                    <text>{{ item }}</text>
                </uni-grid-item>
            </uni-grid>
        </view>

        <view class="grid3 nova-column" style="margin-top: 10px;">
            <view>
                <nova-grid
                    :column="column"
                    :hspace="space"
                    :vspace="30"
                    :ratio="ratio"
                    :borderWidth="borderWidth"
                    borderColor="red"
                    :key="key"
                    :highlight="true"
                    :choiceMode="choiceMode"
                    :mutexIndex="mutexIndex"
                    @change="change"
                    @maxcount="maxcount"
                    @click="click"
                >
                    <nova-grid-item
                        v-for="(item, i) in gridData"
                        :key="i"
                        :itemIndex="i"
                        :class="{ checked: checkedIndices.indexOf(i) >= 0 }"
                        style="padding: 0;"
                    >
                        <view class="grid-item">
                            <text v-if="i % 3 == 1">{{ item }}-{{ item }}</text>
                            <text v-else>{{item}}</text>
                            <!-- <image class="grid-image" src="../../static/logo.png"></image> -->
                        </view>
                    </nova-grid-item>
                    <nova-grid-item :itemIndex="count" slot="last" @click.native.stop="addCount">
                        <view class="nova-flex nova-flex-center" style="width: 100%; height: 100%;">添加图片</view>
                    </nova-grid-item>
                </nova-grid>
            </view>
        </view>

        <view class="nova-row-center" style="margin-top: 20rpx; flex-wrap: wrap;">
            <view class="nova-row-center">
                单元格个数
                <input class="input" type="number" :value="count" @input="inputNum" />
            </view>
            <view class="nova-row-center">
                边框厚度
                <input class="input" type="number" :value="borderWidth" @input="inputBorderWidth" />
            </view>
            <view class="nova-row-center">
                列数
                <input class="input" type="number" :value="column" @input="inputColumn" />
            </view>
            <view class="nova-row-center">
                水平间距
                <input class="input" type="number" :value="space" @input="inputSpace" />
            </view>
            <view class="nova-row-center">
                高宽比
                <input class="input" type="number" :value="ratio" @input="inputRatio" />
            </view>
            <view class="nova-row-center">
                选择模式
                <input class="input" type="number" :value="choiceMode" @input="inputChoiceMode" />
            </view>
            <view class="nova-row-center">
                mutexIndex
                <input class="input" type="number" :value="mutexIndex" @input="inputMutexIndex" />
            </view>
        </view>
    </view>
</template>

<script>
import { uniGrid, uniGridItem } from '@dcloudio/uni-ui';
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
            count: 9,
            gridData: [],
            borderWidth: 1,
            column: 6,
            ratio: 0.5,
            space: 40,
            mutexIndex: -1,
            choiceMode: 0,
            checkedIndices: [],
            key: 0
        };
    },
    created() {
        this._initGridData();
    },
    methods: {
        _initGridData() {
            this.gridData = [];
            for (let i = 0; i < this.count; i++) {
                this.gridData.push('item-' + i);
            }
        },
        inputNum(e) {
            let v = parseInt(e.detail.value);
            if (v > 0) {
                this.count = v;
                this.key = Math.random();
            }
        },
        inputBorderWidth(e) {
            let v = parseInt(e.detail.value);
            if (v > 0) {
                this.borderWidth = v;
                this.key = Math.random();
            }
        },
        inputColumn(e) {
            let v = parseInt(e.detail.value);
            if (v > 0) {
                // this.column = v;
                // this.key = Math.random();
                this._initGridData();
            }
        },
        inputSpace(e) {
            let v = parseInt(e.detail.value);
            if (v >= 0) {
                this.space = v;
                this.key = Math.random();
            }
        },
        inputRatio(e) {
            let v = parseFloat(e.detail.value);
            if (v >= 0) {
                this.ratio = v;
                this.key = Math.random();
            }
        },
        inputChoiceMode(e) {
            let v = parseInt(e.detail.value);
            this.choiceMode = v;
        },
        inputMutexIndex(e) {
            let v = parseInt(e.detail.value);
            this.mutexIndex = v;
        },
        addCount(e) {
            this.count = this.count + 1;
            this._initGridData();
            console.log(this.gridData);
        },
        change(e) {
            console.log(e);
            this.checkedIndices = e.detail.choices;
        },
        click(e) {
            console.log(e);
            if (e.detail.index == this.gridData.length) {
                this.addCount(e);
            }
        },
        maxcount(e) {
            console.log(e);
            uni.showToast({
                title: `最多选择${this.choiceMode}个`
            });
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
.grid-item {
    height: 40rpx;
    overflow: hidden;
}
.checked {
    background-color: #808080;
}
.input {
    margin-left: 20rpx;
    width: 60rpx;
}
</style>
