(ns App
  (:require ["react" :as react]
            ["./VisxExample$default" :as Visx]
            ["@tanstack/react-query" :refer [useQuery]]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/TextField$default" :as TextField]
            ["@mui/material/Typography$default" :as Typography]))

(def animalsData [{:sound "Moo Moo"
                   :animal2 "Cow"
                   :language "English"}
                  {:sound "Miau Miau"
                   :animal "Cat"
                   :language "Spanish"}
                  {:sound "Bark Bark"
                   :animal "Dog"
                   :language "German"}])

(def testatom (atom nil))

(defn Game [{:keys [sound animal language]}]
  (let [[guess set-guess] (react/useState "")
        correct? (= animal guess)
        test @testatom]
    (react/useEffect
     (fn []
       (set-guess ""))
     [test])
    #jsx [Box
          [:div {:class "hello???" :variant "h4"} "What animal is this?"]
          [:div "hi " @testatom]
          [Typography {:variant "h6"} sound]
          [TextField {:label "Animal"
                      :value guess
                      :onChange #(set-guess (-> % :target :value))}]
          (when correct?
            #jsx [Typography {:variant "h4"} "Correct!"])]))

(defn App []
  (let [[animal set-animal] (react/useState (first (shuffle animalsData)))
        {:keys [data isLoading]}
        (useQuery {:queryKey ["animals"]
                   :queryFn (fn []
                              (.then (js/fetch "https://jsonplaceholder.typicode.com/todos/1")
                                     (fn [response]
                                       (.json response))))})]
    #jsx [Box {:sx {:display "flex"
                    :flexDirection "column"
                    :alignItems "center"
                    :justifyContent "center"}}
          [Box
           {:sx {:display "flex"
                 :flexDirection "column"
                 :gap "1rem"
                 :alignItems "center"
                 :justifyContent "center"
                 :width "100%"}}
           (if isLoading
             #jsx [Typography {:variant "h1"} "Loading..."]
             #jsx
              [Typography {:variant "h1"} (:title data)])
           [Game {:& animal}]
           [Visx {:width 400
                  :height 400}]
           [Button {:variant "contained"
                    :color "primary"
                    :onClick #(do
                                (reset! testatom (rand-int 100))
                                (set-animal (first (shuffle (remove
                                                             (fn [{:keys [sound]}]
                                                               (= sound (:sound animal)))
                                                             animalsData)))))}
            "New Game"]]]))

