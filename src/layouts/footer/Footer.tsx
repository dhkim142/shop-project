'use client';
import React from "react";
import colorLogo from "@/assets/colorful.svg";
import facebookIcon from "@/assets/sns-facebook.svg";
import instagramIcon from "@/assets/sns-instagram.svg";
import naverIcon from "@/assets/sns-naver-blog.svg";
import Image from "next/image";
import styles from './Footer.module.scss';
import Link from "next/link";

const Footer = () => {
  return <footer className={styles.footer}>
    <div className={styles.customerGuide}>
      <ul className={styles.customerGuideList}>
        <li><Link href="/">Careers</Link></li>
        <li><span /><Link href="/">Vendor/Partnership Inquiries</Link></li>
        <li><span /><Link href="/">Announcements</Link></li>
        <li><span /><Link href="/">Customer Feedback</Link></li>
        <li><span /><Link href="/">Privacy Policy</Link></li>
        <li><span /><Link href="/">Affiliate Marketing</Link></li>
        <li><span /><Link href="/">Advertising Information</Link></li>
      </ul>
    </div>

    <div className={styles.DHSHOPInformation}>
      <figure className={styles.logo}>
        <Image src={colorLogo} alt="logo1" />
      </figure>

      <ul className={styles.DHSHOPInformationList}>
        <li>
          <span>Business Name and Hosting Service Provider<span> : </span>DHSHOP</span>
        </li>
        <li>
          <span>CEO<span> : </span>Dohyun Kim</span>
        </li>
        <li>
          <span>Location<span> : </span>Los Angeles</span>
        </li>
      </ul>

      <div className={styles.customerCenter}>
        <ul className={styles.customerCenterList}>
          <li className={styles.customerCenterItem}>
            <Link href="/">365 Customer Support Center</Link>
          </li>
        </ul>

        <div className={styles.customerCenterTelephone}>

          <Link href="tel:1111-1111">1111-1111</Link>
        </div>

        <div className={styles.customerCenterAddress} role="text">
          Los Angeles
        </div>

        <div className={styles.customerCenterEmail}>
          email<span>:</span>{" "}
          <Link href="mailto:rlaehgus142@gmail.com?subject=문의사항">rlaehgus142@gmail.com</Link>
        </div>
      </div>
    </div>
    <div className={styles.copyrightArea}>
      <div className={styles.copyrightAreaInner}>
        <div className={styles.copyright}>
          <span>Some products sold on the cyber mall include marketplace (open market) items listed by individual sellers on DHSHOP.</span>
          <span>For marketplace (open market) items, DHSHOP acts as an intermediary and is not the seller.</span>
          <span>DHSHOP is not responsible for marketplace (open market) products, transaction information, or related dealings.</span>
          <span>DHSHOP operates a Trust Management Center (rlaehgus142@gmail.com) for consumer protection and secure transactions. </span>
          <span>Disputes will be resolved in accordance with a separate dispute resolution procedure if they arise.</span>
          <small className={styles.copyrightText}>
            Copyright &copy; DHSHOP Corp. 2024-2025 All Right Reserved.
          </small>
        </div>

        <div className={styles.sns}>
          <ul className={styles.snsList}>
            <li>
              <Link href="https://www.facebook.com" className="facebook">
                <Image src={facebookIcon} alt="Facebook" />
              </Link>
            </li>
            <li>
              <Link href="https://section.blog.naver.com/" className="naverBlog">
                <Image src={naverIcon} alt="Naver" />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/" className={styles.instagram}>
                <Image src={instagramIcon} alt="Instargram" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
};

export default Footer;
