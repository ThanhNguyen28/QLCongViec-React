import React from 'react';
class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name: '',
            status:false  
        }
      }
      componentWillMount(){
        if(this.props.task){
          this.setState({
            id:this.props.task.id,
            name: this.props.task.name,
            status:this.props.task.status 
          });  
        }     
      }
      componentWillReceiveProps(next){
        if(next && next.task){
          this.setState({
            id:next.task.id,
            name: next.task.name,
            status:next.task.status 
          });         
        }else if(!next.task){
          this.setState({
            id:'',
            name: '',
            status:false  
        });
        }
      }
    onClose=()=>{
        return this.props.onClose();
    }
    onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        if(name==='status'){
            value=target.value==='true' ? true :false;
        }
        this.setState({
            [name]:value
        });
    }
    onSubmit=(event)=>{
     event.preventDefault();    
    }
    onAdd=()=>{
        this.props.onSubmit(this.state);
        this.onClose();
    }
    onClear=()=>{
        this.setState({
            name: '',
            status:false
        });
    }
    render() {
       var {id}=this.state;
      return (
        <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id === '' ? 'Thêm' : 'Cập Nhập'} Công Việc 
          <span className="fa fa-times-circle text-right" onClick={this.onClose}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning" onClick={this.onAdd}>Save</button>&nbsp;
              <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
      );
    }
   }

export default TaskForm;
