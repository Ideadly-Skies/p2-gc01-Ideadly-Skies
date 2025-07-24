import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { SiGoogledrive, SiAppstore } from "react-icons/si";
import bcaLogo from "../assets/bca.png";
import mandiriLogo from "../assets/mandiri.png";
import permataLogo from "../assets/permata.png";
import jneLogo from "../assets/jne.png";
import jtrLogo from "../assets/jtr.png";
import mexLogo from "../assets/mex.png";
import gosendLogo from "../assets/gosend.png";
import grLogo from "../assets/grab.png";
import anterajaLogo from "../assets/anteraja.png";
import shopeeLogo from "../assets/shopee.png";
import kurirLogo from "../assets/kurir.png";
import googlePlay from "../assets/googleplay.png";
import appStore from "../assets/appstore.png";
import hopsLogo from "../assets/hops.png";
import sindonewsLogo from "../assets/sindonews.png";
import insertliveLogo from "../assets/insertlive.png";
import nexttrenLogo from "../assets/nexttren.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t-[6px] border-green-600 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Tentang Kami</h3>
          <ul className="space-y-1">
            <li>Tentang Kami</li>
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Bantuan</h3>
          <ul className="space-y-1">
            <li>Cara Berbelanja</li>
            <li>Cara Pembayaran</li>
            <li>Status Pesanan</li>
            <li>Layanan Pengiriman</li>
            <li>Pengembalian Produk</li>
            <li>Hubungi Kami</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Customer Care</h3>
          <ul className="space-y-1">
            <li>Klaim dan Garansi Produk, silakan hubungi:</li>
            <li>Ruko Mangga Dua Mall No. 7 Jakarta Pusat 10730</li>
            <li>Buka Senin-Sabtu, 10:00-18:00 WIB</li>
            <li>0813-1076-6339 (Message Only)</li>
            <li>rma.enterkomputer@gmail.com</li>
            <li>RMA Enterkomputer Website</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Toko Kami</h3>
          <ul className="space-y-1">
            <li>Mangga Dua Mall Lt.3 No. 31-32 Jakarta Pusat 10730</li>
            <li>Buka Setiap Hari, 10:00-18:00 WIB</li>
            <li>0813-10766339 (WA message only)</li>
            <li>021 30430333</li>
            <li>sales@enterkomputer.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Metode Pengiriman</h3>
          <div className="flex flex-wrap gap-2">
            {[kurirLogo, jneLogo, jtrLogo, mexLogo, gosendLogo, grLogo, anterajaLogo, shopeeLogo].map((img, idx) => (
              <img key={idx} src={img} alt="courier" className="h-8" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Metode Pembayaran</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {[bcaLogo, mandiriLogo, permataLogo].map((img, idx) => (
              <img key={idx} src={img} alt="bank" className="h-8" />
            ))}
            <FaCcVisa size={32} />
            <FaCcMastercard size={32} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Social Media</h3>
          <div className="flex gap-3 text-xl">
            <FaInstagram />
            <FaFacebookF />
            <FaTiktok />
            <FaTwitter />
            <FaYoutube />
          </div>
          <h3 className="font-semibold mt-4 mb-2">Media Partner & Publikasi</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {[hopsLogo, sindonewsLogo, insertliveLogo, nexttrenLogo].map((img, idx) => (
              <img key={idx} src={img} alt="media" className="h-6" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Unduh Aplikasi</h3>
          <div className="flex gap-4">
            <img src={googlePlay} alt="Google Play" className="h-10" />
            <img src={appStore} alt="App Store" className="h-10" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © 2009–2025, CV. TEMAN BAIK (<a className="text-black" href="https://enterkomputer.com">Enterkomputer.com</a>). All Rights Reserved.
      </div>
    </footer>
  );
}
