import React, { Component } from 'react';
import styled from "styled-components";

import ShopItem from "../shopItem/shopItem";
import getData from "../../services/getData";

const Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export default class GoogsList extends Component {

    data = new getData();

    state = {
        items: null
    }

    componentWillMount() {

        this.data.getGoods().then((res) => {
            this.setState({items: res})
        });
    }

    render() {

        const items = this.state.items;
     
        const content = items ? items.map((item) => {

            return (
                <ShopItem 
                    name={item.name}
                    url={item.url}
                    price={item.price}
                    key={item.key}
                    link={false} />
                )

            }) : null;

        return(
            <Wrap>
               {content}
            </Wrap>
        )
    }
}
