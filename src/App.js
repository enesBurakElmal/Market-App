import React, { Component, Fragment } from 'react'

import Navbar from './components/navbar/navbar-component'

import SortingComponent from './components/sorting-component/sorting-component'
import BrandsComponent from './components/brands-component/brands-component'
import TagsComponent from './components/tags-component/tags-component'
import EmployeesIndex from './components/display-products/display-products.component'
import PayloadComponent from './components/checkout/checkout.component'
import styles from './app.module.scss'
// json-server --watch items.json --port 3001
// json-server --watch companies.json --port 3002

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      checkoutPopup: false,
    }
  }

  popupController = () => {
    this.setState({ checkoutPopup: !this.state.checkoutPopup })
  }

  render() {
    const width = this.state.width
    
    const popupController = this.popupController
    
    return (
      <Fragment>
        <Navbar />
        <div className={styles.appContainer}>
          <div style={{ height: window.innerHeight / 10 }} />
          <div className={styles.appWrapper}>
            <div className={styles.shortColumn}>
              <SortingComponent onChange={this.onChange} />
              <BrandsComponent />
              <TagsComponent />
            </div>
            <div className={styles.middleColumn}>
              <EmployeesIndex />
            </div>
            <div
              className={`${styles.shortColumn} ${styles.absolute}`}
              onClick={this.popupController}
            >
              <PayloadComponent cartItem={this.props.cartItem} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
