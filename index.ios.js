/**
 * Sample React Native App with GraphQL
 */
'use strict';

var React = require('react-native');
var Lokka = require('lokka').Lokka;
var Transport = require('lokka-transport-http').Transport;

// Create a lokka client against SWAPI GraphQL API
var client = new Lokka({
  transport: new Transport('http://graphql-swapi.parseapp.com/')
});

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var graphqlDemo = React.createClass({
  getInitialState() {
    return {movies: []}
  },
  componentDidMount() {
    // query when we mount the view
    client.query(`
        {
          allFilms {
            films {
              title
            }
          }
        }
    `).then(result => {
      this.setState({movies: result.allFilms.films});
    }).catch(error => {
      this.setState({error});
    });
  },
  render: function() {
    var {movies} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          "Star Wars" Movies
        </Text>
        {(movies.length > 0)? this.renderMovies(movies) : this.renderLoading()}
      </View>
    );
  },
  renderMovies(movies) {
    return (
      <View>
        {movies.map(movie => (
          <Text key={movie.title} style={styles.movies}>
            {movie.title}
          </Text>
        ))}
      </View>
    );
  },
  renderLoading() {
    var {error} = this.state;
    if(error) {
      return (
        <View>
          <Text>Oops..</Text>
          <Text>{error.message}</Text>
        </View>
      );
    } else {
      return (<Text>loading...</Text>);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  movies: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('graphqlDemo', () => graphqlDemo);
