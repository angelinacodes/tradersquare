import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';



class PE extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {modalOpen: false}
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleClick(){
    this.props.getStratData("pricetoearnings");
  }

  render() {
    // let color = Util.cardColor(-1, 50, this.props.percentileData, "pricetoearnings")
    const data = Util.handleData(this.props.percentileData, "pricetoearnings", -1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">COST</h3>
        <h4 className="centertext">P/E: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Price to Earnings</h2>
          <p>P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view winners in P/E
          </Link>
        </Modal>

      </div>
    )
  }

}

// description for P/E
//         <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>


function mapStateToProps(state) {
  return {
    stockData: state.stock,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps, {getStratData})(PE);
