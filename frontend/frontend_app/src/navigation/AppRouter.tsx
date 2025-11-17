import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/Auth/LoginPage";
import HomePage from "../pages/Home/HomePage";
import SelectCityPage from "../pages/City/SelectCityPage";
import RouteListPage from "../pages/Route/RouteListPage";
import RouteDetailPage from "../pages/Route/RouteDetailPage";
import RouteStopsPage from "../pages/Route/RouteStopPage";
import RouteSchedulePage from "../pages/Route/RouteSchedulePage";
import FeedbackListPage from "../pages/Feedback/FeedbackListPage";
import FeedbackFormPage from "../pages/Feedback/FeedbackFormPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/Errors/NotFoundPage";
import RegisterPage from "../pages/Auth/RegisterPage";

export const AppRouter: React.FC = () => {
  const { token } = useAuth();

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Login */}
        <Route path="/login" exact>
      {token ? <Redirect to="/home" /> : <LoginPage />}
          </Route>

       {/* Register */}
      <Route path="/register" exact>
       {token ? <Redirect to="/home" /> : <RegisterPage />}
          </Route>

        {/* Home */}
        <Route path="/home" exact>
          {token ? <HomePage /> : <Redirect to="/login" />}
        </Route>

        {/* Cities */}
        <Route path="/city/select" exact>
          {token ? <SelectCityPage /> : <Redirect to="/login" />}
        </Route>

        {/* Routes */}
        <Route path="/routes" exact>
          {token ? <RouteListPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/routes/:routeId" exact>
          {token ? <RouteDetailPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/routes/:routeId/stops" exact>
          {token ? <RouteStopsPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/routes/:routeId/schedule" exact>
          {token ? <RouteSchedulePage /> : <Redirect to="/login" />}
        </Route>

        {/* Feedback */}
        <Route path="/routes/:routeId/feedback" exact>
          {token ? <FeedbackListPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/routes/:routeId/feedback/new" exact>
          {token ? <FeedbackFormPage /> : <Redirect to="/login" />}
        </Route>

        {/* Profile */}
        <Route path="/profile" exact>
          {token ? <ProfilePage /> : <Redirect to="/login" />}
        </Route>

        {/* Default */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        {/* 404 */}
        <Route>
          <NotFoundPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
