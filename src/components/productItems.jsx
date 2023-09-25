import React, { memo } from 'react';
import { ProductItemContainer, ReviewContainer } from '../styled/ProductStyles';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCart, BsFillCartFill } from 'react-icons/bs';
import useProductStore from '../store/product-store';
const ProductItems = memo(() => {
    const { filteredProductData } = useProductStore(state => state);
    return (
        <ProductItemContainer>
            {
                filteredProductData.map((item) => {
                    const { titleImage, productName, price, salePrice, fragranceInfo } = item
                    return (
                        <div key={item.id} className='itemBox'>
                            <div>
                                <img src={titleImage} alt="" />
                            </div>
                            <ul>
                                <li>{productName}</li>
                                <li>
                                    <strong>{salePrice.toLocaleString()}원</strong>
                                    <span>{price.toLocaleString()}원</span>
                                </li>
                                <li>{fragranceInfo}</li>
                            </ul>
                            <ReviewContainer>
                                <span>( 리뷰 215개 )</span>
                                <div>
                                    <i><AiOutlineHeart /></i>
                                    {/* <AiFillHeart /> */}
                                    <i><BsCart /></i>
                                    {/* <BsFillCartFill /> */}
                                </div>
                            </ReviewContainer>

                        </div>
                    )
                })
            }
        </ProductItemContainer>
    );
});

export default ProductItems;