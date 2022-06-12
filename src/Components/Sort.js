import React from 'react';
class Sort extends React.Component {
  onClick=(sortBy,sortValue)=>{
    this.props.onSort(sortBy,sortValue);
  }
    render() {
      var {by,value}=this.props;
      return (
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={()=>this.onClick('name',1)}>
              <p role="button" className={(by==='name' && value===1) ? 'sort_selected' : ''}>
                <span className="fa fa-sort-alpha-asc pr-5">
                  Tên A-Z
                </span>
              </p>
            </li>
            <li onClick={()=>this.onClick('name',-1)}>
              <p role="button" className={(by==='name' && value===-1) ? 'sort_selected' : ''}>
                <span className="fa fa-sort-alpha-desc pr-5">
                  Tên Z-A
                </span>
              </p>
            </li>
            <li role="separator" className="divider" />
            <li onClick={()=>this.onClick('status',1)}><p className={(by==='status' && value===1) ? 'sort_selected' : ''} role="button">Trạng Thái Kích Hoạt</p></li>
            <li onClick={()=>this.onClick('status',-1)}><p className={(by==='status' && value===-1) ? 'sort_selected' : ''} role="button">Trạng Thái Ẩn</p></li>
          </ul>
        </div>
      );
    }
   }

export default Sort;
