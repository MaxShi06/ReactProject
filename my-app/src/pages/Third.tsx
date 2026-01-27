import Header from "../components/Header";
import Card from "../components/Card";
import { ThirdArray } from "../fixtures/ThirdArray";



export default function Third() {
  return (
    <div className="third-page">
      <Header />
      <h2>Third Page</h2>
      <div className="cards-container">
        {ThirdArray.map(item => (
          <Card key={item.id} title={item.name} buttonText="Buy">
            <p>{item.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
