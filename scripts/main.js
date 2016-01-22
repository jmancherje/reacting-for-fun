var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;


var App = React.createClass({
  getInitialState : function() {
    return {
      todos : {},
      completed : {}
    }
  },
  addTodo : function(todo) {
    var date = (new Date()).getTime();
    // add todo to App state
    this.state.todos['todo-' + date] = todo;
    // update state
    this.setState({
      todos : this.state.todos
    });
  },
  renderTodo : function(key) {
    return (
      <Todo key={key} index={key} details={this.state.todos[key]} toggleTodo={this.completeTodo} />
    )
  },
  renderTodoDone : function(key) {
    return (
      <Todo key={key} index={key} toggleTodo={this.uncompleteTodo} details={this.state.completed[key]} />
    )
  },
  completeTodo : function(key) {
    this.state.completed[key] = this.state.todos[key];
    this.state.completed[key].completed = true;
    delete this.state.todos[key];
    this.setState({
      todos : this.state.todos,
      completed : this.state.completed
    })
  },
  uncompleteTodo : function(key) {
    this.state.todos[key] = this.state.completed[key];
    this.state.todos[key].completed = false;
    delete this.state.completed[key];
    this.setState({
      todos : this.state.todos,
      completed : this.state.completed
    })    
  },
  loadData : function() {
    this.setState({
      todos : require('./sample-todos')
    });
  },
  render : function() {
    return (
      <div className="todo-app">
        <div className="container">
          <h2>Add Todo</h2>
          <AddTodoForm addTodo={this.addTodo} />
          <button onClick={this.loadData}>Load Data</button>
        </div>
        <div className="container">
          <h2>Todos:</h2>
          {Object.keys(this.state.todos).map(this.renderTodo)}
        </div>
        <div className="container">
          <h2>Completed:</h2>
          {Object.keys(this.state.completed).map(this.renderTodoDone)}
        </div>       
        <ul className="list-of-todos">
        </ul>
      </div>
    )
  }
});

// todo class

var Todo = React.createClass({
  toggle : function() {
    console.log('toggling..');
    this.props.toggleTodo(this.props.index);
  },
  render : function() {
    var details = this.props.details;
    var completed = details.completed;
    var getClasses = function () {
      if (completed) {
        return "todo-item completed";
      } else {
        return "todo-item not-completed";
      }
    }
    return (
      <li className={getClasses()} onClick={this.toggle}>
        <h4 className="todo-title">{details.title}</h4>
        <p className="todo-details">{details.details}</p>
      </li>
    )
  }
});

// make todo form model

var AddTodoForm = React.createClass({
  createTodo : function(event) {
    event.preventDefault();

    var todo = {
      title : this.refs.todoTitle.value,
      details : this.refs.todoDetails.value,
      completed : false
    }

    this.props.addTodo(todo);
    // reset form
    this.refs.todoForm.reset();
  },
  render : function() {
    return (
      <form className="add-todo-form" ref="todoForm" onSubmit={this.createTodo}>
        <input type="text" ref="todoTitle" placeholder="What to do.." /><br />
        <textarea type="text" ref="todoDetails" placeholder="Add some details"></textarea><br />
        <button type="submit">+ add Todo </button>
      </form>
    )
  }
});

// var routes = (
//   <Router>
//     <Route path="*"/>
//   </Router>
// );

ReactDom.render(<App/>, document.querySelector('#main'));