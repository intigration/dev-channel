import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { isMobileDevice } from '../helpers/is-mobile'
import { useOutsideClick } from '../helpers/use-outside-click';
import AsyncAPILogo from '../AsyncAPILogo'
import NavItem from './NavItem'
import ToolsPanel from './ToolsPanel'
import LearningPanel from './LearningPanel'
import CommunityPanel from "./CommunityPanel"
import ApiPanel from "./ApiPanel"

import MobileNavMenu from './MobileNavMenu'
import otherItems from './otherItems'
import Button from '../buttons/Button'
import GithubButton from "../buttons/GithubButton"
import { SearchButton } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';
import Link from 'next/link';
// import AsyncAPILogoLight from "../AsyncAPILogoLight";

const isMobile = isMobileDevice();

export default function NavBar({
  className = 'inline-flex',
  hideLogo = true,
}) {
  const { asPath } = useRouter();
  const [open, setOpen] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState();

  function outsideClick(menu) {
    if (open !== menu) return;
    setOpen(null);
  }
  const apiRef = useOutsideClick(() => outsideClick('apis'));

  const learningRef = useOutsideClick(() => outsideClick('learning'));
  const toolingRef = useOutsideClick(() => outsideClick('tooling'));
  const communityRef = useOutsideClick(() => outsideClick('community'));

  function showMenu(menu) {
    if (open === menu) return;
    setOpen(menu);
  }

  function showOnClickMenu(menu) {
    if (!isMobile) return;
    if (open === menu) return setOpen(null);
    setOpen(menu);
  }

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpen(null);
  }, [asPath])

  return (
    <div className={`bg-orange ${className} z-2`}>
      <a href="#main-content" className="block md:inline-block absolute transform -translate-y-20 focus:translate-y-0 bg-gray-100 text-gray-700 p-5 text-md font-semibold" alt="Skip to main content">Skip to main content</a>
      <div className="flex w-full justify-between items-center py-6 lg:justify-start sm:space-x-10">
        {/* {!hideLogo && ( */}
          <div className="mt-6 mb-6 w-full">
            <div className="flex">
              <Link href="/">
                <a className="cursor-pointer">
                  {/* <AsyncAPILogo className="h-8 w-auto sm:h-8" /> */}
                  <AsyncAPILogo />
                </a>
              </Link>
            </div>
          </div>
        {/* )} */}

        <div className="flex flex-row items-center justify-center -mr-2 -my-2 lg:hidden">
          <SearchButton
            className="flex items-center text-left space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <IconLoupe />
          </SearchButton>
          <Button onClick={() => setMobileMenuOpen(true)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <title>Menu</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:justify-end space-x-6 xl:space-x-10 w-full">
          <div className="relative" onMouseLeave={() => showMenu(null)} ref={learningRef}>
            <NavItem
              text="Wiki"
              href='/docs'
              onClick={() => showOnClickMenu('learning')}
              onMouseEnter={() => showMenu('learning')}
              hasDropdown
            />
            {open === 'learning' && <LearningPanel />}
          </div>

          <div className="relative" onMouseLeave={() => showMenu(null)} ref={toolingRef}>
            <NavItem
              text="Labs"
              href='/tools'
              onClick={() => showOnClickMenu('tooling')}
              onMouseEnter={() => showMenu('tooling')}
              hasDropdown
            />
            {open === 'tooling' && <ToolsPanel />}
          </div>
          <div className="relative" onMouseLeave={() => showMenu(null)} ref={apiRef}>
            <NavItem
              text="Tooling"
              href='/apis'
              onClick={() => showOnClickMenu('apis')}
              onMouseEnter={() => showMenu('apis')}
              hasDropdown
            />
            {open === 'apis' && <ApiPanel />}
          </div>

          <div className="relative" onMouseLeave={() => showMenu(null)} ref={communityRef}>
            <NavItem
              text="Community"
              route="/community"
              onClick={() => showOnClickMenu('community')}
              onMouseEnter={() => showMenu('community')}
              hasDropdown
            />
            {open === 'community' && <CommunityPanel />}
          </div>
          {otherItems.map((item, index) => (
            <NavItem href={item.href} key={index} text={item.text} target={item.target} className={item.className} />
          ))}

          <div className="flex flex-row items-center justify-content">
            <SearchButton
              className="flex items-center text-left space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <IconLoupe />
            </SearchButton>

            <GithubButton text="" href="https://#" className="py-2 ml-2" inNav="false" />
          </div>
        </nav>

      </div>

      {/* Mobile menu, show/hide based on mobile menu state. */}
      {mobileMenuOpen && <MobileNavMenu onClickClose={() => setMobileMenuOpen(false)} />}
    </div>
  )
}
