import {  } from 'react'
import {  } from 'axios'
import {  } from 'react-json-view'
import { str, get } from 'squint-cljs/core.js'
import { registerOAuth2Worker, authorize } from '@juxt/pass';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-location';
import axios from 'axios';
import ReactJson from 'react-json-view';
registerOAuth2Worker();
var authorization_server = "http://localhost:4440"
;
var app_server = "http://localhost:3000"
;
var authorize_callback = function (resource_server) {
return authorize(({ "origin": resource_server, "client_id": "insite", "authorization_endpoint": str(authorization_server, "/oauth/authorize"), "token_endpoint": str(authorization_server, "/oauth/token"), "redirect_uri": str(app_server, "/oauth-redirect.html") }));
}
;
var useWhoami = function (resource_server) {
let _search1 = useSearch();
return useQuery(({ "queryKey": ["stacktrace"], "retry": 0, "queryFn": function () {
return axios.get(str(resource_server, "/_site/whoami"), ({ "headers": ({ "accept": "application/json" }) })).then(function (response) {
return response["data"];
});
} }));
}
;
var Error = function (error) {
return <div>something went wrong! <ReactJson src={error}></ReactJson></div>;
}
;
var MeJson = function (p__2) {
let map__34 = p__2;
let resource_server5 = get(map__34, "resource-server");
let map__67 = useWhoami(resource_server5);
let data8 = get(map__67, "data");
let isLoading9 = get(map__67, "isLoading");
let isError10 = get(map__67, "isError");
let error11 = get(map__67, "error");
return <div class="min-h-screen flex justify-center items-center text-white">{(isLoading9) ? (<div><img class="animate-spin" width="50px" src="/spinner.svg"></img></div>) : ((isError10) ? (<Error {...error11}></Error>) : ((data8) ? (<div><ReactJson src={data8} theme="twilight" name={false} collapsed={2}></ReactJson></div>) : (("else") ? (<div>This should never happen!</div>) : (null))))}</div>;
}
;
var App = function () {
let map__1213 = useForm();
let register14 = get(map__1213, "register");
let handleSubmit15 = get(map__1213, "handleSubmit");
return <div className="flex justify-center items-center"><input {...register14("resourceServer")} className="input" defaultValue="http://localhost:4444"></input> <button className="btn" onClick={handleSubmit15(function (data) {
return store_si(get(data, "resourceServer"));
})}>Submit</button> <MeJson resource-server="http://localhost:4444"></MeJson></div>;
}
;

export { authorization_server, app_server, authorize_callback, useWhoami, Error, MeJson, App }
