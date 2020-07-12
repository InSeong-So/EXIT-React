import React from 'react';

const About = () => {
    return (
        <Router>
            <Switch>
                <Route path="/user/create" component={Create}></Route>
            </Switch>
        </Router>
        <div>about!</div>
    );
};

export default About;