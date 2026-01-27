import Header from "../components/Header";
import Card from "../components/Card";
import { SecondArray } from "../fixtures/SecondArray";



export default function Second() {
  return (
    <div className="second-page">
      <Header />
      <h2>Second Page</h2>
      <div className="cards-container">
        {SecondArray.map(item => (
          <Card key={item.id} title={`Card ${item.id}`} buttonText="View">
            <img src={item.img} alt={`Item ${item.id}`} />
          </Card>
        ))}
      </div>
    </div>
  );
}
