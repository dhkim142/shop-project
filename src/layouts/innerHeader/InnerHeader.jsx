'use client'
import React, { useEffect, useState } from 'react'
import freshIcon from '@/assets/icon-fresh.svg';
import rocketIcon from '@/assets/icon-rocket.svg';
import newIcon from '@/assets/new.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './InnerHeader.module.scss';

import logo from '@/assets/colorful.svg';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH } from '@/redux/slice/filterSlice';
import { selectProducts } from '@/redux/slice/productSlice';

const InnerHeader = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const products = useSelector(selectProducts);
  
  const handleSearch = () => {
    if (search.trim() === "") {
      // 검색어가 비어 있으면 필터링하지 않고 전체 상품을 유지
      dispatch(FILTER_BY_SEARCH({ products, search: "" }));
    } 
    else {
      // 검색어를 기준으로 필터링
      dispatch(FILTER_BY_SEARCH({ products, search }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 동작 방지
      handleSearch(); // 검색 실행
    }
  };

  const handleClick = () => {
    router.push('/cart');
  }

  return (
    <div className={styles.innerHeader}>
      {/* <!-- 로고 --> */}
      <h1 className={styles.brand}>
        <Link href="/">
          <Image src={logo} alt="logo" width={211} height={48} priority />
        </Link>
      </h1>
      {/* <!-- 카테로기버튼 --> */}
      <button type="button" className={styles.buttonCategory}>Category</button>
      {/* <!-- 검색 폼  --> */}
      <form action="/" className={styles.searchForm}>
        <fieldset>
          <div className={styles.searchFormWrapper}>
            <div className={styles.formSelect}>
              <select name="searchCategory" id="searchCategory">
                <option>All</option>
              </select>
              <svg
                className={styles.iconDown} width="9" height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0H0L4.69565 6L9 0Z" fill="#767676" />
              </svg>
            </div>
            <div className={styles.formInput}>
              <input
                type="search" id="searchKeyword"
                placeholder="Search for the products you're looking for!"
                value={search} onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button type="button" className={styles.searchButton} onClick={handleSearch}></button>
            <button type="button" className={styles.voiceSearchButton}></button>
          </div>
        </fieldset>
      </form>
      {/* <!-- 마이샵영역 --> */}
      <div className={styles.mySHOP}>
        <button type="button" className={classNames(styles.button, styles.mySHOPButton)}>MyShop</button>
        <ul className={styles.mySHOPList}>
          <li><Link href="/">OrderHistory</Link></li>
          <li><Link href="/">Cancel/Returns</Link></li>
          <li><Link href="/">Wishlist</Link></li>
        </ul>
      </div>
      {/* <!-- 장바구니 영역 --> */}
      <div className={styles.cart}>
        <div className={styles.cartButtonWrapper}>
          <button
            type="button" onClick={handleClick}
            className={classNames(styles.button, styles.cartButton)}>
            Cart
          </button>
          <strong className={styles.cartProductCount}>1</strong>
        </div>
      </div>
      {/* <!-- 유형별 링크목록 --> */}
      <div className={styles.typeNavigation}>
        <ul className={styles.typeNavigationList}>
          <li><Link href="/" ><Image src={rocketIcon} className={styles.badgeRocket} alt='rocket' />RocketDelivery</Link></li>
          <li><Link href="/" ><Image src={freshIcon} className={styles.badgeRocket} alt="fresh" />RocketFresh</Link></li>

          <li><Link href="/" >SubscriptionDelivery</Link></li>
          <li><Link href="/" >Events/Coupons</Link></li>
          <li><Link href="/" >SpecialOffers</Link></li>
          <li><Link href="/" >TravelTickets</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default InnerHeader