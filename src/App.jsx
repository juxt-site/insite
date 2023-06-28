import {  } from 'axios'
import {  } from 'react-json-view'
import { str, get, nth } from 'squint-cljs/core.js'
import { registerOAuth2Worker, authorize } from '@juxt/pass';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSiteURL } from './hooks/site-config';
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
var MeJson = function (p__1) {
let map__23 = p__1;
let resource_server4 = get(map__23, "resource-server");
let map__56 = useWhoami(resource_server4);
let data7 = get(map__56, "data");
let isLoading8 = get(map__56, "isLoading");
let isError9 = get(map__56, "isError");
let error10 = get(map__56, "error");
return <div className="min-h-screen flex justify-center items-center text-white">{(isLoading8) ? (<div><img className="animate-spin" width="50px" src="/spinner.svg"></img></div>) : ((isError9) ? (<Error {...error10}></Error>) : ((data7) ? (<div><ReactJson src={data7} theme="twilight" name={false} collapsed={2}></ReactJson></div>) : (("else") ? (<div>This should never happen!</div>) : (null))))}</div>;
}
;
var App = function () {
let map__1115 = useForm();
let register16 = get(map__1115, "register");
let handleSubmit17 = get(map__1115, "handleSubmit");
let vec__1218 = useSiteURL();
let site_url19 = nth(vec__1218, 0, null);
let set_url20 = nth(vec__1218, 1, null);
return <div className="flex justify-center items-center"><input {...register16("resourceServer")} className="input" defaultValue="http://localhost:4444"></input> <button className="btn" onClick={handleSubmit17(function (data) {
authorize_callback(data);
return set_url20(get(data, "resourceServer"));
})}>Submit</button> {(site_url19) ? (<MeJson resource-server={site_url19}></MeJson>) : (null)}</div>;
}
;

export { authorization_server, app_server, authorize_callback, useWhoami, Error, MeJson, App }
