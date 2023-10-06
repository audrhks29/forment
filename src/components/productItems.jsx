import React, { memo, useEffect, useMemo } from 'react';

import { ProductItemContainer, ReviewContainer } from '../styled/ProductStyles';

import useProductStore from '../store/product-store';
import useBasketStore from '../store/basket-store';
import useUserStore from '../store/user-store';

import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart, BsFillCartFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

const ProductItems = memo(() => {
    const { filteredProductData } = useProductStore(state => state);
    const { basketData } = useBasketStore(state => state);
    const { loginState } = useUserStore(state => state);
    const { handleAddBasket, handleRemoveBasket } = useBasketStore(state => state);
    const navigate = useNavigate()
    const BasketIconStatus = useMemo(() => {
        if (loginState) {
            return filteredProductData.map((item) => {
                return basketData.some((basketItem) => basketItem.id === item.id);
            });
        }
        return [];
    }, [basketData, filteredProductData, loginState]);
    const handleIconClick = (item, isItemInBasket) => {
        if (loginState) {
            if (isItemInBasket) handleRemoveBasket(item.id);
            else handleAddBasket(item);
        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    };
    return (
        <ProductItemContainer>
            {
                filteredProductData.map((item, index) => {
                    const { titleImage, productName, price, salePrice, fragranceInfo } = item
                    const isItemInBasket = BasketIconStatus[index];
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
                                <span>( 리뷰 215개 )</span>
                                <div>
                                    <i><AiOutlineHeart /></i>
                                    {/* <AiFillHeart /> */}
                                    {
                                        <i onClick={() => handleIconClick(item, isItemInBasket)}>
                                            {
                                                isItemInBasket ? <BsFillCartFill /> : <BsCart />}
                                        </i>
                                    }
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