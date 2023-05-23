import { useState as react_useState } from 'react'
import {  } from 'axios'
import {  } from 'react-json-view'
import { str, get, nth } from 'squint-cljs/core.js'
import { registerOAuth2Worker, authorize } from '@juxt/pass';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-location';
import axios from 'axios';
import ReactJson from 'react-json-view';
registerOAuth2Worker();
var resource_server = "https://home.juxt.site"
;
var authorization_server = "https://auth.home.juxt.site"
;
var app_server = "https://surveyor.apps.com"
;
var authorize_callback = function () {
return authorize(({ "origin": resource_server, "client_id": "insite", "authorization_endpoint": str(authorization_server, "/oauth/authorize"), "token_endpoint": str(authorization_server, "/oauth/token"), "redirect_uri": str(app_server, "/oauth-redirect.html"), "request_scopes": [] }));
}
;
var useWhoami = function (enabled) {
let _search1 = useSearch();
return useQuery(({ "queryKey": ["stacktrace"], "retry": 0, "enabled": enabled, "queryFn": function () {
return axios.get("https://home.juxt.site/_site/whoami", ({ "headers": ({ "accept": "application/json" }) })).then(function (response) {
return response["data"];
});
} }));
}
;
var Error = function (error) {
if ((401 === get(get(error, "response"), "status"))) {
return <div><button onClick={authorize_callback}>Login</button></div>;} else {
return <div>something went wrong! <ReactJson src={error}></ReactJson></div>;}
}
;
var App = function () {
let vec__26 = react_useState(false);
let enabled7 = nth(vec__26, 0, null);
let setEnabled8 = nth(vec__26, 1, null);
let map__59 = useWhoami(enabled7);
let data10 = get(map__59, "data");
let isFetching11 = get(map__59, "isFetching");
let isError12 = get(map__59, "isError");
let error13 = get(map__59, "error");
return <div>{<button onClick={function () {
return setEnabled8(true);
}}>Fetch</button>} <button onClick={authorize_callback}>Login</button> {(isFetching11) ? (<div>Loading...</div>) : ((isError12) ? (<Error {...error13}></Error>) : ((data10) ? (<div><ReactJson src={data10}></ReactJson></div>) : (("else") ? (<div>This should never happen!</div>) : (null))))}</div>;
}
;

export { resource_server, authorization_server, app_server, authorize_callback, useWhoami, Error, App }
