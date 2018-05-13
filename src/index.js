import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];



class FilterableProductsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText
    });
  }

  render(){
    return(
      <div>
        <SearchBar 
        handleSearchTextChange = {this.handleSearchTextChange} 
        />
        <ProductsTable 
        products = {this.props.products}
        searchText = {this.state.searchText}
        />
      </div>
      
    );
  }

}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.handleSearchTextChange(e.target.value);
  }

  render() {
    return (
      <div>
        <span>Buscar: </span>
        <input type="text" onChange={this.handleSearchTextChange} />
      </div>
    );
  }
}


class ProductsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  filterProducts() {
    return this.props.products.filter(product => {
      return product.name.includes(this.props.searchText);
    })
  }

  render() {

    const FILTERED_PRODUCTS = this.filterProducts();
    console.log(FILTERED_PRODUCTS);
    const PRODUCTS = FILTERED_PRODUCTS.map(product => {
      return(
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
      );
    });

    return(
      <div>
      <h1>Products Table</h1>
      <table>
        <thead></thead>
        {PRODUCTS}

      </table>
      </div>
    );
  }
}



ReactDOM.render(
  <FilterableProductsTable products = {PRODUCTS} />,
  document.getElementById('root')
);
