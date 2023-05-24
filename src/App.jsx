import {  } from 'react'
import {  } from 'axios'
import {  } from 'react-json-view'
import { str, get } from 'squint-cljs/core.js'
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
111;
var authorize_callback = function () {
return authorize(({ "origin": resource_server, "client_id": "insite", "authorization_endpoint": str(authorization_server, "/oauth/authorize"), "token_endpoint": str(authorization_server, "/oauth/token"), "redirect_uri": str(app_server, "/oauth-redirect.html") }));
}
;
var useWhoami = function () {
let _search1 = useSearch();
return useQuery(({ "queryKey": ["stacktrace"], "retry": 0, "queryFn": function () {
return axios.get("https://home.juxt.site/_site/whoami", ({ "headers": ({ "accept": "application/json" }) })).then(function (response) {
return response["data"];
});
} }));
}
;
var Error = function (error) {
if ((401 === get(get(error, "response"), "status"))) {
return <div><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={authorize_callback}>Login</button></div>;} else {
return <div>something went wrong! <ReactJson src={error}></ReactJson></div>;}
}
;
var App = function () {
let map__23 = useWhoami();
let data4 = get(map__23, "data");
let isFetching5 = get(map__23, "isFetching");
let isError6 = get(map__23, "isError");
let error7 = get(map__23, "error");
return <div class="min-h-screen flex justify-center items-center text-white">{(isFetching5) ? (<div><img class="animate-spin" width="50px" src="/spinner.svg"></img></div>) : ((isError6) ? (<Error {...error7}></Error>) : ((data4) ? (<div><ReactJson src={data4} theme="twilight" name={false} collapsed={2}></ReactJson></div>) : (("else") ? (<div>This should never happen!</div>) : (null))))}</div>;
}
;

export { resource_server, authorization_server, app_server, authorize_callback, useWhoami, Error, App }
