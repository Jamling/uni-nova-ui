<template>
    <view v-if="width" :style="{ width: width, marginTop: marginTop, marginLeft: marginLeft }" class="grid-item-box">
        <view v-if="borderWidth > 0" class="border" :class="{ 'border-c1rx': c1rx, 'border-r1cx': r1cx }" :style="borderStyle"></view>
        <view
            class="wraper"
            :class="{
                'wraper-ratio': ratio > 0,
                'wraper-active': highlight
            }"
            :style="boxStyle"
            @click.stop="_onClick"
        >
            <view class="grid-item nova-column nova-flex-center"><slot /></view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'NovaGridItem',
    props: {
        itemIndex: {
            type: Number,
            default: undefined
        }
    },
    inject: ['grid'],
    data() {
        return {
            width: 0,
            column: 0,
            ratio: 0,
            highlight: true,
            index: 0,
            marginLeft: 0,
            marginTop: 0,
            boxStyle: {},
            hborder: [1, 1, 1],
            vborder: [1, 1, 1],
            borderWidth: 0,
            borderColor: undefined,
            borderStyle: {},
            c1rx: false,
            r1cx: false
        };
    },
    watch: {
        itemIndex: function(newVal, oldVal) {
            if (newVal !== undefined) {
                this.index = newVal;
                console.log(oldVal + '->' + newVal);
                this._calcPos();
            }
        }
    },
    created() {
        this.column = this.grid.column;
        this.highlight = this.grid.highlight;
        this.borderColor = this.grid.borderColor;
        this.borderWidth = this.grid.borderWidth || 0;
        this.hborder = this.grid.hborder || [1, 1, 1];
        this.vborder = this.grid.vborder || [1, 1, 1];
        if (this.itemIndex !== undefined) {
            this.index = this.itemIndex;
        } else {
            this.index = this.grid.index++;
        }
        //console.log(this.index);
        this.ratio = this.grid.ratio;
        this._calcPos();
    },
    // #ifdef H5
    mounted() {
        this.grid._getSize(width => {
            this.width = width;
        });
    },
    // #endif
    // #ifndef H5
    onReady() {
        this.grid._getSize(width => {
            this.width = width;
        });
    },
    // #endif
    methods: {
        _calcPos() {
            //console.log(this.index);
            if (this.column > 0) {
                if (this.index % this.column > 0) {
                    this.marginLeft = uni.upx2px(this.grid.hspace) + 'px';
                } else {
                    this.marginLeft = 0;
                }
                if (this.index / this.column >= 1) {
                    this.marginTop = uni.upx2px(this.grid.vspace) + 'px';
                } else {
                    this.marginTop = 0;
                }
                if (this.ratio > 0) {
                    this.boxStyle.paddingTop = this.ratio * 100 + '%';
                }
            }
            //this.boxStyle.borderColor = this.borderColor;
            if (this.borderWidth > 0) {
                let bw = this.borderWidth + 'px';

                // if (this.index % this.column == 0) {
                //     // hor start
                //     this.borderStyle.borderLeftWidth = this.hborder[0] ? bw : 0;
                //     this.borderStyle.borderRightWidth = this.hborder[1] && this.column > 1 ? bw : 0;
                // } else if (this.index % this.column == this.column - 1) {
                //     // hor end
                //     this.borderStyle.borderLeftWidth = this.hborder[0] && this.column > 1 ? bw : 0;
                //     this.borderStyle.borderRightWidth = this.hborder[2] && this.column > 1 ? bw : 0;
                // } else if (this.index % this.column > 0) {
                //     this.borderStyle.borderLeftWidth = this.hborder[1] ? bw : 0;
                // }

                // if (this.grid.hspace > 0 && this.index / this.column >= 1) {
                //     this.boxStyle.borderTopWidth = 0;
                // }

                //this.borderStyle.borderWidth = bw;
                if (this.borderColor) {
                    this.borderStyle.borderColor = this.borderColor;
                }
                if (this.column > 1) {
                    if (this.index % this.column > 0) {
                        this.c1rx = true;
                    } else {
                        this.c1rx = false;
                    }
                    if (this.index / this.column >= 1) {
                        this.r1cx = true;
                    } else {
                        this.r1cx = false;
                    }
                } else {
                }
            }
        },
        _onClick() {
            // console.log('点击', this.index);
            this.grid._click({ detail: { index: this.index } });
        }
    }
};
</script>

<style lang="scss">
.grid-item-box {
    position: relative;
    box-sizing: border-box;
    .border {
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        position: absolute;
        transform-origin: 0 0;
        transform: scale(0.5);
        box-sizing: border-box;
        border-color: $uni-border-color;
        border-style: solid;
        border-width: 1px;
        &-c1rx {
            //第2-N列
            border-left-width: 0;
        }
        &-r1cx {
            //第2-N行
            border-top-width: 0;
        }
    }

    .wraper {
        width: 100%;
        .grid-item {
            //border: 1px solid green;
            overflow: hidden;
        }
        &-ratio {
            position: relative;
            height: 0;
            .grid-item {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
        &-active:active {
            background-color: $uni-bg-color-hover;
        }
    }
}
</style>
