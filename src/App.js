import React, { Component } from 'react';
import './App.css';
import { ApiPost } from './util.js'

class DeleteBtn extends React.Component {
  handleClick(i) {
    ApiPost('deleteContact').doRequest({params: {id: i}})
    .on('done', () => {
      document.getElementById(i).remove()
    })
  }
  render() {
    return <button onClick={() => this.handleClick(this.props.idDelete)} className="btn-delete">Delete</button>
  }
}

class EditContact extends React.Component {
  contactData (data) {
    this.props.contactEditId(data)
  }
  handleClick(i) {
    ApiPost('editContact').doRequest({params: {id: i}})
    .on('done', (res) => {
      this.contactData(res.body.data)
    })
  }
  render() {
    return <button onClick={() => this.handleClick(this.props.idEdit)} className="btn-edit">Edit</button>
  }
}

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        age: '',
        photo: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(keyword, event) {
    const saveValue = this.state
    saveValue[keyword] = event.target.value
    this.setState({saveValue})
  }

  handleSubmit(event) {
    var _this = this
    // alert('A name was submitted: ' + this.state.value);
    ApiPost('postContact').doRequest({body: {firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, photo: this.state.photo}})
    .on('done', () => {
      _this.props.getContact()
    })
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-add" onSubmit={this.handleSubmit}>
      <h2>Add Contact</h2>
      <table className="table">
      <tr>
      <td>First Name</td><td><input type="text" value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} /></td>
      </tr>
      <tr>
      <td>Last Name</td><td><input type="text" value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} /></td>
      </tr>
      <tr>
      <td>Age</td><td><input type="number" value={this.state.age} onChange={this.handleChange.bind(this,'age')} /></td>
      </tr>
      <tr>
      <td>Photo</td><td><input type="text" value={this.state.photo} onChange={this.handleChange.bind(this, 'photo')} /></td>
      </tr>
      <tr>
      <td></td><td><input type="submit" value="Submit" /></td>
      </tr>
      </table>
      </form>
    )
  }
}

class EditContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        age: '',
        photo: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      firstName: this.props.setContact.firstName,
      lastName: this.props.setContact.lastName,
      age: this.props.setContact.age,
      photo: this.props.setContact.photo
    })
  }

  handleChange(keyword, event) {
    const saveValue = this.state
    saveValue[keyword] = event.target.value
    this.setState({saveValue})
  }

  handleSubmit(event) {
    var _this = this
    // alert('A name was submitted: ' + this.state.value);
    ApiPost('submitEdit').doRequest({body: {firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, photo: this.state.photo},params: {id: this.props.setContact.id}})
    .on('done', () => {
      _this.props.getContact()
      _this.props.backValue()
    })
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-add" onSubmit={this.handleSubmit}>
      <h2>Edit Contact</h2>
      <table className="table">
      <tr>
      <td>First Name</td><td><input type="text" value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} /></td>
      </tr>
      <tr>
      <td>Last Name</td><td><input type="text" value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} /></td>
      </tr>
      <tr>
      <td>Age</td><td><input type="number" value={this.state.age} onChange={this.handleChange.bind(this,'age')} /></td>
      </tr>
      <tr>
      <td>Photo</td><td><input type="text" value={this.state.photo} onChange={this.handleChange.bind(this, 'photo')} /></td>
      </tr>
      <tr>
      <td></td><td><input type="submit" value="Submit" /></td>
      </tr>
      </table>
      </form>
    )
  }
}
class ContactList extends React.Component {
  contactEdit (data) {
    this.props.contactEditData(data)
  }
  NumberList (data) {
    var listItems = data.map((number) =>
      <tr id={number.id} key={number.id.toString()} className="get-contact">
      <td>{number.firstName}</td>
      <td>{number.lastName}</td>
      <td>{number.age}</td>
      <td><img src={number.photo}></img></td>
      <td>
        <DeleteBtn idDelete={number.id}/>
        <EditContact contactEditId={this.contactEdit.bind(this)} idEdit={number.id} />
      </td>
      </tr>
      )
    return listItems
  }
  render() {
    const ListContact = this.NumberList(this.props.dataContact)
    return ListContact
  }
}
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      contact: [],
      showAdd: true,
      showEdit: false,
      dataEdit: {}
    };
}
  componentWillMount () {
    this.getContact()
  }
  editData (data) {
    this.setState({dataEdit: data, showAdd: false, showEdit: true})
  }
  resetVal () {
    this.setState({showAdd: true, showEdit: false})
  }
  getContact () {
    ApiPost('getContact').doRequest()
     .on('done', res => {
       this.setState({contact: res.body.data})
     })
  }
  render() {
    const dataContact = this.state.contact
    const setContact = this.state.dataEdit
    return (
      <div className="App">
        {this.state.showAdd ? <AddContact  getContact={this.getContact.bind(this)}/> : null}
        {this.state.showEdit ?  <EditContactForm getContact={this.getContact.bind(this)} setContact={setContact} backValue={this.resetVal.bind(this)}/> : null}
        <table className="table-result">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Photo Profile</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <ContactList contactEditData={this.editData.bind(this)} dataContact={dataContact}/>
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
