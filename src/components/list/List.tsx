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
  // const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  // useEffect(() => {
  //   if (description) {
  //     const descriptionStyle = descriptionRef.current as HTMLParagraphElement;
  //     const currentDescriptionWidth =
  //       descriptionStyle.getBoundingClientRect().width;
  //     descriptionStyle.style.width = `${Math.ceil(currentDescriptionWidth)}px`;
  //     descriptionStyle.innerText = description;
  //   }
  // }, []);

  return (
    <li className="list-wrapper">
      <span className="id">{productId}</span>
      <span className="title">{productTitle}</span>
      <span className="brand">{brand}</span>
      {/* 상품 내용은 40글자가 넘으면 ...으로 표현 css 에서 ellipsis적용 */}
      <span className="description">
        {/* <p ref={descriptionRef}> */}
        {description.length > 40
          ? description.slice(0, 40) + "..."
          : description}
        {/* </p> */}
      </span>
      <span className="price">${price}</span>
      <span className="rating">{rating}</span>
      <span className="stock">{stock}</span>
    </li>
  );
};

export default List;
