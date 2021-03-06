import React, { Component } from 'react';
import styled from "styled-components";
import { Spinner } from "reactstrap";

import ShopItem from "../shopItem/shopItem";
import getData from "../../services/getData";
import ErrorComponent from "../ErrorComponent/errorComponent";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default class ShopList extends Component {

  data = new getData();

  state = {
    items: [],
    loading: false,
    error: null
  }

  componentDidMount() {

    this.setState({loading: true})

    this.data.getCoffee()
      .then((res) => {
        this.setState({
          items: res,
          loading: false
        })
      })
      .catch((res) => {
        this.setState({
          error: res,
          loading: false
        });
      });
  }

  filterItems = (array, filter) => {

    if(filter) {
      const newArray = array.filter(item => item.country === filter);
      return newArray;

    } else {
        return array;
    }
  }

  searchItems = (array, mask) => {

    const newArray = array.filter((item) => {
      return item.name.toLowerCase().indexOf(mask) > -1
    });
    return newArray;
  }

  render() {

    const items = this.state.items;
    const {filter, mask} = this.props;

    const itemsFiltered = mask ? this.searchItems(items, mask) : this.filterItems(items, filter);

    const content = this.state.loading ? <Spinner style={{ width: '3rem', height: '3rem', margin: '70px auto' }} /> :
                    items ? itemsFiltered.map((item) => {
                                                        return (
                                                            <ShopItem
                                                              name={item.name}
                                                              url={item.url}
                                                              price={item.price}
                                                              country={item.country}
                                                              key={item.key}
                                                              link />
                                                            )

                                                        }) :
                    this.state.error ? <ErrorComponent /> : null;

    return(
      <Wrap>
        {content}
      </Wrap>
    )
  }
}
