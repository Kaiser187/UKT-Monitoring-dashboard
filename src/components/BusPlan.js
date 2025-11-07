import React from 'react';
export default function BusAbfahrtenTabelle(props) {
    return (React.createElement("div", { className: "card busabfahrtentabelle" },
        React.createElement("h1", null, props.line),
        React.createElement("p", null, props.direction),
        React.createElement("span", null, props.times.map(date => React.createElement("p", null, `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`)))));
}
