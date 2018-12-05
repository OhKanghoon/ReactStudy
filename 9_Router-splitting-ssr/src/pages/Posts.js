import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Post } from 'pages'; 
import 'components/Menu.css'

const Posts = ({match}) => {
    return (
        <div>
           <h2>Post List</h2> 
           <Route exact path={match.url} render={()=>(<h3>Please select any post</h3>)}/>
           <div className='Menu'>
                <div className='MenuItem'><Link to={`${match.url}/1`}>Post #1</Link></div>
                <div className='MenuItem'><Link to={`${match.url}/2`}>Post #2</Link></div>
                <div className='MenuItem'><Link to={`${match.url}/3`}>Post #3</Link></div>
                <div className='MenuItem'><Link to={`${match.url}/4`}>Post #4</Link></div>
           </div>
           <Route path={`${match.url}/:id`} component={Post}/>
        </div>
    );
};

export default Posts;