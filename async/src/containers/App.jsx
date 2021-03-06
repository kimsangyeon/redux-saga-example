import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

const App = ({
  selectedReddit,
  posts,
  isFetching,
  lastUpdated,
  dispatch,
}) => {
  const handleChange = (nextReddit) => {
    dispatch(actions.selectReddit(nextReddit));
  };

  const handleRefreshClick = e => {
    e.preventDefault();
    dispatch(actions.invalidateReddit(selectedReddit));
  };

  return (
    <div>
      <Picker
        value={selectedReddit}
        onChange={handleChange}
        options={['reactjs', 'frontend']}
      />
      <p>
        {
          lastUpdated &&
          <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>
        }
        {
          !isFetching &&
            <a href='#' onClick={handleRefreshClick}>
              Refresh
            </a>
        }
      </p>
      {
        isFetching && posts.length === 0 && <h2>Loading...</h2>
      }
      {
        !isFetching && posts.length === 0 && <h2>Empty.</h2>
      }
      {
        posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      }
    </div>
  );
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(App);