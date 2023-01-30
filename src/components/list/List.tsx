import React, { useEffect, useRef } from "react";
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
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (description) {
  //     // const text = description.slice(0, 40).replaceAll(" ", "");
  //     // const canvas = document.createElement("canvas");
  //     // const ctx = canvas.getContext("2d");
  //     // if (!ctx) return;
  //     // const finalWidth = Math.ceil(ctx.measureText(text).width);
  //     // const textmesurement = document.createElement("div");
  //     // textmesurement.textContent = description.slice(0, 40);
  //     // const finalWidth = textmesurement.clientWidth;
  //     // console.log(textmesurement);
  //     const descriptionStyle = descriptionRef.current as HTMLDivElement;
  //     descriptionStyle.style.width = `${Math.ceil(
  //       descriptionStyle.getBoundingClientRect().width
  //     )}px`;
  //     console.log(descriptionStyle.style.width);
  //     // descriptionStyle.innerText = description;
  //   }
  // }, [description]);
  return (
    <li className="list-wrapper">
      <span className="id">{productId}</span>
      <span className="title">{productTitle}</span>
      <span className="brand">{brand}</span>
      {/* 상품 내용은 40글자가 넘으면 ...으로 표현 css 에서 ellipsis적용 */}
      <span className="description">
        <div ref={descriptionRef}>{description}</div>
      </span>
      <span className="price">${price}</span>
      <span className="rating">{rating}</span>
      <span className="stock">{stock}</span>
    </li>
  );
};

export default List;
