import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// {
//     "type": "div",
//     "name": "Clock",
//     "root": true,
//     "style": {
//     "display": "flex",
//     "flex-direction": "row",
//     "justify-content": "center"
//     },
//     "children": [
//     {
//     "type": "div",
//     "name": "Hour",
//     "style": {},
//     "children": []
//     },
//     {
//     "type": "span",
//     "name": "Minute",
//     "style": {
//     "color": "green",
//     "font-size": 30
//     },
//     "children": []
//     }
//     ]
//     }

const makeCamelCase = (value) => {
  let valueConvToString = "";

  if (value.contains("- ")) {
    let str = value.split("- ");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    valueConvToString = str[0] + str[1];
  } else if (value.contains(" -")) {
    let str = value.split("- ");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    valueConvToString = str[0] + str[1];
  } else if (value.contains(" - ")) {
    let str = value.split("- ");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    valueConvToString = str[0] + str[1];
  } else if (value.contains("-")) {
    let str = value.split("-");
    str[0][0] = str[0][0].toLowerCase();
    str[1][0] = str.toUpperCase();

    valueConvToString = str[0] + str[1];
  } else {
    valueConvToString = value[0].toLowerCase();
  }

  return valueConvToString;
};

const assignStyles = (obj) => {
  if (obj.style.length === 0 && obj.style === null) {
    return;
  }
  let style = "";
  for (let key in obj.style) {
    style += makeCamelCase(key) + `"${makeCamelCase(obj.style[key])}", `;
  }

  return style.slice(0, style.length);
};

const createElements = (obj, elementString) => {
  if (obj.children.length === 0 || obj.children === null) {
    return `<${obj.name}/>`;
  }

  elementString += `<${obj.name} style={{${assignStyles(obj)}}} />`;

  for (let i = 0; i < obj.children.length; i++) {
    elementString += createElements(obj.children[i], elementString);
  }

  elementString += `</${obj.name}>`;
  return elementString;
};

function generateCodeFromObject(obj) {
  //return a code generated string
  return <>{createElements(obj, "")}</>;
}

module.exports = generateCodeFromObject;

ReactDOM.render(<App />, document.getElementById("root"));
