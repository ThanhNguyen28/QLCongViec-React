import React from 'react';
import Seach from './Seach'
import Sort from './Sort'
class Controll extends React.Component {
    render() {
      return (
        <div className="row mt-15">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
             <Seach onSeach={this.props.onSeach}/>
           </div>
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
             <Sort onSort={this.props.onSort} by={this.props.by} value={this.props.value}/>
           </div>
      </div>
      );
    }
   }

export default Controll;
