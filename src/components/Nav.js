import React, { Component } from 'react';
import { Menu, Segment, Search, Label} from 'semantic-ui-react';
import { Link  } from "react-router-dom";
import { fetchMovies } from "../actions/movieActions.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from 'lodash';

class Nav extends Component {
  
  state = { 
    activeItem: "home",
    loading: false,
    results: [],
    value: ''
   }

   componentDidMount() {
    this.props.fetchMovies();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSearchChange = (e, { value }) => this.setState({ results: _.filter(this.props.movies,movie=>{  
  if (movie.name.toLowerCase().includes(value))  {

      return true
  }else {
      return false
  }
 }), value: value })

 handleClick = (e, data) => {
  window.location.href = "/movie/" + data.result.id;
 };

  render() {
    const { activeItem } = this.state

    const resultRenderer = ({ name }) => <Label content={name} />

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/genres'
            name='genres'
            active={activeItem === 'genres'}
            onClick={this.handleItemClick}
          >
          </Menu.Item>
          <div className="right">
              <Search
              loading={this.state.loading}
              onSearchChange={this.handleSearchChange.bind(this)}
              resultRenderer={resultRenderer}
              onResultSelect={this.handleClick.bind(this)}
              results={this.state.results}
              value={this.state.value}
            />
          </div>
        </Menu>
      </Segment>
    )
  }
}

Nav.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { fetchMovies})(Nav);