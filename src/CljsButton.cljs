(ns CljsButton
  (:require ["@mui/material/Button$default" :as Button]))

(defn CljsButton [props]
  #jsx [Button {:variant "contained"
                :color "primary"
                :onClick #(js/alert "Hello, world!")
                :sx {:mx 1}
                :& props}])


