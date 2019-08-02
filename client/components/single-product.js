import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {fetchOrders, addToCartThunk} from '../store/orders'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(evt) {
    evt.preventDefault()
    this.props.addToCartThunk({
      orderId: Number(
        this.props.orders.find(
          order => !order.status && order.userId === this.props.user.id
        ).id
      ),
      productId: Number(this.props.match.params.id),
      quantity: Number(this.state.quantity)
    })
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchOrders()
  }

  render() {
    const {products} = this.props
    const product = products.find(
      elem => elem.id === Number(this.props.match.params.id)
    )
    return product !== undefined ? (
      <div>
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <form onSubmit={this.handleAdd}>
            <div>Quantity: </div>
            <input
              nametype="text"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button type="submit">Add To Cart</button>
          </form>
        </div>
      </div>
    ) : (
      <div>loading...</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchOrders: () => dispatch(fetchOrders()),
    addToCartThunk: product => dispatch(addToCartThunk(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)