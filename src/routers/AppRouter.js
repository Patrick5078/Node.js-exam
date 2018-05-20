import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import FrontPage from '../components/pages/FrontPage.js'
import ViewProfilePage from '../components/pages/ViewProfilePage.js'
import BrowsePage from '../components/pages/BrowsePage.js'
import SearchPage from '../components/pages/SearchPage.js'
import CreatePage from '../components/pages/CreateStoryPage.js'
import MyStoriesPage from '../components/MyStoriesPage'
import MyProfilePage from '../components/pages/MyProfilePage'
import TestPage from '../components/pages/TestPage'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={FrontPage} exact={true} />
            <Route path="/profile/:setting?" component={MyProfilePage}/>
            <Route path="/view-profile/:id" component={ViewProfilePage}/>
            <Route path="/browse/:category?" component={BrowsePage}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/create" component={CreatePage}/>
            <Route path="/my-stories" component={MyStoriesPage}/>
            <Route path="/test-page" component={TestPage}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;