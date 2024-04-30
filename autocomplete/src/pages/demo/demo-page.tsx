import { useState } from "react";
import Autocomplete from "../../components/autocomplete";
import DemoArticle from "../../features/demo-article";
import fruits from "../../mocks/fruits";

import styles from "./demo-page.module.css";

// Move to config file
const demoFruitsUrl = "http://localhost:8080/fruits";

const DemoPage = (): JSX.Element => {
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const handleViewErrorClick = () => {
    setIsErrorVisible(true);
  };
  return (
    <main className={styles.main}>
      <section className={styles.demos}>
        <h1>Demo Page</h1>
        {/* Autocomplete from JSON Array */}
        <DemoArticle
          title="Autocomplete from JSON Array"
          description="Basic autocomplete demo with a JSON array as data source."
        >
          <Autocomplete
            id="autocomplete"
            data={fruits}
            placeholder="Type to search for a fruit..."
          />
        </DemoArticle>

        {/* Autocomplete from External Data Source */}
        <DemoArticle
          title="Autocomplete from External Data Source"
          description="Basic autocomplete demo with an external data source, from a
            locahost Node server, in this case."
        >
          <Autocomplete
            id="autocomplete"
            sourceUrl={demoFruitsUrl}
            placeholder="Type to search for a fruit..."
          />
        </DemoArticle>

        {/* Autocomplete with Minimum Required Input */}
        <DemoArticle
          title="Autocomplete with Minimum Required Input"
          description="Basic autocomplete demo with minimum required input of 3
            characters."
        >
          <Autocomplete
            id="autocomplete"
            data={fruits}
            minSearchLength={3}
            placeholder="Type to search for a fruit..."
          />
        </DemoArticle>

        {/* Autocomplete with No Data */}
        <DemoArticle
          title="Autocomplete with No Data"
          description="Basic autocomplete demo with no data available."
        >
          <Autocomplete id="autocomplete" data={[]} />
        </DemoArticle>

        {/* Autocomplete with API Error */}
        <DemoArticle
          title="Autocomplete with API Error"
          description="Basic autocomplete demo with API error. 3 characters minimum."
        >
          <Autocomplete
            id="autocomplete"
            sourceUrl={"does/not/exist"}
            minSearchLength={3}
            placeholder="Type to search for a fruit..."
          />
        </DemoArticle>

        {/* Autocomplete with Unexpected Error */}
        <DemoArticle
          title="Autocomplete with Unexpected Error"
          description="Basic autocomplete demo with a JSON data source."
          instructions="Requires running the app in production mode. Instructions in README.me."
        >
          {isErrorVisible ? (
            <Autocomplete
              id="autocomplete"
              data={(() => {
                throw new Error("Unexpected error");
              })()}
            />
          ) : (
            <Autocomplete id="autocomplete" data={[]} />
          )}
          <button className={styles.errorButton} onClick={handleViewErrorClick}>
            Test error
          </button>
        </DemoArticle>
      </section>
    </main>
  );
};

export default DemoPage;
