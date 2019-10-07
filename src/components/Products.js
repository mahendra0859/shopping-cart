import React, { Component } from "react";
import "./style.scss";
import { connect } from "react-redux";
import util from "../util";

const mapStateToProps = state => ({ ...state.ProductsReducer });
class Products extends Component {
  render() {
    const { filteredProducts, handleAddToCart } = this.props;
    const productItems = filteredProducts.map(product => {
      return (
        <div className="col-md-4" key={product.id}>
          <div className="thumbnail text-center">
            <a href={`#${product.id}`} onClick={() => handleAddToCart(product)}>
              <img src={`/products/${product.sku}_1.jpg`} alt={product.title} />
              <p>{product.description}</p>
            </a>
            <div>
              <b>{util.formatCurrency(product.price)}</b>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    });
    return <div className="row product-container">{productItems}</div>;
  }
}
export default connect(mapStateToProps)(Products);
