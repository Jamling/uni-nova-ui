<template>
    <view>
        <view :id="elId" class="nova-grid">
            <block v-if="datalist && datalist.length > 0">
                <nova-grid-item v-for="(item, index) in datalist" :key="index">
                    <view class="grid-item" :class="{ active: choices.has(index) }">{{ datakey ? item[datakey] : item }}</view>
                </nova-grid-item>
            </block>
            <slot v-else />
            <slot name="last"></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'NovaGrid',
    props: {
        // 每列显示个数
        column: {
            type: Number,
            default: 3
        },
        // 边框粗细，暂不支持自定义
        borderWidth: {
            type: Number,
            default: 0
        },
        // 边框颜色，默认为$uni-border-color
        borderColor: {
            type: String,
            default: undefined
        },
        // 单元格高/宽比例，默认为1（正方形）
        ratio: {
            type: Number,
            default: 1
        },
        // 水平间距，默认无
        hspace: {
            type: Number,
            default: 0
        },
        // 垂直间距，默认无
        vspace: {
            type: Number,
            default: 0
        },
        // 水平方向，是否有开始，中间，结尾分隔线，仅当每行个数>1时有效，暂未实现
        hborder: {
            type: Array,
            default: () => [1, 1, 1]
        },
        // 垂直方面，是否有顶部，中间，底部分隔线，仅当每行个数>1时有效，暂未实现
        vborder: {
            type: Array,
            default: () => [1, 1, 1]
        },
        // 点击是否高亮
        highlight: {
            type: Boolean,
            default: true
        },
        // 允许的选择个数 0：无选择；1：单选；-1：多选无限制；N：最多选N个
        choiceMode: {
            type: Number,
            default: 0
        },
        // 多选的时候，可以设置一个互斥的子节点序号，比如选项列表中有一个不限的选项，选中这项，其它项要取消选择，如果选中其它项，那么不限项不选中
        mutexIndex: {
            type: Number,
            default: -1
        },
        // 已选中
        checkedIndex: {
            type: Number,
            default: undefined
        },
        checkedIndices: {
            type: Array,
            default: () => []
        },
        // 名称，当有多个相同性质的grid时有用。
        name: {
            type: String,
            default: ''
        },
        // 填充数据
        datalist: {
            type: Array,
            default: () => []
        },
        // 填充数据显示哪个字段
        datakey: {
            type: String,
            default: ''
        }
    },
    provide() {
        return {
            grid: this
        };
    },
    data() {
        const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`;
        return {
            index: 0,
            childrens: [],
            choices: new Set(),
            elId
        };
    },
    created() {
        this.index = 0;
        this.childrens = [];
        if (this.checkedIndex && this.checkedIndex >= 0) {
            this.choices.add(i);
        }
        if (this.checkedIndices && this.checkedIndices.length > 0) {
            this.checkedIndices.forEach(i => {
                if (i >= 0) {
                    this.choices.add(i);
                }
            });
        }
    },
    methods: {
        setCheckedValue(v) {
            if (v && this.datalist) {
                for (let i = 0; i < this.datalist.length; i++) {
                    if (this.datalist[i] == v) {
                        this.choices.add(i);
                    }
                }
            }
        },

        setCheckedValues(vs) {
            if (vs && vs instanceof Array) {
                vs.forEach(v => {
                    this.setCheckedValue(v);
                });
            }
        },

        clearChoice() {
            this.choices.clear();
        },
        _click(e) {
            if (e.target === undefined) {
                e.target = {};
            }
            e.detail.name = this.name;
            e.target.name = this.name;
            if (this.choiceMode !== 0) {
                let i = e.detail.index;
                const set = this.choices;
                if (this.choiceMode === 1) {
                    if (!set.has(i)) {
                        set.clear();
                        set.add(i);
                    }
                } else {
                    if (set.has(i)) {
                        set.delete(i);
                    } else {
                        // mutex
                        if (this.mutexIndex >= 0) {
                            if (i === this.mutexIndex) {
                                set.clear();
                            } else {
                                set.delete(this.mutexIndex);
                            }
                        }
                        // max count check
                        if (this.choiceMode > 0 && set.size === this.choiceMode) {
                            this.$emit('maxcount', e);
                        } else {
                            set.add(i);
                        }
                    }
                }
                e.detail.choices = Array.from(set);
                this.$emit('change', e);
            }
            this.$emit('click', e);
        },
        _getSize(fn) {
            uni.createSelectorQuery()
                .in(this)
                .select(`#${this.elId}`)
                .boundingClientRect()
                .exec(ret => {
                    if (!ret[0]) {
                        setTimeout(this._getSize(fn));
                        return;
                    }
                    let tw = ret[0].width;
                    let space = uni.upx2px(this.hspace) * (this.column - 1);
                    let width = parseInt((tw - space) / this.column) + 'px';
                    //console.log(tw, space, width);
                    typeof fn === 'function' && fn(width);
                });
        }
    }
};
</script>

<style lang="scss">
.nova-grid {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}
</style>
