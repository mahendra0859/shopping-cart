import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";

const mapStateToProps = state => ({ ...state.BasketReducer });

class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info basket-container">
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div>
            You have {cartItems.length} items in the basket. <hr />
          </div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: -25 }}>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs"
                    onClick={e => this.props.handleRemoveFromCart(item)}
                  >
                    X
                  </button>
                  <br />
                  {item.count} X {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>

            <b>
              Sum:{" "}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </b>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Basket);
