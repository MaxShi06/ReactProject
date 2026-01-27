import "../index.css"; 
import type { CardProps } from "../types/Card";

export default function Card({ title, buttonText, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-content-wrapper">
        <h3 className="card-title">{title}</h3>
        <div className="card-content">{children}</div>
        <button className="card-button">{buttonText}</button>
      </div>
    </div>
  );
}
