import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { useThemeContext } from "lib/context/ThemeContext";
import { useToggle } from "lib/hooks/useToggle";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styles from "./styles/Header.module.scss";
import Link from "next/link";


interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: session } = useSession()
  const { dark, toggleTheme } = useThemeContext();
  const [menuOpen, menuHandler] = useToggle(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  /* CloseMenu on outSideClick */
  useEffect(() => {
    const handleClickOff = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        menuHandler.off();
      }
    };

    if (menuOpen) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }

    return () => window.removeEventListener("click", handleClickOff);
  }, [menuOpen, menuHandler]);
  
  return (
    <header className={styles.headerRoot}>
      <HeaderLogo />
      <div className={styles.headerControls}>
        <div className={styles.themeBtnWrapper}>
          <button className={styles.themeToggleBtn} onClick={toggleTheme}>
            <Icon width={20} height={20} icon={`ion:${dark ? 'sunny' : 'moon'}`} />
          </button>
        </div>
        <div className={styles.avatarWrapper}>
          <Image height={32} width={32} src={session?.user?.image ? session.user.image : '/assets/image-avatar.jpg'} alt="Avatar" />
        </div>
      </div>
    </header>
  );
}

const HeaderLogo = () => {
  const router = useRouter();
  return (
    <div className={styles.headerLogoRoot} onClick={() => router.push("/")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26">
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
        />
      </svg>
    </div>
  );
};

export default Header