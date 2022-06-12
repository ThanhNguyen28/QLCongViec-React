import React from 'react';
class Seach extends React.Component {
  constructor(props){
    super(props);
    this.state={
        keyword:''      
    }
  }
  onChange=(event)=>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:value
    });
  }
  onSeach=()=>{
    return this.props.onSeach(this.state.keyword);    
  }
    render() {
      var {keyword}=this.state;
      return (
        <div className="input-group">
          <input type="text" className="form-control" name="keyword" placeholder="Nhập từ khóa..." value={keyword} onChange={this.onChange} />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.onSeach}>
              <span className="fa fa-search mr-5" />Tìm
            </button>
          </span>
        </div>
      );
    }
   }

export default Seach;
