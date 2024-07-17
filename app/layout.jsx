import "@styles/global.css";
import Nav from "@Components/Nav";
import Provider from "@Components/Provider";
export const metaData = {
  title: "Promptopia",
  description: "Discover & share Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
