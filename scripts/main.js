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
    }
  },
  count: 0,
  addTodo : function(todo) {
    this.count++;
    // add todo to App state
    this.state.todos['todo-' + this.count] = todo;
    // update state
    this.setState({
      todos : this.state.todos
    });
  },
  renderTodo : function(key) {
    if (!this.state.todos[key].completed) {
      return (
        <Todo key={key} details={this.state.todos[key]} />
      )
    }
  },
  renderTodoDone : function(key) {
    if (this.state.todos[key].completed) {
      return (
        <Todo key={key} details={this.state.todos[key]} />
      )
    }
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
          {Object.keys(this.state.todos).map(this.renderTodoDone)}
        </div>       
        <ul className="list-of-todos">
        </ul>
      </div>
    )
  }
});

// todo class

var Todo = React.createClass({
  render : function() {
    var details = this.props.details;
    return (
      <li className="todo-item">
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