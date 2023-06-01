(ns App
  (:require ["@juxt/pass" :refer [registerOAuth2Worker, authorize]]
            ["react" :as react]
            ["react-hook-form" :refer [useForm]]
            ["@tanstack/react-query" :refer [useQuery]]
            ["@tanstack/react-location" :refer [useSearch]]
            ["axios$default" :as axios]
            ["react-json-view$default" :as ReactJson]))

(registerOAuth2Worker)

(def authorization-server "http://localhost:4440")
(def app-server "http://localhost:3000")

(defn authorize-callback
  [resource-server]
  (authorize
   {:origin resource-server
    :client_id "insite"
    :authorization_endpoint (str authorization-server "/oauth/authorize")
    :token_endpoint (str authorization-server "/oauth/token")
    :redirect_uri (str app-server "/oauth-redirect.html")}))

(defn useWhoami
  [resource-server]
  (let [_search (useSearch)]
    (useQuery {:queryKey ["stacktrace"]
               :retry 0
               :queryFn (fn []
                          (.then (.get axios (str resource-server "/_site/whoami")
                                       {:headers {:accept "application/json"}})
                                 (fn [response]
                                   (.-data response))))})))

(defn Error [error]
  #jsx [:div "something went wrong!" [ReactJson {:src error}]])

(defn MeJson 
  [{:keys [resource-server]}]
  (let [{:keys [data  isLoading isError error]} (useWhoami resource-server)]
    #jsx [:div {:class "min-h-screen flex justify-center items-center text-white"}
          (cond
            isLoading 
            #jsx [:div [:img  {:class "animate-spin"
                               :width "50px"
                               :src "/spinner.svg"}]]
            isError
            #jsx [Error {:& error}]
            data
            #jsx [:div [ReactJson {:src data :theme "twilight" :name false :collapsed 2}]]
            :else
            #jsx [:div "This should never happen!"])]))

(defn App
  []
  (let [{:keys [register handleSubmit]} (useForm)]
    #jsx
     [:div {:className "flex justify-center items-center"}
      [:input {:& (register "resourceServer")
               :className "input"
               :defaultValue "http://localhost:4444"}]
      [:button {:className "btn" :onClick (handleSubmit (fn [data] (store-si (:resourceServer data))))} "Submit"]
      [MeJson {:resource-server "http://localhost:4444"}]]))



