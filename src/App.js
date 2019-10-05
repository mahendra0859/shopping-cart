import React, { Component } from "react";
import "./App.scss";

import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket";

import { UPDATE } from "./redux/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  updatestate: data => dispatch({ type: UPDATE, payload: data })
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      size: "",
      sort: "",
      cartItems: []
    };
  }
  componentDidMount() {
    // if (localStorage.getItem("cartItems")) {
    //   this.setState({
    //     cartItems: JSON.parse(localStorage.getItem("cartItems"))
    //   });
    // }

    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => this.setState({ products: data, filteredProducts: data }));
  }
  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }
  listProducts() {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return { filteredProducts: state.products };
    });
  }
  handleRemoveFromCart = (e, product) => {
    // this.setState(state => {
    //   const cartItems = state.cartItems.filter(a => a.id !== product.id);
    //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //   return { cartItems: cartItems };
    // });

    const cartItems = this.props.cartItems.filter(a => a.id !== product.id);
    this.props.updatestate(cartItems);
  };
  handleAddToCart = (e, product) => {
    // this.setState(state => {
    //   const cartItems = state.cartItems;
    //   let productAlreadyInCart = false;

    //   cartItems.forEach(cp => {
    //     if (cp.id === product.id) {
    //       cp.count += 1;
    //       productAlreadyInCart = true;
    //     }
    //   });

    //   if (!productAlreadyInCart) {
    //     cartItems.push({ ...product, count: 1 });
    //   }
    //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
    //   return { cartItems: cartItems };

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
    this.props.updatestate(cartItems);
  };

  render() {
    const { filteredProducts, size, sort } = this.state;
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
            <Products
              products={filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4">
            {/* <Basket
              cartItems={cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            /> */}
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
