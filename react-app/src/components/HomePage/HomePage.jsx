import React, { Component } from 'react';
import { getPage, search } from '../../api/remote';
import FurnitureList from './FurnitureList';
import { NavLink, Link } from 'react-router-dom';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      search: ''
    }


    //bind
    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.page !== this.props.match.params.page) {
      this.getData(Number(nextProps.match.params.page));
    }
  }

  async getData(page = Number(this.props.match.params.page) || 1) {
    let data = await getPage(page)
    this.setState({ data })

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSearch(e){
    e.preventDefault();
    let data = await search(this.state.search);
    this.setState({ data })
  }

  render() {
    const page = Number(this.props.match.params.page) || 1;
    let one = Math.max((page - 2), 1);
    let two = Math.max((page - 1), 2);
    let three = Math.max((page), 3);
    let four = Math.max((page + 1), 4);
    let five = Math.max((page + 2), 5);

    let oneClass = ''
    let twoClass = ''
    let threeClass = ''
    let fourClass = ''
    let fiveClass = ''
    if(page === one){
      oneClass = ' active'
    }
    else if(page === two){
      twoClass = ' active'
    }
    else if(page === three){
      threeClass = ' active'
    }
    else if(page === four){
      fourClass = ' active'
    }
    else if(page === five){
      fiveClass = ' active'
    }
    return (
      <div className="container">
        <div className="container">
          <div className="container">
            <div className="row space-top">
              <div className="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>

                <form onSubmit={this.onSearch} className="form-inline my-2 my-lg-0">
                  <input value={this.state.search} name="search" onChange={this.onChange} className="form-control mr-sm-2" placeholder="Search" type="text" />
                  <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
          <FurnitureList props={this.state.data} />
          <div className="row space-top">
            <div className="col-md-12">
              <ul className="pagination">
                {page !== 1 && <li className="page-item">
                  <Link className="page-link" to={"/page/" + (page - 1)}>«</Link>
                </li>}
               
                <li className={"page-item" + oneClass}>
                  <NavLink activeClassName="activeLink" className="page-link" to={"/page/" + one}>{one}</NavLink>
                </li>
                <li className={"page-item" + twoClass}>
                  <NavLink activeClassName="activeLink" className="page-link active" to={"/page/" + two}>{two}</NavLink>
                </li>
                <li className={"page-item" + threeClass}>
                  <NavLink activeClassName="activeLink" className="page-link" to={"/page/" + three}>{three}</NavLink>
                </li>
                <li className={"page-item" + fourClass}>
                  <NavLink activeClassName="activeLink" className="page-link" to={"/page/" + four}>{four}</NavLink>
                </li>
                <li className={"page-item" + fiveClass}>
                  <NavLink activeClassName="activeLink" className="page-link" to={"/page/" + five}>{five}</NavLink>
                </li>
                <li className="page-item">
                  <Link className="page-link" to={"/page/" + (page + 1)}>»</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}