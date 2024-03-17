import ReactDOM from "react-dom/client";

import App from "./App.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// если придерживаться режима StrictMode, то будет происходить двойной рендеринг

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
