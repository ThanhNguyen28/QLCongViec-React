import React from 'react';
import TaskForm from './Components/TaskForm';
import Controll from './Components/Controll';
import TaskList from './Components/TaskList';
import {findIndex} from  'lodash';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        tasks:[],
        isDisplayForm : false,   
        taskEdit:null,
        filter: {
          name:'',
          status:-1
        },
        keyword:'',
        by: 'name',
        value: 1 
    }
  }
  // khi nao load trang no se dc goi va chi chay 1 lan 
  componentWillMount(){
      if(localStorage&&localStorage.getItem('tasks')){
          var tasks=JSON.parse(localStorage.getItem('tasks'));
          this.setState({
            tasks:tasks
          });
      }
  }
  onThemCV=()=>{
      if(this.state.isDisplayForm && this.state.taskEdit !==null){
        this.setState({
            isDisplayForm : true,
            taskEdit:null
          });
      }else{
        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
            taskEdit:null
          });
      }   
  }
  onClose=()=>{
    this.setState({
        isDisplayForm :false
      });
  }
  //hàm random chuoi
  s4(){
      return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  randomID(){
    return this.s4()+"-"+this.s4()+"-"+this.s4()+"-"+this.s4()+"-"+this.s4();
  }
  onSubmit=(data)=>{
      var {tasks}=this.state;
      if(data.id===''){
        data.id=this.randomID();
        tasks.push(data);
      }else{
          //edit
          var index=this.findIndex(data.id);
          tasks[index]=data;
      }
      
      this.setState({
        tasks:tasks,
        taskEdit:null
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  onUpdateStatus=(id)=>{
    var {tasks}=this.state; 
    var index=this.findIndex(id);
    if(index!==-1){
        tasks[index].status=!tasks[index].status;
        this.setState({
            tasks:tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }  
  }
  findIndex=(id)=>{
    var {tasks}=this.state; 
    var tam=-1;
    tasks.forEach((task,index)=>{
           if(task.id===id){
               tam=index;
           }
    });
    return tam;
  }
  onDelete=(id)=>{
    var {tasks}=this.state; 
   // var index=this.findIndex(id);
   var index=findIndex(tasks,(task)=>{
       return task.id===id;
   });
    if(index!==-1){      
        tasks.splice(index,1);// ham xoa phan tu trong ob
        this.setState({
            tasks:tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }  
    this.onClose();
  }
  onShowForm=()=>{
    this.setState({
        isDisplayForm :true
      });
  }
  onUpdate=(id)=>{
    var {tasks}=this.state; 
    var index=this.findIndex(id);
    this.setState({
        taskEdit:tasks[index]
    });
    this.onShowForm();    
  }
  onFilter=(filterName,filterStatus)=>{
    filterStatus=parseInt(filterStatus,10);
    this.setState({
      filter:{
          name:filterName.toLowerCase(),// ham chuyen doi thanh chu thuong
          status:filterStatus
      }
    });      
  }
  onSeach=(keyword)=>{
    this.setState({
      keyword:keyword
    });
  }
  onSort=(sortBy,sortValue)=>{
    this.setState({
        by: sortBy,
        value: sortValue 
    });   
  }
  render() {
    var {tasks,isDisplayForm,taskEdit,filter,keyword,by,value}=this.state; // var tasks =this.state.tasks

    if(filter){
      if(filter.name){
       tasks=tasks.filter((tasks)=>{
          return tasks.name.toLowerCase().indexOf(filter.name)!==-1;
        });
      }
        tasks=tasks.filter((tasks)=>{
          if(filter.status===-1){
            return tasks;
          }else{
            return tasks.status===(filter.status ===1 ? true : false)
          }
        });    
    }
    // sap xep
    if(by==='name'){
       tasks.sort((a,b)=>{
          if(a.name>b.name) return value;
          else if(a.name<b.name) return -value;
          else return 0;
       });
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status) return -value;
        else if(a.status<b.status) return value;
        else return 0;
     });
    }
    // tim kiem
    if(keyword){
      tasks=tasks.filter((tasks)=>{
        return tasks.name.toLowerCase().indexOf(keyword)!==-1;
      });
    }
    var emlTaskForm=isDisplayForm ? <TaskForm task={taskEdit}
                                              onSubmit={this.onSubmit} 
                                              onClose={this.onClose}/> :'';
    return (
        <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
          {emlTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onThemCV}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <Controll onSeach={this.onSeach} onSort={this.onSort} by={by} value={value}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
               <TaskList 
               tasks={tasks} 
               onFilter={this.onFilter}
               onUpdateStatus={this.onUpdateStatus} 
               onDelete={this.onDelete}
               onUpdate={this.onUpdate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
 }

export default App;
