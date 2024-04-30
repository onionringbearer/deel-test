import Autocomplete from "../../components/autocomplete";
import ErrorBoundary from "../../layouts/error-boundary";
import fruits from "../../mocks/fruits";

// Move to config file
const demoFruitsUrl = "http://localhost:8080/fruits";

const DemoPage = (): JSX.Element => {
  return (
    <section>
      <h1>Demo Page</h1>
      <article>
        <section>
          <h3>Autocomplete from JSON Array</h3>
          <p>Basic autocomplete demo with a JSON data source.</p>
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
            locahost NodeJs in our case.
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
            Basic autocomplete demo with minimum required input of 3 characters.
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
          <h3>Autocomplete with API Error</h3>
          <p>
            Basic autocomplete demo with API error boundary. 3 characters
            minimum.
          </p>
          <p>
            Requires running the app in production mode. Instructions in
            README.me.
          </p>
        </section>
        <ErrorBoundary message="Error fetching data from the source URL.">
          <Autocomplete
            id="autocomplete"
            sourceUrl={"does/not/exist"}
            minSearchLength={3}
            placeholder="Type to search for a fruit..."
          />
        </ErrorBoundary>
      </article>
    </section>
  );
};

export default DemoPage;
