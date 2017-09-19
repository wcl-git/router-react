import React, {Component, PropTypes} from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { is, fromJS} from 'immutable'
import { Header, template} from './common/mixin'
import { Link } from 'react-router'

/**
 * (导出组件)
 *
 * @export
 * @class Main
 * @extends {Component}
 */

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleList: 'none',  // 右侧商品列表是否展示
      selected: {list1: 'rule_active'}, // 当前选择的商品为选中状态
      oldSelected: 'list1', // 上次选中的商品，避免多次选择
      content: '', // 当前选商品的内容
      data: [], // 获取到的数据
      showList: [], // 左侧显示出来的商品列表
      hideList: [], // 右侧隐藏的商品列表
      widthRate: null, // 左侧商品列表的宽度，根据获得长度的不同，宽度会跟随变化
      liWidth: null, //  左侧单个商品列表的宽度
      aside: null // 右侧列表的对象
    }
  }

  render () {
    return (
      <div>
        <Link to='/helperCenter/about'>about</Link>
        {this.props.children}
      </div>
    )
  }
}

export default template({
  id: 'helpCenter',  // 应用关联使用的redux
  component: Main, // 接收数据的组件入口
  url: ''
})
