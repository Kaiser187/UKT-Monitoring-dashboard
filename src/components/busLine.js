import React from "react";
export default function BusLine({ busplan }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "Line" },
            React.createElement("p", null, busplan.line)),
        React.createElement("div", { className: "Abfahrt" },
            React.createElement("p", null, busplan.abfahrt))));
}
