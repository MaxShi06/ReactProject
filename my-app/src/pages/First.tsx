import Header from "../components/Header";
import Card from "../components/Card";
import { FirstArray } from "../fixtures/FirstArray";



export default function First() {
  return (
    <div className="first-page">
      <Header />
      <h2>First Page</h2>
      <div className="cards-container">
        {FirstArray.map(item => (
          <Card key={item.id} title={`Card ${item.id}`} buttonText="Click">
            <ul>
              <li>{item.item}</li>
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
