import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="hidden md:block border-b border-line surface text-xs text-mute-2 relative z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-8 flex-wrap">
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[color:var(--color-brand)]" />
            Alang, Gujarat – India
          </span>
          <span className="text-line">|</span>
          <a href="tel:+919825645515" className="flex items-center gap-2 hover:text-[color:var(--color-brand-light)] transition-colors">
            <FaPhoneAlt className="text-[color:var(--color-brand)]" />
            +91 9825 645515
          </a>
          <span className="text-line">|</span>
          <a href="mailto:info@harbourline.com" className="flex items-center gap-2 hover:text-[color:var(--color-brand-light)] transition-colors">
            <FaEnvelope className="text-[color:var(--color-brand)]" />
            info@harbourline.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="lang">Select Language</label>
          <select
            id="lang"
            className="bg-transparent border border-line rounded px-2 py-1 text-[11px] outline-none hover:border-[color:var(--color-brand)] transition-colors"
            defaultValue=""
          >
            <option value="" className="text-black">Select Language</option>
            <option value="en" className="text-black">English</option>
            <option value="hi" className="text-black">हिन्दी</option>
            <option value="gu" className="text-black">ગુજરાતી</option>
            <option value="ar" className="text-black">العربية</option>
            <option value="zh" className="text-black">中文</option>
          </select>
        </div>
      </div>
    </div>
  );
}
