import React, { memo } from 'react';

import { ProductItemContainer, ReviewContainer } from '../styled/ProductStyles';

import useProductStore from '../store/product-store';

import { AiOutlineHeart } from 'react-icons/ai';

import { Link } from 'react-router-dom';

const ProductItems = memo(() => {
    const { filteredProductData } = useProductStore(state => state);
    // 하트로 교체
    // const handleIconClick = (item, isItemInBasket) => {
    //     if (loginState) {
    //         if (isItemInBasket) handleRemoveBasket(item.id);
    //         else handleAddBasket(item);
    //     } else {
    //         alert('로그인이 필요한 서비스입니다.');
    //         navigate('/login');
    //     }
    // };
    return (
        <ProductItemContainer>
            {
                filteredProductData.map((item, index) => {
                    const { titleImage, productName, price, salePrice, fragranceInfo, review } = item;
                    return (
                        <div key={item.id} className='itemBox'>
                            <div>
                                <Link to={`/product/${item.id}`}><img src={titleImage} alt="" /></Link>
                            </div>
                            <ul>
                                <li>{productName}</li>
                                <li>
                                    <strong>{salePrice.toLocaleString()}원</strong>
                                    <span className='color_red'>{price.toLocaleString()}원</span>
                                </li>
                                <li>{fragranceInfo}</li>
                            </ul>
                            <ReviewContainer>
                                <span>( 리뷰 {review.toLocaleString()}개 )</span>
                                <div>
                                    <i><AiOutlineHeart /></i>
                                    {/* <AiFillHeart /> */}
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