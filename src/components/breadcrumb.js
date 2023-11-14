import React, { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadcrumbExample({ deckName }) {
  if (deckName) {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

// export BreadcrumbExample;

// function Breadcrumb({ deckName }) {
//     if
//     return (
//         <div>
//             <h4>
//                 Home / {deckName} / Study
//                 Home / {deckName} / Add Card
//                 Home / {deckName} / Edit Card {cardId}
//                 Home / {deckName} / Edit Deck
//                 Home / {deckName} -> this is on the cardlist
//                 Home / Create Deck

//             </h4>
//         </div>
//     )
// }

// export default Breadcrumb;
