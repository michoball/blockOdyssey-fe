import React from "react";
import "./List.styles.scss";

interface ListProps {
  productTitle: string;
  productId: number;
  brand: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

const List: React.FC<ListProps> = ({
  productId,
  productTitle,
  brand,
  description,
  price,
  rating,
  stock,
}) => {
  return (
    <li className="list-wrapper">
      <span className="id">{productId}</span>
      <span className="title">{productTitle}</span>
      <span className="brand">{brand}</span>
      <span className="description">
        {description.length > 40
          ? `${description.slice(0, 40)}...`
          : description}
      </span>
      <span className="price">${price}</span>
      <span className="rating">{rating}</span>
      <span className="stock">{stock}</span>
    </li>
  );
};

export default List;
