(ns App
  (:require ["@juxt/pass" :refer [registerOAuth2Worker, authorize]]
            ["react" :as react]
            ["@tanstack/react-query" :refer [useQuery]]
            ["@tanstack/react-location" :refer [useSearch]]
            ["axios$default" :as axios]
            ["react-json-view$default" :as ReactJson]))

(registerOAuth2Worker)

(def resource-server "https://home.juxt.site")
(def authorization-server "https://auth.home.juxt.site")
(def app-server "https://surveyor.apps.com")

(defn authorize-callback []
  (authorize
   {:origin resource-server
    :client_id "insite"
    :authorization_endpoint (str authorization-server "/oauth/authorize")
    :token_endpoint (str authorization-server "/oauth/token")
    :redirect_uri (str app-server "/oauth-redirect.html")
    :request_scopes []}))

(defn useWhoami [enabled]
  (let [_search (useSearch)]
    (useQuery {:queryKey ["stacktrace"]
               :retry 0
               :enabled enabled
               :queryFn (fn []
                          (.then (.get axios "https://home.juxt.site/_site/whoami"
                                       {:headers {:accept "application/json"}})
                                 (fn [response]
                                   (.-data response))))})))

(defn Error [error]
  (if (= 401 (-> error :response :status))
    #jsx [:div [:button {:onClick authorize-callback} "Login"]]
    #jsx [:div "something went wrong!" [ReactJson {:src error}]]))



(defn App []
  (let [[enabled setEnabled] (react/useState false)
        {:keys [data isFetching isError error]} (useWhoami enabled)]
    #jsx [:div
          #jsx [:button {:onClick #(setEnabled true)} "Fetch"]
          [:button {:onClick authorize-callback} "Login"]
          (cond
            isFetching
            #jsx [:div "Loading..."]
            isError
            #jsx [Error {:& error}]
            data
            #jsx [:div [ReactJson {:src data}]]
            :else
            #jsx [:div "This should never happen!"])]))





