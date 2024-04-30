import Autocomplete from "../../components/autocomplete";
import ErrorBoundary from "../../layouts/error-boundary";
import fruits from "../../mocks/fruits";

import styles from "./demo-page.module.css";

// Move to config file
const demoFruitsUrl = "http://localhost:8080/fruits";
const unexpectedErrorMessage =
  "An unexpected error occurred. Please reload and try again.";

const DemoPage = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <ErrorBoundary message={unexpectedErrorMessage}>
        <section>
          <h1>Demo Page</h1>
          <article>
            <section>
              <h3>Autocomplete from JSON Array</h3>
              <p>Basic autocomplete demo with a JSON array as data source.</p>
            </section>
            <Autocomplete
              id="autocomplete"
              data={fruits}
              placeholder="Type to search for a fruit..."
            />
          </article>
          <article>
            <section>
              <h3>Autocomplete from External Data Source</h3>
              <p>
                Basic autocomplete demo with an external data source, from a
                locahost Node server, in this case.
              </p>
            </section>
            <Autocomplete
              id="autocomplete"
              sourceUrl={demoFruitsUrl}
              placeholder="Type to search for a fruit..."
            />
          </article>
          <article>
            <section>
              <h3>Autocomplete with Minimum Required Input</h3>
              <p>
                Basic autocomplete demo with minimum required input of 3
                characters.
              </p>
            </section>
            <Autocomplete
              id="autocomplete"
              data={fruits}
              minSearchLength={3}
              placeholder="Type to search for a fruit..."
            />
          </article>
          <article>
            <section>
              <h3>Autocomplete with Unexpected Error</h3>
              <p>Basic autocomplete demo with a JSON data source.</p>
              <p>
                Requires running the app in production mode. Instructions in
                README.me.
              </p>
            </section>
            <Autocomplete
              id="autocomplete"
              data={fruits}
              placeholder="Type to search for a fruit..."
              onChange={() => {
                throw new Error(
                  "This is an intentional error for testing purposes."
                );
              }}
            />
          </article>
          <article>
            <section>
              <h3>Autocomplete with API Error</h3>
              <p>
                Basic autocomplete demo with API error. 3 characters minimum.
              </p>
            </section>
            <Autocomplete
              id="autocomplete"
              sourceUrl={"does/not/exist"}
              minSearchLength={3}
              placeholder="Type to search for a fruit..."
            />
          </article>
        </section>
      </ErrorBoundary>
    </main>
  );
};

export default DemoPage;
