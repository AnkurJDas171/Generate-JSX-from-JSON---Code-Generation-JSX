import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const makeCamelCaseOfStylePrioperties = (value) => {
  let valueConvToString = "";

  if (value.contains("- ")) {
    let str = value.split("- ");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    let valueConvToString = str[0] + str[1];
  } else if (value.contains("-")) {
    let str = value.split("-");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    let valueConvToString = str[0] + str[1];
  } else {
    valueConvToString = value[0].toLowerCase();
  }

  return valueConvToString;
};

const makeStyle = (obj, element) => {
  let styleElement = obj.style;

  if (styleElement !== undefined && Object.keys(styleElement).length !== 0) {
    for (let styleKeys in styleElement) {
      let key = makeCamelCaseOfStylePrioperties(styleKeys);
      element.style[key] = obj[styleKeys];
    }
  }
  return;
};

const createStructure = (obj) => {
  let element = document.createElement(obj.type);

  if (obj.name !== undefined && obj.name !== "" && obj.name !== " ") {
    element.setAttribute("name", obj.name);
  }

  makeStyle(obj, element);

  if (obj.children !== undefined && obj.children.length !== 0) {
    let childrenArray = obj.children;
    let lengthOfChildrenProperty = childrenArray.length;

    for (let i = 0; i < lengthOfChildrenProperty; i++) {
      let child = createStructure(childrenArray[i]);
      element.appendChile(child);
    }
  }
  return element;
};

function generateCodeFromObject(obj) {
  //return a code generated string
  return `${createStructure()}`;
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
