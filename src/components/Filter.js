import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    const {
      count,
      sort,
      size,
      handleChangeSort,
      handleChangeSize
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">{count} products found.</div>
        <div className="col-md-4">
          <label>
            order by
            <select
              className="form-control"
              value={sort}
              onChange={e => handleChangeSort(e)}
            >
              <option value="">Select</option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4">
          <label>
            {" "}
            Filter Size
            <select
              className="form-control"
              value={size}
              onChange={e => handleChangeSize(e)}
            >
              <option value="">ALL</option>
              <option value="x">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
