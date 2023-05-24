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
111
(defn authorize-callback []
  (authorize
   {:origin resource-server
    :client_id "insite"
    :authorization_endpoint (str authorization-server "/oauth/authorize")
    :token_endpoint (str authorization-server "/oauth/token")
    :redirect_uri (str app-server "/oauth-redirect.html")}))

(defn useWhoami []
  (let [_search (useSearch)]
    (useQuery {:queryKey ["stacktrace"]
               :retry 0
               :queryFn (fn []
                          (.then (.get axios "https://home.juxt.site/_site/whoami"
                                       {:headers {:accept "application/json"}})
                                 (fn [response]
                                   (.-data response))))})))

(defn Error [error]
  (if (= 401 (-> error :response :status))
    #jsx [:div [:button {:class "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                         :onClick authorize-callback} "Login"]]
    #jsx [:div "something went wrong!" [ReactJson {:src error}]]))

(defn App []
  (let [{:keys [data isFetching isError error]} (useWhoami)]
    #jsx [:div {:class "min-h-screen flex justify-center items-center text-white"}
          (cond
            isFetching
            #jsx [:div [:img  {:class "animate-spin"
                               :width "50px"
                               :src "/spinner.svg"}]]
            isError
            #jsx [Error {:& error}]
            data
            #jsx [:div [ReactJson {:src data :theme "twilight" :name false :collapsed 2}]]
            :else
            #jsx [:div "This should never happen!"])]))





