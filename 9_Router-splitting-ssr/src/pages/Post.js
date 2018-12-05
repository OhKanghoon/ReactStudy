import React from 'react';

const Post = ({match, location}) => {
    return (
        <div>
            match.prams.id => {match.params.id} <br/>
            location.pathname => {location.pathname} <br/>
            match.path => {match.path} <br/>
            match.url => {match.url} 
        </div>
    );
};

export default Post;