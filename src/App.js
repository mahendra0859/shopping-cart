import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";

// Child Components
import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket";

// Actions
import {
  UPDATE_BASKET,
  UPDATE_PRODUCTS,
  UPDATE_FILTERED_PRODUCTS
} from "./redux/action";

// Mapping the state and
const mapStateToProps = state => ({
  ...state.BasketReducer,
  ...state.ProductsReducer
});
const mapDispatchToProps = dispatch => ({
  updateBasket: data => dispatch({ type: UPDATE_BASKET, payload: data }),
  updateProduct: data => dispatch({ type: UPDATE_PRODUCTS, payload: data }),
  updateFilteredProduct: data =>
    dispatch({ type: UPDATE_FILTERED_PRODUCTS, payload: data })
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      sort: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => {
        this.props.updateProduct(data);
        this.props.updateFilteredProduct(data);
      });
  }
  handleChangeSort(e) {
    this.setState({ sort: e.target.value }, () => this.listProducts());
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value }, () => this.listProducts());
  }
  listProducts() {
    if (this.state.sort !== "") {
      this.props.products.sort((a, b) =>
        this.state.sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : a.price < b.price
          ? 1
          : -1
      );
    } else this.props.products.sort((a, b) => (a.id > b.id ? 1 : -1));
    if (this.state.size !== "") {
      const data = this.props.products.filter(
        a => a.availableSizes.indexOf(this.state.size.toUpperCase()) >= 0
      );
      this.props.updateFilteredProduct(data);
    } else this.props.updateFilteredProduct(this.props.products);
  }
  handleRemoveFromCart = product => {
    const cartItems = this.props.cartItems.filter(a => a.id !== product.id);
    this.props.updateBasket(cartItems);
  };
  handleAddToCart = product => {
    const cartItems = this.props.cartItems;
    let productAlreadyInCart = false;

    cartItems.forEach(cp => {
      if (cp.id === product.id) {
        cp.count += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.props.updateBasket(cartItems);
  };

  render() {
    const { size, sort } = this.state,
      { filteredProducts } = this.props;
    return (
      <div className="container">
        <h1>E commerce react application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={size}
              sort={sort}
              handleChangeSize={e => this.handleChangeSize(e)}
              handleChangeSort={e => this.handleChangeSort(e)}
              count={filteredProducts.length}
            />
            <hr />
            <Products handleAddToCart={this.handleAddToCart} />
          </div>
          <div className="col-md-4">
            <Basket handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
