import Autocomplete from "../../components/autocomplete";
import fruits from "../../mocks/fruits";

const DemoPage = (): JSX.Element => {
  return (
    <section>
      <h1>Demo Page</h1>
      <article>
        <section>
          <h3>Autocomplete from JSON Array</h3>
          <p>Basic autocomplete demo with a JSON data source.</p>
          <p>Type to search for a fruit</p>
        </section>
        <Autocomplete
          id="autocomplete"
          data={fruits}
          placeholder="Type to search for a fruit..."
        />
      </article>
    </section>
  );
};

export default DemoPage;
