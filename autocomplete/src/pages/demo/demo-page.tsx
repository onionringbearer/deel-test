import Autocomplete from "../../components/autocomplete";
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
            locahost NodeJs in our case.{" "}
          </p>
        </section>
        <Autocomplete
          id="autocomplete"
          sourceUrl={demoFruitsUrl}
          placeholder="Type to search for a fruit..."
        />
      </article>
    </section>
  );
};

export default DemoPage;
